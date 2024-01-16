import {
  NavContainer,
  NavLinksContainer,
} from "./NavBarStyles";
import { StyledLink } from "../StyledComponents/StyledComponents";
import { useUser } from "@/Contexts/UserContext";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/router";
import FileUploader from "../FileUploader/FileUploader";
import { useLayoutSubmitRequest } from "@/Contexts/LayoutContext";
import { useSongsPlaying } from "@/Contexts/SongsPlayingContext";
import {
  HomeIconStyled,
  LoginIconStyled,
  LogoutIconStyled,
  RegisterIconStyled,
  UserIconStyled,
} from "../Icons/Icons";
import { useMediaQuery } from "@mui/material";
import { MOBILE_MAX_WIDTH } from "@/globalVariables";

export default function NavBar() {
  const { user, setUser, clearUser } = useUser();
  const router = useRouter();
  const {
    layoutSubmitRequest,
    setLayoutSubmitRequest,
    clearLayoutSubmitRequest,
  } = useLayoutSubmitRequest();
  const { songsPlaying, setSongsPlaying } = useSongsPlaying();

  const logOutEvent = () => {
    clearUser();
    deleteCookie("tokenCookie");
  };

  const maxMobileWidth = useMediaQuery(`(max-width:${MOBILE_MAX_WIDTH})`);

  return (
    <>
      <NavContainer>
        {router.pathname != "/404" && (
          <NavLinksContainer>
            {user.id != 0 && (
              <StyledLink onClick={logOutEvent} href="/">
                {maxMobileWidth ? <LogoutIconStyled /> : "Logout"}
              </StyledLink>
            )}
            {router.pathname != "/" && (
              <StyledLink href="/">
                {maxMobileWidth ? <HomeIconStyled /> : "Home"}
              </StyledLink>
            )}
            {router.pathname == "/user" &&
              !layoutSubmitRequest.isLoading &&
              songsPlaying?.id == -1 && maxMobileWidth && <FileUploader />}
            {user.id != 0 && router.pathname != "/user" && (
              <StyledLink href="/user">
                {maxMobileWidth ? <UserIconStyled /> : "User"}
              </StyledLink>
            )}
            {user.id == 0 && router.pathname != "/login" && (
              <StyledLink href="/login">
                {maxMobileWidth ? <LoginIconStyled /> : "Login"}
              </StyledLink>
            )}

            {user.id == 0 && router.pathname != "/register" && (
              <StyledLink href="/register">
                {maxMobileWidth ? <RegisterIconStyled /> : "Register"}
              </StyledLink>
            )}
          </NavLinksContainer>
        )}
      </NavContainer>
    </>
  );
}
