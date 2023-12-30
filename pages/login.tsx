import { useLayoutSubmitRequest } from "@/Contexts/LayoutContext";
import { UserType, useUser } from "@/Contexts/UserContext";
import { requireAuthentication } from "@/Utils/requireAuthentication";
import LoginForm from "@/components/LoginForm/LoginForm";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect } from "react";

export async function getServerSideProps(context: any) {
  // let errorDataAuth = null;

  // const authToken = context.req.cookies.tokenCookie;

  // const responseAuth = await axios
  //   .get("https://x8ki-letl-twmt.n7.xano.io/api:71Gy7uAA/auth/me", {
  //     headers: { Authorization: "Bearer " + authToken },
  //   })
  //   .catch((err) => {
  //     console.log("errorDataAuth", err);
  //     errorDataAuth = err.response.data;
  //   });

  // let errorDataSong = null;
  // const responseSongs: any = await axios
  //   .get("https://x8ki-letl-twmt.n7.xano.io/api:71Gy7uAA/song")
  //   .catch((err) => {
  //     console.log("errorDataSong", err);
  //     // errorMessage=err.response.data.message
  //     errorDataSong = err.response.data;
  //   });

  // const user: UserType = responseAuth?.data ? responseAuth?.data : null;

  // console.log('errorDataAuth',errorDataAuth)

  // return {
  //   props: {
  //     // songs: responseSongs?.data || null,
  //     // errorSongs: errorDataSong,
  //     userData: user,
  //     errorAuth: errorDataAuth,
  //   },
  // };

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
    console.log("errorAuth", errorAuth);
    console.log("userDataaaaaa", userData);

    if (errorAuth) {
      console.log("errorAuth");
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

    console.log("user.id", user.id);
    if (user.id != 0) {
      console.log("user.id", "zero");
      router.push("/user");
    }
  }, []);
  return (
    <>
      <h3>Login Page</h3>
      <LoginForm />
      {console.log("user.name", user.name)}
    </>
  );
};

export default Login;
