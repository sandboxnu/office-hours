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
const ROLE: Role = Role.TA;

const Container = styled.div`
  margin: 32px 64px;
  @media (max-width: 768px) {
    margin: 32px 24px;
  }
`;

interface QueueProps {}

export default function Queue({}: QueueProps) {
  const { profile } = useContext(ProfileContext);
  const [course, setCourse] = useState<UserCourse>(null);
  const [queueId, setQueueId] = useState<number>(null);
  const [questions, setQuestions] = useState<Question[]>([]);

  // Student queue state variables
  const [isJoining, setIsJoining] = useState<boolean>(false);
  const [questionDraftId, setQuestionDraftId] = useState<number>(null);

  // TA queue state variables
  const [openPopup, setOpenPopup] = useState<boolean>(false);
  const [helpingQuestions, setHelpingQuestions] = useState<Question[]>([]);
  const [groupQuestions, setGroupQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<Question>(null);

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
      API.questions.index(queueId).then((q: Question[]) => {
        if (q) {
          setQuestions(q);

          let helping: Question[] = [];
          let group: Question[] = [];
          for (let question of q) {
            if (
              question.status === OpenQuestionStatus.Helping
              // question.taHelped &&
              // question.taHelped.id === profile.id
            ) {
              helping.push(question);
            } else {
              group.push(question);
            }
          }
          setHelpingQuestions(helping);
          setGroupQuestions(group);
        }
      });
    }
  };

  const onOpenClick = useCallback((question: Question): void => {
    setCurrentQuestion(question);
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
    API.questions
      .create(queueId, {
        text: "",
        questionType: null, // endpoint needs to be changed to allow empty questionType for drafts
      })
      .then((q: Question) => {
        if (q) {
          // fetch updated question list
          getQuestions();

          setQuestionDraftId(q.id);
        }
      });
  };

  /**
   * Deletes existing Question draft for a student who has left the queue.
   */
  const leaveQueue = () => {
    setIsJoining(false);

    API.questions
      .update(queueId, questionDraftId, {
        status: ClosedQuestionStatus.Deleted,
      })
      .then((q) => {
        // fetch updated question list
        getQuestions();

        setQuestionDraftId(null);
      });
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
          getQuestions();
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
          getQuestions();
          // fetch updated helping list
          setCurrentQuestion(q);
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
            helpingQuestions={helpingQuestions}
            groupQuestions={groupQuestions}
          />
          {ROLE === "ta" && currentQuestion && (
            <StudentPopupCard
              onClose={onCloseClick}
              email="takayama.a@northeastern.edu" //need a way to access this. or the user
              wait={20} //figure out later
              question={currentQuestion}
              location="Outside by the printer" // need a way to access this
              visible={openPopup}
              updateQuestion={updateQuestionTA}
            />
          )}
        </Fragment>
      )}
      {isJoining && (
        <QuestionForm leaveQueue={leaveQueue} finishQuestion={finishQuestion} />
      )}
    </Container>
  );
}
