
import { ClosedQuestionStatus, OpenQuestionStatus} from '@koh/common';
import { Machine } from 'xstate';

interface QuestionStateSchema {
  states: {
    open: {
      states: {
        [OpenQuestionStatus.Drafting]:{}
        [OpenQuestionStatus.Queued]:{}
        [OpenQuestionStatus.Helping]:{}
        [OpenQuestionStatus.CantFind]:{}
        [OpenQuestionStatus.TADeleted]:{}
      }
    },
    closed: {
      states: {
        [ClosedQuestionStatus.Resolved]:{}
        [ClosedQuestionStatus.Deferred]:{}
        [ClosedQuestionStatus.ConfirmedDeleted]:{}
        [ClosedQuestionStatus.Stale]:{}
      }
    }
  }
};
type QuestionEvent =
  | { type: 'TIMER' }
  | { type: 'POWER_OUTAGE' }
  | { type: 'PED_COUNTDOWN'; duration: number };

const lightMachine = Machine<{},QuestionStateSchema,({
  // Machine identifier
  id: 'light',

  // Initial state
  initial: 'green',

  // State definitions
  states: {
    green: {
      /* ... */
    },
    yellow: {
      /* ... */
    },
    red: {
      /* ... */
    }
  }
});
