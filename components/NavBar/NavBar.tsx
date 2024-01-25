import { NavContainer, NavLinksContainer } from "./NavBarStyles";
import { StyledLink } from "../StyledComponents/StyledComponents";
import { useUser } from "@/Contexts/UserContext";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/router";
import FileUploader from "../FileUploader/FileUploader";
import { useLayoutSubmitRequest } from "@/Contexts/LayoutContext";
import { useSongsPlaying } from "@/Contexts/SongsPlayingContext";
import {
  HomeIconStyled,
  IconLabel,
  LoginIconStyled,
  LogoutIconStyled,
  RegisterIconStyled,
  UserIconStyled,
} from "../Icons/Icons";
import { useMediaQuery } from "@mui/material";
import {
  HOME_PAGE_NAME,
  HOME_PAGE_PATH,
  LOGIN_PAGE_NAME,
  LOGIN_PAGE_PATH,
  MOBILE_MAX_WIDTH,
  REGISTER_PAGE_NAME,
  REGISTER_PAGE_PATH,
  SONGS_UPLOADED_BY_CURRENT_USER_LIST_ID,
  USER_PAGE_NAME,
  USER_PAGE_PATH,
} from "@/globalVariables";

export default function NavBar() {
  const { user, setUser, clearUser } = useUser();
  const router = useRouter();
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
              <StyledLink onClick={logOutEvent} href={HOME_PAGE_PATH}>
                {maxMobileWidth ? (
                  <>
                    <LogoutIconStyled />
                    <IconLabel>Logout</IconLabel>
                  </>
                ) : (
                  "Logout"
                )}
              </StyledLink>
            )}
            {user.id == 0 && router.pathname != HOME_PAGE_PATH && (
              <StyledLink href={HOME_PAGE_PATH}>
                {maxMobileWidth ? (
                  <>
                    <HomeIconStyled />
                    <IconLabel>Home</IconLabel>
                  </>
                ) : (
                  HOME_PAGE_NAME
                )}
              </StyledLink>
            )}

            {user.id != 0 && router.pathname != USER_PAGE_PATH && (
              <StyledLink href={USER_PAGE_PATH}>
                {maxMobileWidth ? (
                  <>
                    <UserIconStyled />
                    <IconLabel>User</IconLabel>
                  </>
                ) : (
                  USER_PAGE_NAME
                )}
              </StyledLink>
            )}
            {user.id == 0 && router.pathname != LOGIN_PAGE_PATH && (
              <StyledLink href={LOGIN_PAGE_PATH}>
                {maxMobileWidth ? (
                  <>
                    <LoginIconStyled />
                    <IconLabel>Login</IconLabel>
                  </>
                ) : (
                  LOGIN_PAGE_NAME
                )}
              </StyledLink>
            )}

            {user.id == 0 && router.pathname != REGISTER_PAGE_PATH && (
              <StyledLink href={REGISTER_PAGE_PATH}>
                {maxMobileWidth ? (
                  <>
                    <RegisterIconStyled />
                    <IconLabel>Register</IconLabel>
                  </>
                ) : (
                  REGISTER_PAGE_NAME
                )}
              </StyledLink>
            )}
          </NavLinksContainer>
        )}
      </NavContainer>
    </>
  );
}
