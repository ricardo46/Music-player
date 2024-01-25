import { MOBILE_MAX_WIDTH } from "@/globalVariables";
import styled from "styled-components";

const HeaderContainer = styled.nav`
  display: grid;
  grid-template-columns: auto 1fr auto;

  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid black;
  @media (min-width: ${MOBILE_MAX_WIDTH}) {
    display: grid;
    gap: 1rem;
    grid-template-columns: auto 1fr repeat(2, auto);
  }
`;

export { HeaderContainer };
