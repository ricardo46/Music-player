import axios from "axios";
import Footer from "../Footer/Footer";
import NavBar from "../NavBar/NavBar";
import { LayoutContainer, PageContainer } from "./LayoutStyles";
import { CookieValueTypes, deleteCookie, getCookie } from "cookies-next";
import React, { useState, useEffect } from "react";
import { useUser } from "@/Contexts/UserContext";
import { useRouter } from "next/router";
import LoadingAnimation from "../InputForm/LoadingAnimation";

type Props = {
  children: JSX.Element;
};

const Layout = ({ children }: Props) => {
  const [token, setToken] = useState<CookieValueTypes | null>(null);
  const { user, setUser, clearUser } = useUser();
  const router = useRouter();
  const [submitRequest, setSubmitRequest] = useState({
    isLoading: true,
    submitted: false,
    error: false,
    errorMessage: null,
  });

  useEffect(() => {
    console.log(
      'typeof getCookie("tokenCookie")',
      typeof getCookie("tokenCookie")
    );
    const authToken = getCookie("tokenCookie");
    console.log("authToken", authToken);
    setToken(authToken);

    const getUser = async () => {
      try {
        setSubmitRequest({
          isLoading: true,
          error: false,
          submitted: false,
          errorMessage: null,
        });

        const response = await axios.get(
          "https://x8ki-letl-twmt.n7.xano.io/api:71Gy7uAA/auth/me",
          { headers: { Authorization: "Bearer " + authToken } }
        );
        if (router.route == "/login" || router.route == "/register") {
          router.push("/user");
        }
        setSubmitRequest({
          error: false,
          submitted: true,
          isLoading: false,
          errorMessage: null,
        });
        const user = response.data;
        setUser({
          id: user.id,
          name: user.name,
          email: user.email,
        });
        console.log("responseAuth", response);
        
      } catch (err: any) {
        if (router.route == "/user") {
          router.push("/login");
        }
        setToken(null);

        clearUser();
        deleteCookie("tokenCookie");
        setSubmitRequest({
          error: true,
          submitted: true,
          errorMessage: err.response.data.message,
          isLoading: false,
        });

        console.log("error responseAuth", err);
        
        // console.log("router.route", router.route);
      }
    };
    getUser();
  }, [children]);

  return (
    <LayoutContainer>
      
     {submitRequest.isLoading && <LoadingAnimation />}

     {!submitRequest.isLoading && <NavBar />}
      <PageContainer> {children}</PageContainer>
      {/* {token && <p>{token}</p>} */}
      <Footer />
    </LayoutContainer>
  );
};

export default Layout;
