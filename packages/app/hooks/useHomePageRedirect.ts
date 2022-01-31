import { User } from "@koh/common";
import Router from "next/router";
import { useLocalStorage } from "./useLocalStorage";
import { useProfile } from "./useProfile";

/**
 * Redirect user to the course apply page if they are a prof with pending courses,
 * or to the today page for their default course.
 */
export function useHomePageRedirect(): boolean {
  const profile: User = useProfile();
  const [defaultCourse] = useLocalStorage("defaultCourse", null);
  if (profile && profile.pendingCourses && profile.pendingCourses.length > 0) {
    Router.push("/apply");
    return true;
  }
  if (profile && profile.courses.length > 0) {
    /// defaultCourse can get out-of-sync with the user's actual registered course (dropped class etc)
    const isUserInDefaultCourse =
      !!defaultCourse &&
      profile.courses.some((c) => c.course.id === defaultCourse?.id);
    Router.push(
      "/course/[cid]/today",
      `/course/${
        isUserInDefaultCourse ? defaultCourse.id : profile.courses[0].course.id
      }/today`
    );
    return true;
  }
  return false;
}
