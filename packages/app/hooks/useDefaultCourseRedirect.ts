import { User } from "@template/common";
import Router, { useRouter } from "next/router";
import { useLocalStorage } from "./useLocalStorage";
import { useProfile } from "./useProfile";

export function useDefaultCourseRedirect(): boolean {
  const profile: User = useProfile();
  const [defaultCourse] = useLocalStorage("defaultCourse", null);
  if (profile && profile.courses.length > 0) {
    Router.push(
      "/course/[cid]/today",
      `/course/${
        defaultCourse !== null ? defaultCourse.id : profile.courses[0].course.id
      }/today`
    );
    return true;
  }
  return false;
}
