import { MOBILE_MAX_WIDTH } from "@/globalVariables";
import styled from "styled-components";

const PlayerAndSongsContainer = styled.div`

  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  padding: 1rem 0;
  overflow: hidden;
  height: 100%;
  @media (min-width: ${MOBILE_MAX_WIDTH}) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    /* align-items: start; */

    /* grid-template-rows: repeat(2, 1fr); */
    /* grid-template-columns: 50% 50%; */
  }
`;

const PlayerAndDropDownContainer = styled.div`
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
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  padding: 1rem 0;
  border-bottom: 2px solid;
  width: 100%;
  min-height: 8rem;
  @media (min-width: ${MOBILE_MAX_WIDTH}) {
    border-bottom: none;
  }
`;

export {
  PlayerAndSongsContainer,
  UserListsDropDownContainer,
  PlayerAndDropDownContainer,
};
