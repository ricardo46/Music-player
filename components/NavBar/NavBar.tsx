import {
  DashBoardMessage,
  NavContainer,
  NavLinksContainer,
} from "./NavBarStyles";
import { StyledButton, StyledLink } from "../StyledComponents/StyledComponents";
import { useUser } from "@/Contexts/UserContext";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/router";
import FileUploader from "../FileUploader/FileUploader";
import { useLayoutSubmitRequest } from "@/Contexts/LayoutContext";
import { useSongsPlaying } from "@/Contexts/SongsPlayingContext";

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

  return (
    <>
      <NavContainer>
        {router.pathname != "/404" && (
          <NavLinksContainer>
            {user.id != 0 && (
              <StyledLink onClick={logOutEvent} href="/">
                Logout
              </StyledLink>
            )}
            {router.pathname != "/" && <StyledLink href="/">Home</StyledLink>}
            {router.pathname == "/user" &&
              !layoutSubmitRequest.isLoading &&
              songsPlaying?.id == -1 && <FileUploader />}
            {user.id != 0 && router.pathname != "/user" && (
              <StyledLink href="/user">User</StyledLink>
            )}
            {user.id == 0 && router.pathname != "/login"  && <StyledLink href="/login">Login</StyledLink>}
            {user.id == 0 && router.pathname != "/register"   && <StyledLink href="/register">Register</StyledLink>}
          </NavLinksContainer>
        )}
      </NavContainer>
    </>
  );
}
