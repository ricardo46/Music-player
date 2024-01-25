import {  useUser } from "@/Contexts/UserContext";
import ErrorTimedMessage from "../ErrorMessage/ErrorMessage";
import LoadingAnimation from "../LoadingAnimation/LoadingAnimation";
import { Modal } from "../Modal/Modal";
import { StyledButton, StyledImportantButton } from "../StyledComponents/StyledComponents";
import TimedMessage from "../TimedMessage/TimedMessage";
import {
  removePlaylistFromList,
} from "@/Utils/userUtils";
import { useState } from "react";
import { getCookie } from "cookies-next";
import { deletePlaylist } from "@/Utils/backEndUtils";
import { useSongsPlaying } from "@/Contexts/SongsPlayingContext";
import { useAllSongs } from "@/Contexts/AllSongsContext";
import  { getUserUploadedSongsObj } from "@/Utils/listOfSongsObj";
import { ListOfSongs, submitRequestInterface } from "@/Utils/tsTypes";

const DeletePlaylistModal = ({
  toggleDeletePlaylistModal,
}: {
  toggleDeletePlaylistModal: () => void;
}) => {
  const { user, setUser } = useUser();
  const { songsPlaying, setSongsPlaying } = useSongsPlaying();
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

  const handleDeletePlaylist = async () => {
    try {
      const authToken = getCookie("tokenCookie");
      setSubmitRequest({
        isLoading: true,
        error: false,
        submitted: false,
        errorMessage: null,
        message: null,
      });

      if (songsPlaying && user.playLists) {
        await deletePlaylist(user.id, songsPlaying.id, authToken);

        const newPlaylists: ListOfSongs[] = removePlaylistFromList(
          user.playLists,
          songsPlaying.id
        );
        setUser((prev: any) => ({
          ...prev,
          playLists: newPlaylists,
        }));

        setSongsPlaying(
          getUserUploadedSongsObj(
            user.uploadedSongs,
            user
          )
        );
      }

      setSubmitRequest({
        error: false,
        submitted: true,
        isLoading: false,
        errorMessage: null,
        message: "Playlist deleted from backend!",
      });
    } catch (err: any) {
      console.log("error deleting Playlist", err);

      setSubmitRequest({
        error: true,
        submitted: true,
        errorMessage: `Error deleting Playlist! ${
          err.response
            ? err.response.data.message
            : err.message
            ? err.message
            : "Error on delete song request!"
        }`,
        isLoading: false,
        message: null,
      });
    }
    toggleDeletePlaylistModal();
  };

  return (
    <Modal onModalClose={toggleDeletePlaylistModal}>
      <h4>{`Delete playlist ${songsPlaying?.name}?`}</h4>
      <StyledImportantButton onClick={handleDeletePlaylist}>Yes</StyledImportantButton>
      <StyledButton onClick={toggleDeletePlaylistModal}>No</StyledButton>
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

export { DeletePlaylistModal };
