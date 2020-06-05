import { ServerRoute, ResponseObject } from "@hapi/hapi";
import Joi from "@hapi/joi";
import { CourseSchema, QueueSchema } from "../joi";
import { CourseModel } from "../entity/CourseModel";
import { pick } from "lodash";
import {
  TAUpdateStatusParams,
  TAUpdateStatusResponse,
  GetCourseResponse,
  GetCourseQueuesResponse,
  OpenQuestionStatus,
} from "@template/common";
import {
  MOCK_TA_UPDATE_STATUS_ARRIVED_RESPONSE,
  MOCK_TA_UPDATE_STATUS_DEPARTED_RESPONSE,
} from "../mocks/taUpdateStatus";
import { MOCK_GET_COURSE_RESPONSE } from "../mocks/getCourse";

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
        officeHours: (await course.officeHours).map((e) =>
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
      const queuesResponse = { ...MOCK_GET_COURSE_RESPONSE.queues };
      queuesResponse.forEach(
        (queue) =>
          (queue["queueSize"] = queue.questions.filter((question) =>
            Object.values(OpenQuestionStatus).includes(question.status)
          ).length)
      );
      return queuesResponse.map((queue) =>
        pick(queue, [
          "id",
          "room",
          "createAt",
          "closedAt",
          "staffList",
          "queueSize",
        ])
      );
    },
    options: {
      response: {
        schema: CourseSchema.options({ presence: "required" }),
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
