import { ChangeEvent, FormEvent, MouseEvent, useState } from "react";

import axios from "axios";
import { setCookie } from "cookies-next";
import { useRouter } from "next/router";
import { REDIRECT_TIMEOUT, USER_PAGE_PATH } from "@/globalVariables";
import { submitRequestInterface } from "@/Utils/tsTypes";
import MultipleInputForm from "../MultipleInputForm/MultipleInputForm";

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
        router.push(USER_PAGE_PATH);
      }, REDIRECT_TIMEOUT);
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
      handleTextAreaClick={handleClick}
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
