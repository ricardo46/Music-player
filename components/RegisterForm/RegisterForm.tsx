import { useUser } from "@/Contexts/UserContext";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, MouseEvent, useState } from "react";

import axios from "axios";
import { LOGIN_PAGE_PATH, REDIRECT_TIMEOUT } from "@/globalVariables";
import { submitRequestInterface } from "@/Utils/tsTypes";
import MultipleInputForm from "../MultipleInputForm/MultipleInputForm";

const RegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitRequest, setSubmitRequest] = useState<submitRequestInterface>({
    isLoading: false,
    submitted: false,
    error: false,
    errorMessage: null,
    message: null,
  });
  const router = useRouter();

  const onRegisterSubmit = async (e: FormEvent<HTMLFormElement>) => {
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
        "https://x8ki-letl-twmt.n7.xano.io/api:71Gy7uAA/auth/signup",
        { name, email, password }
      );

      setSubmitRequest({
        error: false,
        submitted: true,
        isLoading: false,
        errorMessage: null,
        message: "Register success!",
      });

      setTimeout(() => {
        router.push(LOGIN_PAGE_PATH);
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

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.name == "name") {
      setName(e.target.value);
    }
    if (e.target.name == "email") {
      setEmail(e.target.value);
    }
    if (e.target.name == "password") {
      setPassword(e.target.value);
    }
  };

  const handleClick = (e: MouseEvent<HTMLInputElement>) => {
    if (e.currentTarget.name == "name") {
      // setName("");
    }

    if (e.currentTarget.name == "email") {
      // setEmail("");
    }
    if (e.currentTarget.name == "password") {
      // setPassword("");
    }
  };

  return (
    <>
      <MultipleInputForm
        onFormSubmit={onRegisterSubmit}
        handleTextAreaClick={handleClick}
        inputs={[
          { name: "name", type: "text", value: name, labelVisible: true },
          { name: "email", type: "email", value: email, labelVisible: true },
          {
            name: "password",
            type: "password",
            value: password,
            labelVisible: true,
          },
        ]}
        submitRequest={submitRequest}
        submitButtonName={"Register"}
        onInputChange={onInputChange}
      />
    </>
  );
};

export default RegisterForm;
