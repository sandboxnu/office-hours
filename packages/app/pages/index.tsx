import { User } from "@template/common";
import Router from "next/router";
import { useProfile } from "../hooks/useProfile";
import { useLocalStorage } from "../hooks/useLocalStorage";

export default function Home() {
  const profile: User = useProfile();
  const [defaultCourse, setDefaultCourse] = useLocalStorage(
    "defaultCourse",
    null
  );

  if (profile) {
    if (profile.courses.length > 0) {
      Router.push(
        "/course/[cid]/today",
        "/course/" + defaultCourse.id ?? profile.courses[0].course.id + "/today"
      );
    } else {
      Router.push("/nocourses");
    }
  }

  return "";
}
