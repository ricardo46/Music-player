import { useLayoutSubmitRequest } from "@/Contexts/LayoutContext";
import {
  APP_NAME,
  ERROR_PAGE_NAME,
  HOME_PAGE_NAME,
  HOME_PAGE_PATH,
  REDIRECT_TIMEOUT,
} from "@/globalVariables";
import Head from "next/head";
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
      errorMessage: "That page cannot be found!",
    });
    setTimeout(() => {
      router.push(HOME_PAGE_PATH);
    }, REDIRECT_TIMEOUT);
  }, []);
  return (
    <>
      <Head>
        <title>{`${APP_NAME} | ${ERROR_PAGE_NAME}`}</title>
      </Head>
      {!layoutSubmitRequest.isLoading && (
        <>
          <h1>{layoutSubmitRequest.errorMessage}</h1>
          <p>Redirecting to {HOME_PAGE_NAME} page...</p>
        </>
      )}
    </>
  );
};

export default NotFound;
