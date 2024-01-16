import { useUser } from "@/Contexts/UserContext";
import {
  getListNamesArray,
  listNameExists,
  stringIsEmpty,
  validNewListName,
} from "@/Utils/functionUtils";
import { Dispatch, MouseEvent, SetStateAction, useState } from "react";
import MultipleInputForm, {
  submitRequestInterface,
} from "../MultipleInputForm/MultipleInputForm";
import DropDown from "../DropDown/DropDown";
import { useSongsPlaying } from "@/Contexts/SongsPlayingContext";
import getUploadedListOfSongsObj from "@/Utils/listOfSongsObj";
import getListOfSongsObj from "@/Utils/listOfSongsObj";
import { verifyAuthentication } from "@/Utils/userUtils";
import { getCookie } from "cookies-next";
import RedirectOnError from "../Redirect/RedirectOnError";
import { useAllSongs } from "@/Contexts/AllSongsContext";

const UserListsDropDown = ({
  updateSongIndex,
  setPlaying,
}: {
  updateSongIndex: Dispatch<SetStateAction<number>>;
  setPlaying: Dispatch<SetStateAction<boolean>>;
}) => {
  const { user, setUser, clearUser } = useUser();
  const { allSongs, setAllSongs } = useAllSongs();

  const userId = user.id;
  const playLists = user.playLists ? user.playLists : [];
  const listOfLists = [
    getListOfSongsObj(user.uploadedSongs, -1, "User Uploaded Songs"),
    getListOfSongsObj(allSongs, -2, "All Users Songs"),
    ...playLists,
  ];

  // const [inputValue, setInputValue] = useState("");
  const [submitRequest, setSubmitRequest] = useState<submitRequestInterface>({
    isLoading: false,
    submitted: false,
    error: false,
    message: null,
    errorMessage: null,
  });
  const { songsPlaying, setSongsPlaying } = useSongsPlaying();

  const onListChange = (e: any) => {
    // const playList = playLists?.find(
    //   (playList) => playList.id == e.target.value
    // );
    setPlaying(false);

    verifyAuthentication(
      getCookie("tokenCookie"),
      setSubmitRequest,
      clearUser,
      "Can not upload file!"
    );

    updateSongIndex(0);
    const playList = listOfLists?.find(
      (playList) => playList.id == e.target.value
    );

    playList ? setSongsPlaying(playList) : setSongsPlaying(null);
    console.log("onListChange list", playList);
    console.log("onListChange listOfLists", listOfLists);
  };

  const handleClick = (e: MouseEvent<HTMLInputElement>) => {};

  return (
    <>
      <DropDown
        onChangeFunction={onListChange}
        // movieListObj={movieListObj}
        defaultDropDownValue={playLists[0]?.name}
        listOfLists={listOfLists}
        listProp={"id"}
        itemPropertyToShow={"name"}
      />
      {user.id == 0 && (
        <RedirectOnError
          error={submitRequest.error}
          message={"You are not logged in! Redirecting to login page..."}
        />
      )}
    </>
  );
};

export default UserListsDropDown;
