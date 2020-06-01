import { ServerRoute } from "@hapi/hapi";
import Joi from "@hapi/joi";
import { GetProfileResponse } from "@template/common";
import { MOCK_GET_PROFILE_RESPONSE } from "../mocks/getProfile";

export const profileRoutes: ServerRoute[] = [
  {
    method: "GET",
    path: "/v1/profile",
    handler: async (request, h): Promise<GetProfileResponse> => {
      return MOCK_GET_PROFILE_RESPONSE;
    },
    options: {
      response: {
        schema: Joi.object({
          id: Joi.number(),
          email: Joi.string(),
          name: Joi.string(),
          photoURL: Joi.string(),
          courses: Joi.array().items(
            Joi.object({
              course: Joi.object({
                id: Joi.number(),
                name: Joi.string(),
              }),
              role: Joi.string(),
            })
          ),
        }),
      },
    },
  },
];
