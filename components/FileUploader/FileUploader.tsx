import { PickerOverlay } from "filestack-react";
import { useRef, useState } from "react";
import { getCookie } from "cookies-next";
import { useUser } from "@/Contexts/UserContext";
import { FileUploaderContainer } from "./FileUploadeStyles";
import TimedMessage from "../TimedMessage/TimedMessage";
import ErrorTimedMessage from "../ErrorMessage/ErrorMessage";
import { useSongsPlaying } from "@/Contexts/SongsPlayingContext";
import {
  LOGIN_PAGE_NAME,
  MESSAGES_TIMEOUT,
  MOBILE_MAX_WIDTH,
} from "@/globalVariables";
import { useRouter } from "next/router";
import RedirectOnError from "../Redirect/RedirectOnError";
import { patchUserLists, postSong } from "@/Utils/backEndUtils";
import { addSongToAllSongs, verifyAuthentication } from "@/Utils/userUtils";
import { IconLabel, UploadIconStyled } from "../Icons/Icons";
import { useMediaQuery } from "@mui/material";
import { useAllSongs } from "@/Contexts/AllSongsContext";
import { getUserUploadedSongsObj } from "@/Utils/listOfSongsObj";
import { SongInterface, submitRequestInterface } from "@/Utils/tsTypes";
import ButtonOrClickableIcon from "../ButtonOrClickableIcon/ButtonOrClickableIcon";

function FileUploader() {
  const [showPicker, setShowPicker] = useState(false);

  const [submitRequest, setSubmitRequest] = useState<submitRequestInterface>({
    isLoading: false,
    submitted: false,
    error: false,
    errorMessage: null,
    message: null,
  });

  const [uploadMessageVisible, setUploadMessageVisible] = useState(false);

  const { user, setUser, clearUser } = useUser();
  const { setSongsPlaying } = useSongsPlaying();
  const maxMobileWidth = useMediaQuery(`(max-width:${MOBILE_MAX_WIDTH})`);
  const { allSongs, setAllSongs } = useAllSongs();

  const handleUpload = async (e: any) => {
    setShowPicker(false);

    try {
      const authToken = getCookie("tokenCookie");
      if (!authToken) {
        clearUser();
      } else {
        setSubmitRequest({
          isLoading: true,
          error: false,
          submitted: false,
          errorMessage: null,
          message: null,
        });

        const songName = e.filesUploaded[0].filename;
        const songUrl = e.filesUploaded[0].url;

        const postSongResponse = await postSong(songName, songUrl, authToken);

        let userPreviousSongs: SongInterface[] = [];
        if (user.uploadedSongs) {
          userPreviousSongs = user.uploadedSongs;
        } else {
          userPreviousSongs = [];
        }

        const newSong: SongInterface = {
          name: songName,
          url: songUrl,
          song_id: postSongResponse.data.id,
        };

        const newSongs: SongInterface[] = [...userPreviousSongs, newSong];

        const responsePatch = await patchUserLists(
          user.id,
          { uploadedSongs: newSongs, playLists: user.playLists },
          authToken
        );

        setUser((prev: any) => ({
          ...prev,
          uploadedSongs: newSongs,
        }));

        setSongsPlaying(getUserUploadedSongsObj(newSongs, user));

        const newAllSongs: SongInterface[] = addSongToAllSongs(
          allSongs,
          newSong
        );

        setAllSongs(newAllSongs);

        setSubmitRequest({
          error: false,
          submitted: true,
          isLoading: false,
          errorMessage: null,
          message: "Song added to backend!",
        });
      }
    } catch (err: any) {
      setSubmitRequest({
        error: true,
        submitted: true,
        errorMessage: `Error uploading song! ${
          err.response
            ? err.response.data.message
            : err.message
            ? err.message
            : "Error on post song request!"
        }`,
        isLoading: false,
        message: null,
      });
    }

    setUploadMessageVisible(true);
    setTimeout(() => {
      setUploadMessageVisible(false);
    }, MESSAGES_TIMEOUT);
  };

  const handleUploadButtonClick = () => {
    setSubmitRequest({
      isLoading: false,
      submitted: false,
      error: false,
      errorMessage: null,
      message: null,
    });

    setShowPicker(true);
  };

  const handleOnclose = () => {
    setShowPicker(false);
  };

  return (
    <>
      <ButtonOrClickableIcon
        handleButtonClick={() => {
          handleUploadButtonClick();
          verifyAuthentication(
            getCookie("tokenCookie"),
            setSubmitRequest,
            clearUser,
            "Can not open file picker!"
          );
        }}
        IconStyled={UploadIconStyled}
        label={"Upload Song"}
      />

      {!submitRequest.error && showPicker && (
        <PickerOverlay
          apikey={process.env.NEXT_PUBLIC_FILESTACK_API_KEY as string}
          pickerOptions={{
            accept: [".mp3"],
            maxFiles: 1,
            maxSize: 1024 * 1024 * 15,
            onClose: () => {
              handleOnclose();
            },
          }}
          onUploadDone={(e) => {
            handleUpload(e);
            verifyAuthentication(
              getCookie("tokenCookie"),
              setSubmitRequest,
              clearUser,
              "Can not upload file!"
            );
          }}
        />
      )}

      {submitRequest.errorMessage && (
        <ErrorTimedMessage
          visible={uploadMessageVisible}
          errorMessage={submitRequest.errorMessage}
        />
      )}
      {submitRequest.message && (
        <TimedMessage
          visible={uploadMessageVisible}
          message={submitRequest.message}
        />
      )}

      {user.id == 0 && (
        <RedirectOnError
          error={submitRequest.error}
          message={`You are not logged in! Redirecting to ${LOGIN_PAGE_NAME} page...`}
        />
      )}
    </>
  );
}

export default FileUploader;
