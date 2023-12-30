// import UserMessage from "../UserMessage/UserMessage";
import { ChangeEvent, FormEvent, MouseEvent, useState } from "react";
import {
  LOGIN_SUCCESS_REDIRECT_TIMEOUT,
  MESSAGE_DURATION,
} from "../../globalVariables";
import {
  FormButton,
  FormContainer,
  FormInput,
  FormMessageStyledContainer,
  StyledForm,
} from "./FormStyledComponents";
import LoadingAnimation from "../LoadingAnimation/LoadingAnimation";
import UserMessage from "../UserMessage/UserMessage";

interface Input {
  name: string;
  type: string;
  value: string;
}

export interface submitRequestInterface {
  isLoading: boolean;
  submitted: boolean;
  error: boolean;
  errorMessage: null;
  message: null | string;
}

type MultipleInputFormParams = {
  inputs: Input[];
  onFormSubmit: (e: FormEvent<HTMLFormElement>) => void;
  submitRequest: submitRequestInterface;
  submitButtonName: string;
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleClick: (e: MouseEvent<HTMLInputElement>) => void;
};

const MultipleInputForm = ({
  inputs,
  onFormSubmit,
  submitRequest,
  submitButtonName,
  onInputChange,
  handleClick,
}: MultipleInputFormParams) => {
  const [messageIsVisible, setMessageIsVisible] = useState(false);

  const onButtonClick = () => {
    setMessageIsVisible(true);
    setTimeout(() => {
      setMessageIsVisible(false);
    }, LOGIN_SUCCESS_REDIRECT_TIMEOUT);
  };

  return (
    <>
      <StyledForm
        onSubmit={(e) => {
          onFormSubmit(e);
        }}
      >
        <FormContainer>
          {inputs.map((input) => (
            <FormInput
              key={input.name}
              type={input.type}
              name={input.name}
              value={input.value}
              onChange={onInputChange}
              onClick={handleClick}
            />
          ))}
          <FormButton onClick={onButtonClick}>{submitButtonName}</FormButton>
        </FormContainer>

        {messageIsVisible && (
          <FormMessageStyledContainer>
            {submitRequest.error ? (
              <UserMessage
                type={"error"}
                messageContent={submitRequest.errorMessage}
              />
            ) : (
              <UserMessage
                type={"success"}
                messageContent={submitRequest.message}
              />
            )}

            {submitRequest?.isLoading && <LoadingAnimation />}
          </FormMessageStyledContainer>
        )}
      </StyledForm>
    </>
  );
};

export default MultipleInputForm;
