import { useUser } from "@/Contexts/UserContext";
import { Modal } from "../Modal/Modal";
import {
  StyledButton,
} from "../StyledComponents/StyledComponents";
import {
  ChangeEvent,
  FormEvent,
  MouseEvent,
  useState,
} from "react";
import { getCookie } from "cookies-next";
import { patchUserDetails } from "@/Utils/backEndUtils";
import {
  submitRequestInterface,
} from "@/Utils/tsTypes";
import MultipleInputForm from "../MultipleInputForm/MultipleInputForm";
import { useRouter } from "next/router";

const UserDetailsModal = ({
  toggleUserDetailsModal,
}: {
  toggleUserDetailsModal: () => void;
}) => {
  const { user, setUser, clearUser } = useUser();
  const [addSongMessageIsVisible, setAddSongMessageIsVisible] = useState(false);

  const [editDetailsVisible, setEditDetailsVisible] = useState(false);

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

  const onUserDetailsSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const authToken = getCookie("tokenCookie");
      if (!authToken) {
        clearUser();
      } else {
        setSubmitRequest({
          isLoading: true,
          error: false,
          submitted: false,
          errorMessage: null,
          message: null,
        });

        const response = await patchUserDetails(
          user.id,
          { name, email, password },
          authToken
        );
        setUser((prev: any) => ({
          ...prev,
          name: name,
          email: email,
          password: password,
        }));

        setSubmitRequest({
          error: false,
          submitted: true,
          isLoading: false,
          errorMessage: null,
          message: "User details updated successfully!",
        });

        // setTimeout(() => {
        //   toggleUserDetailsModal();
        // }, MESSAGES_TIMEOUT);

        console.log("response success", response);
        toggleEditDetailsVisible();
      }
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

  const toggleEditDetailsVisible = () => {
    setEditDetailsVisible(!editDetailsVisible);
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

  return (
    <Modal onModalClose={toggleUserDetailsModal}>
      <h4>Your account details</h4>

      {editDetailsVisible ? (
        <MultipleInputForm
          onFormSubmit={onUserDetailsSubmit}
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
          submitButtonName={"Update details"}
          onInputChange={onInputChange}
        />
      ) : (
        <>
          <span>
            User name: <p>{user.name}</p>
          </span>
          <span>
            Email: <p>{user.email}</p>
          </span>
          <StyledButton onClick={toggleEditDetailsVisible}>
            Edit details
          </StyledButton>
        </>
      )}
    </Modal>
  );
};

export { UserDetailsModal };
