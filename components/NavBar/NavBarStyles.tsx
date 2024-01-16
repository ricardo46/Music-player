import {
  DASHBOARD_LAPTOP_FONT_SIZE,
  DASHBOARD_MOBILE_FONT_SIZE,
  MAIN_FONT_COLOR,
  MOBILE_MAX_WIDTH,
} from "@/globalVariables";
import styled from "styled-components";
import { Message } from "../StyledComponents/StyledComponents";

const NavLinksContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  width: 100%;
  justify-content: space-between;
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
  margin: 0;
  padding: 0;
  color: ${MAIN_FONT_COLOR};
  justify-self: end;
  font-size: ${DASHBOARD_MOBILE_FONT_SIZE};
  @media (min-width: 690px) {
    font-size: ${DASHBOARD_LAPTOP_FONT_SIZE};
    align-items: center;
justify-content: center;
  }
`;

export { NavLinksContainer, NavContainer, DashBoardMessage };
