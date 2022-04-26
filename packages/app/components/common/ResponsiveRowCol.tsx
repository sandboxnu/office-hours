import React, { ReactElement } from "react";
import { Row } from "antd";
import styled from "styled-components";
import { useIsMobile } from "../../hooks/useIsMobile";

export default function ResponsiveRowCol(): ReactElement {
  const isMobile = useIsMobile();
  const ResponsiveRowCol = styled(Row)`
    flex-direction: ${isMobile ? "column" : "row"};
  `;

  return <ResponsiveRowCol />;
}
