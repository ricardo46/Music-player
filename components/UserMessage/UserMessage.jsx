import {
  StyledErrorMessage,
  StyledSuccessMessage,
} from "../StyledComponents/StyledComponents";

const UserMessage = ({ type, messageContent }) => {
  return (
    <>
      {type == "error" && <StyledErrorMessage>{messageContent}</StyledErrorMessage>}
      {type == "success" && <StyledSuccessMessage>{messageContent}</StyledSuccessMessage>}
    </>
  );
};

export default UserMessage;
