import { MAIN_FONT_COLOR, MOBILE_MAX_WIDTH } from "@/globalVariables";
import styled from "styled-components";

const ListName = styled.h4`
  color: ${MAIN_FONT_COLOR};
`;

const StyledSongsList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 1rem;
  gap: 0.3rem;
  overflow-y: hidden;
  height: 100%;
  
  
`;

const SongContainer = styled.div`

  display: flex;
  justify-content: space-between;
  align-items: center;
  /* margin: 0.5rem; */
  gap: 0.5rem;
  width: 100%;
`;

const SongButtonsContainer = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const SongNameContainer = styled.p`
  /* min-width: 250px; */
  width: 100%;
  height: 2rem;
  display: flex;

  align-items: center;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0 1rem;
  @media (min-width: ${MOBILE_MAX_WIDTH}) {
    
    height: 2.5rem;

    }
`;

const PlayingSongNameContainer = styled(SongNameContainer)`
  font-weight: 700;
  border: 1px solid black;
  border-radius: 15px;
`;

const SongsContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow: auto;
  width: 100%;
`;

export {
  ListName,
  StyledSongsList,
  SongContainer,
  SongButtonsContainer,
  SongNameContainer,
  PlayingSongNameContainer,
  SongsContainer,
};
