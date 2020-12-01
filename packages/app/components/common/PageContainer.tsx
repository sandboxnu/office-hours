import styled from "styled-components";

/**
 * Max width 1500px,
 * Responsively scale down padding
 */
export const StandardPageContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 100%;
  padding: 0 16px;
  @media (min-width: 750px) {
    padding: 0 20px;
  }
  @media (min-width: 1000px) {
    padding: 0 32px;
  }
  @media (min-width: 1500px) {
    max-width: 1500px;
  }
`;
