import { useUser } from "@/Contexts/UserContext";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, MouseEvent, useState } from "react";
import MultipleInputForm, {
  submitRequestInterface,
} from "../InputForm/MultipleInputForm";
import axios from "axios";
import { REGISTER_SUCCESS_REDIRECT_TIMEOUT } from "@/globalVariables";

const RegisterForm = () => {
  const [name, setName] = useState("Enter Name");
  const [email, setEmail] = useState("Enter Email");
  const [password, setPassword] = useState("password");
  const { user, setUser } = useUser();
  const [submitRequest, setSubmitRequest] = useState<submitRequestInterface>({
    isLoading: false,
    submitted: false,
    error: false,
    errorMessage: null,
    message: null,
  });
  const router = useRouter();

  //   const {
  //     data: registerData,
  //     submitRequest: registerSubmitRequest,
  //     newFetch: newRegisterFetch,
  //   } = useGetAPIData();

  //   const {
  //     data: loginData,
  //     submitRequest: loginSubmitRequest,
  //     newFetch: newLoginFetch,
  //   } = useGetAPIData();

  //   const navigate = useNavigate();

  const onRegisterSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log("registering");

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
        { name, email, password } //pass: aaaa1111
      );

      setSubmitRequest({
        error: false,
        submitted: true,
        isLoading: false,
        errorMessage: null,
        message: "Register success!",
      });

      setTimeout(() => {
        router.push("/login");
      }, REGISTER_SUCCESS_REDIRECT_TIMEOUT);

      console.log("response", response);
    } catch (err: any) {
      setSubmitRequest({
        error: true,
        submitted: true,
        errorMessage: err.response.data.message,
        isLoading: false,
        message: null,
      });

      console.log("error", err);
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

  //   useEffect(() => {
  //     if (registerData.authToken) {
  //       newLoginFetch({
  //         apiParams: { email, password },
  //         apiRequest: logUserInAPI,
  //       });
  //     }
  //   }, [registerData]);

  //   useEffect(() => {
  //     if (loginData.user) {
  //       const authToken = loginData.authToken;
  //       setLocalStorageItem("authToken", authToken);
  //       const user = loginData.user;
  //       setUser({
  //         id: user.id,
  //         name: user.name,
  //         email: user.email,
  //         movieLists: user.movieLists,
  //       });
  //       setAuth(() => true);
  //       navigate("/myAccount");
  //     }
  //   }, [loginData]);

  const handleClick = (e: MouseEvent<HTMLInputElement>) => {
    if (e.currentTarget.name == "name") {
      setName("");
    }

    if (e.currentTarget.name == "email") {
      setEmail("");
    }
    if (e.currentTarget.name == "password") {
      setPassword("");
    }
  };

  return (
    <>
      <MultipleInputForm
        onFormSubmit={onRegisterSubmit}
        handleClick={handleClick}
        inputs={[
          { name: "name", type: "text", value: name },
          { name: "email", type: "email", value: email },
          { name: "password", type: "password", value: password },
        ]}
        submitRequest={submitRequest}
        submitButtonName={"Register"}
        onInputChange={onInputChange}
      />
    </>
  );
};

export default RegisterForm;
