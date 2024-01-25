import { LAPTOP_WIDTH_ONE, MOBILE_MAX_WIDTH } from "@/globalVariables";
import styled from "styled-components";

const PlayerAndSongsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  padding: 0;
  overflow: hidden;
  height: 100%;
  width: 100%;
  @media (min-width: ${MOBILE_MAX_WIDTH}) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
    padding: 1rem 0;
  }
`;

const PlayerAndDropDownContainer = styled.div`
  padding: 1rem 0 0;
  align-items: center;

  @media (min-width: ${MOBILE_MAX_WIDTH}) {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    height: 100%;
    justify-content: center;
  }
`;

const UserListsDropDownContainer = styled.div`
  display: flex;
  /* flex-direction: column; */
  justify-content: center;
  align-items: center;
  gap: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid;
  
  @media (min-width: ${MOBILE_MAX_WIDTH}) {
    border-bottom: none;
  width: 60%;
    
  
  }
`;

export {
  PlayerAndSongsContainer,
  UserListsDropDownContainer,
  PlayerAndDropDownContainer,
};
