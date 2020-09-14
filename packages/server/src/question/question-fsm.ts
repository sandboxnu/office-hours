import {
  ClosedQuestionStatus,
  LimboQuestionStatus,
  OpenQuestionStatus,
  QuestionStatus,
  Role,
} from '@koh/common';
import { Machine } from 'xstate';

interface QuestionStateSchema {
  states: {
    [OpenQuestionStatus.Drafting]: {};
    [OpenQuestionStatus.Queued]: {};
    [OpenQuestionStatus.Helping]: {};
    [OpenQuestionStatus.PriorityQueued]: {};
    [LimboQuestionStatus.CantFind]: {};
    [LimboQuestionStatus.TADeleted]: {};
    [ClosedQuestionStatus.Resolved]: {};
    [ClosedQuestionStatus.ConfirmedDeleted]: {};
    [ClosedQuestionStatus.StudentCancelled]: {};
    [ClosedQuestionStatus.Stale]: {};
  };
}
type QuestionEvent =
  | { type: 'FINISHED_DRAFTING' }
  | { type: 'TA_HELP' }
  | { type: 'TA_DELETE' }
  | { type: 'TA_CANT_FIND' }
  | { type: 'TA_REQUEUE' }
  | { type: 'TA_RESOLVE' }
  | { type: 'STUDENT_CONFIRM' }
  | { type: 'STUDENT_CANCEL' };

export const questionMachine = Machine<
  unknown,
  QuestionStateSchema,
  QuestionEvent
>({
  // Machine identifier
  id: 'light',

  // Initial state
  initial: OpenQuestionStatus.Drafting,

  // State definitions
  states: {
    [OpenQuestionStatus.Drafting]: {
      on: {
        FINISHED_DRAFTING: OpenQuestionStatus.Queued,
        STUDENT_CANCEL: ClosedQuestionStatus.StudentCancelled,
      },
    },
    [OpenQuestionStatus.Queued]: {
      on: {
        TA_HELP: OpenQuestionStatus.Helping,
        TA_DELETE: LimboQuestionStatus.TADeleted,
        STUDENT_CANCEL: ClosedQuestionStatus.StudentCancelled,
      },
    },
    [OpenQuestionStatus.Helping]: {
      on: {
        TA_CANT_FIND: OpenQuestionStatus.Helping,
        TA_REQUEUE: LimboQuestionStatus.TADeleted,
        TA_RESOLVE: ClosedQuestionStatus.Resolved,
      },
    },
    [OpenQuestionStatus.PriorityQueued]: {
      on: {
        TA_DELETE: LimboQuestionStatus.TADeleted,
        STUDENT_CANCEL: ClosedQuestionStatus.StudentCancelled,
      },
    },
    [LimboQuestionStatus.CantFind]: {
      on: {
        STUDENT_CONFIRM: OpenQuestionStatus.PriorityQueued,
        STUDENT_CANCEL: ClosedQuestionStatus.StudentCancelled,
      },
    },
    [LimboQuestionStatus.TADeleted]: {
      on: {
        STUDENT_CONFIRM: ClosedQuestionStatus.ConfirmedDeleted,
      },
    },
    [ClosedQuestionStatus.Resolved]: {},
    [ClosedQuestionStatus.ConfirmedDeleted]: {},
    [ClosedQuestionStatus.StudentCancelled]: {},
    [ClosedQuestionStatus.Stale]: {},
  },
});

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

function canChangeQuestionStatus(
  oldStatus: QuestionStatus,
  goalStatus: QuestionStatus,
  role: 'student' | 'ta',
): boolean {
  return QUESTION_STATES[oldStatus][role].includes(goalStatus);
}
