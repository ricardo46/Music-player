import Footer from "../Footer/Footer";
import NavBar from "../NavBar/NavBar";
import {
  BackgroundImageStyled,
  LayoutContainer,
  PageContainer,
} from "./LayoutStyles";
import React from "react";
import LoadingAnimation from "../LoadingAnimation/LoadingAnimation";
import { useLayoutSubmitRequest } from "@/Contexts/LayoutContext";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../Header/Header";
import { MOBILE_MAX_WIDTH } from "@/globalVariables";
import { useRouter } from "next/router";

type Props = {
  children: JSX.Element;
};

const Layout = ({ children }: Props) => {
  const {
    layoutSubmitRequest,
    setLayoutSubmitRequest,
    clearLayoutSubmitRequest,
  } = useLayoutSubmitRequest();

  const maxMobileWidth = useMediaQuery(`(max-width:${MOBILE_MAX_WIDTH})`);

  const router = useRouter();
  

  return (
    <>
      <LayoutContainer>
        {layoutSubmitRequest.isLoading && <LoadingAnimation />}
        {!layoutSubmitRequest.isLoading && <Header />}
        <BackgroundImageStyled src="/layoutImage.jpg" />
        <PageContainer >{children}</PageContainer>
        {maxMobileWidth && <NavBar />}

        {!maxMobileWidth && <Footer />}
      </LayoutContainer>
    </>
  );
};

export default Layout;
