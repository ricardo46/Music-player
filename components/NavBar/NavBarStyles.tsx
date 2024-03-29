import {
  DASHBOARD_LAPTOP_FONT_SIZE,
  DASHBOARD_MOBILE_FONT_SIZE,
  MAIN_COLOR,
  MAIN_FONT_COLOR,
  MOBILE_MAX_WIDTH,
} from "@/globalVariables";
import styled from "styled-components";
import { Message, StyledLink } from "../StyledComponents/StyledComponents";

const NavLinksContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  ${StyledLink} {
    @media (min-width: ${MOBILE_MAX_WIDTH}) {
      border-right: solid 2px ${MAIN_COLOR};
      /* padding-left: .5rem;*/
      padding-right: 1rem; 
    }
    
  }
  ${StyledLink}:last-child {
    @media (min-width: ${MOBILE_MAX_WIDTH}) {
      border-right: none;
      padding-right: 0rem; 

    }
    
  }
  @media (min-width: ${MOBILE_MAX_WIDTH}) {
      gap: 1rem;
    }
`;

const NavContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 2px solid black;
  @media (min-width: ${MOBILE_MAX_WIDTH}) {
    border: none;
  }
`;

const DashBoardMessage = styled(Message)`
  display: flex;
  align-items: center;
  gap: 0.3rem;
  margin: 0;
  padding: 0;
  color: ${MAIN_FONT_COLOR};
  justify-self: end;
  font-size: ${DASHBOARD_MOBILE_FONT_SIZE};
 
  @media (min-width: ${MOBILE_MAX_WIDTH}) {
    font-size: ${DASHBOARD_LAPTOP_FONT_SIZE};
    align-items: center;
    justify-content: center;
      border-right: solid ${MAIN_COLOR} 2px;
      padding-right: 1rem;
    }
`;

export { NavLinksContainer, NavContainer, DashBoardMessage };
