import exp from "constants";
import TimedMessage, {
  TimedMessagePropsType,
} from "../TimedMessage/TimedMessage";
import { ErrorMessageContainer } from "./StyledErrorMessage";

const ErrorTimedMessage = ({
  errorMessage,
}: {
  errorMessage: string | null;
}) => {
  return (
    <ErrorMessageContainer>
      <TimedMessage message={errorMessage}></TimedMessage>
    </ErrorMessageContainer>
  );
};

export default ErrorTimedMessage;
