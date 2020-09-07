import { User, UserCourse, CoursePartial, Role } from "@template/common";
import Router from "next/router";
import { useProfile } from "../hooks/useProfile";
import { useLocalStorage } from "../hooks/useLocalStorage";
import CourseGroupSelection from "../components/Course/CourseGroupSelection";
import { CourseToGroupsMap } from "../components/Course/CourseGroupSelection";
import _ from "lodash";

function parseCourseGroupMappings(profile: User): CourseToGroupsMap {
  let courseToGroupsMap: CourseToGroupsMap = {};

  profile?.courses.forEach((userCourse: UserCourse) => {
    if (userCourse.role === Role.TA) {
      const courseSplit = userCourse.course.name.split(" ");
      const genericCourse = courseSplit[0] + " " + courseSplit[1];
      if (genericCourse in courseToGroupsMap) {
        courseToGroupsMap[genericCourse].push(userCourse.course);
      } else {
        courseToGroupsMap[genericCourse] = [userCourse.course];
      }
    }
  });

  for (const course in courseToGroupsMap) {
    if (courseToGroupsMap[course].length < 2) {
      delete courseToGroupsMap[course];
    }
  }

  return courseToGroupsMap;
}

export default function Home() {
  const profile: User = useProfile();
  const [preferredCourseGroups, setPreferredCourseGroups] = useLocalStorage(
    "preferredCourseGroups",
    null
  );

  const courseToGroupsMap = parseCourseGroupMappings(profile);
  const numCoursesWithGroups = _.size(courseToGroupsMap);

  const preferredCoursesStored =
    preferredCourseGroups &&
    _.size(preferredCourseGroups) === numCoursesWithGroups;
  const noCoursesWithGroups = numCoursesWithGroups === 0;

  if ((preferredCoursesStored || noCoursesWithGroups) && profile) {
    const firstCourse = noCoursesWithGroups
      ? profile.courses[0].course
      : preferredCourseGroups[Object.keys(preferredCourseGroups)[0]];
    if (profile.courses.length > 0) {
      Router.push(
        "/course/[cid]/today",
        "/course/" + firstCourse.id + "/today"
      );
    } else {
      Router.push("/nocourses");
    }
  } else if (numCoursesWithGroups > 0) {
    return <CourseGroupSelection courseToGroupsMap={courseToGroupsMap} />;
  }

  return "";
}
