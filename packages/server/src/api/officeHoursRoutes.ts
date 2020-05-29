import { User, Course } from "@template/common";
import { ServerRoute } from "@hapi/hapi";
import Joi from "@hapi/joi";

import { MOCK_GET_PROFILE_RESPONSE } from "../mocks/getProfile";
import { MOCK_GET_COURSE_RESPONSE } from "../mocks/getCourse";

export const officeHoursRoutes: ServerRoute[] = [
  {
    method: "GET",
    path: "/v1/profile",
    handler: async (request, h): Promise<User> => {
      return MOCK_GET_PROFILE_RESPONSE;
    },
  },
  {
    method: "GET",
    path: "/v1/courses/{course_id}",
    handler: async (request, h): Promise<Course | string> => {
      if (request.params.course_id === "169") {
        return MOCK_GET_COURSE_RESPONSE;
      } else {
        // todo: we should fix this later
        return h.response("The course did not exist").code(404) as any;
      }
    },
  },
];
