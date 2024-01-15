
import styled from "styled-components";
import { StyledButton, StyledInput } from "../StyledComponents/StyledComponents";
import { INPUT_BACKGROUND_COLOR, INPUT_MAX_WIDTH } from "@/globalVariables";

const FormButton = styled(StyledButton)`
  background-color: gray;
`;

const FormInput = styled(StyledInput)`
  color: white;
  background-color: ${INPUT_BACKGROUND_COLOR};
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  justify-content: center;
  width: 100%;
  /* max-width: ${INPUT_MAX_WIDTH}; */
`;

const StyledForm = styled.form`
  z-index: 5;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0;
  /* height: 7rem; */
`;

const FormMessageStyledContainer = styled.div`
  padding: 0.2rem 0 0 0;
  display: flex;
  justify-content: center;
  align-items: center;

  width: 90%;
`;

export {
  FormButton,
  FormInput,
  FormContainer,
  StyledForm,
  FormMessageStyledContainer,
};
