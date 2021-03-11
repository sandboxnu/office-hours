import { PhoneOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import React from 'react';
import { useTAInQueueInfo } from '../../../../hooks/useTAInQueueInfo';
import { BannerPrimaryButton } from '../../Banner';


export function GroupCreationButton({queueId}: {queueId: number}) {
    const { isCheckedIn, isHelping } = useTAInQueueInfo(queueId);
    const [canHelp, helpTooltip] = ((): [boolean, string] => {
        if (!isCheckedIn) {
          return [false, "You must check in to help students!"];
        } else if (isHelping) {
          return [false, "You are already helping a student"];
        } else {
          return [true, "Create Group & Call"];
        }
      })();

  return (
    <Tooltip title={helpTooltip}>
      <span>
        <BannerPrimaryButton
          icon={<PhoneOutlined />}
          onClick={() => {
            // TODO: call the student, create group on backend
          }}
          disabled={!canHelp}
          data-cy="help-student"
        />
      </span>
    </Tooltip>
  );
}
