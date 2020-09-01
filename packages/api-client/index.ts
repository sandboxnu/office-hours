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
  TAUpdateStatusResponse,
  UpdateProfileParams,
  UpdateQuestionParams,
  UpdateQuestionResponse,
  UpdateQueueParams,
  Question,
} from "@template/common";
import Axios, { AxiosInstance, Method } from "axios";
import { plainToClass } from "class-transformer";
import { ClassType } from "class-transformer/ClassTransformer";

class APIClient {
  private axios: AxiosInstance;

  async endpoint<B, T>(
    method: Method,
    url: string,
    responseClass: ClassType<T>,
    isArray?: false,
    body?: B
  ): Promise<T>;
  async endpoint<B, T>(
    method: Method,
    url: string,
    responseClass: ClassType<T>,
    isArray?: true,
    body?: B
  ): Promise<T[]>;
  async endpoint<B, T>(
    method: Method,
    url: string,
    responseClass: ClassType<T>,
    isArray = false,
    body?: B
  ): Promise<T> {
    const res = (await this.axios.request({ method, url, data: body })).data;
    return plainToClass(responseClass, res);
  }

  // endpoint<P extends (...a: any[]) => any, S extends ResponseType, ResponseType, B>(
  //   method: Method,
  //   serializeClass: ClassType<S>,
  //   makePath: P,
  // ): (body: B, ...params: Parameters<P>) => Promise<ResponseType> {
  //   return async (body: B, ...params: Parameters<P>): Promise<ResponseType> => {
  //     const res = (await this.axios.request({ method, url: makePath(...params), data: body })).data;
  //     return plainToClass(serializeClass, res);
  //   };
  // }

  profile = {
    index: async (): Promise<GetProfileResponse> =>
      (await this.axios.get(`/api/v1/profile`)).data,
    patch: async (body: UpdateProfileParams): Promise<GetProfileResponse> =>
      (await this.axios.patch(`/api/v1/profile`, body)).data,
  };
  course = {
    get: async (courseId: number): Promise<GetCourseResponse> =>
      this.endpoint("GET", `/api/v1/courses/${courseId}`, GetCourseResponse),
  };
  taStatus = {
    checkIn: async (
      courseId: number,
      room: string
    ): Promise<TAUpdateStatusResponse> =>{
      return (await this.axios.post(`/api/v1/courses/${courseId}/ta_location/${room}`))
        .data;
    },
    checkOut: async (courseId: number, room: string): Promise<void> =>
      await this.axios.delete(
        `/api/v1/courses/${courseId}/ta_location/${room}`
      ),
  };
  questions = {
    index: async (queueId: number): Promise<ListQuestionsResponse> =>
      this.endpoint(
        "GET",
        `/api/v1/queues/${queueId}/questions`,
        Question,
        true
      ),
    create: async (
      params: CreateQuestionParams
    ): Promise<CreateQuestionResponse> =>
      this.endpoint(
        "POST",
        `/api/v1/questions`,
        CreateQuestionResponse,
        false,
        params
      ),
    get: async (questionId: number): Promise<GetQuestionResponse> =>
      (await this.axios.get(`/api/v1/questions/${questionId}`)).data,
    update: async (
      questionId: number,
      params: UpdateQuestionParams
    ): Promise<UpdateQuestionResponse> =>
      this.endpoint(
        "PATCH",
        `/api/v1/questions/${questionId}`,
        UpdateQuestionResponse,
        false,
        params
      ),
    notify: async (questionId: number): Promise<void> =>
      await this.axios.post(`/api/v1/questions/${questionId}/notify`),
  };
  queues = {
    get: async (queueId: number): Promise<GetQueueResponse> =>
      this.endpoint("GET", `/api/v1/queues/${queueId}`, GetQueueResponse),
    update: async (queueId: number, params: UpdateQueueParams) =>
      (await this.axios.patch(`/api/v1/queues/${queueId}`, params)).data,
  };
  notif = {
    desktop: {
      credentials: async (): Promise<string> => {
        return (
          await this.axios.get("/api/v1/notifications/desktop/credentials")
        ).data;
      },
      register: async (payload: DesktopNotifBody): Promise<string> =>
        (
          await this.axios.post(
            `/api/v1/notifications/desktop/register`,
            payload
          )
        ).data,
    },
    phone: {
      register: async (payload: PhoneNotifBody): Promise<string> =>
        (await this.axios.post(`/api/v1/notifications/phone/register`, payload))
          .data,
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

export const API = new APIClient(process.env.NEXT_PUBLIC_API_URL);
