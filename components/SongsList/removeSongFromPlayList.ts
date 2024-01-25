import { getCookie } from "cookies-next";
import { deleteSongFromPlaylist } from "@/Utils/backEndUtils";
import { getListOfSongsFromID, removeSongFromUserPlaylistInFrontEnd } from "@/Utils/userUtils";
import { Dispatch, SetStateAction } from "react";
import { ListOfSongs, SongInterface, UserType, submitRequestInterface } from "@/Utils/tsTypes";

const removeSongFromPlayList = async (
    listOfSongs: ListOfSongs,
    song: SongInterface,
    setSubmitRequest: Dispatch<SetStateAction<submitRequestInterface>>,
    setUser: Dispatch<SetStateAction<UserType>>,
    user: UserType,
    setSongsPlaying: Dispatch<SetStateAction<ListOfSongs | null>>
  ) => {
    const listOfSongsID = listOfSongs.id;
    const songID = song.song_id;

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
        await deleteSongFromPlaylist(listOfSongsID, songID, authToken);

        const newPlaylists: ListOfSongs[] | undefined =
          removeSongFromUserPlaylistInFrontEnd(user, songID, listOfSongsID);

        setUser((prev: any) => ({
          ...prev,
          playLists: newPlaylists,
        }));

        if (newPlaylists) {
          const newPlaylist = getListOfSongsFromID(newPlaylists, listOfSongsID);

          if (newPlaylist) {
            setSongsPlaying(newPlaylist);
          }
        }
      }

      setSubmitRequest({
        error: false,
        submitted: true,
        isLoading: false,
        errorMessage: null,
        message: "Song removed from playlist!",
      });
    } catch (err: any) {
      console.log("error removing song from playlist", err);

      setSubmitRequest({
        error: true,
        submitted: true,
        errorMessage: `Error removing song from playlist! ${
          err.response
            ? err.response.data.message
            : err.message
            ? err.message
            : `${listOfSongs?.name}!`
        }`,
        isLoading: false,
        message: null,
      });
    }
  };

  export default removeSongFromPlayList;