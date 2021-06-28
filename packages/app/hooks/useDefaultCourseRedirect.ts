import { User } from "@koh/common";
import Router from "next/router";
import { useLocalStorage } from "./useLocalStorage";
import { useProfile } from "./useProfile";

export function useDefaultCourseRedirect(): boolean {
  const profile: User = useProfile();
  const [defaultCourse] = useLocalStorage("defaultCourse", null);
  if (profile && profile.courses.length > 0) {
    /// defaultCourse can get out-of-sync with the user's actual registered course (dropped class etc)
    // TODO: Change from !!defaultCourse to defaultCourse
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
