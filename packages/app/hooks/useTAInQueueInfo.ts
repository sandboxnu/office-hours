import { Question } from "@koh/common";
import { useProfile } from "./useProfile";
import { useQuestions } from "./useQuestions";
import { useQueue } from "./useQueue";

/**
 * Get information about the currently logged-in TA, in the context of the given queue
 * TODO: The server could probably return this data more directly, instead of us having to run find and some on arrays
 */
interface TAInQueueInfo {
  helpingQuestions: Question[];
  isHelping: boolean;
  isCheckedIn: boolean;
}
export function useTAInQueueInfo(queueId: number): TAInQueueInfo {
  const user = useProfile();

  const { queue } = useQueue(queueId);

  const { questions } = useQuestions(queueId);
  const helpingQuestions = questions?.questionsGettingHelp?.filter(
    (question) => question.taHelped?.id === user?.id
  );
  const isHelping = helpingQuestions?.length > 0;

  // TODO handle TA groups as well since grouped q's are not in helping q's

  const isCheckedIn = queue?.staffList.some((e) => e.id === user?.id);

  return { helpingQuestions, isHelping, isCheckedIn };
}
