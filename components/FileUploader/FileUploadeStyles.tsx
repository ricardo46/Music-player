import styled from "styled-components";
import { StyledButton } from "../StyledComponents/StyledComponents";
import { MAIN_COLOR } from "@/globalVariables";

const FileUploaderContainer = styled.div`
`;

const FileUploaderMobileButton = styled(StyledButton)`
  border: none;
  background-color: transparent;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 2.2rem;
`;

const FileUploaderLaptopButton = styled(FileUploaderMobileButton)`
  border: solid 2px ${MAIN_COLOR};
  
`;

export {
  FileUploaderContainer,
  FileUploaderMobileButton,
  FileUploaderLaptopButton,
};
