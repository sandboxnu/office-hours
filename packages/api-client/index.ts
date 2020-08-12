import {
  CreateQuestionParams,
  CreateQuestionResponse,
  DesktopNotifBody,
  GetCourseResponse,
  GetProfileResponse,
  GetQuestionResponse,
  GetQueueResponse,
  ListQuestionsResponse,
  PhoneNotifBody,
  QueuePartial,
  TAUpdateStatusResponse,
  UpdateQuestionParams,
  UpdateQuestionResponse,
  UpdateProfileParams,
} from "@template/common";
import Axios, { AxiosInstance } from "axios";

class APIClient {
  private axios: AxiosInstance;
  profile = {
    index: async (): Promise<GetProfileResponse> => {
      return (await this.axios.get(`/api/v1/profile`)).data;
    },
    patch: async (body: UpdateProfileParams): Promise<GetProfileResponse> => {
      return (await this.axios.patch(`/api/v1/profile`, body)).data;
    },
  };
  course = {
    get: async (courseId: number): Promise<GetCourseResponse> => {
      const course = (await this.axios.get(`/api/v1/courses/${courseId}`)).data;
      course.officeHours.forEach((officeHour: any) =>
        parseOfficeHourDates(officeHour)
      );
      course.queues.forEach((queue: any) => parseQueueDates(queue));
      return course;
    },
  };
  taStatus = {
    checkIn: async (
      courseId: number,
      room: string
    ): Promise<TAUpdateStatusResponse> => {
      const queue = (
        await this.axios.post(`/api/v1/courses/${courseId}/ta_location/${room}`)
      ).data;
      return queue;
    },
    checkOut: async (courseId: number, room: string): Promise<void> => {
      await this.axios.delete(
        `/api/v1/courses/${courseId}/ta_location/${room}`
      );
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
      params: CreateQuestionParams
    ): Promise<CreateQuestionResponse> => {
      const question = (await this.axios.post(`/api/v1/questions`, params))
        .data;
      parseQuestionDates(question);
      return question;
    },
    get: async (questionId: number): Promise<GetQuestionResponse> => {
      return (await this.axios.get(`/api/v1/questions/${questionId}`)).data;
    },
    update: async (
      questionId: number,
      params: UpdateQuestionParams
    ): Promise<UpdateQuestionResponse> => {
      const question = (
        await this.axios.patch(`/api/v1/questions/${questionId}`, params)
      ).data;
      parseQuestionDates(question);
      return question;
    },
    notify: async (questionId: number): Promise<void> => {
      await this.axios.post(`/api/v1/questions/${questionId}/notify`);
    },
  };
  queues = {
    get: async (queueId: number): Promise<GetQueueResponse> => {
      const queue = (await this.axios.get(`/api/v1/queues/${queueId}`)).data;
      parseQueueDates(queue);
      return queue;
    },
    updateNotes: async (queueId: number, notes: string) => {
      await this.axios.patch(`/api/v1/queues/${queueId}`, { notes });
    },
  };
  notif = {
    desktop: {
      credentials: async (): Promise<string> => {
        return (
          await this.axios.get("/api/v1/notifications/desktop/credentials")
        ).data;
      },
      register: async (payload: DesktopNotifBody): Promise<string> => {
        return this.axios.post(
          `/api/v1/notifications/desktop/register`,
          payload
        );
      },
    },
    phone: {
      register: async (payload: PhoneNotifBody): Promise<string> => {
        return this.axios.post(`/api/v1/notifications/phone/register`, payload);
      },
    },
  };
  seeds = {
    delete: async () => this.axios.get(`/api/v1/seeds/delete`),
    create: async () => this.axios.get(`/api/v1/seeds/create`),
    fillQueue: async () => this.axios.get(`/api/v1/seeds/fillQueue`),
  };
  constructor(baseURL = "") {
    this.axios = Axios.create({ baseURL: baseURL });
  }
}

function parseOfficeHourDates(officeHour: any): void {
  officeHour.startTime = new Date(officeHour.startTime);
  officeHour.endTime = new Date(officeHour.endTime);
}

function parseQueueDates(queue: any): void {
  if (queue.startTime && queue.endTime) {
    queue.startTime = new Date(queue.startTime);
    queue.endTime = new Date(queue.endTime);
  }
}

function parseQuestionDates(question: any): void {
  question.createdAt = new Date(question.createdAt);
  question.helpedAt ? (question.helpedAt = new Date(question.helpedAt)) : null;
  question.closedAt ? (question.closedAt = new Date(question.closedAtt)) : null;
}

export const API = new APIClient(process.env.NEXT_PUBLIC_API_URL);
