import {
  CreateQuestionParams,
  CreateQuestionResponse,
  DesktopNotifBody,
  DesktopNotifPartial,
  GetCourseOverridesResponse,
  GetCourseResponse,
  GetProfileResponse,
  GetQuestionResponse,
  GetQueueResponse,
  GetReleaseNotesResponse,
  ListQuestionsResponse,
  TACheckinTimesResponse,
  TACheckoutResponse,
  TAUpdateStatusResponse,
  UpdateCourseOverrideBody,
  UpdateCourseOverrideResponse,
  UpdateProfileParams,
  UpdateQuestionParams,
  UpdateQuestionResponse,
  UpdateQueueParams,
} from "@koh/common";
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
      this.req("GET", `/api/v1/profile`, GetProfileResponse),
    patch: async (body: UpdateProfileParams): Promise<GetProfileResponse> =>
      this.req("PATCH", `/api/v1/profile`, undefined, body),
    deleteProfilePicture: async (): Promise<void> =>
      this.req("DELETE", `/api/v1/profile/delete_profile_picture`),
  };
  course = {
    get: async (courseId: number) =>
      this.req("GET", `/api/v1/courses/${courseId}`, GetCourseResponse),
    updateCalendar: async (courseId: number) =>
      this.req("POST", `/api/v1/courses/${courseId}/update_calendar`),
    getCourseOverrides: async (courseId: number) =>
      this.req(
        "GET",
        `/api/v1/courses/${courseId}/course_override`,
        GetCourseOverridesResponse
      ),
    addOverride: async (
      courseId: number,
      params: UpdateCourseOverrideBody
    ): Promise<UpdateCourseOverrideResponse> =>
      this.req(
        "POST",
        `/api/v1/courses/${courseId}/update_override`,
        UpdateCourseOverrideResponse,
        params
      ),
    deleteOverride: async (
      courseId: number,
      params: UpdateCourseOverrideBody
    ): Promise<void> =>
      this.req(
        "DELETE",
        `/api/v1/courses/${courseId}/update_override`,
        undefined,
        params
      ),
    getTACheckinTimes: async (
      courseId: number,
      startDate: Date,
      endDate: Date
    ): Promise<TACheckinTimesResponse> =>
      this.req(
        "GET",
        `/api/v1/courses/${courseId}/ta_check_in_times`,
        TACheckinTimesResponse,
        { startDate, endDate }
      ),
  };
  taStatus = {
    checkIn: async (
      courseId: number,
      room: string
    ): Promise<TAUpdateStatusResponse> =>
      this.req("POST", `/api/v1/courses/${courseId}/ta_location/${room}`),
    checkOut: async (
      courseId: number,
      room: string
    ): Promise<TACheckoutResponse> =>
      this.req("DELETE", `/api/v1/courses/${courseId}/ta_location/${room}`),
  };
  questions = {
    index: async (queueId: number) =>
      this.req<ListQuestionsResponse>(
        "GET",
        `/api/v1/queues/${queueId}/questions`,
        ListQuestionsResponse
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
      this.req("POST", `/api/v1/questions/${questionId}/notify`),
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
    clean: async (queueId: number): Promise<void> =>
      this.req("POST", `/api/v1/queues/${queueId}/clean`),
  };
  notif = {
    desktop: {
      credentials: async (): Promise<string> =>
        this.req("GET", "/api/v1/notifications/desktop/credentials"),
      register: async (
        payload: DesktopNotifBody
      ): Promise<DesktopNotifPartial> =>
        this.req(
          "POST",
          `/api/v1/notifications/desktop/device`,
          DesktopNotifPartial,
          payload
        ),
      unregister: async (deviceId: number): Promise<string> =>
        this.req(
          "DELETE",
          `/api/v1/notifications/desktop/device/${deviceId}`,
          undefined
        ),
    },
  };
  seeds = {
    delete: async () => this.req("GET", `/api/v1/seeds/delete`),
    create: async () => this.req("GET", `/api/v1/seeds/create`),
    fillQueue: async () => this.req("GET", `/api/v1/seeds/fill_queue`),
  };
  releaseNotes = {
    get: async (): Promise<GetReleaseNotesResponse> =>
      this.req("GET", `/api/v1/release_notes`),
  };
  constructor(baseURL = "") {
    this.axios = Axios.create({ baseURL: baseURL });
  }
}

export const API = new APIClient(process.env.NEXT_PUBLIC_API_URL);
