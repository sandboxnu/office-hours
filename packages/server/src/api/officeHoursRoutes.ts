const PROFILE = require("../mocks/profile.json");
const COURSE = require("../mocks/course.json");
import {
  User,
  Course,
  // CreateClubResponse,
  // WSMessageType,
} from "@template/common";

import { ServerRoute } from "@hapi/hapi";
import Joi from "@hapi/joi";

// import websocketManager from "../websocketManager";

export const officeHoursRoutes: ServerRoute[] = [
  {
    method: "GET",
    path: "/v1/profile",
    handler: async (request, h): Promise<User> => {
      return PROFILE;
    },
  },
  {
    method: "GET",
    path: "/v1/courses/{course_id}",
    handler: async (request, h): Promise<Course | string> => {
      if (request.params.course_id === "169") {
        return COURSE;
      } else {
        // todo: we should fix this later
        return h.response("The course did not exist").code(404) as any;
      }
    },
  },
];
