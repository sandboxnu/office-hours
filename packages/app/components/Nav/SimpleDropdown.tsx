import styled from "styled-components";
import { useState, useRef, ReactElement } from "react";
import useOnClickOutside from "use-onclickoutside";

const Container = styled.div`
  position: relative;
`;

const MenuContainer = styled.div`
  position: absolute;
  width: 100%;
  margin-left: 10px;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.15);

  background: white;
`;

interface SimpleDropdownProps {
  children: ReactElement;
  overlay: ReactElement;
}

export default function SimpleDropdown({ children, overlay }: SimpleDropdownProps): ReactElement {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef();
  useOnClickOutside(ref, () => setIsOpen(false));
  return (
    <Container ref={ref}>
      <div onClick={() => setIsOpen(!isOpen)}>{children}</div>
      {isOpen && <MenuContainer>{overlay}</MenuContainer>}
    </Container>
  );
}
