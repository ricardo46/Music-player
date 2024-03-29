import {
  LAPTOP_WIDTH_ONE,
  LIST_NAME_LAPTOP_FONT_SIZE,
  LIST_NAME_MOBILE_FONT_SIZE,
  MAIN_COLOR,
  MAIN_FONT_COLOR,
  MOBILE_MAX_WIDTH,
  THIRD_COLOR,
} from "@/globalVariables";
import styled from "styled-components";

const SongsListTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 2.5rem;
  @media (min-width: ${LAPTOP_WIDTH_ONE}) {
    height: 2rem;
  }
`;

const ListName = styled.h4`
  font-size: ${LIST_NAME_MOBILE_FONT_SIZE};
  color: ${MAIN_FONT_COLOR};
  padding: 0 0 0 1rem;
  @media (min-width: ${MOBILE_MAX_WIDTH}) {
    font-size: ${LIST_NAME_LAPTOP_FONT_SIZE};
  }
`;

const StyledSongsList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  padding: 1rem 0 0.5rem;
  gap: 0.3rem;
  overflow-y: hidden;
  min-height: 8rem;
  max-width: 43rem;
`;

const SongContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* margin: 0.5rem; */
  gap: 0.5rem;
  width: 100%;
  height: 1.5rem;
  @media (min-width: ${LAPTOP_WIDTH_ONE}) {
    height: 2.5rem;
  }
`;

const SongButtonsContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  > * {
    cursor: pointer;
  }
`;

const SongNameContainer = styled.p`
  /* min-width: 250px; */
  width: 100%;
  height: 1.5rem;
  display: flex;
  font-size: 0.7rem;
  align-items: center;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0 1rem;
  cursor: pointer;
  @media (min-width: ${LAPTOP_WIDTH_ONE}) {
    font-size: 1rem;
    height: 2.5rem;
  }
`;

const SearchTitle = styled.h4`
  color: ${MAIN_COLOR};
  font-size: 0.7rem;
  margin: 0.3rem 0.5rem 0.3rem;
  padding: 0 0 0.3rem;
  border-bottom: 2px solid ${THIRD_COLOR};
  font-weight: 500;
  @media (min-width: ${LAPTOP_WIDTH_ONE}) {
    font-size: 1rem;
  }
`;

const PlayingSongNameContainer = styled(SongNameContainer)`
  font-weight: 700;
  border: 1px solid black;
  border-radius: 15px;
  @media (min-width: ${LAPTOP_WIDTH_ONE}) {
    border-radius: 2.5rem;
  }
`;

const SongsContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow: auto;
  width: 100%;
  border: solid 2px ${MAIN_COLOR};
  padding: 0.5rem;
  /* min-height: 3rem; */
  border-radius: 1rem;
  box-sizing: border-box;
`;

const ContainerSearchResults = styled.div`
  border: solid 2px red;
`;

const SongsListButtonsContainer = styled.div`
  display: flex;
  height: 100%;
  gap: 0rem;

  * {
    cursor: pointer;
  }
  @media (min-width: ${LAPTOP_WIDTH_ONE}) {
    gap: 0.5rem;

}
`;

export {
  ListName,
  StyledSongsList,
  SongContainer,
  SongButtonsContainer,
  SongNameContainer,
  PlayingSongNameContainer,
  SongsContainer,
  SongsListTop,
  SearchTitle,
  ContainerSearchResults,
  SongsListButtonsContainer,
};
