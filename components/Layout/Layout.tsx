import Footer from "../Footer/Footer";
import NavBar from "../NavBar/NavBar";
import { LayoutContainer, PageContainer } from "./LayoutStyles";

type Props = {
  children: JSX.Element;
};

const Layout = ({ children }: Props) => {
  return (
    <LayoutContainer>
      <NavBar />
      <PageContainer> {children}</PageContainer>
      <Footer />
    </LayoutContainer>
  );
};

export default Layout;
