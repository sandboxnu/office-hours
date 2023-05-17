import { Button } from "antd";
import { ButtonProps } from "antd/lib/button";
import Linkify from "react-linkify";
import React, { ReactElement, ReactNode } from "react";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const NotesText = styled.div`
  font-size: 16px;
  color: #5f6b79;
`;

// New queue styled components start here
const InfoColumnContainer = styled.div`
  flex-shrink: 0;
  padding-bottom: 30px;
  position: relative;
  display: flex;
  flex-direction: column;
  @media (min-width: 650px) {
    margin-top: 32px;
    width: 290px;
  }
`;

const QueueInfoColumnButtonStyle = styled(Button)`
  font-weight: 500;
  font-size: 14px;
  border: 1px solid #cfd6de;
  border-radius: 6px;
  margin-bottom: 12px;
`;

export const QueueInfoColumnButton = (props: ButtonProps): ReactElement => (
  <QueueInfoColumnButtonStyle size="large" block {...props} />
);

const QueuePropertyRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center; // This kinda funky, not sure how to align the tops of the row
  margin-bottom: 20px;
  color: #5f6b79;
  font-size: 20px;
`;

const QueueInfo = styled.div`
  margin-bottom: 24px;
`;

const QueueText = styled.div`
  max-height: 200px;
  overflow-y: auto;
  width: 100%;
`;

// const DisableQueueButton = styled(QueueInfoColumnButton)`
//   color: white;
//   background: #da3236;
//   &:hover,
//   &:focus {
//     color: #da3236;
//     background: #fff;
//     border-color: #da3236;
//   }
// `;

// const ClearQueueButton = styled(QueueInfoColumnButton)`
//   color: #d4380d;
//   background: #fff;
//   border-color: #d4380d;
//   &:hover,
//   &:focus {
//     background: #fff;
//     color: #da3236;
//     border-color: #da3236;
//   }
// `;

// const QueueManagementBox = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: flex-end;
//   color: white;
//   width: 100%;
//   height: 100%;
//   bottom: 0;
// `;

interface QueueInfoColumnProps {
  isStaff: boolean;
  buttons: ReactNode;
}

export function QuestionListShared({
  buttons,
}: QueueInfoColumnProps): ReactElement {
  return (
    <InfoColumnContainer>
      <QueueInfo>
        <h2>Asynchronous question center</h2>
        {/* <QueueRoomGroup>
          {(
            <Tooltip title="This queue is no longer accepting questions">
              <StopOutlined
                data-cy="stopQuestions"
                style={{ color: "red", fontSize: "24px", marginLeft: "8px" }}
              />
            </Tooltip>
          )}
        </QueueRoomGroup> */}
      </QueueInfo>
      {
        <QueuePropertyRow>
          <QueueText>
            <Linkify
              componentDecorator={(decoratedHref, decoratedText, key) => (
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={decoratedHref}
                  key={key}
                >
                  {decoratedText}
                </a>
              )}
            ></Linkify>
          </QueueText>
        </QueuePropertyRow>
      }
      {buttons}
    </InfoColumnContainer>
  );
}

// function QueueUpToDateInfo({ queueId }: { queueId: number }): ReactElement {
//   const [lastUpdated, setLastUpdated] = useState(null);
//   const { isLive } = useQueue(queueId, setLastUpdated);
//   return (
//     <QueuePropertyRow className="hide-in-percy">
//       {isLive || lastUpdated ? <CloudSyncOutlined /> : <FrownOutlined />}
//       <QueuePropertyText className="hide-in-percy">
//         {isLive ? (
//           "Queue up to date"
//         ) : lastUpdated ? (
//           <RenderEvery
//             render={() => {
//               const secondsAgo = (Date.now() - lastUpdated.getTime()) / 1000;
//               return `Queue updated ${
//                 secondsAgo < 60
//                   ? Math.ceil(secondsAgo) + "s"
//                   : moment(lastUpdated).fromNow(true)
//               } ago`;
//             }}
//             interval={1000}
//           />
//         ) : (
//           "Queue may be out of date"
//         )}
//       </QueuePropertyText>
//     </QueuePropertyRow>
//   );
// }
