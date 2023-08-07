import { API } from "@koh/api-client";
import { SemesterPartial } from "@koh/common";
import useSWR from "swr";

export function useSemester(): SemesterPartial[] {
  const { data } = useSWR(`/api/v1/semesters`, async () => API.semesters.get());
  return data;
}
