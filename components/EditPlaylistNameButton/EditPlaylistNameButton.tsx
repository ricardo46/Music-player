import { useSongsPlaying } from "@/Contexts/SongsPlayingContext";
import { StyledImportantButton } from "../StyledComponents/StyledComponents";
import { useState } from "react";
import { useUser } from "@/Contexts/UserContext";

import { useMediaQuery } from "@mui/material";
import { EditIconStyled, IconLabel, TrashIconStyled } from "../Icons/Icons";
import { LAPTOP_WIDTH_ONE } from "@/globalVariables";
import EditPlaylistNameButtonContainer from "./EditPlaylistNameButtonStyles";
import { EditPlaylistNameModal } from "../EditPlaylistNameModal/EditPlaylistNameModal";
import ButtonOrClickableIcon from "../ButtonOrClickableIcon/ButtonOrClickableIcon";

const EditPlaylistNameButton = () => {
  const { user, setUser } = useUser();

  const { songsPlaying, setSongsPlaying } = useSongsPlaying();

  const [editPlaylistNameModalVisible, setEditPlaylistNameModalVisible] =
    useState(false);

  const toggleEditPlaylistNameModal = () => {
    console.log('toggle edit list name modal')
    setEditPlaylistNameModalVisible(!editPlaylistNameModalVisible);
  };

  const maxMobileWidth = useMediaQuery(`(max-width:${LAPTOP_WIDTH_ONE})`);

  return (
    <EditPlaylistNameButtonContainer>
      {editPlaylistNameModalVisible && (
        <EditPlaylistNameModal
          toggleEditPlaylistNameModal={toggleEditPlaylistNameModal}
        />
      )}
      {songsPlaying && songsPlaying?.id > 0 && (
        <ButtonOrClickableIcon
          handleButtonClick={toggleEditPlaylistNameModal}
          IconStyled={EditIconStyled}
          label={"Edit playlist name"}
        />
      )}
    </EditPlaylistNameButtonContainer>
  );
};

export default EditPlaylistNameButton;
