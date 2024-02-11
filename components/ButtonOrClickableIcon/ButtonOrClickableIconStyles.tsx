import styled from "styled-components";
import { StyledButton } from "../StyledComponents/StyledComponents";
import {
  LAPTOP_WIDTH_ONE,
  MAIN_COLOR,
  MOBILE_MAX_WIDTH,
} from "@/globalVariables";

const IconContainer = styled.div`
  ${StyledButton} {
    border: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    @media (min-width: ${LAPTOP_WIDTH_ONE}) {
      border: solid 2px ${MAIN_COLOR};
      /* flex-direction: row; */
    }
  }
`;

export { IconContainer };
