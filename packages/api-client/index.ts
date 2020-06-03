import Axios, { AxiosInstance } from "axios";
import {
  GetClubResponse,
  CreateClubParams,
  CreateClubResponse,
} from "@template/common";
import { GetCourseResponse } from "../common";

class APIClient {
  private axios: AxiosInstance;
  club = {
    index: async (): Promise<GetClubResponse> => {
      return (await this.axios.get("/api/club")).data;
    },
    create: async (p: CreateClubParams): Promise<CreateClubResponse> => {
      return (await this.axios.post("/api/club", p)).data;
    },
  };

  course = {
    get: async (courseId: number): Promise<GetCourseResponse> => {
      const data = (await this.axios.get(`/api/v1/courses/${courseId}`)).data;
      data.officeHours.forEach((officeHour: any) => {
        officeHour.startTime = new Date(officeHour.startTime);
        officeHour.endTime = new Date(officeHour.endTime);
      });
      return data;
    },
  };

  constructor(baseURL: string = "") {
    this.axios = Axios.create({ baseURL: baseURL });
  }
}

export const API = new APIClient(process.env.API_URL);
