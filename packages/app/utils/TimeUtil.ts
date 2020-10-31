import { Question, QueuePartial } from "@koh/common";

export function getWaitTime(question: Question): string {
  const now = new Date();
  const difference = now.getTime() - question.createdAt.getTime();
  return formatWaitTime(Math.floor(difference / 60000));
}

export function formatWaitTime(minutes: number): string {
  if (minutes >= 60) {
    return `${Math.floor(minutes / 60)}hr ${minutes % 60}m`;
  } else {
    return `${minutes} min`;
  }
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
