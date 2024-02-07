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
import { SongInterface, submitRequestInterface } from "@/Utils/tsTypes";
import EditSongNameForm from "../EditSongNameForm/EditSongNameForm";

const EditSongNameModal = ({
  modalSong,
  toggleEditSongNameModal,
}: {
  modalSong: SongInterface | null;
  toggleEditSongNameModal: () => void;
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
  const [editSongNameMessageIsVisible, setEditSongNameMessageIsVisible] =
    useState(false);

  const handleEditSongName = async () => {
    toggleEditSongNameModal();
  };

  return (
    <Modal onModalClose={toggleEditSongNameModal}>
      <h4>{`Enter new name for song: ${modalSong?.name}.`}</h4>
      {modalSong && (
        <EditSongNameForm
          song={modalSong}
          handleEditSongName={handleEditSongName}
        />
      )}
      {submitRequest.errorMessage && (
        <ErrorTimedMessage
          visible={editSongNameMessageIsVisible}
          errorMessage={submitRequest.errorMessage}
        />
      )}
      {submitRequest.message && (
        <TimedMessage
          visible={editSongNameMessageIsVisible}
          message={submitRequest.message}
        />
      )}
      {submitRequest.isLoading && <LoadingAnimation />}
    </Modal>
  );
};

export { EditSongNameModal };
