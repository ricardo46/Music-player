import { MOBILE_MAX_WIDTH } from "@/globalVariables";
import styled from "styled-components";

const PageNameContainer = styled.p`
  padding-left: 1rem;

  @media (min-width: ${MOBILE_MAX_WIDTH}) {
  }
`;

export { PageNameContainer };
