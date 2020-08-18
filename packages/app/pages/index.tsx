import { User, UserCourse } from "@template/common";
import Router from "next/router";
import { useProfile } from "../hooks/useProfile";

export default function Home() {
  const profile: User = useProfile();

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
