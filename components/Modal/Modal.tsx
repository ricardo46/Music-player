import { XIconStyled } from "../Icons/Icons";
import {
  StyledModalContainer,
  StyledTitle,
  StyledTop,
  StyledModalWindow,
} from "./ModalStyles";

const ModalContainer = ({
  children,
  onModalClose,
}: {
  children: any;
  onModalClose: () => void;
}) => {
  return (
    <StyledModalContainer onClick={onModalClose}>
      {children}
    </StyledModalContainer>
  );
};

const ModalWindow = ({ children }: { children: any }) => {
  return (
    <StyledModalWindow onClick={(e) => e.stopPropagation()}>
      {children}
    </StyledModalWindow>
  );
};

const Top = ({ children }: { children: any }) => {
  return <StyledTop>{children}</StyledTop>;
};

const Title = ({ children }: { children: any }) => {
  return <StyledTitle>{children}</StyledTitle>;
};

const CloseButton = ({
  children,
  onModalClose,
}: {
  children: any;
  onModalClose: () => void;
}) => {
  return <XIconStyled onClick={onModalClose}>{children}</XIconStyled>;
};

const Modal = ({
  children,
  onModalClose,
}: {
  children: any;
  onModalClose: () => void;
}) => {
  return (
    <ModalContainer onModalClose={onModalClose}>
      <ModalWindow>
        <Top>
          <CloseButton onModalClose={onModalClose}>X</CloseButton>
        </Top>
        {children}
      </ModalWindow>
    </ModalContainer>
  );
};

export { Modal, Top };
