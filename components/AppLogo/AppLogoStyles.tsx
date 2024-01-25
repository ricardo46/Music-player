import { MAIN_COLOR } from "@/globalVariables";
import Image from "next/image";
import styled from "styled-components";
import AppLogoIcon from "../../components/Svgs/appLogoSvg.svg";

const AppLogoStyled = styled(AppLogoIcon)`
  fill: ${MAIN_COLOR};
  width: 25px;
  height: 2rem;
  justify-self: start;
`;


export { AppLogoStyled };
