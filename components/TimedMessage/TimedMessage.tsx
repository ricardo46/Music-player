import { DetailedHTMLProps, HTMLAttributes, useEffect, useState } from "react";
import { ExecutionContext } from "styled-components";
import { StyledSuccessMessage } from "../StyledComponents/StyledComponents";

// export type TimedMessagePropsType = { message: string | null | any };

const TimedMessage = ({
  visible,
  message,
}: {
  visible: boolean;
  message: string;
}) => {
  // const [visible, setVisible] = useState(true);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setVisible(false);
  //   }, 15000);
  // },[]);

  return (
    <>{visible && <StyledSuccessMessage>{message}</StyledSuccessMessage>}</>
  );
};

export default TimedMessage;
