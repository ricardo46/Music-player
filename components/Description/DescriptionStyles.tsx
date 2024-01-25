import { MAIN_COLOR, MOBILE_MAX_WIDTH, SECOND_COLOR } from "@/globalVariables";
import styled from "styled-components";

const DescriptionStyled = styled.h4`
  color: ${MAIN_COLOR};
  font-size: 0.55rem;
  line-height: 0.6rem;
  font-weight: 100;
  @media (min-width: ${MOBILE_MAX_WIDTH}) {
    font-size: .8rem;
    line-height: 1.1rem;
    font-weight: bold;
  }
`;

const DescriptionContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${MAIN_COLOR};
  /* background-color: ${SECOND_COLOR}; */
  height: 2rem;
  border-radius: 0.5rem;
  padding: 0.3rem;
  text-align: center;
  text-justify: inter-word;
  @media (min-width: ${MOBILE_MAX_WIDTH}) {
  height: 3rem;
  border: 2px solid ${MAIN_COLOR};
    

  }
`;

export { DescriptionStyled, DescriptionContainer };
