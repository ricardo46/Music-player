import styled from "styled-components";
import { StyledButton } from "../StyledComponents/StyledComponents";
import { LAPTOP_WIDTH_ONE } from "@/globalVariables";

const DeletePlaylistButtonContainer = styled.div`
  ${StyledButton} {
    border: none;
    color: red;
    @media (min-width: ${LAPTOP_WIDTH_ONE}) {
      border: solid 2px red;
    }
  }
`;
export default DeletePlaylistButtonContainer;
