import { useLayoutSubmitRequest } from "@/Contexts/LayoutContext";
import { useUser } from "@/Contexts/UserContext";
import { requireAuthentication } from "@/Utils/requireAuthentication";
import RegisterForm from "@/components/RegisterForm/RegisterForm";
import { useRouter } from "next/router";
import { useEffect } from "react";

export async function getServerSideProps(context: any) {
  const currentUrl= context.resolvedUrl

  return requireAuthentication(context, currentUrl)
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
    console.log('user.id',user.id)
    if (user.id != 0) {
    console.log('user.id','zero')

      router.push("/user");
    }
  }, []);
  return (
    <>
      {/* <h3>Register Page</h3> */}

      <RegisterForm />
    </>
  );
};

export default Register;
