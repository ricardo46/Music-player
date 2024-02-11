import { useUser } from "@/Contexts/UserContext";
import ErrorTimedMessage from "../ErrorMessage/ErrorMessage";
import LoadingAnimation from "../LoadingAnimation/LoadingAnimation";
import { Modal } from "../Modal/Modal";
import {
  StyledButton,
  StyledImportantButton,
} from "../StyledComponents/StyledComponents";
import TimedMessage from "../TimedMessage/TimedMessage";
import { editPlaylistNameInFrontEnd, getNewListObject, removePlaylistFromList } from "@/Utils/userUtils";
import { MouseEvent, useState } from "react";
import { getCookie } from "cookies-next";
import { deletePlaylist, editListNameInAPI } from "@/Utils/backEndUtils";
import { useSongsPlaying } from "@/Contexts/SongsPlayingContext";
import { useAllSongs } from "@/Contexts/AllSongsContext";
import { getUserUploadedSongsObj } from "@/Utils/listOfSongsObj";
import { ListOfSongs, submitRequestInterface } from "@/Utils/tsTypes";
import MultipleInputForm from "../MultipleInputForm/MultipleInputForm";
import {
  getListNamesArray,
  nameExists,
  validName,
} from "@/Utils/functionUtils";
import { MESSAGES_TIMEOUT } from "@/globalVariables";

const EditPlaylistNameModal = ({
  toggleEditPlaylistNameModal,
}: {
  toggleEditPlaylistNameModal: () => void;
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
  const [inputValue, setInputValue] = useState("");

  const [
    editPlaylistNameMessageIsVisible,
    setEditPlaylistNameMessageIsVisible,
  ] = useState(false);

  const onInputChange = (e: any) => {
    setInputValue(e.target.value);
  };

  const handleInputClick = (e: MouseEvent<HTMLInputElement>) => {};

  const onEditPlaylistNameSubmit = async (e: any) => {
    setInputValue("");
    e.preventDefault();
    let submitSuccessMessage: null | string = null;
    let submitErrorMessage = null;

    const playListsNames = getListNamesArray(user.playLists);

    if (validName(inputValue) && !nameExists(inputValue, playListsNames)) {
      console.log(`Editing list name to ${inputValue}`);

      try {
        setSubmitRequest({
          isLoading: true,
          error: false,
          submitted: false,
          message: null,
          errorMessage: null,
        });

        if (songsPlaying) {
          const postPlayListResponse = await editListNameInAPI(
            inputValue,
            songsPlaying.id,
            getCookie("tokenCookie")
          );
          console.log("postPlayListResponse", postPlayListResponse);
        }

        submitSuccessMessage = `Playlist name was changed to ${inputValue}`;
        setSubmitRequest({
          submitted: true,
          isLoading: false,
          message: submitSuccessMessage,
          error: false,
          errorMessage: null,
        });

        // const newListId = postPlayListResponse.data.id;
        // console.log("newListId", newListId);

        if (songsPlaying) {
          // const prevPlayLists = user.playLists ? user.playLists : [];
          const newPlayLists = editPlaylistNameInFrontEnd(user, inputValue, songsPlaying.id)

          setUser((prev: any) => ({
            ...prev,
            playLists: newPlayLists,
          }));

          // const newList = getNewListObject(songsPlaying.id, inputValue);

          setSongsPlaying((prev: any) => ({
            ...prev,
            name: inputValue,
          }))
        }

        // console.log("newList", newList);

        // console.log("prevPlayLists", prevPlayLists);

        // console.log("newPlayLists", newPlayLists);

        setTimeout(() => {
          toggleEditPlaylistNameModal();
        }, MESSAGES_TIMEOUT);
      } catch (err) {
        console.log("err", err);

        submitErrorMessage = `${inputValue} not changed on the server!`;
        setSubmitRequest({
          error: true,
          submitted: true,
          isLoading: false,
          message: "",
          errorMessage: submitErrorMessage,
        });
      }
    } else {
      console.log(`list name ${inputValue} not valid!`);

      nameExists(inputValue, playListsNames) &&
        setSubmitRequest({
          error: true,
          errorMessage: "That list already exists!",
          submitted: true,
          isLoading: false,
          message: "",
        });
      !validName(inputValue) &&
        setSubmitRequest({
          error: true,
          errorMessage: "Name must have at least 3 characters!",
          submitted: true,
          isLoading: false,
          message: "",
        });
    }
  };

  return (
    <Modal onModalClose={toggleEditPlaylistNameModal}>
      <h4>{`Enter a new name for playlist: ${songsPlaying?.name}.`}</h4>
      <MultipleInputForm
        onFormSubmit={onEditPlaylistNameSubmit}
        inputs={[
          {
            name: "Edit Playlist Name",
            type: "text",
            value: inputValue,
            labelVisible: true,
          },
        ]}
        submitRequest={submitRequest}
        submitButtonName={"Change playlist name"}
        onInputChange={onInputChange}
        handleTextAreaClick={handleInputClick}
      />

      {submitRequest.errorMessage && (
        <ErrorTimedMessage
          visible={editPlaylistNameMessageIsVisible}
          errorMessage={submitRequest.errorMessage}
        />
      )}
      {submitRequest.message && (
        <TimedMessage
          visible={editPlaylistNameMessageIsVisible}
          message={submitRequest.message}
        />
      )}
      {submitRequest.isLoading && <LoadingAnimation />}
    </Modal>
  );
};

export { EditPlaylistNameModal };
