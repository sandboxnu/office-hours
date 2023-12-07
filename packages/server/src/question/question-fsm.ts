import {
  ClosedQuestionStatus,
  LimboQuestionStatus,
  OpenQuestionStatus,
  QuestionStatus,
  Role,
} from '@koh/common';

interface AllowableTransitions {
  student?: QuestionStatus[];
  ta?: QuestionStatus[];
}

const QUEUE_TRANSITIONS: AllowableTransitions = {
  ta: [OpenQuestionStatus.Helping, LimboQuestionStatus.TADeleted],
  student: [ClosedQuestionStatus.ConfirmedDeleted],
};

const QUESTION_STATES: Record<QuestionStatus, AllowableTransitions> = {
  [OpenQuestionStatus.Drafting]: {
    student: [OpenQuestionStatus.Queued, ClosedQuestionStatus.ConfirmedDeleted],
    ta: [OpenQuestionStatus.Helping, ClosedQuestionStatus.DeletedDraft],
  },
  [OpenQuestionStatus.Queued]: QUEUE_TRANSITIONS,
  [OpenQuestionStatus.PriorityQueued]: QUEUE_TRANSITIONS,
  [OpenQuestionStatus.Helping]: {
    ta: [
      LimboQuestionStatus.CantFind,
      LimboQuestionStatus.ReQueueing,
      ClosedQuestionStatus.Resolved,
      LimboQuestionStatus.TADeleted,
    ],
    student: [ClosedQuestionStatus.ConfirmedDeleted],
  },
  [LimboQuestionStatus.CantFind]: {
    student: [
      OpenQuestionStatus.PriorityQueued,
      ClosedQuestionStatus.ConfirmedDeleted,
    ],
  },
  [LimboQuestionStatus.ReQueueing]: {
    student: [
      OpenQuestionStatus.PriorityQueued,
      OpenQuestionStatus.Queued,
      ClosedQuestionStatus.ConfirmedDeleted,
    ],
  },
  [LimboQuestionStatus.TADeleted]: {
    student: [ClosedQuestionStatus.ConfirmedDeleted],
  },
  [ClosedQuestionStatus.Resolved]: {},
  [ClosedQuestionStatus.ConfirmedDeleted]: {},
  [ClosedQuestionStatus.Stale]: {},
  [ClosedQuestionStatus.DeletedDraft]: {},
};

export function canChangeQuestionStatus(
  oldStatus: QuestionStatus,
  goalStatus: QuestionStatus,
  role: Role,
): boolean {
  return (
    oldStatus === goalStatus ||
    QUESTION_STATES[oldStatus][role]?.includes(goalStatus)
  );
}
