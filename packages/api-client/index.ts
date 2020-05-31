import Axios, { AxiosInstance } from "axios";
import {
  GetClubResponse,
  CreateClubParams,
  CreateClubResponse,
  GetProfileResponse,
  GetCourseResponse,
  TAUpdateStatusResponse,
  GetQuestionResponse,
  CreateQuestionResponse,
  CreateQuestionParams,
  UpdateQuestionParams,
  ListQuestionsResponse,
  UpdateQuestionResponse,
} from "@template/common";

class APIClient {
  private axios: AxiosInstance;
  club = {
    index: async (): Promise<GetClubResponse> => {
      return (await this.axios.get("/api/club")).data;
    },
    create: async (params: CreateClubParams): Promise<CreateClubResponse> => {
      return (await this.axios.post("/api/club", params)).data;
    },
  };
  profile = {
    index: async (): Promise<GetProfileResponse> => {
      return (await this.axios.get(`/v1/profile`)).data;
    },
  };
  course = {
    get: async (courseId: number): Promise<GetCourseResponse> => {
      return (await this.axios.get(`/v1/courses/${courseId}`)).data;
    },
  };
  taStatus = {
    update: async (courseId: number): Promise<TAUpdateStatusResponse> => {
      return (
        await this.axios.patch(`/v1/courses/${courseId}/ta/change_status`)
      ).data;
    },
  };
  questions = {
    index: async (queueId: number): Promise<ListQuestionsResponse> => {
      return (await this.axios.get(`/v1/queues/${queueId}/questions`)).data;
    },
    create: async (
      queueId: number,
      params: CreateQuestionParams
    ): Promise<CreateQuestionResponse> => {
      return (await this.axios.post(`/v1/queues/${queueId}/questions`, params))
        .data;
    },
    get: async (
      queueId: number,
      questionId: number
    ): Promise<GetQuestionResponse> => {
      return (
        await this.axios.get(`/v1/queues/${queueId}/questions/${questionId}`)
      ).data;
    },
    update: async (
      queueId: number,
      questionId: number,
      params: UpdateQuestionParams
    ): Promise<UpdateQuestionResponse> => {
      return (
        await this.axios.patch(
          `/v1/queues/${queueId}/questions/${questionId}`,
          params
        )
      ).data;
    },
  };
  constructor(baseURL: string = "") {
    this.axios = Axios.create({ baseURL: baseURL });
  }
}

export const API = new APIClient(process.env.API_URL);
