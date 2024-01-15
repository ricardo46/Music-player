import { getCookie } from "cookies-next";
import { submitRequestInterface } from "../MultipleInputForm/MultipleInputForm";
import { Dispatch, SetStateAction } from "react";
import { deleteUploadedSong } from "@/Utils/backEndUtils";
import {
  getUserPlaylistsIDs,
  removeSongFromUploadedSongs,
  removeSongFromUserPlaylistsInFrontEnd,
} from "@/Utils/userUtils";
import { ListOfSongs, UserType, useUser } from "@/Contexts/UserContext";
import { SongInterface } from "../FileUploader/FileUploader";
import { useSongsPlaying } from "@/Contexts/SongsPlayingContext";
import getListOfSongsObj from "@/Utils/listOfSongsObj";
import { REDIRECT_TIMEOUT } from "@/globalVariables";

const OnDeleteSongClick = async (
  user: UserType,
  setUser: Dispatch<SetStateAction<UserType>>,
  setSongsPlaying: Dispatch<SetStateAction<ListOfSongs | null>>,
  songID: number | undefined,
  setSubmitRequest: Dispatch<SetStateAction<submitRequestInterface>>,
  setDeleteSongMessageIsVisible: Dispatch<SetStateAction<boolean>>
) => {
  try {
    const authToken = getCookie("tokenCookie");
    setSubmitRequest({
      isLoading: true,
      error: false,
      submitted: false,
      errorMessage: null,
      message: null,
    });
    console.log("authToken", authToken);

    if (songID) {
      await deleteUploadedSong(
        user.id,
        songID,
        getUserPlaylistsIDs(user),
        authToken
      );

      const newUploadedSongs: SongInterface[] | undefined =
        removeSongFromUploadedSongs(user, songID);
      const newPlaylists: ListOfSongs[] | undefined =
        removeSongFromUserPlaylistsInFrontEnd(user, songID);
      setUser((prev: any) => ({
        ...prev,
        uploadedSongs: newUploadedSongs,
        playLists: newPlaylists,
      }));

      if (newUploadedSongs) {
        setSongsPlaying(
          getListOfSongsObj(newUploadedSongs, -1, "User Uploaded Songs")
        );
      }
    }

    setSubmitRequest({
      error: false,
      submitted: true,
      isLoading: false,
      errorMessage: null,
      message: "Song deleted from backend!",
    });
  } catch (err: any) {
    console.log("error deleting song", err);

    setSubmitRequest({
      error: true,
      submitted: true,
      errorMessage: `Error deleting song! ${
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

  setDeleteSongMessageIsVisible(true);
  setTimeout(() => {
    setDeleteSongMessageIsVisible(false);
  }, REDIRECT_TIMEOUT);
};

export default OnDeleteSongClick;
