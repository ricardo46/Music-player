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
import { useAllSongs } from "@/Contexts/AllSongsContext";
import deleteSong from "../SongsList/deleteSong";
import { SongInterface, submitRequestInterface } from "@/Utils/tsTypes";

const DeleteSongModal = ({
  modalSong,
  toggleDeleteSongModal,
}: {
  modalSong: SongInterface | null;
  toggleDeleteSongModal: () => void;
}) => {
  const { user, setUser } = useUser();
  const { setSongsPlaying } = useSongsPlaying();
  const { allSongs, setAllSongs } = useAllSongs();
  const [submitRequest, setSubmitRequest] = useState<submitRequestInterface>({
    isLoading: false,
    submitted: false,
    error: false,
    errorMessage: null,
    message: null,
  });
  const [deleteSongMessageIsVisible, setDeleteSongMessageIsVisible] =
    useState(false);

  const handleDeleteSong = async () => {
    if (modalSong) {
      await deleteSong(
        user,
        setUser,
        setSongsPlaying,
        modalSong.song_id,
        setSubmitRequest,
        setDeleteSongMessageIsVisible,
        allSongs,
        setAllSongs
      );
      toggleDeleteSongModal();
    }
  };

  return (
    <Modal onModalClose={toggleDeleteSongModal}>
      <h4>{`Delete ${modalSong?.name} permanently?`}</h4>
      <StyledImportantButton onClick={handleDeleteSong}>
        Yes
      </StyledImportantButton>
      <StyledButton onClick={toggleDeleteSongModal}>No</StyledButton>
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

export { DeleteSongModal };
