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

type Props = {
  children: JSX.Element;
};

const Layout = ({ children }: Props) => {
  const {
    layoutSubmitRequest,
    setLayoutSubmitRequest,
    clearLayoutSubmitRequest,
  } = useLayoutSubmitRequest();

  const router = useRouter();

  return (
    <LayoutContainer>
     
      {layoutSubmitRequest.isLoading && <LoadingAnimation />}

      {!layoutSubmitRequest.isLoading && <NavBar />}
      <PageContainer> {children}</PageContainer>
      <Footer />
    </LayoutContainer>
  );
};

export default Layout;
