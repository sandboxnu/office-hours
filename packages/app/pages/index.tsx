import { User, UserCourse, CoursePartial, Role } from "@template/common";
import Router from "next/router";
import { useProfile } from "../hooks/useProfile";
import CourseGroupSelection from "../components/Course/CourseGroupSelection";

interface CourseToGroupsMap {
  [genericCourse: string]: CoursePartial[];
}

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

  // for (const course in courseToGroupsMap) {
  //   if (courseToGroupsMap[course].length < 2) {
  //     delete courseToGroupsMap[course];
  //   }
  // }

  return courseToGroupsMap;
}

export default function Home() {
  const profile: User = useProfile();
  console.log(profile?.courses);

  const courseToGroupsMap = parseCourseGroupMappings(profile);

  if (Object.keys(courseToGroupsMap).length > 0) {
    return <CourseGroupSelection courseToGroupsMap={courseToGroupsMap} />;
  }

  if (profile) {
    if (profile.courses.length > 0) {
      Router.push(
        "/course/[cid]/today",
        "/course/" + profile.courses[0].course.id + "/today"
      );
    } else {
      Router.push("/nocourses");
    }
  }

  return "";
}
