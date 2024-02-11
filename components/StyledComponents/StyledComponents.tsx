import styled from "styled-components";
import {
  BUTTON_FONT_SIZE,
  BUTTON_MAX_WIDTH,
  ERROR_FONT_COLOR,
  FONT_WEIGHT,
  LAPTOP_WIDTH_ONE,
  LIST_NAME_MOBILE_FONT_SIZE,
  MAIN_COLOR,
  MAIN_FONT_COLOR,
  MOBILE_MAX_WIDTH,
  SUCCESS_FONT_COLOR,
} from "@/globalVariables";
import Link from "next/link";
import Select from "react-select";

const Message = styled.p`
  color: ${MAIN_FONT_COLOR};
  font-size: ${LIST_NAME_MOBILE_FONT_SIZE};
  margin: 0;
  white-space: pre-wrap;
  word-wrap: break-word;
  overflow-wrap: break-word;
  white-space: normal;
  text-align: center;
  @media (min-width: ${LAPTOP_WIDTH_ONE}) {
    font-size: 1rem;
  }
`;

const StyledInput = styled.input`
  height: 2rem;
  box-sizing: border-box;
  border-radius: 1rem;
  background-color: rgb(48, 48, 48);
  outline: none;
  padding: 0.3rem;
  border: gray 2px solid;
  text-align: center;
  &:focus {
  }
`;

const StyledButton = styled.button`
  padding: 0.3rem;
  height: 2rem;
  box-sizing: border-box;
  font-weight: ${FONT_WEIGHT};
  font-size: ${BUTTON_FONT_SIZE};
  border-radius: 1rem;
  border: gray 2px solid;
  color: ${MAIN_FONT_COLOR};
  border: 2px solid ${MAIN_COLOR};
  background-color: transparent;
  max-width: ${BUTTON_MAX_WIDTH};
  min-width: 5rem;
  cursor: pointer;
`;

const StyledImportantButton = styled(StyledButton)`
  color: red;
  border: solid red 2px;
`;

const StyledSelect = styled(Select)`
  .Select__control {
    border-radius: 1rem;
    height: 2rem;
    box-sizing: border-box;
    font-weight: 400;
    font-size: 0.8rem;
    color: ${MAIN_FONT_COLOR};
    text-align: center;
    background-color: transparent;
    border: 2px solid ${MAIN_COLOR};
    padding: 0 1rem 0;
    font-size: 1rem;
    font-weight: 700;
    cursor: pointer;
  }
  .Select__control:hover {
    border-color: #a1a1a1;
    z-index: 100;
  }

  .Select__control--is-focused {
    box-shadow: 0 0 0 1px black;
    outline: none;
    z-index: 100;
  }

  .Select__indicator-separator {
    display: none;
    z-index: 100;
  }

  .Select__menu {
    color: #3c3d3e;
    z-index: 100;
    font-size: 0.8rem;
  }
`;

const StyledLink = styled(Link)`
  font-weight: 400;
  text-decoration: none;
  color: ${MAIN_FONT_COLOR};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StyledSuccessMessage = styled(Message)`
  color: ${SUCCESS_FONT_COLOR};
  word-wrap: break-word;
  overflow-wrap: break-word;
  white-space: normal;
`;

const StyledErrorMessage = styled(Message)`
  color: ${ERROR_FONT_COLOR};
  word-wrap: break-word;
  overflow-wrap: break-word;
  white-space: normal;
`;

const DescriptionsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, 61px);
  gap: 1.5px;
  justify-content: center;
  height: auto;
  padding: 0.5rem 0 0;
  width: 100%;
  @media (min-width: ${MOBILE_MAX_WIDTH}) {
    grid-template-columns: repeat(auto-fit, 150px);
  }
`;

export {
  Message,
  StyledInput,
  StyledButton,
  StyledLink,
  StyledSelect,
  StyledErrorMessage,
  StyledSuccessMessage,
  StyledImportantButton,
  DescriptionsContainer,
};
