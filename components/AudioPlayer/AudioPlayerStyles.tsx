import styled from "styled-components";

const StyledAudio = styled.audio`
  margin: 2rem;
`;

const PlayerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PlayerAndSongsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 1rem;
`;

export { StyledAudio, PlayerContainer, PlayerAndSongsContainer };
