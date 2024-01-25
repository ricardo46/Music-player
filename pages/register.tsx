import { useLayoutSubmitRequest } from "@/Contexts/LayoutContext";
import { useUser } from "@/Contexts/UserContext";
import { requireAuthentication } from "@/Utils/requireAuthentication";
import RegisterForm from "@/components/RegisterForm/RegisterForm";
import {
  APP_NAME,
  REGISTER_PAGE_NAME,
  USER_PAGE_PATH,
} from "@/globalVariables";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

export async function getServerSideProps(context: any) {
  const currentUrl = context.resolvedUrl;

  return requireAuthentication(context, currentUrl);
}

const Register = () => {
  const { user, setUser, clearUser } = useUser();
  const router = useRouter();
  const {
    layoutSubmitRequest,
    setLayoutSubmitRequest,
    clearLayoutSubmitRequest,
  } = useLayoutSubmitRequest();
  useEffect(() => {
    setLayoutSubmitRequest({
      error: false,
      submitted: true,
      isLoading: false,
      errorMessage: null,
    });
    if (user.id != 0) {
      router.push(USER_PAGE_PATH);
    }
  }, []);
  return (
    <>
      <Head>
        <title>{`${APP_NAME} | ${REGISTER_PAGE_NAME}`}</title>
      </Head>
      <RegisterForm />
    </>
  );
};

export default Register;
