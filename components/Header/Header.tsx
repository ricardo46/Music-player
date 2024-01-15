import { useUser } from "@/Contexts/UserContext";
import { DashBoardMessage } from "../NavBar/NavBarStyles";
import { HeaderContainer } from "./HeaderStyles";

export default function Header() {
  const { user, setUser, clearUser } = useUser();

  return (
    <>
      <HeaderContainer>
        <div>App Logo</div>
        {user.id != 0 && (
          <DashBoardMessage>{"Welcome " + user.name}</DashBoardMessage>
        )}
      </HeaderContainer>
    </>
  );
}
