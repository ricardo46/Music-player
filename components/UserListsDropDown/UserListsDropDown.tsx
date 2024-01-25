import { useUser } from "@/Contexts/UserContext";
import { Dispatch, MouseEvent, SetStateAction, useState } from "react";
import DropDown from "../DropDown/DropDown";
import { useSongsPlaying } from "@/Contexts/SongsPlayingContext";
import {
  getSelectOptionsFromListOfSongs,
  verifyAuthentication,
} from "@/Utils/userUtils";
import { getCookie } from "cookies-next";
import RedirectOnError from "../Redirect/RedirectOnError";
import { getUserUploadedSongsObj } from "@/Utils/listOfSongsObj";
import {
  selectComponentOptionsType,
  submitRequestInterface,
} from "@/Utils/tsTypes";
import { LOGIN_PAGE_NAME } from "@/globalVariables";

const UserListsDropDown = ({
  updateSongIndex,
  setPlaying,
}: {
  updateSongIndex: Dispatch<SetStateAction<number>>;
  setPlaying: Dispatch<SetStateAction<boolean>>;
}) => {
  const { user, setUser, clearUser } = useUser();

  const userId = user.id;
  const playLists = user.playLists ? user.playLists : [];
  const listOfLists = [
    getUserUploadedSongsObj(user.uploadedSongs, user),

    ...playLists,
  ];

  const options: selectComponentOptionsType =
    getSelectOptionsFromListOfSongs(listOfLists);

  const [submitRequest, setSubmitRequest] = useState<submitRequestInterface>({
    isLoading: false,
    submitted: false,
    error: false,
    message: null,
    errorMessage: null,
  });
  const { songsPlaying, setSongsPlaying } = useSongsPlaying();

  const onListChange = (selectedOption: any) => {
    console.log("selectedOption", selectedOption);

    setPlaying(false);

    verifyAuthentication(
      getCookie("tokenCookie"),
      setSubmitRequest,
      clearUser,
      "Can not upload file!"
    );

    updateSongIndex(0);
    const playList = listOfLists?.find(
      (playList) => playList.id == selectedOption.value
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
        options={options}
        dropDownID={"list of lists"}
        resetAfterClick={true}
      />
      {user.id == 0 && (
        <RedirectOnError
          error={submitRequest.error}
          message={`You are not logged in! Redirecting to ${LOGIN_PAGE_NAME} page...`}
        />
      )}
    </>
  );
};

export default UserListsDropDown;
