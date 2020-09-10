import { API } from "@koh/api-client";
import { GetCourseResponse } from "@koh/common";
import useSWR, { responseInterface } from "swr";

type courseResponse = responseInterface<GetCourseResponse, any>;

interface UseCourseReturn {
  course?: courseResponse["data"];
  courseError: courseResponse["error"];
  mutateCourse: courseResponse["mutate"];
}

export function useCourse(cid: number): UseCourseReturn {
  const {
    data: course,
    error: courseError,
    mutate: mutateCourse,
  } = useSWR(cid && `/api/v1/courses/${cid}`, async () => API.course.get(cid));
  return {
    course,
    courseError,
    mutateCourse,
  };
}
