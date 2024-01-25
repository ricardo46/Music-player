import styled from "styled-components";
import { FormContainer } from "../MultipleInputForm/FormStyledComponents";

const NewListFormContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  ${FormContainer} {
    align-items: end;
  }
`;

export { NewListFormContainer };
