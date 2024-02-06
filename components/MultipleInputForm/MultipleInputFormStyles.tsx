import styled from "styled-components";
import {
  StyledButton,
  StyledInput,
} from "../StyledComponents/StyledComponents";
import {
  BUTTON_MAX_WIDTH,
  INPUT_BACKGROUND_COLOR,
  INPUT_MAX_WIDTH,
  MAIN_COLOR,
  MOBILE_MAX_WIDTH,
} from "@/globalVariables";

const FormButton = styled(StyledButton)`
  /* max-width: ${BUTTON_MAX_WIDTH}; */
  @media (min-width: ${MOBILE_MAX_WIDTH}) {
  margin-right: 3rem;
    
  }
`;

const FormInput = styled(StyledInput)`
  border: 2px solid ${MAIN_COLOR};
  background-color: ${INPUT_BACKGROUND_COLOR};
  
`;

const InputLabel = styled.label`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.3rem;
  @media (min-width: ${MOBILE_MAX_WIDTH}) {
    min-width: 16rem;
    flex-direction: row;
    justify-content: space-between;
  }
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  justify-content: center;
  align-items: center;
  width: 100%;
  border: solid 2px ${MAIN_COLOR};
  border-radius: 1rem;
  padding: 0.5rem;
  @media (min-width: ${MOBILE_MAX_WIDTH}) {
    width: auto;
  align-items: end;
    
  }
`;

const StyledForm = styled.form`
  z-index: 5;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0;
  max-width: ${INPUT_MAX_WIDTH};
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
  InputLabel,
};
