import { ServerRoute, ResponseObject } from "@hapi/hapi";
import Joi from "@hapi/joi";
import { CourseSchema, QueueSchema, QuestionSchema } from "../joi";
import {
  ListQuestionsResponse,
  CreateQuestionParams,
  CreateQuestionResponse,
  UpdateQuestionParams,
  GetQuestionResponse,
  UpdateQuestionResponse,
} from "@template/common";
import { MOCK_CREATE_QUESTION_RESPONSE } from "../mocks/createQuestion";
import {
  MOCK_STUDENT_UPDATE_QUESTION_RESPONSE,
  MOCK_TA_UPDATE_QUESTION,
} from "../mocks/updateQuestion";
import { MOCK_STUDENT_LIST_QUESTIONS_RESPONSE } from "../mocks/listQuestions";
import { MOCK_GET_QUESTION_RESPONSE } from "../mocks/getQuestion";
import { QueueModel } from "../entity/QueueModecl";
import { QuestionModel } from "../entity/QuestionModel";
import { pick } from "lodash";
import { getRepository } from "typeorm";

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

      return await Promise.all(
        questions.map(async (qm) => {
          const result = pick(qm, [
            "creator",
            "id",
            "createdAt",
            "status",
            "name",
            "text",
            "taHelped",
            "helpedAt",
            "closedAt",
            "questionType",
          ]);
          result.taHelped = await result.taHelped;
          result.creator = pick(await (await result.creator).user, [
            "id",
            "name",
            "photoURL",
          ]);
          return result;
        })
      );
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
      request,
      h
    ): Promise<CreateQuestionResponse | ResponseObject> => {
      const { text, questionType } = request.payload as CreateQuestionParams;
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
    handler: async (
      request,
      h
    ): Promise<GetQuestionResponse | ResponseObject> => {
      const queue_id = request.params["queue_id"];
      const question_id = request.params["question_id"];
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
      request,
      h
    ): Promise<UpdateQuestionResponse | ResponseObject> => {
      const {
        text,
        questionType,
        status,
      } = request.payload as UpdateQuestionParams; // Question: Do we want to take in the whole question as a param?
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
