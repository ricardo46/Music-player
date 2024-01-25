import {
  ChangeEvent,
  useEffect,
  useState,
} from "react";

import {
  MESSAGE_DURATION,
} from "../../globalVariables";
import UserMessage from "../UserMessage/UserMessage";
import { getAllSongsDataFromAPI } from "@/Utils/backEndUtils";
import { useSongsPlaying } from "@/Contexts/SongsPlayingContext";
import { usePlaying } from "@/Contexts/PlayingContext";
import { SearchSongsFormContainer } from "./SearchSongsFormStyles";
import { useUser } from "@/Contexts/UserContext";
import { getAllUsersUploadedSongsObj } from "@/Utils/listOfSongsObj";
import { SongInterface, submitRequestInterface } from "@/Utils/tsTypes";
import MultipleInputForm from "../MultipleInputForm/MultipleInputForm";

const SearchSongsForm = () => {
  const { user, setUser, clearUser } = useUser();

  const [songsData, setSongsData] = useState<SongInterface[]>([]);
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

  useEffect(() => {
    console.log("songsData", songsData);
    if (songsData?.length == 0 && previousInput != "") {
      setMessageIsVisible(true);
      setTimeout(() => {
        setMessageIsVisible(false);
      }, MESSAGE_DURATION);
    }
    setInputValue("");
  }, [songsData]);

  const onSearchSubmit = async (e: any) => {
    e.preventDefault();
    setPreviousInput(inputValue);
    setInputValue(inputValue);

    try {
      setSubmitRequest({
        isLoading: true,
        error: false,
        submitted: false,
        message: null,
        errorMessage: null,
      });
      const response = await getAllSongsDataFromAPI(inputValue);

      const songs = response.data;

      setSongsPlaying(getAllUsersUploadedSongsObj(songs));
      setPlaying(false);

      setSubmitRequest({
        submitted: true,
        isLoading: false,
        message: "All songs loaded successfully!",
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
        errorMessage: "Error loading all songs from server!!",
      });
    }
  };

  const onInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputClick = async () => {
    setInputValue("");
  };

  return (
    <SearchSongsFormContainer>
      <MultipleInputForm
        inputs={[{ name: "SongName", type: "text", value: inputValue }]}
        onFormSubmit={onSearchSubmit}
        submitRequest={submitRequest}
        submitButtonName={"Search Songs"}
        onInputChange={onInputChange}
        handleTextAreaClick={handleInputClick}
      />
      {messageIsVisible &&
        songsData?.length == 0 &&
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
