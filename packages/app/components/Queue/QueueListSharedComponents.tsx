import {
  CloudSyncOutlined,
  ExclamationCircleOutlined,
  FrownOutlined,
  NotificationOutlined,
  StopOutlined,
} from "@ant-design/icons";
import { Button, message, Modal, Popconfirm, Tooltip } from "antd";
import { ButtonProps } from "antd/lib/button";
import Linkify from "react-linkify";
import moment from "moment";
import React, { ReactElement, ReactNode, useState } from "react";
import styled from "styled-components";
import { useQueue } from "../../hooks/useQueue";
import { RenderEvery } from "../RenderEvery";
import { TAStatuses } from "./TAStatuses";
import { API } from "@koh/api-client";
import Router from "next/router";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const QueueTitle = styled.div`
  font-weight: 500;
  font-size: 24px;
  color: #212934;
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

const { confirm } = Modal;

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

const QueuePropertyText = styled.div`
  margin-left: 12px;
  font-size: 16px;

  // To break text in flexbox
  min-width: 0;
  overflow-wrap: break-word;

  // to show new lines in the text
  white-space: pre-wrap;
`;

const StaffH2 = styled.h2`
  margin-top: 32px;
`;

const QueueRoomGroup = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const QueueInfo = styled.div`
  margin-bottom: 24px;
`;

const QueueText = styled.div`
  max-height: 200px;
  overflow-y: auto;
  width: 100%;
`;

const DisableQueueButton = styled(QueueInfoColumnButton)`
  color: white;
  background: #da3236;
  &:hover,
  &:focus {
    color: #da3236;
    background: #fff;
    border-color: #da3236;
  }
`;

const ClearQueueButton = styled(QueueInfoColumnButton)`
  color: #d4380d;
  background: #fff;
  border-color: #d4380d;
  &:hover,
  &:focus {
    background: #fff;
    color: #da3236;
    border-color: #da3236;
  }
`;

const QueueManagementBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  color: white;
  width: 100%;
  height: 100%;
  bottom: 0;
`;

interface QueueInfoColumnProps {
  queueId: number;
  isStaff: boolean;
  buttons: ReactNode;
}

export function QueueInfoColumn({
  queueId,
  isStaff,
  buttons,
}: QueueInfoColumnProps): ReactElement {
  const { queue, mutateQueue } = useQueue(queueId);
  // const [away, setAway] = useState(false);
  const disableQueue = async () => {
    await API.queues.disable(queueId);
    await mutateQueue();
    message.success("Successfully disabled queue: " + queue.room);
    await Router.push("/");
  };

  const clearQueue = async () => {
    await API.queues.clean(queueId);
    await mutateQueue();
    message.success("Successfully cleaned queue: " + queue.room);
  };

  const confirmDisable = () => {
    confirm({
      title: `Please Confirm!`,
      icon: <ExclamationCircleOutlined />,
      style: { whiteSpace: "pre-wrap" },
      content: `Please confirm that you want to disable the queue: ${queue.room}.\n
      This queue will no longer appear in the app, and any students currently in the queue will be removed.`,
      onOk() {
        disableQueue();
      },
    });
  };
  // const checkAway = (checked: boolean) => {
  //   if (!checked) {
  //     setAway(true);
  //   } else {
  //     setAway(false);
  //   }
  // };
  return (
    <InfoColumnContainer>
      <QueueInfo>
        <QueueRoomGroup>
          {!queue.allowQuestions && (
            <Tooltip title="This queue is no longer accepting questions">
              <StopOutlined
                data-cy="stopQuestions"
                style={{ color: "red", fontSize: "24px", marginLeft: "8px" }}
              />
            </Tooltip>
          )}
        </QueueRoomGroup>

        {queue.staffList.length < 1 ? (
          <h1>
            No staff checked in, wait for a staff member to check in to post
            questions
          </h1>
        ) : (
          <QueueTitle data-cy="room-title">
            {queue?.room} {queue?.isDisabled && <b>(disabled)</b>}
          </QueueTitle>
        )}
      </QueueInfo>
      {queue?.notes && (
        <QueuePropertyRow>
          <NotificationOutlined />
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
            >
              <QueuePropertyText>{queue.notes}</QueuePropertyText>
            </Linkify>
          </QueueText>
        </QueuePropertyRow>
      )}
      <QueueUpToDateInfo queueId={queueId} />
      {buttons}
      <StaffH2>Staff</StaffH2>
      <TAStatuses queueId={queueId} />
      {isStaff && (
        <QueueManagementBox>
          {/* <p>Toggle to indicate away </p>
          <Switch
            onChange={checkAway}
            checkedChildren="Answering"
            unCheckedChildren="Away"
            style={{ width: "200px", marginTop: "-50px", marginBottom: "50px" }}
          /> */}
          <Popconfirm
            title={
              "Are you sure you want to clear all students from the queue?"
            }
            okText="Yes"
            cancelText="No"
            placement="top"
            arrowPointAtCenter={true}
            onConfirm={clearQueue}
          >
            <ClearQueueButton>Clear Queue</ClearQueueButton>
          </Popconfirm>
          <DisableQueueButton
            onClick={confirmDisable}
            data-cy="queue-disable-button"
            disabled={queue?.isDisabled}
          >
            {queue?.isDisabled ? `Queue deleted` : `Delete Queue`}
          </DisableQueueButton>
        </QueueManagementBox>
      )}
    </InfoColumnContainer>
  );
}

function QueueUpToDateInfo({ queueId }: { queueId: number }): ReactElement {
  const [lastUpdated, setLastUpdated] = useState(null);
  const { isLive } = useQueue(queueId, setLastUpdated);
  return (
    <QueuePropertyRow className="hide-in-percy">
      {isLive || lastUpdated ? <CloudSyncOutlined /> : <FrownOutlined />}
      <QueuePropertyText className="hide-in-percy">
        {isLive ? (
          "Queue up to date"
        ) : lastUpdated ? (
          <RenderEvery
            render={() => {
              const secondsAgo = (Date.now() - lastUpdated.getTime()) / 1000;
              return `Queue updated ${
                secondsAgo < 60
                  ? Math.ceil(secondsAgo) + "s"
                  : moment(lastUpdated).fromNow(true)
              } ago`;
            }}
            interval={1000}
          />
        ) : (
          "Queue may be out of date"
        )}
      </QueuePropertyText>
    </QueuePropertyRow>
  );
}
