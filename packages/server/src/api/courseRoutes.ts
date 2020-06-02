import { ServerRoute, ResponseObject } from "@hapi/hapi";
import Joi from "@hapi/joi";
import { CourseSchema, QueueSchema } from "../joi";
import {
  TAUpdateStatusParams,
  TAUpdateStatusResponse,
  GetCourseResponse,
} from "@template/common";
import { MOCK_GET_COURSE_RESPONSE } from "../mocks/getCourse";
import {
  MOCK_TA_UPDATE_STATUS_ARRIVED_RESPONSE,
  MOCK_TA_UPDATE_STATUS_DEPARTED_RESPONSE,
} from "../mocks/taUpdateStatus";

export const courseRoutes: ServerRoute[] = [
  {
    method: "GET",
    path: "/v1/courses/{course_id}",
    handler: async (
      request,
      h
    ): Promise<GetCourseResponse | ResponseObject> => {
      const course_id = request.params["course_id"];
      if (course_id === "169") return MOCK_GET_COURSE_RESPONSE;
      else return h.response("The course did not exist").code(404);
    },
    options: {
      response: {
        schema: CourseSchema.options({ presence: "required" }),
      },
    },
  },
  {
    method: "PATCH",
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
    options: {
      response: {
        schema: QueueSchema.options({ presence: "required" }),
      },
      validate: {
        payload: Joi.object({
          room: Joi.string().required(),
          status: Joi.string().required(),
        }).required(),
      },
    },
  },
];
