import { ServerRoute } from "@hapi/hapi";
import { UserSchema } from "../joi";
import { GetProfileResponse } from "@template/common";
import { pick } from "lodash";
import { User } from "../../../nest-server/src/profile/user.entity";

export const profileRoutes: ServerRoute[] = [
  {
    method: "GET",
    path: "/api/v1/profile",
    handler: async (request, h): Promise<GetProfileResponse> => {
      // TODO: Change this to return the specific profile of the user making the request
      let user = await User.findOne(1, {
        relations: ["courses", "courses.course"],
      });
      const courses = user.courses.map((userCourse) => {
        return {
          course: {
            id: userCourse.courseId,
            name: userCourse.course.name,
          },
          role: userCourse.role,
        };
      });
      const userResponse = pick(user, [
        "id",
        "email",
        "name",
        "photoURL",
        "courses",
      ]);
      return { ...userResponse, courses };
    },
    options: {
      response: {
        schema: UserSchema.options({ presence: "required" }),
      },
    },
  },
];
