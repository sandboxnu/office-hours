import { Role } from "@koh/common";
import { useProfile } from "./useProfile";

export function useRoleInCourse(courseId: number): Role {
  const profile = useProfile();
  return profile?.courses.find((e) => e.course.id === courseId)?.role;
}
