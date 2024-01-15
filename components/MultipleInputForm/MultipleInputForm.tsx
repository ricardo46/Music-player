import { ChangeEvent, FormEvent, MouseEvent, useState } from "react";
import {
  FormButton,
  FormContainer,
  FormInput,
  FormMessageStyledContainer,
  StyledForm,
} from "./FormStyledComponents";
import LoadingAnimation from "../LoadingAnimation/LoadingAnimation";
import UserMessage from "../UserMessage/UserMessage";
import ErrorTimedMessage from "../ErrorMessage/ErrorMessage";
import TimedMessage from "../TimedMessage/TimedMessage";
import { MESSAGES_TIMEOUT } from "@/globalVariables";

interface Input {
  name: string;
  type: string;
  value: string;
}

export interface submitRequestInterface {
  isLoading: boolean;
  submitted: boolean;
  error: boolean;
  errorMessage: null | string;
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
    }, MESSAGES_TIMEOUT);
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

        <FormMessageStyledContainer>
          {submitRequest.error
            ? submitRequest.errorMessage && (
                <ErrorTimedMessage
                  visible={messageIsVisible}
                  errorMessage={submitRequest.errorMessage}
                />
              )
            : submitRequest.message && (
                <TimedMessage
                  visible={messageIsVisible}
                  message={submitRequest.message}
                />
              )}
        </FormMessageStyledContainer>
        {submitRequest?.isLoading && <LoadingAnimation />}
      </StyledForm>
    </>
  );
};

export default MultipleInputForm;
