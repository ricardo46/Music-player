import { useEffect, useState } from "react";

type TimedMessagePropsType = {message: string | null}

const TimedMessage = ({message}:TimedMessagePropsType) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setVisible(false);
    }, 5000);
  });

  return <>{visible && <p>{message}</p>}</>;
};

export default TimedMessage;
