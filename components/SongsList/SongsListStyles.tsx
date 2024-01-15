import styled from "styled-components";

const StyledSongsList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 1rem;
  gap: 0.3rem;
`;

const SongContainer = styled.div`
  height: 2rem;

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
  height: 100%;
  display: flex;

  align-items: center;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0 1rem;
`;

const PlayingSongNameContainer = styled(SongNameContainer)`
  font-weight: 700;
  border: 1px solid black;
  border-radius: 15px;
`;

export {
  StyledSongsList,
  SongContainer,
  SongButtonsContainer,
  SongNameContainer,
  PlayingSongNameContainer,
};
