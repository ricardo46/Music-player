import { useUser } from "@/Contexts/UserContext";
import { DashBoardMessage } from "../NavBar/NavBarStyles";
import { HeaderContainer } from "./HeaderStyles";
import AppLogo from "../AppLogo/AppLogo";
import { useMediaQuery } from "@mui/material";
import { MOBILE_MAX_WIDTH } from "@/globalVariables";
import NavBar from "../NavBar/NavBar";
import { useRouter } from "next/router";
import PageName from "../PageName/PageName";

export default function Header() {
  const { user, setUser, clearUser } = useUser();
  const maxMobileWidth = useMediaQuery(`(max-width:${MOBILE_MAX_WIDTH})`);
  const router = useRouter();

  return (
    <>
      <HeaderContainer>
        <AppLogo />
        <PageName/>
        {!maxMobileWidth && <NavBar />}
        {user.id != 0 && (
          <DashBoardMessage>{"Welcome " + user.name}</DashBoardMessage>
        )}
      </HeaderContainer>
    </>
  );
}
