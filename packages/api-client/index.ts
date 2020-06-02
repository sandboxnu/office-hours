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
      return (await this.axios.get(`/api/v1/profile`)).data;
    },
  };
  course = {
    get: async (courseId: number): Promise<GetCourseResponse> => {
      const course = (await this.axios.get(`/api/v1/courses/${courseId}`)).data;
      course.officeHours.forEach((officeHour: any) =>
        parseOfficeHourDates(officeHour)
      );
      return course;
    },
  };
  taStatus = {
    update: async (courseId: number): Promise<TAUpdateStatusResponse> => {
      const queue = (
        await this.axios.patch(`/api/v1/courses/${courseId}/ta/change_status`)
      ).data;
      parseQueueDates(queue);
      queue.questions.forEach((question: any) => parseQuestionDates(question));
      return queue;
    },
  };
  questions = {
    index: async (queueId: number): Promise<ListQuestionsResponse> => {
      const questions = (
        await this.axios.get(`/api/v1/queues/${queueId}/questions`)
      ).data;
      questions.forEach((question: any) => parseQuestionDates(question));
      return questions;
    },
    create: async (
      queueId: number,
      params: CreateQuestionParams
    ): Promise<CreateQuestionResponse> => {
      const question = (
        await this.axios.post(`/api/v1/queues/${queueId}/questions`, params)
      ).data;
      parseQuestionDates(question);
      return question;
    },
    get: async (
      queueId: number,
      questionId: number
    ): Promise<GetQuestionResponse> => {
      return (
        await this.axios.get(
          `/api/v1/queues/${queueId}/questions/${questionId}`
        )
      ).data;
    },
    update: async (
      queueId: number,
      questionId: number,
      params: UpdateQuestionParams
    ): Promise<UpdateQuestionResponse> => {
      const question = (
        await this.axios.patch(
          `/api/v1/queues/${queueId}/questions/${questionId}`,
          params
        )
      ).data;
      parseQuestionDates(question);
      return question;
    },
  };
  constructor(baseURL: string = "") {
    this.axios = Axios.create({ baseURL: baseURL });
  }
}

function parseOfficeHourDates(officeHour: any): void {
  officeHour.startTime = new Date(officeHour.startTime);
  officeHour.endTime = new Date(officeHour.endTime);
}

function parseQueueDates(queue: any): void {
  queue.createdAt = new Date(queue.createdAt);
  queue.closedAt = new Date(queue.closedAt);
}

function parseQuestionDates(question: any): void {
  question.createdAt = new Date(question.createdAt);
  question.helpedAt ? (question.helpedAt = new Date(question.helpedAt)) : null;
  question.closedAt ? (question.closedAt = new Date(question.closedAtt)) : null;
}

export const API = new APIClient(process.env.API_URL);
