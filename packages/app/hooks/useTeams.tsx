import { useQueue } from "./useQueue";

export function useTeams(
  queueId: number,
  users: string,
  message: string
): () => void {
  const isQueueOnline = useQueue(queueId).queue?.room.startsWith("Online");

  function openTeams(): void {
    if (isQueueOnline) {
      window.open(
        `https://teams.microsoft.com/l/chat/0/0?users=${users}&message=${message}`
      );
    }
  }

  return openTeams;
}
