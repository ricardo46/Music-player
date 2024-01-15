import { useUser } from "@/Contexts/UserContext";
import { verifyAuthentication } from "@/Utils/userUtils";
import { getCookie } from "cookies-next";
import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  Dispatch,
  SetStateAction,
} from "react";
import { Button, ButtonProps } from "react-bootstrap";
import { BsPrefixRefForwardingComponent } from "react-bootstrap/esm/helpers";
import { IStyledComponent } from "styled-components";
import { Styled } from "styled-components/dist/constructors/constructWithOptions";
import { BaseObject } from "styled-components/dist/types";
import { submitRequestInterface } from "../MultipleInputForm/MultipleInputForm";
import { StyledButton } from "../StyledComponents/StyledComponents";

const ButtonWithAuthVerification: any = (
  {setSubmitRequest, buttonText}: {setSubmitRequest: Dispatch<SetStateAction<submitRequestInterface>>, buttonText: string}
) => {
  const { user, setUser, clearUser } = useUser();

  return (
    <>
      <StyledButton
        // onClick={() => {
        //   verifyAuthentication(
        //     getCookie("tokenCookie"),
        //     setSubmitRequest,
        //     clearUser,
        //     "Authentication error!"
        //   );
        // }}
      >{buttonText}</StyledButton>
    </>
  );
};

