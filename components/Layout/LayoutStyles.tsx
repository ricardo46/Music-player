import { MOBILE_MAX_WIDTH } from "@/globalVariables";
import styled from "styled-components";

const LayoutContainer = styled.div`
  display: grid;
  grid-template-rows: 3rem auto 3rem;
  box-sizing: border-box;
  height: 100vh;
  margin: 0 auto;
  padding: 0 1rem;
  /* max-width: 100vw; */
`;

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: start;
  overflow: hidden;
  height: 100%;
  min-height: 15rem;
  align-items: center;
  /* overflow-y: auto; */
  /* display: flex;
  flex-direction: column;
  gap: 1rem; */
`;

export { LayoutContainer, PageContainer };
