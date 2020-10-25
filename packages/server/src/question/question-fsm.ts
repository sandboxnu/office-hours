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
  student: [ClosedQuestionStatus.StudentCancelled],
};

const QUESTION_STATES: Record<QuestionStatus, AllowableTransitions> = {
  [OpenQuestionStatus.Drafting]: {
    student: [OpenQuestionStatus.Queued, ClosedQuestionStatus.StudentCancelled],
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
  },
  [LimboQuestionStatus.CantFind]: {
    student: [
      OpenQuestionStatus.PriorityQueued,
      ClosedQuestionStatus.StudentCancelled,
    ],
  },
  [LimboQuestionStatus.ReQueueing]: {
    student: [
      OpenQuestionStatus.PriorityQueued,
      ClosedQuestionStatus.StudentCancelled,
    ],
  },
  [LimboQuestionStatus.TADeleted]: {
    student: [ClosedQuestionStatus.ConfirmedDeleted],
  },
  [ClosedQuestionStatus.Resolved]: {},
  [ClosedQuestionStatus.ConfirmedDeleted]: {},
  [ClosedQuestionStatus.StudentCancelled]: {},
  [ClosedQuestionStatus.Stale]: {},
};

export function canChangeQuestionStatus(
  oldStatus: QuestionStatus,
  goalStatus: QuestionStatus,
  role: Role,
): boolean {
  return QUESTION_STATES[oldStatus][role]?.includes(goalStatus);
}
