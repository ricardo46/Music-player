import styled from "styled-components";
import BackwardLogo from "../../components/Svgs/step-backward.svg";
import ForwardLogo from "../../components/Svgs/step-forward.svg";
import TrashIcon from "../../components/Svgs/trash.svg";
import AddToPlaylistIcon from "../../components/Svgs/books-medical.svg";
import RegisterIcon from "../../components/Svgs/user-add.svg";
import LoginIcon from "../../components/Svgs/enter.svg";
import HomeIcon from "../../components/Svgs/home.svg";
import LogoutIcon from "../../components/Svgs/exit.svg";
import UploadIcon from "../../components/Svgs/folder-upload.svg";
import UserIcon from "../../components/Svgs/user.svg";
import RemoveSongFromListIcon from "../../components/Svgs/minus-circle.svg";

import { MAIN_COLOR } from "@/globalVariables";

const UserIconStyled = styled(UserIcon)`
  fill: ${MAIN_COLOR};
  width: 25px;
  height: 2rem;
`;

const RemoveSongFromListIconStyled = styled(RemoveSongFromListIcon)`
  fill: ${MAIN_COLOR};
  width: 25px;
  height: 2rem;
`;

const UploadIconStyled = styled(UploadIcon)`
  fill: ${MAIN_COLOR};
  width: 25px;
  height: 2rem;
`;

const LogoutIconStyled = styled(LogoutIcon)`
  fill: ${MAIN_COLOR};
  width: 25px;
  height: 2rem;
`;

const HomeIconStyled = styled(HomeIcon)`
  fill: ${MAIN_COLOR};
  width: 25px;
  height: 2rem;
`;

const LoginIconStyled = styled(LoginIcon)`
  fill: ${MAIN_COLOR};
  width: 25px;
  height: 2rem;
`;

const RegisterIconStyled = styled(RegisterIcon)`
  fill: ${MAIN_COLOR};
  width: 25px;
  height: 2rem;
`;

const BackwardIconStyled = styled(BackwardLogo)`
  fill: ${MAIN_COLOR};
  width: 25px;
  height: 2rem;
`;

const ForwardIconStyled = styled(ForwardLogo)`
  fill: ${MAIN_COLOR};
  width: 25px;
  height: 2rem;
`;

const ForwardIconButton = styled.button``;

const TrashIconStyled = styled(TrashIcon)`
  fill: ${MAIN_COLOR};
  width: 25px;
  height: 2rem;
`;
const AddToPlaylistIconStyled = styled(AddToPlaylistIcon)`
  fill: ${MAIN_COLOR};
  width: 25px;
  height: 2rem;
`;

export {
  BackwardIconStyled,
  ForwardIconStyled,
  TrashIconStyled,
  AddToPlaylistIconStyled,
  RegisterIconStyled,
  LoginIconStyled,
  HomeIconStyled,
  LogoutIconStyled,
  UploadIconStyled,
  UserIconStyled,
  RemoveSongFromListIconStyled,
  ForwardIconButton,
};
