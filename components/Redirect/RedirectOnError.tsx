import { LOGIN_PAGE_PATH, REDIRECT_TIMEOUT } from "@/globalVariables";
import { useRouter } from "next/router";
import { useEffect } from "react";
import ErrorTimedMessage from "../ErrorMessage/ErrorMessage";

interface RedirectOnErrorPropInterface {
  error: boolean;
  message: string;
}

const RedirectOnError = ({ error, message }: RedirectOnErrorPropInterface) => {
  const router = useRouter();

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        router.push(LOGIN_PAGE_PATH);
      }, REDIRECT_TIMEOUT);
    }
  }, [error]);
  return (
    <>
      {error && <ErrorTimedMessage visible={true} errorMessage={message} />}
    </>
  );
};

export default RedirectOnError;
