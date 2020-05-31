import { ServerRoute, ResponseObject } from "@hapi/hapi";
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

export const queueRoutes: ServerRoute[] = [
  {
    method: "GET",
    path: "/v1/queues/{queue_id}/questions",
    handler: async (
      request,
      h
    ): Promise<ListQuestionsResponse | ResponseObject> => {
      // todo: use JOI for validation with url params?
      // todo: need a way to return different data, if TA vs. student hits endpoint.

      // for now, just return the student response
      const queue_id = request.params["queue_id"];
      if (queue_id === "169") return MOCK_STUDENT_LIST_QUESTIONS_RESPONSE;
      else return h.response("unknown course").code(404);
    },
  },
  {
    method: "POST",
    path: "/v1/queues/{queue_id}/questions",
    handler: async (
      request,
      h
    ): Promise<CreateQuestionResponse | ResponseObject> => {
      const { text, questionType } = request.payload as CreateQuestionParams;
      // TODO: Add request validations
      return MOCK_CREATE_QUESTION_RESPONSE;
    },
  },
  {
    method: "GET",
    path: "/v1/queues/{queue_id}/questions/{question_id}",
    handler: async (
      request,
      h
    ): Promise<GetQuestionResponse | ResponseObject> => {
      const queue_id = request.params["queue_id"];
      const question_id = request.params["question_id"];
      if (queue_id === "169") {
        if (question_id === "1") return MOCK_GET_QUESTION_RESPONSE;
        else return h.response("unknown question number").code(404);
      } else return h.response("unknown queue number").code(404);
    },
  },
  {
    method: "PATCH",
    path: "/v1/queues/{queue_id}/questions/{question_id}",
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
  },
];
