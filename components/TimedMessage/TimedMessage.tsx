import { StyledSuccessMessage } from "../StyledComponents/StyledComponents";

const TimedMessage = ({
  visible,
  message,
}: {
  visible: boolean;
  message: string;
}) => {
  return (
    <>{visible && <StyledSuccessMessage>{message}</StyledSuccessMessage>}</>
  );
};

export default TimedMessage;
