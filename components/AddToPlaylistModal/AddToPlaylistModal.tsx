import { useUser } from "@/Contexts/UserContext";
import DropDown from "../DropDown/DropDown";
import ErrorTimedMessage from "../ErrorMessage/ErrorMessage";
import LoadingAnimation from "../LoadingAnimation/LoadingAnimation";
import { Modal } from "../Modal/Modal";
import NewListForm from "../NewListForm/NewListForm";
import { StyledButton } from "../StyledComponents/StyledComponents";
import TimedMessage from "../TimedMessage/TimedMessage";
import { ListSelectConfirmContainer } from "./AddToPlaylistModalStyles";
import {
  addSongToUserPlaylistInFrontEnd,
  getSelectOptionsFromListOfSongs,
  songExistsInPlaylist,
} from "@/Utils/userUtils";
import { Dispatch, SetStateAction, useState } from "react";
import { getCookie } from "cookies-next";
import { patchPlaylistAddSong } from "@/Utils/backEndUtils";
import { MESSAGES_TIMEOUT } from "@/globalVariables";
import {
  ListOfSongs,
  SongInterface,
  selectComponentOptionsType,
  submitRequestInterface,
} from "@/Utils/tsTypes";

const AddToPlaylistModal = ({
  toggleAddSongModal,
  modalSong,
  onListChange,
  playListToAddSong,
  setPlayListToAddSong,
}: {
  toggleAddSongModal: () => void;
  modalSong: SongInterface | null;
  onListChange: (selectedOption: any) => void;
  playListToAddSong: ListOfSongs | null;
  setPlayListToAddSong: Dispatch<SetStateAction<ListOfSongs | null>>;
}) => {
  const { user, setUser } = useUser();
  const [addSongMessageIsVisible, setAddSongMessageIsVisible] = useState(false);
  const [addSongToPlaylistSubmitRequest, setAddSongToPlaylistSubmitRequest] =
    useState<submitRequestInterface>({
      isLoading: false,
      submitted: false,
      error: false,
      errorMessage: null,
      message: null,
    });
  const playLists = user.playLists ? user.playLists : [];

  const options: selectComponentOptionsType = getSelectOptionsFromListOfSongs(
    user.playLists ? user.playLists : []
  );

  const addToPlaylist = async () => {
    if (songExistsInPlaylist(playListToAddSong, modalSong?.song_id)) {
      setAddSongToPlaylistSubmitRequest({
        error: false,
        submitted: true,
        isLoading: false,
        errorMessage:
          "Song already exists in this playlist! Please choose another playlist or create a new playlist.",
        message: null,
      });
    } else {
      try {
        const authToken = getCookie("tokenCookie");
        setAddSongToPlaylistSubmitRequest({
          isLoading: true,
          error: false,
          submitted: false,
          errorMessage: null,
          message: null,
        });

        if (playListToAddSong && modalSong?.song_id) {
          await patchPlaylistAddSong(
            playListToAddSong.id,
            modalSong.song_id,
            authToken
          );

          const newPlaylists: ListOfSongs[] | undefined =
            addSongToUserPlaylistInFrontEnd(
              user,
              modalSong,
              playListToAddSong.id
            );

          console.log("user prev playLists", user.playLists);

          console.log("newPlaylists", newPlaylists);

          setUser((prev: any) => ({
            ...prev,
            playLists: newPlaylists,
          }));

          setAddSongToPlaylistSubmitRequest({
            error: false,
            submitted: true,
            isLoading: false,
            errorMessage: null,
            message: "Song added to playlist!",
          });
          setTimeout(() => {
            toggleAddSongModal();
          }, MESSAGES_TIMEOUT);
        } else {
          setAddSongToPlaylistSubmitRequest({
            error: false,
            submitted: true,
            isLoading: false,
            errorMessage: null,
            message: playLists
              ? "Select a playlist to add song"
              : "No playlists created! Create a playlist.",
          });
        }
      } catch (err: any) {
        console.log("error adding song to playlist", err);

        setAddSongToPlaylistSubmitRequest({
          error: true,
          submitted: true,
          errorMessage: `Error adding song to playlist! ${
            err.response
              ? err.response.data.message
              : err.message
              ? err.message
              : `Error adding song to playlist ${playListToAddSong?.name} !`
          }`,
          isLoading: false,
          message: null,
        });
      }
    }

    setAddSongMessageIsVisible(true);
    setTimeout(() => {
      setAddSongMessageIsVisible(false);
    }, MESSAGES_TIMEOUT);
    setPlayListToAddSong(null);
  };

  return (
    <Modal onModalClose={toggleAddSongModal}>
      <h4>{modalSong?.name}</h4>

      <h4>Select a playlist</h4>
      <ListSelectConfirmContainer>
        {user.playLists && (
          <DropDown
            onChangeFunction={onListChange}
            options={options}
            dropDownID={"list of lists"}
            resetAfterClick={false}
          />
        )}
        {!user.playLists && <p>Create a new list to add songs!</p>}
        <StyledButton
          onClick={() => {
            addToPlaylist();
          }}
        >
          Add song to playlist
        </StyledButton>
        {addSongToPlaylistSubmitRequest.isLoading && <LoadingAnimation />}

        {addSongToPlaylistSubmitRequest.errorMessage && (
          <ErrorTimedMessage
            visible={addSongMessageIsVisible}
            errorMessage={addSongToPlaylistSubmitRequest.errorMessage}
          />
        )}
        {addSongToPlaylistSubmitRequest.message && (
          <TimedMessage
            visible={addSongMessageIsVisible}
            message={addSongToPlaylistSubmitRequest.message}
          />
        )}
      </ListSelectConfirmContainer>

      <NewListForm />
    </Modal>
  );
};

export { AddToPlaylistModal };
