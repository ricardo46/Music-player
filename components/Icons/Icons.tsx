import styled from "styled-components";
import BackwardLogo from "../../components/Svgs/step-backward.svg";
import ForwardLogo from "../../components/Svgs/step-forward.svg";
import TrashIcon from "../../components/Svgs/trash.svg";
import AddToPlaylistIcon from "../../components/Svgs/add.svg";
import RegisterIcon from "../../components/Svgs/user-add.svg";
import LoginIcon from "../../components/Svgs/enter.svg";
import HomeIcon from "../../components/Svgs/home.svg";
import LogoutIcon from "../../components/Svgs/exit.svg";
import UploadIcon from "../../components/Svgs/folder-upload.svg";
import UserIcon from "../../components/Svgs/user.svg";
import RemoveSongFromListIcon from "../../components/Svgs/minus-circle.svg";

import Back15Icon from "../../components/Svgs/back-15.svg";
import Forward15Icon from "../../components/Svgs/forward-15.svg";
import PlayIcon from "../../components/Svgs/play.svg";
import PauseIcon from "../../components/Svgs/pause.svg";
import XIcon from "../../components/Svgs/circle-xmark.svg";

import {
  BIG_ICON_WIDTH,
  LAPTOP_WIDTH_ONE,
  MAIN_COLOR,
  NAV_SMALL_ICON_HEIGHT,
  SMALL_ICON_WIDTH,
} from "@/globalVariables";

const XIconStyled = styled(XIcon)`
  fill: ${MAIN_COLOR};
  width: ${BIG_ICON_WIDTH};
  height: 2rem;
`;

const PlayIconStyled = styled(PlayIcon)`
  fill: ${MAIN_COLOR};
  width: ${BIG_ICON_WIDTH};
  height: 2rem;
`;

const PauseIconStyled = styled(PauseIcon)`
  fill: ${MAIN_COLOR};
  width: ${BIG_ICON_WIDTH};
  height: 2rem;
`;

const Back15IconStyled = styled(Back15Icon)`
  width: ${BIG_ICON_WIDTH};
  height: 2rem;
`;

const Forward15IconStyled = styled(Forward15Icon)`
  width: ${BIG_ICON_WIDTH};
  height: 2rem;
`;

const UserIconStyled = styled(UserIcon)`
  fill: ${MAIN_COLOR};
  width: ${BIG_ICON_WIDTH};
  height: ${NAV_SMALL_ICON_HEIGHT};
`;

const RemoveSongFromListIconStyled = styled(RemoveSongFromListIcon)`
  fill: ${"red"};
  width: ${SMALL_ICON_WIDTH};
  height: 1.5rem;
  @media (min-width: ${LAPTOP_WIDTH_ONE}) {
    /* height: 2rem; */
    width: ${BIG_ICON_WIDTH};
  }
`;

const UploadIconStyled = styled(UploadIcon)`
  fill: ${MAIN_COLOR};
  width: ${BIG_ICON_WIDTH};
  height: 1.5rem;
`;

const LogoutIconStyled = styled(LogoutIcon)`
  fill: ${MAIN_COLOR};
  width: ${BIG_ICON_WIDTH};
  height: ${NAV_SMALL_ICON_HEIGHT};
`;

const HomeIconStyled = styled(HomeIcon)`
  fill: ${MAIN_COLOR};
  width: ${BIG_ICON_WIDTH};
  height: ${NAV_SMALL_ICON_HEIGHT};
`;

const LoginIconStyled = styled(LoginIcon)`
  fill: ${MAIN_COLOR};
  width: ${BIG_ICON_WIDTH};
  height: ${NAV_SMALL_ICON_HEIGHT};

  
`;

const RegisterIconStyled = styled(RegisterIcon)`
  fill: ${MAIN_COLOR};
  width: ${BIG_ICON_WIDTH};
  height: ${NAV_SMALL_ICON_HEIGHT};
`;

const BackwardIconStyled = styled(BackwardLogo)`
  fill: ${MAIN_COLOR};
  width: ${BIG_ICON_WIDTH};
  height: 2rem;
`;

const ForwardIconStyled = styled(ForwardLogo)`
  fill: ${MAIN_COLOR};
  width: ${BIG_ICON_WIDTH};
  height: 2rem;
`;

const ForwardIconButton = styled.button``;

const TrashIconStyled = styled(TrashIcon)`
  fill: ${"red"};
  width: ${SMALL_ICON_WIDTH};
  height: 1.5rem;
  @media (min-width: ${LAPTOP_WIDTH_ONE}) {
    /* height: 2rem; */
    width: ${BIG_ICON_WIDTH};
  }
`;
const AddToPlaylistIconStyled = styled(AddToPlaylistIcon)`
  fill: ${MAIN_COLOR};
  width: ${SMALL_ICON_WIDTH};
  height: 1.5rem;
  @media (min-width: ${LAPTOP_WIDTH_ONE}) {
    /* height: 2rem; */
    width: ${BIG_ICON_WIDTH};
  }
`;

const IconLabel=styled.label`
  font-size: .6rem;
  font-weight: 500;
`

export {
  IconLabel,
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
  Back15IconStyled,
  Forward15IconStyled,
  PlayIconStyled,
  PauseIconStyled,
  XIconStyled,
};
