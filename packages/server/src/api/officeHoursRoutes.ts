import {
  GetProfileResponse,
  GetCourseResponse,
  TAUpdateStatusParams,
  TAUpdateStatusResponse,
  CreateQuestionParams,
  CreateQuestionResponse,
  UpdateQuestionParams,
} from "@template/common";
import { ServerRoute, ResponseObject } from "@hapi/hapi";
import Joi from "@hapi/joi";

import { MOCK_GET_PROFILE_RESPONSE } from "../mocks/getProfile";
import { MOCK_GET_COURSE_RESPONSE } from "../mocks/getCourse";
import {
  MOCK_TA_UPDATE_STATUS_ARRIVED_RESPONSE,
  MOCK_TA_UPDATE_STATUS_DEPARTED_RESPONSE,
} from "../mocks/taUpdateStatus";
import { MOCK_CREATE_QUESTION_RESPONSE } from "../mocks/createQuestion";
import {
  MOCK_STUDENT_UPDATE_QUESTION_RESPONSE,
  MOCK_TA_UPDATE_QUESTION,
} from "../mocks/updateQuestion";

export const officeHoursRoutes: ServerRoute[] = [
  {
    method: "GET",
    path: "/v1/profile",
    handler: async (request, h): Promise<GetProfileResponse> => {
      return MOCK_GET_PROFILE_RESPONSE;
    },
  },
  {
    method: "GET",
    path: "/v1/courses/{course_id}",
    handler: async (
      request,
      h
    ): Promise<GetCourseResponse | ResponseObject> => {
      if (request.params.course_id === "169") {
        // coures_id 169 = Fundies 1
        return MOCK_GET_COURSE_RESPONSE;
      } else {
        return h.response("The course did not exist").code(404);
      }
    },
  },
  {
    method: "GET",
    path: "/v1/courses/{course_id}/ta/change_status",
    handler: async (
      request,
      h
    ): Promise<TAUpdateStatusResponse | ResponseObject> => {
      // TODO: Check that the TA user is enrolled in the given course_id
      const { room, status } = request.payload as TAUpdateStatusParams;
      if (status === "arrived") {
        return MOCK_TA_UPDATE_STATUS_ARRIVED_RESPONSE;
      } else if (status === "departed") {
        return MOCK_TA_UPDATE_STATUS_DEPARTED_RESPONSE;
      } else {
        return h.response("Bad request").code(404); // This we could probably be more descriptive. We'll want to see what might pass through type checks
      }
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
    method: "PATCH",
    path: "/v1/queues/{queue_id}/questions/{question_id}",
    handler: async (
      request,
      h
    ): Promise<CreateQuestionResponse | ResponseObject> => {
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
