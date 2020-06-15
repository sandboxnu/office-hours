import styled from "styled-components";
import {
  Role,
  Question,
  OpenQuestionStatus,
  ClosedQuestionStatus,
  QuestionType,
  QuestionStatus,
  UserCourse,
} from "@template/common";
import QuestionForm from "../components/Queue/QuestionForm";
import QueueList from "../components/Queue/QueueList";
import StudentPopupCard from "../components/Queue/StudentPopupCard";
import {
  useCallback,
  useState,
  useContext,
  useEffect,
  useMemo,
  Fragment,
} from "react";
import useSWR from "swr";
import { API } from "@template/api-client";
import { ProfileContext } from "../contexts/ProfileContextProvider";

// TODO: replace this with profile role from endpoint
const ROLE: Role = Role.STUDENT;

const queueId: number = 169;

const Container = styled.div`
  margin: 32px 64px;
  @media (max-width: 768px) {
    margin: 32px 24px;
  }
`;

interface QueueProps {}

export default function Queue({}: QueueProps) {
  const [isJoining, setIsJoining] = useState<boolean>(false);
  const [openPopup, setOpenPopup] = useState<boolean>(false);
  const { profile } = useContext(ProfileContext);
  const [course, setCourse] = useState<UserCourse>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [queueId, setQueueId] = useState<number>(null);
  const [questionDraftId, setQuestionDraftId] = useState<number>(null);

  useEffect(() => {
    if (profile) {
      const selectedCourse: UserCourse = profile.courses[0];
      setCourse(selectedCourse);
      setQueueId(selectedCourse.course.id);
    }
  }, [profile]);

  useEffect(() => {
    if (queueId) {
      getQuestions();
    }
  }, [queueId]);

  /**
   * Gets the questions for this course
   */
  const getQuestions = () => {
    if (queueId) {
      API.questions.index(queueId).then((q) => {
        if (q) {
          setQuestions(q);
        }
      });
    }
  };

  const onOpenClick = useCallback((name: string): void => {
    setOpenPopup(true);
  }, []);

  const onCloseClick = useCallback((): void => {
    setOpenPopup(false);
  }, []);

  /**
   * Student functions to support queue operations.
   */

  /**
   * Creates a new Question draft for a student who has joined the queue.
   */
  const joinQueue = () => {
    setIsJoining(true);

    // API call to join queue, question marked as draft
    API.questions.create(queueId, null).then((q) => {
      if (q) {
        // fetch updated question list
        // store questionDraftId in state (should this be stored in state or fetched everytime using status.Drafting?)
      }
    });
  };

  const leaveQueue = () => {
    setIsJoining(false);
  };

  /**
   * Finishes creating a given question by updating the draft.
   */
  const finishQuestion = (text: string, questionType: QuestionType) => {
    API.questions
      .update(queueId, questionDraftId, {
        text: text,
        questionType: questionType,
        status: OpenQuestionStatus.Queued,
      })
      .then((q) => {
        if (q) {
          // fetch updated question list
          setIsJoining(false);
        }
      });
  };

  /**
   * TA functions to support queue operations
   */

  /**
   * Updates a given question to the given status.
   * @param question the question being modified
   * @param status the updated status
   */
  const updateQuestionTA = (question: Question, status: QuestionStatus) => {
    API.questions
      .update(queueId, question.id, {
        status: status,
      })
      .then((q) => {
        if (q) {
          // fetch updated question list
          // fetch updated helping list
          // update helping state if none left
        }
      });
  };

  /**
   * Sends a push notification to the student with the given Question
   * @param question the question to be notified
   */
  const alertStudent = (question: Question) => {
    // Send API request to trigger notification
  };

  return useMemo(() => {
    return (
      <Container>
        {!isJoining && (
          <Fragment>
            <QueueList
              role={ROLE}
              onOpenClick={onOpenClick}
              joinQueue={joinQueue}
              updateQuestionTA={updateQuestionTA}
              alertStudent={alertStudent}
              questions={questions}
            />
            {ROLE === "ta" && (
              <StudentPopupCard
                onClose={onCloseClick}
                name="Alex Takayama"
                email="takayama.a@northeastern.edu"
                wait={20}
                type="Concept"
                question="Help with working out how to use an accumulator for problem 1"
                location="Outside room, by the couches"
                status="WAITING"
                visible={openPopup}
                updateQuestion={updateQuestionTA}
              />
            )}
          </Fragment>
        )}
        {isJoining && (
          <QuestionForm
            leaveQueue={leaveQueue}
            finishQuestion={finishQuestion}
          />
        )}
      </Container>
    );
  }, [questions, openPopup, isJoining]);
}
