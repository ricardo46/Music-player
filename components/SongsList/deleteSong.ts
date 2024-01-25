import { getCookie } from "cookies-next";
import { Dispatch, SetStateAction } from "react";
import { deleteUploadedSong } from "@/Utils/backEndUtils";
import {
  getUserPlaylistsIDs,
  removeSongFromAllSongs,
  removeSongFromUploadedSongs,
  removeSongFromUserPlaylistsInFrontEnd,
} from "@/Utils/userUtils";
import {
  REDIRECT_TIMEOUT,
} from "@/globalVariables";
import { getUserUploadedSongsObj } from "@/Utils/listOfSongsObj";
import { ListOfSongs, SongInterface, UserType, submitRequestInterface } from "@/Utils/tsTypes";

const deleteSong = async (
  user: UserType,
  setUser: Dispatch<SetStateAction<UserType>>,
  setSongsPlaying: Dispatch<SetStateAction<ListOfSongs | null>>,
  songID: number | undefined,
  setSubmitRequest: Dispatch<SetStateAction<submitRequestInterface>>,
  setDeleteSongMessageIsVisible: Dispatch<SetStateAction<boolean>>,
  allSongs: SongInterface[],
  setAllSongs: Dispatch<SetStateAction<SongInterface[]>>
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

      const newAllSongs: SongInterface[] = removeSongFromAllSongs(
        allSongs,
        songID
      );

      setAllSongs(newAllSongs);

      if (newUploadedSongs) {
        setSongsPlaying(getUserUploadedSongsObj(newUploadedSongs, user));
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

export default deleteSong;
