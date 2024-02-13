import { MOBILE_MAX_WIDTH } from "@/globalVariables";
import styled from "styled-components";

const LayoutContainer = styled.div`
  display: grid;
  grid-template-rows: 2rem auto 2.5rem;
  box-sizing: border-box;
  height: 100vh;
  margin: 0 auto;
  padding: 0 1rem;
  overflow: auto;
  overflow-x: hidden;
  position: relative;
`;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: start;
  overflow: hidden;
  height: 100%;
  min-height: 27rem;
  align-items: center;
  
`;

const BackgroundImageStyled = styled.img`
  z-index: -10;
  position: absolute;
  opacity: 0.12;
  height: 100%;
`;

export { LayoutContainer, PageContainer, BackgroundImageStyled };
