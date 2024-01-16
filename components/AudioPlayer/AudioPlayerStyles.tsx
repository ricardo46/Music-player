import { MOBILE_MAX_WIDTH } from "@/globalVariables";
import styled from "styled-components";

const StyledAudio = styled.audio`
  /* padding: 0rem 0rem 1rem ; */
`;

const PlayerContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0rem 0rem 1rem;
  width: 100%;
  border-bottom: solid black 2px;
  @media (min-width: ${MOBILE_MAX_WIDTH}) {
    border-bottom: none;

  }
`;

const PlayerButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0rem 0rem 1rem;
`;

export { StyledAudio, PlayerContainer, PlayerButtonsContainer };
