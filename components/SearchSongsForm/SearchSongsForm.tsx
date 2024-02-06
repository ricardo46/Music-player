import { ChangeEvent, useEffect, useState } from "react";

import { MESSAGE_DURATION, USER_PAGE_PATH } from "../../globalVariables";
import UserMessage from "../UserMessage/UserMessage";
import {
  getAllSongsDataFromAPI,
  getOtherAndCurrentUserSongsDataFromAPI,
} from "@/Utils/backEndUtils";
import { useSongsPlaying } from "@/Contexts/SongsPlayingContext";
import { usePlaying } from "@/Contexts/PlayingContext";
import { SearchSongsFormContainer } from "./SearchSongsFormStyles";
import { useUser } from "@/Contexts/UserContext";
import {
  getAllUsersUploadedSongsObj,
  getOtherAndCurrentUserSongsObj,
} from "@/Utils/listOfSongsObj";
import { submitRequestInterface } from "@/Utils/tsTypes";
import MultipleInputForm from "../MultipleInputForm/MultipleInputForm";
import { useRouter } from "next/router";
import { useSearchSongs } from "@/Contexts/SearchSongsContext";

const SearchSongsForm = () => {
  const { user, setUser, clearUser } = useUser();
  const { otherUserSongs, setOtherUserSongs,  currentUserSongs, setCurrentUserSongs} = useSearchSongs();
  // const [songsData, setSongsData] = useState<SongInterface[]>([]);
  const { songsPlaying, setSongsPlaying } = useSongsPlaying();
  const { playing, setPlaying } = usePlaying();
  const [inputValue, setInputValue] = useState("");
  const [previousInput, setPreviousInput] = useState("");
  const [messageIsVisible, setMessageIsVisible] = useState(false);
  const [submitRequest, setSubmitRequest] = useState<submitRequestInterface>({
    isLoading: false,
    submitted: false,
    error: false,
    errorMessage: null,
    message: null,
  });

  const router = useRouter();

  useEffect(() => {
    console.log("songsPlaying?.playList", songsPlaying?.playList);
    if (songsPlaying?.playList?.length == 0 && previousInput != "") {
      setMessageIsVisible(true);
      setTimeout(() => {
        setMessageIsVisible(false);
      }, MESSAGE_DURATION);
    }
    // setInputValue("");
  }, [songsPlaying?.playList]);

  const onSearchSubmit = async (e: any) => {
    e.preventDefault();
    setPreviousInput(inputValue);
    setInputValue(inputValue);

    console.log("songsPlaying", songsPlaying);

    try {
      setSubmitRequest({
        isLoading: true,
        error: false,
        submitted: false,
        message: null,
        errorMessage: null,
      });

      let response = null;

      if (router.pathname == USER_PAGE_PATH) {
        response = await getOtherAndCurrentUserSongsDataFromAPI(inputValue, user);
        console.log("response", response);

        const songsData=response.data
        setOtherUserSongs(songsData.songs_other_users);
        setCurrentUserSongs(songsData.songs_current_user);


        setSongsPlaying(getOtherAndCurrentUserSongsObj([...songsData.songs_other_users, ...songsData.songs_current_user]));
      } else {
        response = await getAllSongsDataFromAPI(inputValue);
        const songs = response.data;

        setSongsPlaying(getAllUsersUploadedSongsObj(songs));
      }

      setPlaying(false);

      setSubmitRequest({
        submitted: true,
        isLoading: false,
        message: "Successful request!",
        error: false,
        errorMessage: null,
      });
    } catch (err) {
      console.log("err", err);

      setSubmitRequest({
        error: true,
        submitted: true,
        isLoading: false,
        message: "",
        errorMessage: "Request Error!!",
      });
    }
  };

  const onInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputClick = async () => {
    // setInputValue("");
  };

  return (
    <SearchSongsFormContainer>
      {
        <MultipleInputForm
          inputs={[
            {
              name: "Song name",
              type: "text",
              value: inputValue,
              labelVisible: false,
            },
          ]}
          onFormSubmit={onSearchSubmit}
          submitRequest={submitRequest}
          submitButtonName={"Search Songs"}
          onInputChange={onInputChange}
          handleTextAreaClick={handleInputClick}
        />
      }
      {messageIsVisible &&
        songsPlaying?.playList?.length == 0 &&
        !submitRequest.isLoading && (
          <UserMessage
            type={"error"}
            messageContent={`Song ${previousInput} not found`}
          />
        )}
    </SearchSongsFormContainer>
  );
};

export default SearchSongsForm;
