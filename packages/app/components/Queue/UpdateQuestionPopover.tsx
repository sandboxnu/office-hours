import { Popconfirm } from "antd";
import { ReactElement } from "react";

interface UpdateQuestionPopoverProps {
  onConfirm: () => void;
  children: ReactElement;
}

export default function UpdateQuestionPopover({
  onConfirm,
  children,
}: UpdateQuestionPopoverProps): ReactElement {
  return (
    <Popconfirm
      title="Are you sure you want to delete this question from the queue?"
      okText="Yes"
      cancelText="No"
      onConfirm={onConfirm}
    >
      {children}
    </Popconfirm>
  );
}
