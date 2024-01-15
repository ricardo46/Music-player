import { MouseEvent, useState } from "react";
import MultipleInputForm, {
  submitRequestInterface,
} from "../MultipleInputForm/MultipleInputForm";
import {
  getListNamesArray,
  listNameExists,
  stringIsEmpty,
  validNewListName,
} from "@/Utils/functionUtils";
import { useUser } from "@/Contexts/UserContext";
import TimedMessage from "../TimedMessage/TimedMessage";
import ErrorTimedMessage from "../ErrorMessage/ErrorMessage";
import LoadingAnimation from "../LoadingAnimation/LoadingAnimation";
import { getCookie } from "cookies-next";
import { addPlaylist } from "@/Utils/backEndUtils";
import { getNewListObject } from "@/Utils/userUtils";

const NewListForm = () => {
  const [submitRequest, setSubmitRequest] = useState<submitRequestInterface>({
    isLoading: false,
    submitted: false,
    error: false,
    errorMessage: null,
    message: null,
  });
  const [inputValue, setInputValue] = useState("");
  const { user, setUser } = useUser();
  const playLists = user.playLists ? user.playLists : [];

  const onInputChange = (e: any) => {
    setInputValue(e.target.value);
  };

  const onNewListSubmit = async (e: any) => {
    setInputValue("");
    e.preventDefault();
    let submitSuccessMessage: null | string = null;
    let submitErrorMessage = null;

    if (validNewListName(inputValue, playLists)) {
      console.log(`Creating list ${inputValue}`);

      try {
        setSubmitRequest({
          isLoading: true,
          error: false,
          submitted: false,
          message: null,
          errorMessage: null,
        });

        const postPlayListResponse = await addPlaylist(
          inputValue,
          getCookie("tokenCookie"),
          user.id
        );

        submitSuccessMessage = `${inputValue} was added to the server`;
        setSubmitRequest({
          submitted: true,
          isLoading: false,
          message: submitSuccessMessage,
          error: false,
          errorMessage: null,
        });

        const newListId = postPlayListResponse.data.id;
        console.log("newListId", newListId);

        // await postUserList(
        //   userId,
        //   getUpdatedMovieListsIds(movieLists, newListId)
        // );

        const newList = getNewListObject(newListId, inputValue);
        console.log("newList", newList);

        const prevPlayLists = playLists ? playLists : [];
        console.log("prevPlayLists", prevPlayLists);

        const newPlayLists = [...prevPlayLists, newList];
        console.log("newPlayLists", newPlayLists);

        setUser((prev: any) => ({
          ...prev,
          playLists: newPlayLists,
        }));

      } catch (err) {
        console.log("err", err);

        submitErrorMessage = `${inputValue} not added to the server!`;
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

      listNameExists(inputValue, getListNamesArray(playLists)) &&
        setSubmitRequest({
          error: true,
          errorMessage: "That list already exists!",
          submitted: true,
          isLoading: false,
          message: "",
        });
      stringIsEmpty(inputValue) &&
        setSubmitRequest({
          error: true,
          errorMessage: "Please enter a list name!",
          submitted: true,
          isLoading: false,
          message: "",
        });
    }
  };

  const handleClick = (e: MouseEvent<HTMLInputElement>) => {
    // console.log(`Creating list ${inputValue}`)
  };

  return (
    <>
      {console.log("submitRequest?.isLoading", submitRequest?.isLoading)}

      <MultipleInputForm
        onFormSubmit={onNewListSubmit}
        inputs={[{ name: "NewListName", type: "text", value: inputValue }]}
        submitRequest={submitRequest}
        submitButtonName={"Create new list"}
        onInputChange={onInputChange}
        handleClick={handleClick}
      />
      {/* {submitRequest.isLoading && <LoadingAnimation />} */}
      {/* {submitRequest.error && (
        <ErrorTimedMessage errorMessage={submitRequest.errorMessage} />
      )} */}
      {/* {!submitRequest.error && <TimedMessage message={submitRequest.message} />} */}
    </>
  );
};

export default NewListForm;
