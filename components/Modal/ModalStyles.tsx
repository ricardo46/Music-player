import styled from "styled-components";
import {
  StyledButton,
  StyledInput,
  StyledSelect,
} from "../StyledComponents/StyledComponents";

const StyledOpenButton = styled.button`
  width: 100%;
  background-color: #c0c0c0;
  padding: 3rem;
  font-size: 2rem;
  font-weight: 700;
  font-family: arial;

  color: rgb(255, 255, 255);
  border: solid 5px rgb(0, 0, 0);
  border-radius: 20px;
`;

const HomePageBase = styled.div`
  font-family: Arial sans-serif;
  width: 100%;
  overflow: hidden;
  background-color: lightgray;

  border: solid 0.5rem white;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
`;

const HomeParagraphStyled = styled.p`
  padding: 4rem;
  line-height: 2rem;
`;

const StyledModalContainer = styled.div`
  z-index: 15;
  margin: 50;
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(41, 39, 39, 0.8);
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const StyledModalWindow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 95%;
  border: 1px solid #eaeaea;
  border-radius: 5px;
  background-color: #ffffff;
  position: fixed;
  top: 5vw;
  box-sizing: border-box;
  margin: 1rem;
  padding: 1rem;
  gap: 1rem;
  ${StyledSelect}, ${StyledInput}, ${StyledButton} {
    width: 100%;
  }
`;

const StyledTop = styled.div`
width: 100%;
  display: flex;
  justify-content: end;
  border-bottom: 1px solid rgba(211, 211, 212, 0.575);
  margin: 0;
`;

const StyledTitle = styled.h2`
  margin: 0;
  padding: 0 0 0.6rem;
`;

const StyledCloseButton = styled.button`
  background-color: transparent;
  font-weight: 900;
  font-size: 0.8rem;
`;

// const CloseButtonContainer = styled.div`
// width: 100%;
//   display: flex;
// justify-content: end;
// align-items: end;
// `;

const StyledParagraph = styled.p`
  text-align: justify;
  text-justify: inter-word;
  margin: 0 0 1.5rem;
  padding: 0;
  font-size: 0.9rem;
  line-height: normal;
`;

// const StyledModalButton = styled.button`
//   background-color: ${({ variant }) =>
//     variant == "ACCEPT" ? "rgb(67, 224, 119)" : "rgb(237, 72, 72)"};
//   margin: 0.2rem;
//   color: white;
//   border-radius: 3px;
//   height: 1.6rem;
//   font-size: 0.6rem;
//   width: 4.7rem;
// `;

const StyledButtonsContainer = styled.div`
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: end;
`;

export {
  StyledOpenButton,
  HomePageBase,
  HomeParagraphStyled,
  StyledModalContainer,
  StyledTop,
  StyledTitle,
  StyledCloseButton,
  StyledParagraph,
  StyledModalWindow,
  StyledButtonsContainer,
};
