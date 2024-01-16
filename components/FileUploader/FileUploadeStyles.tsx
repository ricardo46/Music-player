import styled from "styled-components";
import { StyledButton } from "../StyledComponents/StyledComponents";
import { MAIN_COLOR } from "@/globalVariables";

const FileUploaderContainer = styled.div`
  /* display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 1rem; */
`;

const FileUploaderMobileButton = styled(StyledButton)`
  border: none;
  background-color: transparent;
`;

const FileUploaderLaptopButton = styled(FileUploaderMobileButton)`
  border: solid 2px ${MAIN_COLOR};
`;

export { FileUploaderContainer,FileUploaderMobileButton,FileUploaderLaptopButton };
