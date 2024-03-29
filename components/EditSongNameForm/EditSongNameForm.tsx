import { MouseEvent, useState } from "react";

import {
  SongNameExists,
  getSongNamesArray,
  nameExists,
  validName,
} from "@/Utils/functionUtils";
import { useUser } from "@/Contexts/UserContext";
import { editSongNameInAPI } from "@/Utils/backEndUtils";
import MultipleInputForm from "../MultipleInputForm/MultipleInputForm";
import { SongInterface, submitRequestInterface } from "@/Utils/tsTypes";
import { EditSongNameFormContainer } from "./EditSongNameFormStyles";
import {
  editSongNameInUploadedSongs,
  editSongNameInUserPlaylists,
} from "@/Utils/userUtils";
import { useSongsPlaying } from "@/Contexts/SongsPlayingContext";
import { getUserUploadedSongsObj } from "@/Utils/listOfSongsObj";

const EditSongNameForm = ({
  song,
  handleEditSongName,
}: {
  song: SongInterface;
  handleEditSongName: () => Promise<void>;
}) => {
  const [submitRequest, setSubmitRequest] = useState<submitRequestInterface>({
    isLoading: false,
    submitted: false,
    error: false,
    errorMessage: null,
    message: null,
  });
  const [inputValue, setInputValue] = useState("");
  const { user, setUser } = useUser();
  const { songsPlaying, setSongsPlaying } = useSongsPlaying();
  const playLists = user.playLists ? user.playLists : [];

  const onInputChange = (e: any) => {
    setInputValue(e.target.value);
  };

  const onEditSongNameSubmit = async (e: any) => {
    setInputValue("");
    e.preventDefault();
    let submitSuccessMessage: null | string = null;
    let submitErrorMessage = null;

    const songNames = getSongNamesArray(user.uploadedSongs);

    if (
      song.song_id &&
      validName(inputValue) &&
      !nameExists(inputValue, songNames)
    ) {
      try {
        setSubmitRequest({
          isLoading: true,
          error: false,
          submitted: false,
          message: null,
          errorMessage: null,
        });

        const editSongNameResponse = await editSongNameInAPI(
          inputValue,
          song.song_id
        );

        setSubmitRequest({
          submitted: true,
          isLoading: false,
          message: `Song name updated successfully!`,
          error: false,
          errorMessage: null,
        });

        const newUploadedSongs = editSongNameInUploadedSongs(
          user,
          song.song_id,
          inputValue
        );

        const newUserPlaylists = editSongNameInUserPlaylists(
          user,
          inputValue,
          song.song_id
        );

        setUser((prev: any) => ({
          ...prev,
          playLists: newUserPlaylists,
          uploadedSongs: newUploadedSongs,
        }));
        setSongsPlaying(
          getUserUploadedSongsObj(
            newUploadedSongs ? newUploadedSongs : null,
            user
          )
        );
        handleEditSongName();
      } catch (err) {
        submitErrorMessage = `Error changing song name in the server!`;
        setSubmitRequest({
          error: true,
          submitted: true,
          isLoading: false,
          message: "",
          errorMessage: submitErrorMessage,
        });
      }
    } else {
      let errorMessage = "";
      if (!validName(inputValue)) {
        errorMessage = "Name must have at least 3 characters!";
      }
      if (nameExists(inputValue, songNames)) {
        errorMessage = "You already have a song with that name!";
      }

      setSubmitRequest({
        error: true,
        errorMessage: errorMessage,
        submitted: true,
        isLoading: false,
        message: "",
      });
    }
  };

  const handleInputClick = (e: MouseEvent<HTMLInputElement>) => {};

  return (
    <EditSongNameFormContainer>
      <MultipleInputForm
        onFormSubmit={onEditSongNameSubmit}
        inputs={[
          {
            name: "Song Name",
            type: "text",
            value: inputValue,
            labelVisible: false,
          },
        ]}
        submitRequest={submitRequest}
        submitButtonName={"Change song name"}
        onInputChange={onInputChange}
        handleTextAreaClick={handleInputClick}
      />
    </EditSongNameFormContainer>
  );
};

export default EditSongNameForm;
