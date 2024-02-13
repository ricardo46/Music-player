import { MOBILE_MAX_WIDTH } from "@/globalVariables";
import styled from "styled-components";
import {
  barBg,
  thumb,
  seekBeforeColor,
  selectedThumb,
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
  > * {
    cursor: pointer;
  }
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
  height: 4px;
  outline: none;
  @media (min-width: ${MOBILE_MAX_WIDTH}) {
    height: 6px;
    border-radius: 16px;
  }

  /* ProgressBar before thumb */
  &::before {
    content: "";

    height: 100%;
    width: ${(props) => props.$beforeWidth}%;
    background-color: ${seekBeforeColor};
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    position: absolute;
    top: 0px;
    left: 0px;
    z-index: 2;
    cursor: pointer;
    @media (min-width: ${MOBILE_MAX_WIDTH}) {
      height: 100%;
      top: 0px;
      left: 0px;

      border-top-left-radius: 11px;
      border-bottom-left-radius: 10px;
    }
  }

  /* thumb */
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 15px;
    height: 15px;
    border: none;
    border-radius: 50%;
    background-color: ${thumb};
    cursor: pointer;
    position: relative;
    z-index: 3;

    @media (min-width: ${MOBILE_MAX_WIDTH}) {
      width: 18px;
      height: 18px;
    }
  }

  /* thumb while dragging */
  &:active::-webkit-slider-thumb {
    transform: scale(1.2);
    background: ${selectedThumb};
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
