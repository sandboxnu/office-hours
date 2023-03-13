import { API } from "@koh/api-client";

export function useQuestionTypes(cid: number): string[] {
  async () =>
    API.questions.questionTypes(cid).then((results) => {
      if (!results) {
        return null;
      }
      return results;
    });
  return null;
}
