import Link from "next/link";
import styled from "styled-components";

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const NavLinksContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

const NavContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid black;
`;

export { NavLinksContainer, NavContainer, StyledLink };
