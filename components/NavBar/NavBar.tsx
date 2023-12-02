import Link from "next/link";
import { NavContainer, NavLinksContainer, StyledLink } from "./NavBarStyles";

export default function NavBar() {
  return (
    <>
      <NavContainer>
        <div>
          <h1>Music app</h1>
        </div>
        <NavLinksContainer>
          <StyledLink href="/">Home</StyledLink>
          <StyledLink href="/user">User</StyledLink>
          <StyledLink href="/login">Login</StyledLink>
          <StyledLink href="/register">Register</StyledLink>
        </NavLinksContainer>
      </NavContainer>
    </>
  );
}
