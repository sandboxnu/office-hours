import { Button, ButtonProps } from "antd";
import { ReactElement, ReactNode } from "react";
import styled from "styled-components";
import { useIsMobile } from "../../hooks/useIsMobile";

interface ModalFooterProps {
  onCancel?: () => void;
  onOk?: () => void;
  okText?: ReactNode;
  cancelText?: ReactNode;
  okButtonProps?: ButtonProps;
  cancelButtonProps?: ButtonProps;
}

const FooterContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const FooterButton = styled(Button)`
  @media (max-width: 650px) {
    flex-grow: 1;
  }
`;

// A mobile-friendly footer for modals
export default function ModalFooter({
  onCancel,
  onOk,
  okText = "OK",
  cancelText = "Cancel",
  okButtonProps = {},
  cancelButtonProps = {},
}: ModalFooterProps): ReactElement {
  const isMobile = useIsMobile();
  return (
    <FooterContainer>
      <FooterButton
        onClick={onCancel}
        size={isMobile ? "large" : "middle"}
        {...cancelButtonProps}
      >
        {cancelText}
      </FooterButton>
      <FooterButton
        type="primary"
        onClick={onOk}
        size={isMobile ? "large" : "middle"}
        {...okButtonProps}
      >
        {okText}
      </FooterButton>
    </FooterContainer>
  );
}
