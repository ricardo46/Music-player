import styled from "styled-components";
import {
  FormButton,
  FormContainer,
  FormInput,
  InputLabel,
  StyledForm,
} from "../MultipleInputForm/MultipleInputFormStyles";
import {
  INPUT_BACKGROUND_COLOR,
  INPUT_MAX_WIDTH,
  MAIN_FONT_COLOR,
  MOBILE_MAX_WIDTH,
} from "../../globalVariables";

const SearchSongsFormContainer = styled.section`
  max-width: ${INPUT_MAX_WIDTH};
  width: 90%;
  width: 100%;
  padding: 0 0 0.5rem;
  ${FormContainer} {
    align-items: end;

    width: 100%;
    position: relative;
    border-radius: 1rem;
    &:focus-within {
      /* box-shadow: 0px 0px 2px ${MAIN_FONT_COLOR}; */
    }
    @media (min-width: ${MOBILE_MAX_WIDTH}) {
      flex-direction: row;
      justify-content: center;
      border: none;
      margin-top: 1rem;
      height: 2rem;
      margin-bottom: 1rem;
    }
  }
  ${InputLabel} {
    width: 100%;
    /* height: 100%; */
    @media (min-width: ${MOBILE_MAX_WIDTH}) {
      height: 100%;

      position: absolute;
      right: 0;
    }
  }
  ${FormButton} {
    background-color: ${INPUT_BACKGROUND_COLOR};
    border-radius: 1rem;
    /* border-left: none; */
    padding-left: 0.7rem;
    z-index: 5;
    height: 1.5rem;
    font-size: 0.6rem;
    @media (min-width: ${MOBILE_MAX_WIDTH}) {
      height: 2rem;
      margin-right: 0;
      position: absolute;
      right: 0;
    }
  }

  ${FormInput} {
    border-radius: 1rem;
    width: 100%;
    padding-right: 0.7rem;
    height: 1.5rem;

    @media (min-width: ${MOBILE_MAX_WIDTH}) {
      height: 100%;
    }
  }

  ${StyledForm} {
    /* height: 3.5rem; */
    text-align: center;
    @media (min-width: 690px) {
    }
  }
`;
export { SearchSongsFormContainer };
