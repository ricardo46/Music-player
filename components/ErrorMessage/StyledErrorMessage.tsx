import styled from "styled-components";
import TimedMessage from "../TimedMessage/TimedMessage";
import { TimedMessageContainer } from "../TimedMessage/TimedMessageStyles";

const ErrorMessageContainer = styled.div`
 ${TimedMessageContainer} {
    color: red;
  }
`;


export { ErrorMessageContainer };
