import { MouseEvent, useState } from "react";

import {
  getListNamesArray,
  listNameExists,
  stringIsEmpty,
  validNewListName,
} from "@/Utils/functionUtils";
import { useUser } from "@/Contexts/UserContext";
import { getCookie } from "cookies-next";
import { addPlaylist } from "@/Utils/backEndUtils";
import { getNewListObject } from "@/Utils/userUtils";
import MultipleInputForm from "../MultipleInputForm/MultipleInputForm";
import { submitRequestInterface } from "@/Utils/tsTypes";
import { NewListFormContainer } from "./NewListFormStyles";

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

  const handleInputClick = (e: MouseEvent<HTMLInputElement>) => {};

  return (
    <NewListFormContainer>
      <MultipleInputForm
        onFormSubmit={onNewListSubmit}
        inputs={[{ name: "NewListName", type: "text", value: inputValue, labelVisible: true }]}
        submitRequest={submitRequest}
        submitButtonName={"Create new list"}
        onInputChange={onInputChange}
        handleTextAreaClick={handleInputClick}
      />
    </NewListFormContainer>
  );
};

export default NewListForm;
