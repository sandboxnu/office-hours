import { ResponseObject, ServerRoute } from "@hapi/hapi";
import Joi from "@hapi/joi";
import {
  GetCourseQueuesResponse,
  GetCourseResponse,
  TAUpdateStatusParams,
  TAUpdateStatusResponse,
} from "@template/common";
import { pick } from "lodash";
import { CourseModel } from "../entity/CourseModel";
import { QuestionModel } from "../entity/QuestionModel";
import { QueueModel } from "../entity/QueueModel";
import { CourseQueueSchema, CourseSchema, QueueSchema } from "../joi";
import { MOCK_GET_COURSE_RESPONSE } from "../mocks/getCourse";
import {
  MOCK_TA_UPDATE_STATUS_ARRIVED_RESPONSE,
  MOCK_TA_UPDATE_STATUS_DEPARTED_RESPONSE,
} from "../mocks/taUpdateStatus";

export const courseRoutes: ServerRoute[] = [
  {
    method: "GET",
    path: "/api/v1/courses/{course_id}/schedule",
    handler: async (request, h): Promise<GetCourseResponse> => {
      const course = await CourseModel.findOne(request.params.course_id, {
        relations: ["officeHours"],
      });
      return {
        name: course.name,
        officeHours: course.officeHours.map((e) =>
          pick(e, ["id", "title", "room", "startTime", "endTime"])
        ),
      };
    },
    options: {
      response: {
        schema: CourseSchema.options({ presence: "required" }),
      },
    },
  },
  {
    method: "GET",
    path: "/api/v1/courses/{course_id}/queues",
    handler: async (request, h): Promise<GetCourseQueuesResponse> => {
      const queues = await QueueModel.find({
        // TODO: Add another where clause to get only the open queues
        // Pseudo code: { staffList > 1 || there are currently open office hours }
        where: { course_id: request.params.course_id },
      });

      for (let queue of queues) {
        queue["queueSize"] = await QuestionModel.count({
          where: { queueId: queue.id },
        });
        // TODO: Fill this in with real data
        queue["staffList"] = MOCK_GET_COURSE_RESPONSE.queues[0].staffList;
      }

      return queues.map((queue: any) =>
        pick(queue, ["id", "room", "staffList", "queueSize", "notes"])
      );
    },
    options: {
      response: {
        schema: CourseQueueSchema.options({ presence: "required" }),
      },
    },
  },
  {
    method: "PATCH",
    path: "/api/v1/courses/{course_id}/ta/change_status",
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
