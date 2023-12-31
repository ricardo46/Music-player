import { ChangeEvent, FormEvent, MouseEvent, useState, useEffect } from "react";
import MultipleInputForm, {
  submitRequestInterface,
} from "../MultipleInputForm/MultipleInputForm";
import axios, { AxiosError } from "axios";
import { setCookie, getCookie } from "cookies-next";
import { useRouter } from "next/router";
import { LOGIN_SUCCESS_REDIRECT_TIMEOUT } from "@/globalVariables";
// import { useLayoutSubmitRequest } from "@/Contexts/LayoutContext";
import { useUser } from "@/Contexts/UserContext";

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
  const { user, setUser, clearUser } = useUser();

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
        { email, password }
      );

      const authToken = response.data.authToken;

      setSubmitRequest({
        error: false,
        submitted: true,
        isLoading: false,
        errorMessage: null,
        message: "Login success!",
      });

      setCookie("tokenCookie", authToken, {
        maxAge: 60 * 30,
      });

      console.log("response", response);
      setTimeout(() => {
        router.push("/user");
      }, LOGIN_SUCCESS_REDIRECT_TIMEOUT);
    } catch (err: any) {
      setSubmitRequest({
        error: true,
        submitted: true,
        errorMessage: err.response.data.message,
        isLoading: false,
        message: null,
      });
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

export default LoginForm;
