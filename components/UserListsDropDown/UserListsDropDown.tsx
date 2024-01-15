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

  // const onNewListSubmit = async (e: any) => {
  //   setInputValue("");
  //   e.preventDefault();
  //   let submitSuccessMessage = null;
  //   let submitErrorMessage = null;

  //   if (validNewListName(inputValue, playLists)) {
  //     try {
  //       setSubmitRequest({
  //         isLoading: true,
  //         error: false,
  //         submitted: false,
  //         message: null,
  //         errorMessage: null,
  //       });
  //       // const postPlayListResponse = await postPlayList(inputValue, []);
  //       submitSuccessMessage = `${inputValue} was added to the server`;

  //       setSubmitRequest({
  //         submitted: true,
  //         isLoading: false,
  //         message: submitSuccessMessage,
  //         error: false,
  //         errorMessage: null,
  //       });

  //       // const newListId = postPlayListResponse.data.id;
  //       // await postUserList(
  //       //   userId,
  //       //   getUpdatedMovieListsIds(movieLists, newListId)
  //       // );
  //       setSubmitRequest({
  //         submitted: true,
  //         isLoading: false,
  //         message: `${submitSuccessMessage}\n${inputValue} was added to the user`,
  //         error: false,
  //         errorMessage: null,
  //       });
  //       // const newList = getNewListObject(newListId, inputValue);
  //       const prevPlayLists = playLists ? playLists : [];
  //       // const newPlayLists = [...prevPlayLists, newList];

  //       // setUser((prev: any) => ({
  //       //   ...prev,
  //       //   playLists: newPlayLists,
  //       // }));

  //       // setMovieListObj(newList);
  //     } catch (err) {
  //       console.log("err", err);

  //       submitErrorMessage = `${inputValue} not added to the server!`;
  //       setSubmitRequest({
  //         error: true,
  //         submitted: true,
  //         isLoading: false,
  //         message: "",
  //         errorMessage: submitErrorMessage,
  //       });
  //     }
  //   } else {
  //     listNameExists(inputValue, getListNamesArray(playLists)) &&
  //       setSubmitRequest({
  //         error: true,
  //         errorMessage: "That list already exists!",
  //         submitted: true,
  //         isLoading: false,
  //         message: "",
  //       });
  //     stringIsEmpty(inputValue) &&
  //       setSubmitRequest({
  //         error: true,
  //         errorMessage: "Please enter a list name!",
  //         submitted: true,
  //         isLoading: false,
  //         message: "",
  //       });
  //   }
  // };

  // const onInputChange = (e: any) => {
  //   setInputValue(e.target.value);
  // };

  const handleClick = (e: MouseEvent<HTMLInputElement>) => {};

  return (
    <>
      {/* {console.log("allSongs", allSongs)} */}
      {/* <MultipleInputForm
        onFormSubmit={onNewListSubmit}
        inputs={[{ name: "NewListName", type: "text", value: inputValue }]}
        submitRequest={submitRequest}
        submitButtonName={"Create new list"}
        onInputChange={onInputChange}
        handleClick={handleClick}
      /> */}
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
