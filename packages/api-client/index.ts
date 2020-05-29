import Axios, { AxiosInstance } from "axios";
import {
  GetClubResponse,
  CreateClubParams,
  CreateClubResponse,
  GetProfileResponse,
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
  profile = {
    index: async (): Promise<GetProfileResponse> => {
      return (await this.axios.get(`/v1/profile`)).data;
    },
  };
  course = {
    index: async (courseId: number): Promise<GetCourseResponse> => {
      return (await this.axios.get(`/v1/courses/${courseId}`)).data;
    },
  };
  constructor(baseURL: string = "") {
    this.axios = Axios.create({ baseURL: baseURL });
  }
}

export const API = new APIClient(process.env.API_URL);
