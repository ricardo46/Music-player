import { MAIN_COLOR, MOBILE_MAX_WIDTH } from "@/globalVariables";
import styled from "styled-components";
import { StyledButton } from "../StyledComponents/StyledComponents";

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

  ${StyledButton} {
    color: ${MAIN_COLOR};
    font-weight: 600;
    font-size: 0.65rem;
    padding: 0.17rem 0.3rem;
    height: auto;
    width: auto;
    min-width: 0;
    cursor: pointer;
    @media (min-width: ${MOBILE_MAX_WIDTH}) {
      font-size: .8rem;
    }
  }
  @media (min-width: ${MOBILE_MAX_WIDTH}) {
    font-size: 1rem;

    display: grid;
    gap: 1rem;
    grid-template-columns: auto 1fr repeat(2, auto);
  }
`;

export { HeaderContainer };
