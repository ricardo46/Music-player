import styled from "styled-components";
import TimedMessage from "../TimedMessage/TimedMessage";
import { StyledSuccessMessage } from "../StyledComponents/StyledComponents";
import { ERROR_FONT_COLOR } from "@/globalVariables";

const ErrorMessageContainer = styled.div`
  ${StyledSuccessMessage} {
    color: ${ERROR_FONT_COLOR};
    word-wrap: break-word;
    overflow-wrap: break-word;
    white-space: normal;
  }
`;

export { ErrorMessageContainer };
