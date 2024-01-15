import { useSongsPlaying } from "@/Contexts/SongsPlayingContext";
import { StyledButton } from "../StyledComponents/StyledComponents";
import { getCookie } from "cookies-next";
import { useState } from "react";
import { deletePlaylist } from "@/Utils/backEndUtils";
import { ListOfSongs, useUser } from "@/Contexts/UserContext";
import { submitRequestInterface } from "../MultipleInputForm/MultipleInputForm";
import { removePlaylistFromList } from "@/Utils/userUtils";
import getListOfSongsObj from "@/Utils/listOfSongsObj";

const DeletePlaylistButton = () => {
  const { user, setUser } = useUser();

  const { songsPlaying, setSongsPlaying } = useSongsPlaying();
  const [submitRequest, setSubmitRequest] = useState<submitRequestInterface>({
    isLoading: false,
    submitted: false,
    error: false,
    errorMessage: null,
    message: null,
  });

  const onDeleteClick = async () => {
    try {
      const authToken = getCookie("tokenCookie");
      setSubmitRequest({
        isLoading: true,
        error: false,
        submitted: false,
        errorMessage: null,
        message: null,
      });
      //   console.log("authToken", authToken);

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

        // if (newUploadedSongs) {
          setSongsPlaying(
            getListOfSongsObj(user.uploadedSongs, -1, "User Uploaded Songs")
          );
        // }
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
  };

  return (
    <>
      {songsPlaying && songsPlaying?.id > 0 && (
        <StyledButton onClick={onDeleteClick}>
          Delete selected playlist
        </StyledButton>
      )}
    </>
  );
};

export default DeletePlaylistButton;
