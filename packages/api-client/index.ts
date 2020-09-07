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

// Return type of array item, if T is an array
type ItemIfArray<T> = T extends (infer I)[] ? I : T;

class APIClient {
  private axios: AxiosInstance;

  /**
   * Send HTTP and return data, optionally serialized with class-transformer (helpful for Date serialization)
   * @param method HTTP method
   * @param url URL to send req to
   * @param responseClass Class with class-transformer decorators to serialize response to
   * @param body body to send with req
   */
  private async req<T>(
    method: Method,
    url: string,
    responseClass?: ClassType<ItemIfArray<T>>,
    body?: any
  ): Promise<T>;
  private async req<T>(
    method: Method,
    url: string,
    responseClass?: ClassType<T>,
    body?: any
  ): Promise<T> {
    const res = (await this.axios.request({ method, url, data: body })).data;
    return responseClass ? plainToClass(responseClass, res) : res;
  }

  profile = {
    index: async (): Promise<GetProfileResponse> =>
      this.req("GET", `/api/v1/profile`),
    patch: async (body: UpdateProfileParams): Promise<GetProfileResponse> =>
      this.req("PATCH", `/api/v1/profile`, undefined, body),
  };
  course = {
    get: async (courseId: number) =>
      this.req("GET", `/api/v1/courses/${courseId}`, GetCourseResponse),
  };
  taStatus = {
    checkIn: async (
      courseId: number,
      room: string
    ): Promise<TAUpdateStatusResponse> =>
      this.req("POST", `/api/v1/courses/${courseId}/ta_location/${room}`),
    checkOut: async (courseId: number, room: string): Promise<void> =>
      this.req("DELETE", `/api/v1/courses/${courseId}/ta_location/${room}`),
  };
  questions = {
    index: async (queueId: number) =>
      this.req<ListQuestionsResponse>(
        "GET",
        `/api/v1/queues/${queueId}/questions`,
        Question
      ),
    create: async (params: CreateQuestionParams) =>
      this.req("POST", `/api/v1/questions`, CreateQuestionResponse, params),
    get: async (questionId: number): Promise<GetQuestionResponse> =>
      this.req("GET", `/api/v1/questions/${questionId}`, GetQuestionResponse),
    update: async (questionId: number, params: UpdateQuestionParams) =>
      this.req(
        "PATCH",
        `/api/v1/questions/${questionId}`,
        UpdateQuestionResponse,
        params
      ),
    notify: async (questionId: number): Promise<void> =>
      this.req("PATCH", `/api/v1/questions/${questionId}/notify`),
  };
  queues = {
    get: async (queueId: number): Promise<GetQueueResponse> =>
      this.req("GET", `/api/v1/queues/${queueId}`, GetQueueResponse),
    update: async (queueId: number, params: UpdateQueueParams) =>
      this.req(
        "PATCH",
        `/api/v1/queues/${queueId}`,
        UpdateQuestionResponse,
        params
      ),
  };
  notif = {
    desktop: {
      credentials: async (): Promise<string> =>
        this.req("GET", "/api/v1/notifications/desktop/credentials"),
      register: async (payload: DesktopNotifBody): Promise<string> =>
        this.req(
          "POST",
          `/api/v1/notifications/desktop/register`,
          undefined,
          payload
        ),
    },
    phone: {
      register: async (payload: PhoneNotifBody): Promise<string> =>
        this.req(
          "POST",
          `/api/v1/notifications/phone/register`,
          undefined,
          payload
        ),
    },
  };
  seeds = {
    delete: async () => this.req("GET", `/api/v1/seeds/delete`),
    create: async () => this.req("GET", `/api/v1/seeds/create`),
    fillQueue: async () => this.req("GET", `/api/v1/seeds/fillQueue`),
  };
  constructor(baseURL = "") {
    this.axios = Axios.create({ baseURL: baseURL });
  }
}

export const API = new APIClient(process.env.NEXT_PUBLIC_API_URL);
