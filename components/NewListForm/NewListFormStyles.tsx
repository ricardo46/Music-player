import styled from "styled-components";
import { FormButton, FormContainer, InputLabel } from "../MultipleInputForm/MultipleInputFormStyles";
import { MOBILE_MAX_WIDTH } from "@/globalVariables";

const NewListFormContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  ${FormContainer} {
    align-items: end;
    @media (min-width: ${MOBILE_MAX_WIDTH}) {
  width: 100%;

    flex-direction: row;

  }
  }
  
  ${InputLabel} {
    width: 100%;
  }
  ${FormButton} {
    margin-right: 0;
  }
`;

export { NewListFormContainer };
