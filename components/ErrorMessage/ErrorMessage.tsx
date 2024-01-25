import TimedMessage from "../TimedMessage/TimedMessage";
import { ErrorMessageContainer } from "./StyledErrorMessage";
const ErrorTimedMessage = ({
  visible,
  errorMessage,
}: {
  visible: boolean;
  errorMessage: string;
}) => {
  return (
    <ErrorMessageContainer>
      <TimedMessage visible={visible} message={errorMessage}></TimedMessage>
    </ErrorMessageContainer>
  );
};

export default ErrorTimedMessage;
