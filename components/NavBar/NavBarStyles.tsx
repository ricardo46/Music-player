import { DASHBOARD_LAPTOP_FONT_SIZE, DASHBOARD_MESSAGE_FONT_COLOR, DASHBOARD_MOBILE_FONT_SIZE } from "@/globalVariables";
import styled from "styled-components";
import { Message } from "../StyledComponents/StyledComponents";



const NavLinksContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

const NavContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid black;
`;

const DashBoardMessage = styled(Message)`
  margin: 0;
  padding: 0;
  color: ${DASHBOARD_MESSAGE_FONT_COLOR};
  grid-column-start: span 3;
  justify-self: end;
  font-size: ${DASHBOARD_MOBILE_FONT_SIZE};
  @media (min-width: 690px) {
    font-size: ${DASHBOARD_LAPTOP_FONT_SIZE};
  }
`;

export { NavLinksContainer, NavContainer ,DashBoardMessage};
