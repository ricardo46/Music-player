import { DashBoardMessage, NavContainer, NavLinksContainer } from "./NavBarStyles";
import { StyledButton, StyledLink } from "../StyledComponents/StyledComponents";
import { useUser } from "@/Contexts/UserContext";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/router";

export default function NavBar() {
  const { user, setUser, clearUser } = useUser();
  const router = useRouter();

  const logOutEvent = () => {
    clearUser();
    deleteCookie("tokenCookie");
    // router.push("/");
  };

  return (
    <>
      <NavContainer>
        <div>
          <h1>Music app</h1>
        </div>
        <NavLinksContainer>
          <StyledLink href="/">Home</StyledLink>
          {user.id != 0 && <StyledLink href="/user">User</StyledLink>}
          {user.id == 0 && <StyledLink href="/login">Login</StyledLink>}
          {user.id == 0 && <StyledLink href="/register">Register</StyledLink>}
          {user.id != 0 && (
            <StyledLink onClick={logOutEvent} href="/">
              Logout
            </StyledLink>
            // <StyledButton onClick={logOutEvent}>Logout</StyledButton>
          )}
        </NavLinksContainer>
        {user.id != 0 && (
          <DashBoardMessage>{"Welcome " + user.name}</DashBoardMessage>
        )}
        {/* <ul>
          <li>{"Welcome " + user.name}</li>
          <li>{"Email: " + user.email}</li>
          <li>{"ID: " + user.id}</li>
        </ul> */}
      </NavContainer>
    </>
  );
}
