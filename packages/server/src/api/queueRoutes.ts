import { ServerRoute, ResponseObject } from "@hapi/hapi";
import Joi from "@hapi/joi";
import { QuestionSchema } from "../joi";
import {
  ListQuestionsResponse,
  CreateQuestionResponse,
  UpdateQuestionParams,
  GetQuestionResponse,
  UpdateQuestionResponse,
  Question,
  UserPartial,
  QuestionStatus,
} from "@template/common";
import { QuestionStatusKeys } from "@template/common/index";
import { MOCK_CREATE_QUESTION_RESPONSE } from "../mocks/createQuestion";
import {
  MOCK_STUDENT_UPDATE_QUESTION_RESPONSE,
  MOCK_TA_UPDATE_QUESTION,
} from "../mocks/updateQuestion";
import { MOCK_GET_QUESTION_RESPONSE } from "../mocks/getQuestion";
import { QuestionModel } from "../entity/QuestionModel";
import { UserCourseModel } from "../entity/UserCourseModel";
import { UserModel } from "../entity/UserModel";

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

      const questions = await QuestionModel.find({
        where: [
          {
            queueId: request.params.queue_id,
          },
        ],
        relations: ["creator", "taHelped", "creator.user"],
      });

      if (questions.length === 0) {
        return h.response("no questions were found").code(404);
      }

      return await Promise.all(questions.map(questionModelToQuestion));
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
    handler: async (
      request
    ): Promise<CreateQuestionResponse | ResponseObject> => {
      // TODO: Add request validations
      return MOCK_CREATE_QUESTION_RESPONSE;
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
    handler: async (request): Promise<GetQuestionResponse | ResponseObject> => {
      return MOCK_GET_QUESTION_RESPONSE;
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
      request
    ): Promise<UpdateQuestionResponse | ResponseObject> => {
      const { text, questionType } = request.payload as UpdateQuestionParams; // Question: Do we want to take in the whole question as a param?
      // TODO: Check that the question_id belongs to the user or a TA that is currently helping with the given queue_id
      // TODO: Use user type to dertermine wether or not we should include the text in the response
      if (text || questionType) {
        // If student called the api
        return MOCK_STUDENT_UPDATE_QUESTION_RESPONSE;
      } else {
        return MOCK_TA_UPDATE_QUESTION;
      }
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
];

// for some reason, JOI.allow(null) means the property has to exist, but can be null

async function questionModelToQuestion(qm: QuestionModel): Promise<Question> {
  return {
    creator: await userModelToUserPartial(await (await qm.creator).user),
    id: qm.id,
    createdAt: qm.createdAt,
    status: parseStatus(qm.status),
    text: qm.text,
    // qm.taHelped: types says is nonnullable, but it is nullable
    taHelped:
      (await qm.taHelped) &&
      (await userCourseModelToUserPartial(await qm.taHelped)),
    closedAt: qm.closedAt,
    questionType: qm.questionType,
    // TODO: helpedAt: property not required in types, but required by JOI
    helpedAt: qm.helpedAt,
  };
}

async function userModelToUserPartial(um: UserModel): Promise<UserPartial> {
  return {
    id: um.id,
    name: um.name,
    // TODO: photoURL: property not required in types, but required by JOI
    photoURL: um.photoURL,
  };
}

async function userCourseModelToUserPartial(
  ucm: UserCourseModel
): Promise<UserPartial> {
  return {
    id: (await ucm.user).id,
    name: (await ucm.user).name,
    // TODO: photoURL: property not required in types, but required by JOI
    photoURL: (await ucm.user).photoURL,
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
