import {
  CreateQuestionParams,
  CreateQuestionResponse,
  GetCourseQueuesResponse,
  GetCourseResponse,
  GetProfileResponse,
  GetQuestionResponse,
  ListQuestionsResponse,
  NotifBody,
  QueuePartial,
  TAUpdateStatusResponse,
  UpdateQuestionParams,
  UpdateQuestionResponse,
} from "@template/common";
import Axios, { AxiosInstance } from "axios";

class APIClient {
  private axios: AxiosInstance;
  profile = {
    index: async (): Promise<GetProfileResponse> => {
      return (await this.axios.get(`/api/v1/profile`)).data;
    },
  };
  course = {
    get: async (courseId: number): Promise<GetCourseResponse> => {
      const course = (
        await this.axios.get(`/api/v1/courses/${courseId}/schedule`)
      ).data;
      course.officeHours.forEach((officeHour: any) =>
        parseOfficeHourDates(officeHour)
      );
      return course;
    },
    queues: async (courseId: number): Promise<GetCourseQueuesResponse> => {
      const queues = (
        await this.axios.get(`/api/v1/courses/${courseId}/queues`)
      ).data;
      queues.forEach((q: QueuePartial) => parseQueueDates(q));
      return queues;
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
  queues = {
    updateNotes: async (queueId: number, notes: string) => {
      await this.axios.patch(`/api/v1/queues/${queueId}`, { notes });
    },
  };
  notif = {
    notify_user: async (userId: number): Promise<void> => {
      await this.axios.post(`/api/v1/notifications/notify_user/${userId}`);
    },
    credentials: async (): Promise<string> => {
      return this.axios.get("/api/v1/notifications/credentials");
    },
    register: async (userId: number, payload: NotifBody): Promise<string> => {
      return this.axios.post(
        `/api/v1/notifications/register/${userId}`,
        payload
      );
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
