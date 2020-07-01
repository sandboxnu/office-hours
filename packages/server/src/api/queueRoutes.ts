import { ResponseObject, ServerRoute } from "@hapi/hapi";
import Joi from "@hapi/joi";
import {
  CreateQuestionParams,
  CreateQuestionResponse,
  GetQuestionResponse,
  ListQuestionsResponse,
  Question,
  QuestionStatus,
  QuestionStatusKeys,
  UpdateQuestionParams,
  UpdateQuestionResponse,
  UserPartial,
} from "@template/common";
import { QuestionModel } from "../entity/QuestionModel";
import { QueueModel } from "../entity/QueueModel";
import { UserModel } from "../entity/UserModel";
import { QuestionSchema, QueueNotePayload } from "../joi";

export const queueRoutes: ServerRoute[] = [
  {
    method: "GET",
    path: "/api/v1/queues/{queue_id}/questions",
    handler: async (
      request,
      h
    ): Promise<ListQuestionsResponse | ResponseObject> => {
      // todo: need a way to return different data, if TA vs. student hits endpoint.
      // for now, just return the student response
      const queueSize = await QueueModel.count({
        where: { id: request.params.queue_id },
      });
      // Check that the queue exists
      if (queueSize === 0) {
        return h.response("Queue not found").code(404);
      }

      const questions = await QuestionModel.find({
        where: [
          {
            queueId: request.params.queue_id,
          },
        ],
        relations: ["creator", "taHelped"],
      });

      return questions.map(questionModelToQuestion);
    },
    options: {
      response: {
        schema: Joi.array().items(
          QuestionSchema.options({ presence: "required" })
        ),
      },
    },
  },
  {
    method: "POST",
    path: "/api/v1/queues/{queue_id}/questions",
    // TODO: Add request validations
    handler: async (
      request,
      h
    ): Promise<CreateQuestionResponse | ResponseObject> => {
      // TODO: Remove this once we implemntent user authentication
      const DEFAULT_USER = await UserModel.create({
        id: 42,
        username: "test_user",
        email: "test_user@husky.neu.edu",
        name: "Test User",
        photoURL: "www.photoURL.com",
      }).save();
      const queueSize = await QueueModel.count({
        where: { id: request.params.queue_id },
      });
      // Check that the queue exists
      if (queueSize === 0) {
        return h.response("Queue not found").code(404);
      }
      // TODO: Check that the user posting the question is a member of the course

      const { text, questionType } = request.payload as CreateQuestionParams;
      const question = await QuestionModel.create({
        queueId: parseInt(request.params.queue_id),
        creator: DEFAULT_USER,
        text,
        questionType,
        status: QuestionStatusKeys.Drafting,
      }).save();

      question.creator = DEFAULT_USER;
      return h.response(questionModelToQuestion(question)).code(201);
    },
    options: {
      response: {
        schema: QuestionSchema.options({ presence: "required" }),
      },
      validate: {
        payload: Joi.object({
          text: Joi.string().required(),
          questionType: Joi.string().required(),
        }).required(),
      },
    },
  },
  {
    method: "GET",
    path: "/api/v1/queues/{queue_id}/questions/{question_id}",
    handler: async (
      request,
      h
    ): Promise<GetQuestionResponse | ResponseObject> => {
      const queueSize = await QueueModel.count({
        where: { id: request.params.queue_id },
      });
      // Check that the queue exists
      if (queueSize === 0) {
        return h.response("Queue not found").code(404);
      }
      const question = await QuestionModel.findOne(request.params.question_id, {
        relations: ["creator", "taHelped"],
      });
      if (question === undefined) {
        return h.response("Question not found").code(404);
      }

      return questionModelToQuestion(question);
    },
    options: {
      response: {
        schema: QuestionSchema.options({ presence: "required" }),
      },
    },
  },
  {
    method: "PATCH",
    path: "/api/v1/queues/{queue_id}/questions/{question_id}",
    handler: async (
      request,
      h
    ): Promise<UpdateQuestionResponse | ResponseObject> => {
      const { text, questionType } = request.payload as UpdateQuestionParams; // Question: Do we want to take in the whole question as a param?
      const { queue_id, question_id } = request.params;
      // TODO: Check that the question_id belongs to the user or a TA that is currently helping with the given queue_id
      // TODO: Use user type to dertermine wether or not we should include the text in the response
      let question = await QuestionModel.findOne({
        where: { queueId: queue_id, id: question_id },
        relations: ["creator"],
      });
      if (question === undefined) {
        return h.response("").code(404);
      }
      question = Object.assign(question, request.payload);
      await question.save();
      return questionModelToQuestion(question);
    },
    options: {
      response: {
        schema: QuestionSchema.options({ presence: "required" }),
      },
      validate: {
        payload: Joi.object({
          text: Joi.string(),
          questionType: Joi.string(),
          status: Joi.string(),
        }).required(),
      },
    },
  },
  {
    method: "PATCH",
    path: "/api/v1/queues/{queue_id}",
    handler: async (request, h) => {
      const queueModel = await QueueModel.findOne(request.params.queue_id);
      console.log(request.payload);

      queueModel.notes = request.payload["notes"];

      await queueModel.save();
      return h.response().code(200);
    },
    options: {
      validate: {
        payload: QueueNotePayload,
      },
    },
  },
];

// for some reason, JOI.allow(null) means the property has to exist, but can be null

function questionModelToQuestion(qm: QuestionModel): Question {
  return {
    creator: userModelToUserPartial(qm.creator),
    id: qm.id,
    createdAt: qm.createdAt,
    status: parseStatus(qm.status),
    text: qm.text,
    // qm.taHelped: types says is nonnullable, but it is nullable
    taHelped: qm.taHelped ? userModelToUserPartial(qm.taHelped) : null,
    closedAt: qm.closedAt,
    questionType: qm.questionType,
    // TODO: helpedAt: property not required in types, but required by JOI
    helpedAt: qm.helpedAt,
  };
}

function userModelToUserPartial(um: UserModel): UserPartial {
  return {
    id: um.id,
    name: um.name,
    // TODO: photoURL: property not required in types, but required by JOI
    photoURL: um.photoURL,
  };
}

function parseStatus(maybeStatus: string | number | symbol): QuestionStatus {
  if (maybeStatus in QuestionStatusKeys) {
    return maybeStatus as QuestionStatus;
  } else {
    throw new Error(
      `received unknown or ill-formatted status: ${String(maybeStatus)}`
    );
  }
}
