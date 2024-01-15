import { useLayoutSubmitRequest } from "@/Contexts/LayoutContext";
import { UserType } from "@/Contexts/UserContext";
import { requireAuthentication } from "@/Utils/requireAuthentication";
import { REDIRECT_TIMEOUT } from "@/globalVariables";
import { useRouter } from "next/router";
import { useEffect } from "react";


const NotFound = () => {
  const router = useRouter();
  const {
    layoutSubmitRequest,
    setLayoutSubmitRequest,
    clearLayoutSubmitRequest,
  } = useLayoutSubmitRequest();
  
  useEffect(() => {
    setLayoutSubmitRequest({
        error: true,
        submitted: true,
        isLoading: false,
        errorMessage: 'That page cannot be found!',
      });
    setTimeout(() => {
      router.push("/user");
    }, REDIRECT_TIMEOUT);
  },[]);
  return (
    <>
      <h1>{layoutSubmitRequest.errorMessage}</h1>
      <p>Redirecting to home page...</p>
    </>
  );
};

export default NotFound;
