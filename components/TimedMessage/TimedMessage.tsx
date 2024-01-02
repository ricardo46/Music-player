import { DetailedHTMLProps, HTMLAttributes, useEffect, useState } from "react";
import { ExecutionContext } from "styled-components";
import { TimedMessageContainer } from "./TimedMessageStyles";

export type TimedMessagePropsType = { message: string | null | any };

const TimedMessage = ({ message }: TimedMessagePropsType) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setVisible(false);
    }, 5000);
  });

  return (
    <TimedMessageContainer>{visible && <p>{message}</p>}</TimedMessageContainer>
  );
};

export default TimedMessage;
