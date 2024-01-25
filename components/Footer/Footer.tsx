import { APP_NAME } from "@/globalVariables";
import { FooterContainer } from "./FooterStyles";

export default function Footer() {
  return (
    <>
      <FooterContainer>
        <div>Copyright 2023 {APP_NAME}</div>
      </FooterContainer>
    </>
  );
}
