import { useSongsPlaying } from "@/Contexts/SongsPlayingContext";
import { StyledImportantButton } from "../StyledComponents/StyledComponents";
import { useState } from "react";
import { useUser } from "@/Contexts/UserContext";
import { DeletePlaylistModal } from "../DeletePlaylistModal/DeletePlaylistModal";
import DeletePlaylistButtonContainer from "./DeletePlaylistButtonStyles";
import { useMediaQuery } from "@mui/material";
import { TrashIconStyled } from "../Icons/Icons";
import { LAPTOP_WIDTH_ONE } from "@/globalVariables";

const DeletePlaylistButton = () => {
  const { user, setUser } = useUser();

  const { songsPlaying, setSongsPlaying } = useSongsPlaying();

  const [deletePlaylistModalVisible, setDeletePlaylistModalVisible] =
    useState(false);

  const toggleDeletePlaylistModal = () => {
    setDeletePlaylistModalVisible(!deletePlaylistModalVisible);
  };

  const maxMobileWidth = useMediaQuery(`(max-width:${LAPTOP_WIDTH_ONE})`);

  return (
    <DeletePlaylistButtonContainer>
      {deletePlaylistModalVisible && (
        <DeletePlaylistModal
          toggleDeletePlaylistModal={toggleDeletePlaylistModal}
        />
      )}
      {songsPlaying &&
        songsPlaying?.id > 0 &&
        (maxMobileWidth ? (
          <TrashIconStyled
            onClick={toggleDeletePlaylistModal}
            data-testid="deletePlayListButton"
          >
            Delete selected playlist
          </TrashIconStyled>
        ) : (
          <StyledImportantButton
            onClick={toggleDeletePlaylistModal}
            data-testid="deletePlayListButton"
          >
            Delete selected playlist
          </StyledImportantButton>
        ))}
    </DeletePlaylistButtonContainer>
  );
};

export default DeletePlaylistButton;
