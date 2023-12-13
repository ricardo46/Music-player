import { ChangeEvent, FormEvent, MouseEvent, useState, useEffect } from "react";
import MultipleInputForm, { submitRequestInterface } from "../InputForm/MultipleInputForm";
import axios, { AxiosError } from "axios";
import { setCookie, getCookie } from "cookies-next";
import { useRouter } from "next/router";
import { LOGIN_SUCCESS_REDIRECT_TIMEOUT } from "@/globalVariables";

const LoginForm = () => {
  const [email, setEmail] = useState("Insert email");
  const [password, setPassword] = useState("Insert password");
  const [submitRequest, setSubmitRequest] = useState<submitRequestInterface>({
    isLoading: false,
    submitted: false,
    error: false,
    errorMessage: null,
    message: null,
  });
  const router = useRouter();

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.name == "email") {
      setEmail(e.target.value);
    }
    if (e.target.name == "password") {
      setPassword(e.target.value);
    }
  };

  const onLoginSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log("submit login");

    try {
      setSubmitRequest({
        isLoading: true,
        error: false,
        submitted: false,
        errorMessage: null,
        message: null,
      });
      const response = await axios.post(
        "https://x8ki-letl-twmt.n7.xano.io/api:71Gy7uAA/auth/login",
        { email, password } //pass: aaaa1111
      );

      const authToken = response.data.authToken;

      setSubmitRequest({
        error: false,
        submitted: true,
        isLoading: false,
        errorMessage: null,
        message: 'Login success!',
      });

      setCookie("tokenCookie", authToken, {
        maxAge: 60 * 60,
      });
      console.log("setting cookie", authToken);
      setTimeout(() => {
        router.push("/user");
      }, LOGIN_SUCCESS_REDIRECT_TIMEOUT);
      // router.push("/user");

      // console.log("response", response);
    } catch (err: any) {
      setSubmitRequest({
        error: true,
        submitted: true,
        errorMessage: err.response.data.message,
        isLoading: false,
        message: null,
      });

      // console.log("error submit request", submitRequest);
    }
  };

  const handleClick = (e: MouseEvent<HTMLInputElement>) => {
    if (e.currentTarget.name == "email") {
      setEmail("");
    }
    if (e.currentTarget.name == "password") {
      setPassword("");
    }
  };

  return (
    <MultipleInputForm
      onFormSubmit={onLoginSubmit}
      handleClick={handleClick}
      inputs={[
        { name: "email", type: "email", value: email },
        { name: "password", type: "password", value: password },
      ]}
      submitRequest={submitRequest}
      submitButtonName={"Login"}
      onInputChange={onInputChange}
    />
  );
};

// export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
//   // res.setHeader('Set-Cookie', cookie.serialize('token', req.body.token))

//   // const cookie = serialize("ssr-cookie", "ssr-cookie-value", {
//   //   httpOnly: true,
//   //   path: "/",
//   // });
//   // res.setHeader("Set-Cookie", cookie);
//   return {
//     props: {token: req.cookies.token},
//   };
// };

export default LoginForm;
