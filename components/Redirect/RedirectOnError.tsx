import { REDIRECT_TIMEOUT } from "@/globalVariables";
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
        router.push("/login");
      }, REDIRECT_TIMEOUT);
    }
  }, [error]);
  return (
    <>
      {console.log("errorRedirect", error)}
      {error && <ErrorTimedMessage visible={true} errorMessage={message} />}
    </>
  );
};

export default RedirectOnError;
