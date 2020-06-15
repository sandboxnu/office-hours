import { ClubModel } from "../entity/ClubModel";
import {
  GetClubResponse,
  CreateClubParams,
  CreateClubResponse,
  WSMessageType,
} from "@template/common";
import { ServerRoute } from "@hapi/hapi";
import Joi from "@hapi/joi";
import websocketManager from "../websocketManager";

export const clubRoutes: ServerRoute[] = [
  {
    method: "GET",
    path: "/api/club",
    handler: async (request, h): Promise<GetClubResponse> => {
      return ClubModel.find();
    },
  },
  {
    method: "POST",
    path: "/api/club",
    handler: async (request, h): Promise<CreateClubResponse> => {
      const { name, rating } = request.payload as CreateClubParams;
      websocketManager.emitAll(WSMessageType.Refresh, null);
      return ClubModel.create({ name, rating }).save();
    },
    options: {
      validate: {
        payload: Joi.object({
          name: Joi.string().required(),
          rating: Joi.number().required(),
        }).required(),
      },
    },
  },
];
