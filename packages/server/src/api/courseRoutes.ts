import { CourseModel } from "../entity/CourseModel";
import { GetCourseResponse } from "@template/common";
import { ServerRoute } from "@hapi/hapi";
import Joi from "@hapi/joi";
import { pick } from "lodash";

export const courseRoutes: ServerRoute[] = [
  {
    method: "GET",
    path: "/api/v1/courses/{course_id}",
    handler: async (request, h): Promise<GetCourseResponse> => {
      const course = await CourseModel.findOne(request.params.course_id, {
        relations: ["officeHours"],
      });
      return {
        name: course.name,
        officeHours: (await course.officeHours).map((e) =>
          pick(e, ["id", "title", "room", "startTime", "endTime"])
        ),
      };
    },
    options: {
      response: {
        schema: Joi.object({
          name: Joi.string(),
          officeHours: Joi.array().items(
            Joi.object({
              id: Joi.number(),
              title: Joi.string(),
              room: Joi.string(),
              startTime: Joi.date(),
              endTime: Joi.date(),
            })
          ),
        }).options({ presence: "required" }),
      },
    },
  },
];
