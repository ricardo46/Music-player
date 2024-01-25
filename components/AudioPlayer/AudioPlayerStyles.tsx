import { MOBILE_MAX_WIDTH } from "@/globalVariables";
import styled from "styled-components";
import {
  barBg,
  knobby,
  seekBeforeColor,
  selectedKnobby,
} from "./AudioPlayerVariables";

const StyledAudio = styled.audio`
  /* padding: 0rem 0rem 1rem ; */
`;

const TimeText = styled.p`
  white-space: nowrap;
`;

const PlayerContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0rem 0rem 1rem;
  width: 100%;
  border-bottom: solid black 1px;
  @media (min-width: ${MOBILE_MAX_WIDTH}) {
    border-bottom: none;
  }
`;

const PlayerUIContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0rem 0rem 1rem;
  width: 100%;
  @media (min-width: ${MOBILE_MAX_WIDTH}) {
    max-width: 30rem;
  }
`;

const PlayerButtonsContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding: 0rem 0rem 1rem;
  gap: 0.5rem;
  width: 100%;
`;

const ProgressBarContainer = styled.div`
  width: 100%;

  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0rem 0rem 1rem;
  gap: 0.5rem;
`;

const ProgressBarStyled = styled.input<{ $beforeWidth: number }>`
  appearance: none;
  background: ${barBg};
  border-radius: 10px;
  position: relative;
  width: 100%;
  height: 11px;
  outline: none;
  @media (min-width: ${MOBILE_MAX_WIDTH}) {
    height: 18px;
    border-radius: 16px;
  }

  /* ProgressBar before knobby */
  &::before {
    content: "";
    padding: 0 5% 0;
    margin: 0 1px 0;
    min-width: 5%;
    max-width: 90%;
    height: 9px;
    width: ${(props) => props.$beforeWidth}%;
    background-color: ${seekBeforeColor};
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    position: absolute;
    top: 1px;
    left: 0;
    z-index: 2;
    cursor: pointer;
    @media (min-width: ${MOBILE_MAX_WIDTH}) {
      min-width: 3%;
      max-width: 95%;

      padding: 0 2% 0;

      height: 11px;
      top: 3px;
      margin: 0 4px 0;
      height: 12px;
      border-top-left-radius: 11px;
      border-bottom-left-radius: 10px;
    }
  }

  /* knobby */
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 15px;
    height: 15px;
    border: none;
    border-radius: 50%;
    background-color: ${knobby};
    cursor: pointer;
    position: relative;
    
    z-index: 3;
    box-sizing: border-box;
    margin: 1px;
    @media (min-width: ${MOBILE_MAX_WIDTH}) {
      width: 25px;
      height: 25px;
      margin: 4px;
    }
  }

  /* knobby while dragging */
  &:active::-webkit-slider-thumb {
    transform: scale(1.2);
    background: ${selectedKnobby};
  }
`;

export {
  StyledAudio,
  PlayerContainer,
  PlayerUIContainer,
  ProgressBarStyled,
  PlayerButtonsContainer,
  ProgressBarContainer,
  TimeText,
};
