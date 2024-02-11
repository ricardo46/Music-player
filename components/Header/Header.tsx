import { useUser } from "@/Contexts/UserContext";
import { DashBoardMessage } from "../NavBar/NavBarStyles";
import { HeaderContainer } from "./HeaderStyles";
import AppLogo from "../AppLogo/AppLogo";
import { useMediaQuery } from "@mui/material";
import { MOBILE_MAX_WIDTH } from "@/globalVariables";
import NavBar from "../NavBar/NavBar";
import { useRouter } from "next/router";
import PageName from "../PageName/PageName";
import { UserDetailsModal } from "../UserDetailsModal/UserDetailsModal";
import { useState } from "react";
import { StyledButton } from "../StyledComponents/StyledComponents";

export default function Header() {
  const { user } = useUser();
  const maxMobileWidth = useMediaQuery(`(max-width:${MOBILE_MAX_WIDTH})`);

  const [userDetailsModalModalVisible, setUserDetailsModalModalVisible] = useState(false);

  const toggleUserDetailsModal = () => {
    setUserDetailsModalModalVisible(!userDetailsModalModalVisible);
  };

  const handleUserDetails = () => {

    toggleUserDetailsModal();
  };

  return (
    <>
      <HeaderContainer>
        <AppLogo />
        <PageName />
        {user.id != 0 && (
          <DashBoardMessage>
            Welcome{" "}
            {<StyledButton onClick={() => handleUserDetails()}>{user.name}</StyledButton>}
          </DashBoardMessage>
        )}
        {!maxMobileWidth && <NavBar />}

      </HeaderContainer>
      {userDetailsModalModalVisible && (
        <UserDetailsModal toggleUserDetailsModal={toggleUserDetailsModal} />
      )}
    </>
  );
}
