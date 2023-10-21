import { API } from "@koh/api-client";
import { GetLimitedCourseResponse } from "@koh/common";
import useSWR, { responseInterface } from "swr";

type LimitedCourseResponse = responseInterface<GetLimitedCourseResponse, any>;

interface UseLimitedCourseReturn {
  course?: LimitedCourseResponse["data"];
  courseError: LimitedCourseResponse["error"];
  mutateCourse: LimitedCourseResponse["mutate"];
}

export function useLimitedCourse(cid: number): UseLimitedCourseReturn {
  const {
    data: course,
    error: courseError,
    mutate: mutateCourse,
  } = useSWR(cid && `/api/v1/courses/limited/${cid}`, async () =>
    API.course.getLimitedCourseResponse(Number(cid))
  );

  return {
    course,
    courseError,
    mutateCourse,
  };
}
