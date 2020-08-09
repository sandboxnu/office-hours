import { Question, QueuePartial } from "@template/common";

export function getWaitTime(question: Question): number {
  const now = new Date();
  const difference = now.getTime() - question.createdAt.getTime();
  return Math.round(difference / 60000);
}

export function formatQueueTime(queue: QueuePartial): string {
  return (
    formatDateTime(queue.startTime) + " - " + formatDateTime(queue.endTime)
  );
}

function formatDateTime(date: Date) {
  let hours = date.getHours();
  let minutes: any = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  return hours + ":" + minutes + " " + ampm;
}
