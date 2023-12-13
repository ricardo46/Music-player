import styled from "styled-components";

const LayoutContainer = styled.div`
  display: grid;
  grid-template-rows: 4rem auto 3rem;
  box-sizing: border-box;
  height: 100vh;
  margin: 0 auto;
  /* max-width: 100vw; */
`;

const PageContainer = styled.div`
  overflow-y: auto;
`;

export { LayoutContainer, PageContainer };
