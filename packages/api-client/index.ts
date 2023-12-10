import {
  CreateAlertParams,
  CreateAlertResponse,
  CreateQuestionParams,
  CreateQuestionResponse,
  InsightParamsType,
  DesktopNotifBody,
  DesktopNotifPartial,
  GetAlertsResponse,
  GetCourseOverridesResponse,
  GetCourseResponse,
  GetInsightOutputResponse,
  GetProfileResponse,
  GetQuestionResponse,
  GetQueueResponse,
  GetReleaseNotesResponse,
  GroupQuestionsParams,
  GetSelfEnrollResponse,
  ListInsightsResponse,
  ListQuestionsResponse,
  RegisterCourseParams,
  EditCourseInfoParams,
  SemesterPartial,
  TACheckinTimesResponse,
  TACheckoutResponse,
  TAUpdateStatusResponse,
  UpdateCourseOverrideBody,
  UpdateCourseOverrideResponse,
  UpdateProfileParams,
  UpdateQuestionParams,
  UpdateQuestionResponse,
  UpdateQueueParams,
  QueuePartial,
  Role,
  GetCourseUserInfoResponse,
  questions,
  CreateAsyncQuestions,
  AsyncQuestionResponse,
  UpdateAsyncQuestions,
  AsyncQuestion,
  CoursePartial,
  Calendar,
  ChatbotQuestion,
  ChatBotQuestionParams,
  Interaction,
  OrganizationResponse
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
    body?: any,
    params?: any
  ): Promise<T>;

  private async req<T>(
    method: Method,
    url: string,
    responseClass?: ClassType<T>,
    body?: any,
    params?: any
  ): Promise<T> {
    const res = (await this.axios.request({ method, url, data: body, params }))
      .data;
    return responseClass ? plainToClass(responseClass, res) : res;
  }

  auth = {
    loginWithGoogle: async (
      organizationId: number
    ): Promise<{ redirectUri: string }> =>
      this.req("GET", `/api/v1/auth/link/google/${organizationId}`, undefined),
    loginWithInstitution: async (
      organizationId: number
    ): Promise<{ redirectUri: string }> =>
      this.req("GET", `/api/v1/auth/link/saml/${organizationId}`, undefined)
  };
  profile = {
    index: async (): Promise<GetProfileResponse> =>
      this.req("GET", `/api/v1/profile`, GetProfileResponse),
    patch: async (body?: UpdateProfileParams): Promise<GetProfileResponse> =>
      this.req("PATCH", `/api/v1/profile`, undefined, body),
    deleteProfilePicture: async (): Promise<void> =>
      this.req("DELETE", `/api/v1/profile/delete_profile_picture`),
    getAllStudents: async (courseId: number): Promise<any> =>
      this.req("GET", `/api/v1/profile/${courseId}/id`, undefined),
    getStudent: async (sid: number): Promise<any> =>
      this.req("GET", `/api/v1/profile/${sid}/student`, undefined),
    inQueue: async (sid: number): Promise<boolean> =>
      this.req("GET", `/api/v1/profile/${sid}/inQueue`, undefined),
    updatePassword: async (password: string, token: string): Promise<void> =>
      this.req(
        "PATCH",
        `/api/v1/profile/${password}/update_password?token=${token}`,
        undefined
      ),
    verifyResetPassword: async (token: string): Promise<boolean> =>
      this.req("GET", `/api/v1/profile/verify_token?token=${token}`, undefined)
  };
  chatbot = {
    createInteraction: async (body: {
      courseId: number;
      userId: number;
    }): Promise<Interaction> =>
      this.req("POST", `/api/v1/chatbot/interaction`, undefined, body),

    createQuestion: async (
      body: ChatBotQuestionParams
    ): Promise<ChatbotQuestion> =>
      this.req("POST", `/api/v1/chatbot/question`, undefined, body),

    editQuestion: async (body: {
      data: ChatBotQuestionParams;
      questionId: number;
    }): Promise<ChatbotQuestion> =>
      this.req("PATCH", `/api/v1/chatbot/question`, undefined, body),

    deleteQuestion: async (
      body: ChatBotQuestionParams
    ): Promise<ChatbotQuestion> =>
      this.req("DELETE", `/api/v1/chatbot/question`, undefined, body)
  };

  course = {
    addStudent: async (courseId: number, sid: number): Promise<void> =>
      this.req(
        "POST",
        `/api/v1/courses/${courseId}/add_student/${sid}`,
        undefined
      ),
    getAsyncQuestions: async (cid: number) =>
      this.req(
        "GET",
        `/api/v1/courses/${cid}/questions`,
        AsyncQuestionResponse
      ),
    getAllCourses: async (): Promise<CoursePartial[]> =>
      this.req("GET", `/api/v1/courses`),
    get: async (courseId: number) =>
      this.req("GET", `/api/v1/courses/${courseId}`, GetCourseResponse),
    getUserInfo: async (
      courseId: number,
      page: number,
      role?: Role,
      search?: string
    ): Promise<GetCourseUserInfoResponse> =>
      this.req(
        "GET",
        `/api/v1/courses/${courseId}/get_user_info/${page}/${role}${
          search ? `?search=${search}` : ""
        }`
      ),
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
    withdrawCourse: async (courseId: number): Promise<void> =>
      this.req(
        "DELETE",
        `/api/v1/courses/${courseId}/withdraw_course`,
        undefined
      ),
    registerCourses: async (params: RegisterCourseParams[]): Promise<void> =>
      this.req("POST", `/api/v1/courses/register_courses`, undefined, params),
    editCourseInfo: async (
      courseId: number,
      params: EditCourseInfoParams
    ): Promise<void> =>
      this.req(
        "PATCH",
        `/api/v1/courses/${courseId}/edit_course`,
        undefined,
        params
      ),
    getTACheckinTimes: async (
      courseId: number,
      startDate: string,
      endDate: string
    ): Promise<TACheckinTimesResponse> =>
      this.req(
        "GET",
        `/api/v1/courses/${courseId}/ta_check_in_times`,
        TACheckinTimesResponse,
        {},
        { startDate, endDate }
      ),
    toggleSelfEnroll: async (courseId: number): Promise<void> =>
      this.req("POST", `/api/v1/courses/${courseId}/self_enroll`),
    selfEnrollCourses: async (): Promise<GetSelfEnrollResponse> =>
      this.req("GET", "/api/v1/self_enroll_courses"),
    createSelfEnrollOverride: async (courseId: number): Promise<void> =>
      this.req("POST", `/api/v1/create_self_enroll_override/${courseId}`)
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
    makeQueue: async (
      courseId: number,
      room: string,
      isProfessorQueue: boolean,
      notes: string
    ): Promise<TAUpdateStatusResponse> =>
      this.req(
        "POST",
        `/api/v1/courses/${courseId}/generate_queue/${room}`,
        QueuePartial,
        { notes, isProfessorQueue }
      )
  };
  asyncQuestions = {
    create: async (body: CreateAsyncQuestions, cid: number) =>
      this.req("POST", `/api/v1/asyncQuestions/${cid}`, AsyncQuestion, body),
    update: async (qid: number, body: UpdateAsyncQuestions) =>
      this.req("PATCH", `/api/v1/asyncQuestions/${qid}`, AsyncQuestion, body)
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
    TAcreate: async (params: CreateQuestionParams, userId: number) =>
      this.req(
        "POST",
        `/api/v1/questions/TAcreate/${userId}`,
        CreateQuestionResponse,
        params
      ),
    getAllQuestions: async (cid: number): Promise<questions[]> =>
      this.req("GET", `/api/v1/questions/allQuestions/${cid}`, undefined),
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
    group: async (params: GroupQuestionsParams): Promise<void> =>
      this.req("POST", "/api/v1/questions/group", undefined, params),
    resolveGroup: async (groupId: number, queueId: number): Promise<void> =>
      this.req(
        "PATCH",
        `/api/v1/questions/resolveGroup/${groupId}`,
        undefined,
        { queueId }
      ),
    questionTypes: async (courseId: number): Promise<any> =>
      this.req("GET", `/api/v1/questions/${courseId}/questionType`, undefined),
    addQuestionType: async (
      courseId: number,
      questionType: string
    ): Promise<any> =>
      this.req(
        "POST",
        `/api/v1/questions/${courseId}/${questionType}`,
        undefined
      ),
    deleteQuestionType: async (
      courseId: number,
      questionType: string
    ): Promise<void> =>
      this.req("DELETE", `/api/v1/questions/${courseId}/${questionType}`)
  };

  calendar = {
    addCalendar: async (body: Calendar): Promise<Calendar> =>
      this.req("POST", `/api/v1/calendar`, undefined, body),
    getEvents: async (cid: number): Promise<Calendar[]> =>
      this.req("GET", `/api/v1/calendar/${cid}`),
    deleteEvent: async (eventId: number): Promise<Calendar> =>
      this.req("DELETE", `/api/v1/calendar/${eventId}/delete`)
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
    disable: async (queueId: number): Promise<void> =>
      this.req("DELETE", `/api/v1/queues/${queueId}/get`)
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
        )
    }
  };
  seeds = {
    delete: async () => this.req("GET", `/api/v1/seeds/delete`),
    create: async () => this.req("GET", `/api/v1/seeds/create`),
    fillQueue: async () => this.req("GET", `/api/v1/seeds/fill_queue`)
  };
  semesters = {
    get: async (): Promise<SemesterPartial[]> =>
      this.req("GET", `/api/v1/semesters`)
  };
  releaseNotes = {
    get: async (): Promise<GetReleaseNotesResponse> =>
      this.req("GET", `/api/v1/release_notes`)
  };
  insights = {
    get: async (
      courseId: number,
      insightName: string,
      params: InsightParamsType
    ): Promise<GetInsightOutputResponse> => {
      return this.req(
        "GET",
        `/api/v1/insights/${courseId}/${insightName}`,
        undefined,
        undefined,
        params
      );
    },
    list: async (): Promise<ListInsightsResponse> =>
      this.req("GET", `/api/v1/insights/list`),
    toggleOn: async (insightName: string): Promise<void> =>
      this.req("PATCH", `/api/v1/insights`, undefined, { insightName }),
    toggleOff: async (insightName: string): Promise<void> =>
      this.req("DELETE", `/api/v1/insights`, undefined, { insightName })
  };
  image = {
    get: async (imageId: number): Promise<any> =>
      this.req("GET", `/api/v1/image/${imageId}`, undefined, undefined),
    getAllImageIds: async (qid: number): Promise<number[]> =>
      this.req("GET", `/api/v1/image/${qid}/getImageIdsByQuestion`)
  };
  alerts = {
    get: async (courseId: number): Promise<GetAlertsResponse> =>
      this.req("GET", `/api/v1/alerts/${courseId}`),
    create: async (params: CreateAlertParams): Promise<CreateAlertResponse> =>
      this.req("POST", `/api/v1/alerts`, CreateAlertResponse, params),
    close: async (alertId: number): Promise<void> =>
      this.req("PATCH", `/api/v1/alerts/${alertId}`)
  };

  organizations = {
    getOrganizations: async (): Promise<OrganizationResponse[]> =>
      this.req("GET", `/api/v1/organization`),
    addMember: async (userId: number, organizationId: number): Promise<void> =>
      this.req(
        "POST",
        `/api/v1/organization/${organizationId}/add_member/${userId}`
      ),
    addCourse: async (
      courseId: number,
      organizationId: number
    ): Promise<void> =>
      this.req(
        "POST",
        `/api/v1/organization/${organizationId}/add_course/${courseId}`
      )
  };

  constructor(baseURL = "") {
    this.axios = Axios.create({ baseURL: baseURL });
  }
}

export const API = new APIClient(process.env.NEXT_PUBLIC_API_URL);
