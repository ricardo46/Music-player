import { useLayoutSubmitRequest } from "@/Contexts/LayoutContext";
import { useUser } from "@/Contexts/UserContext";
import { requireAuthentication } from "@/Utils/requireAuthentication";
import LoginForm from "@/components/LoginForm/LoginForm";
import { APP_NAME, LOGIN_PAGE_NAME, USER_PAGE_PATH } from "@/globalVariables";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

export async function getServerSideProps(context: any) {
  const currentUrl = context.resolvedUrl;

  return requireAuthentication(context, currentUrl);
}

const Login = ({ userData, errorAuth }: any) => {
  const { user, setUser, clearUser } = useUser();
  const router = useRouter();
  const {
    layoutSubmitRequest,
    setLayoutSubmitRequest,
    clearLayoutSubmitRequest,
  } = useLayoutSubmitRequest();

  useEffect(() => {
    if (errorAuth) {
      clearUser();
    }
    if (user.id == 0 && userData) {
      setUser(userData);
    }
    const error = errorAuth ? true : false;
    setLayoutSubmitRequest({
      error: error,
      submitted: true,
      isLoading: false,
      errorMessage: errorAuth ? errorAuth.message : null,
    });

    if (user.id != 0) {
      router.push(USER_PAGE_PATH);
    }
  }, []);
  return (
    <>
      <Head>
        <title>{`${APP_NAME} | ${LOGIN_PAGE_NAME}`}</title>
      </Head>
      {!layoutSubmitRequest.isLoading && <LoginForm />}
    </>
  );
};

export default Login;
