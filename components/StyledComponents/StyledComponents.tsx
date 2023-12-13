import styled from "styled-components";
import {
  BUTTON_FONT_SIZE,
  BUTTON_MAX_WIDTH,
  ERROR_FONT_COLOR,
  FONT_COLOR,
  FONT_WEIGHT,
  INPUT_MAX_WIDTH,
  LAPTOP_MOVIE_CARD_FONT_SIZE,
  SECTION_TITLE_FONT_SIZE,
  SMALL_FONT_SIZE,
  SUCCESS_FONT_COLOR,
} from "@/globalVariables";
import Link from "next/link";

const Message = styled.p`
  color: ${FONT_COLOR};
  font-size: 0.6rem;
  margin: 0;
  white-space: pre-wrap;
  word-wrap: break-word;
  overflow-wrap: break-word;
  white-space: normal;
  text-align: center;
`;

const StyledInput = styled.input`
  height: 2rem;
  box-sizing: border-box;
  border-radius: 1rem;
  background-color: rgb(48, 48, 48);
  outline: none;
  padding: 0.3rem;
  border: gray 2px solid;
  color: white;
  text-align: center;
  max-width: ${INPUT_MAX_WIDTH};
  &:focus {
    /* box-shadow: 0px 0px 2px ${FONT_COLOR}; */
    /* border: none; */
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
  color: ${FONT_COLOR};
  max-width: ${BUTTON_MAX_WIDTH};
`;

const StyledSelect = styled.select`
  border-radius: 1rem;

  height: 2rem;
  box-sizing: border-box;
  font-weight: 400;
  font-size: 0.8rem;
  color: ${FONT_COLOR};
  text-align: center;
  background-color: gray;
  width: 90%;
  max-width: ${INPUT_MAX_WIDTH};
`;

const StyledLink = styled(Link)`
  font-weight: 400;
  text-decoration: none;
`;

const SectionContainer = styled.section`
  width: 100%;
  padding: 0 1rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  overflow-x: auto;
  gap: 0.5rem;
`;

const SuccessMessage = styled(Message)`
  color: ${SUCCESS_FONT_COLOR};
  word-wrap: break-word;
  overflow-wrap: break-word;
  white-space: normal;
`;

const ErrorMessage = styled(Message)`
  color: ${ERROR_FONT_COLOR};
  word-wrap: break-word;
  overflow-wrap: break-word;
  white-space: normal;
`;

const StyledInfo = styled.label`
  font-size: ${SMALL_FONT_SIZE};
  width: 100%;
  color: white;
  text-align: left;
  line-height: 0.9rem;

  @media (min-width: 768px) {
    font-size: ${LAPTOP_MOVIE_CARD_FONT_SIZE};
    line-height: 1rem;
  }
`;

const SectionTitle = styled.h3`
  font-size: ${SECTION_TITLE_FONT_SIZE};

  color: ${FONT_COLOR};
  text-align: left;
`;

const SmallImage = styled.img`
  display: block;
  width: 80px;
  height: auto;
`;

const ImageAndTextContainer = styled.div``;

const SpinnerContainer = styled.div`
  border: solid red 2px;
  display: "block";
  width: 10rem;
  height: 10rem;
  padding: 30;
`;

export {
  Message,
  StyledInput,
  StyledButton,
  StyledLink,
  SectionContainer,
  StyledSelect,
  ErrorMessage,
  SuccessMessage,
  StyledInfo,
  SectionTitle,
  SmallImage,
  ImageAndTextContainer,
  SpinnerContainer,
};
