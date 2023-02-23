import { ArrowLeftOutlined } from "@ant-design/icons";
import { useWindowWidth } from "@react-hook/window-size";
import { Skeleton } from "antd";
import React, { ReactElement, useState } from "react";
import styled from "styled-components";
import { useProfile } from "../../hooks/useProfile";
import TAquestionDetail from "./TA/TAquestionDetail";
import TAquestionListSection from "./TA/TAquestionListSection";
import { useRoleInCourse } from "../../hooks/useRoleInCourse";
import { useRouter } from "next/router";
import { Role, AsyncQuestion } from "@koh/common";
import StudentQuestionDetail from "./Student/StudentQuestionDetail";
import { useAsnycQuestions } from "../../hooks/useAsyncQuestions";

// The min screen width at which the list and detail become side-by-side
const SPLIT_DETAIL_BKPT = 900;

const Container = styled.div`
  flex: 1;

  background: white;
  border: 1px solid #cfd6de;
  margin-bottom: 30px;

  @media (min-width: ${SPLIT_DETAIL_BKPT}px) {
    border: none;
    border-left: 1px solid #cfd6de;
    margin-bottom: 0px;
    display: flex;
    flex-direction: row;
    min-height: calc(
      100vh - 46px - 67px
    ); // - (height of footer) - (height of navbar)
  }
`;

const List = styled.div`
  @media (min-width: ${SPLIT_DETAIL_BKPT}px) {
    width: 320px;
    overflow-y: scroll;
  }
`;

const Detail = styled.div`
  border-left: 1px solid #cfd6de;
  border-right: 1px solid #cfd6de;
  flex: 1;
  @media (min-width: ${SPLIT_DETAIL_BKPT}px) {
    overflow-y: scroll;
  }
`;

const BackToQueue = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
  padding-left: 12px;
  color: #1890ff;
  cursor: pointer;
`;

/**
 * this is shared, they all have the same group of students. Middle part student has an extra section for their own questions.
 */
export default function QuestionListDetail({
  courseId
}: {
  courseId: number;
}): ReactElement {
  // const user = useProfile();
  // TODO: add
  const router = useRouter();
  const { cid } = router.query;
  const role = useRoleInCourse(Number(cid));
  const profile = useProfile();
  const [selectedQuestionId, setSelectedQuestionId] = useState<number>(null);
  const isSideBySide = useWindowWidth() >= SPLIT_DETAIL_BKPT;
  const { questions } = useAsnycQuestions(Number(cid));
  const allQuestionsList: AsyncQuestion[] = questions
    ? [
        ...questions.helpedQuestions,
        ...questions.otherQuestions,
        ...questions.waitingQuestions
      ]
    : [];
  const onSelectQuestion = (qId: number) => {
    setSelectedQuestionId(qId);
    console.log(qId);
  };
  const selectedQuestion = allQuestionsList.find(
    q => q.id === selectedQuestionId
  );
  if (!selectedQuestionId && allQuestionsList.length) {
    onSelectQuestion(questions.waitingQuestions[0].id);
  }
  if (!questions) {
    return <Skeleton />;
  }

  if (allQuestionsList.length === 0) {
    return (
      <EmptyQueueInfo>
        <NoQuestionsText>There are no questions in the queue</NoQuestionsText>
      </EmptyQueueInfo>
    );
  }
  const studentQuestions = allQuestionsList.filter(
    q => q.creatorId === profile.id
  );
  const list = (
    <List>
      {Role.STUDENT === role ? (
        <div data-cy="your-questions">
          <TAquestionListSection
            title="Your Questions"
            questions={studentQuestions}
            onClickQuestion={onSelectQuestion}
            selectedQuestionId={selectedQuestionId}
            collapsible
            showNumbers
          />
        </div>
      ) : (
        <></>
      )}
      <div data-cy="list-helping">
        <TAquestionListSection
          title="Waiting In Line"
          questions={questions.waitingQuestions}
          onClickQuestion={onSelectQuestion}
          selectedQuestionId={selectedQuestionId}
          collapsible
          showNumbers
        />
      </div>
      <div data-cy="list-resolved">
        <TAquestionListSection
          title="Resolved Questions"
          questions={questions.helpedQuestions}
          onClickQuestion={onSelectQuestion}
          selectedQuestionId={selectedQuestionId}
          collapsible
          showNumbers
        />
      </div>
      <div data-cy="list-deleted">
        <TAquestionListSection
          title="Deleted Questions"
          questions={questions.otherQuestions}
          onClickQuestion={onSelectQuestion}
          selectedQuestionId={selectedQuestionId}
          collapsible
          showNumbers
        />
      </div>
    </List>
  );

  //student side: can edit own question (check creator of question), otherwise can only see. TA can edit any question.
  const detail =
    Role.STUDENT !== role ? (
      <Detail>
        <TAquestionDetail
          courseId={courseId}
          question={selectedQuestion}
        ></TAquestionDetail>
      </Detail>
    ) : (
      <Detail>
        <StudentQuestionDetail
          question={selectedQuestion}
          studentId={profile.id}
        ></StudentQuestionDetail>
      </Detail>
    );

  if (isSideBySide) {
    return (
      <Container>
        {list}
        {detail}
      </Container>
    );
  } else if (selectedQuestionId) {
    return (
      <Container>
        <BackToQueue onClick={() => onSelectQuestion(null)}>
          <span>
            <ArrowLeftOutlined />
            {" Back To Queue"}
          </span>
        </BackToQueue>
        {detail}
      </Container>
    );
  } else {
    return <Container>{list}</Container>;
  }
}

const EmptyQueueInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
`;

const NoQuestionsText = styled.div`
  font-weight: 500;
  font-size: 24px;
  color: #212934;
`;
