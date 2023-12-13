import {
  ErrorMessage,
  SuccessMessage,
} from "../StyledComponents/StyledComponents";

const UserMessage = ({ type, messageContent }) => {
  return (
    <>
      {type == "error" && <ErrorMessage>{messageContent}</ErrorMessage>}
      {type == "success" && <SuccessMessage>{messageContent}</SuccessMessage>}
    </>
  );
};

export default UserMessage;
