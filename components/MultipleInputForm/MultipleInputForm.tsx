import { ChangeEvent, FormEvent, MouseEvent, useState } from "react";
import {
  FormButton,
  FormContainer,
  FormInput,
  FormMessageStyledContainer,
  StyledForm,
} from "./FormStyledComponents";
import LoadingAnimation from "../LoadingAnimation/LoadingAnimation";
import ErrorTimedMessage from "../ErrorMessage/ErrorMessage";
import TimedMessage from "../TimedMessage/TimedMessage";
import { MESSAGES_TIMEOUT } from "@/globalVariables";
import { submitRequestInterface } from "@/Utils/tsTypes";

interface MultipleInputInterface {
  name: string;
  type: string;
  value: string;
}

type MultipleInputFormParams = {
  inputs: MultipleInputInterface[];
  onFormSubmit: (e: FormEvent<HTMLFormElement>) => void;
  submitRequest: submitRequestInterface;
  submitButtonName: string;
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleTextAreaClick: (e: MouseEvent<HTMLInputElement>) => void;
};

const MultipleInputForm = ({
  inputs,
  onFormSubmit,
  submitRequest,
  submitButtonName,
  onInputChange,
  handleTextAreaClick,
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
      <StyledForm onSubmit={onFormSubmit}>
        <FormContainer>
          {inputs.map((input) => (
            <FormInput
              key={input.name}
              type={input.type}
              name={input.name}
              value={input.value}
              onChange={onInputChange}
              onClick={handleTextAreaClick}
            />
          ))}
          <FormButton onClick={onButtonClick}>{submitButtonName}</FormButton>
        </FormContainer>

        <FormMessageStyledContainer>
          {submitRequest.error && submitRequest.errorMessage && (
            <ErrorTimedMessage
              visible={messageIsVisible}
              errorMessage={submitRequest.errorMessage}
            />
          )}
          {!submitRequest.error && submitRequest.message && (
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
