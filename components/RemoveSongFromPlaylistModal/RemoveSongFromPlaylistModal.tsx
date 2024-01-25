import { useUser } from "@/Contexts/UserContext";
import ErrorTimedMessage from "../ErrorMessage/ErrorMessage";
import LoadingAnimation from "../LoadingAnimation/LoadingAnimation";
import { Modal } from "../Modal/Modal";
import {
  StyledButton,
  StyledImportantButton,
} from "../StyledComponents/StyledComponents";
import TimedMessage from "../TimedMessage/TimedMessage";
import { useState } from "react";
import { useSongsPlaying } from "@/Contexts/SongsPlayingContext";
import removeSongFromPlayList from "../SongsList/removeSongFromPlayList";
import { SongInterface, submitRequestInterface } from "@/Utils/tsTypes";

const RemoveSongFromPlaylistModal = ({
  modalSong,
  toggleRemoveSongFromPlaylistModal,
}: {
  modalSong: SongInterface | null;
  toggleRemoveSongFromPlaylistModal: () => void;
}) => {
  const { user, setUser } = useUser();
  const { songsPlaying, setSongsPlaying } = useSongsPlaying();
  const [submitRequest, setSubmitRequest] = useState<submitRequestInterface>({
    isLoading: false,
    submitted: false,
    error: false,
    errorMessage: null,
    message: null,
  });
  const [deleteSongMessageIsVisible, setDeleteSongMessageIsVisible] =
    useState(false);

  const handleRemoveSongFromPlaylist = async () => {
    if (songsPlaying&&modalSong) {
      await removeSongFromPlayList(
        songsPlaying,
        modalSong,
        setSubmitRequest,
        setUser,
        user,
        setSongsPlaying
      );
      toggleRemoveSongFromPlaylistModal();
    }
  };

  return (
    <Modal onModalClose={toggleRemoveSongFromPlaylistModal}>
      <h4>{`Remove ${modalSong?.name} from playlist ${songsPlaying?.name}?`}</h4>
      <StyledImportantButton onClick={handleRemoveSongFromPlaylist}>
        Yes
      </StyledImportantButton>
      <StyledButton onClick={toggleRemoveSongFromPlaylistModal}>
        No
      </StyledButton>
      {submitRequest.errorMessage && (
        <ErrorTimedMessage
          visible={deleteSongMessageIsVisible}
          errorMessage={submitRequest.errorMessage}
        />
      )}
      {submitRequest.message && (
        <TimedMessage
          visible={deleteSongMessageIsVisible}
          message={submitRequest.message}
        />
      )}
      {submitRequest.isLoading && <LoadingAnimation />}
    </Modal>
  );
};

export { RemoveSongFromPlaylistModal };
