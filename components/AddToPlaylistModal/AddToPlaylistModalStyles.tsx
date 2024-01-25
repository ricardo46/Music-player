import styled from "styled-components";
import {
  INPUT_MAX_WIDTH,
  MAIN_COLOR,
  MOBILE_MAX_WIDTH,
} from "@/globalVariables";

const ListSelectConfirmContainer = styled.div`
  border: solid 2px ${MAIN_COLOR};
  border-radius: 1rem;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
  align-items: end;
  max-width: ${INPUT_MAX_WIDTH};

  @media (min-width: ${MOBILE_MAX_WIDTH}) {
    flex-direction: row;
  align-items: center;

  }
`;

export { ListSelectConfirmContainer };
