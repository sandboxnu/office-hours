import { Question } from "@template/common";

export function getWaitTime(question: Question): number {
  const now = new Date();
  const difference = now.getTime() - question.createdAt.getTime();
  return Math.round(difference / 60000);
}
