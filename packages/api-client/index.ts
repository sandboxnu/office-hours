import Axios, { AxiosInstance } from "axios";
import {
  GetClubResponse,
  CreateClubParams,
  CreateClubResponse,
  GetCourseResponse,
} from "@template/common";

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
      data.officeHours.forEach((e: any) => {
        e.startTime = new Date(e.startTime);
        e.endTime = new Date(e.endTime);
      });
      throw Error();
      return data;
    },
  };

  constructor(baseURL: string = "") {
    this.axios = Axios.create({ baseURL: baseURL });
  }
}

export const API = new APIClient(process.env.API_URL);
