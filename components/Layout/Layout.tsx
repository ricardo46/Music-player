import axios from "axios";
import Footer from "../Footer/Footer";
import NavBar from "../NavBar/NavBar";
import { LayoutContainer, PageContainer } from "./LayoutStyles";
import { CookieValueTypes, deleteCookie, getCookie } from "cookies-next";
import React, { useState, useEffect } from "react";
import { useUser } from "@/Contexts/UserContext";
import { useRouter } from "next/router";
import LoadingAnimation from "../LoadingAnimation/LoadingAnimation";
import { useLayoutSubmitRequest } from "@/Contexts/LayoutContext";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../Header/Header";
import { MOBILE_MAX_WIDTH } from "@/globalVariables";

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

  return (
    <>
      <LayoutContainer>
        {layoutSubmitRequest.isLoading && <LoadingAnimation />}
        {!layoutSubmitRequest.isLoading && <Header />}

        {/* {!layoutSubmitRequest.isLoading && <NavBar />} */}

        
        <PageContainer> {children}</PageContainer>
        {maxMobileWidth && <NavBar />}

        {!maxMobileWidth && <Footer />}
      </LayoutContainer>
    </>
  );
};

export default Layout;
