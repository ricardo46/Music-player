import { PickerOverlay } from "filestack-react";
import { useRef, useState } from "react";
import { submitRequestInterface } from "../MultipleInputForm/MultipleInputForm";
import { getCookie } from "cookies-next";
import { useUser } from "@/Contexts/UserContext";
import { FileUploaderMobileButton, FileUploaderContainer, FileUploaderLaptopButton } from "./FileUploadeStyles";
import TimedMessage from "../TimedMessage/TimedMessage";
import ErrorTimedMessage from "../ErrorMessage/ErrorMessage";
import getUploadedListOfSongsObj from "@/Utils/listOfSongsObj";
import { useSongsPlaying } from "@/Contexts/SongsPlayingContext";
import { MESSAGES_TIMEOUT, MOBILE_MAX_WIDTH } from "@/globalVariables";
import { useRouter } from "next/router";
import RedirectOnError from "../Redirect/RedirectOnError";
import { patchUser, postSong } from "@/Utils/backEndUtils";
import { addSongToAllSongs, verifyAuthentication } from "@/Utils/userUtils";
import { UploadIconStyled } from "../Icons/Icons";
import { useMediaQuery } from "@mui/material";
import { useAllSongs } from "@/Contexts/AllSongsContext";

export interface SongInterface {
  name: string;
  url: string;
  song_id: number | undefined;
}

export type UploadedSongType = {
  song_id: number;
};

function FileUploader() {
  const [showPicker, setShowPicker] = useState(false);
  // const [song, setSong] = useState<SongInterface | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const router = useRouter();

  const [submitRequest, setSubmitRequest] = useState<submitRequestInterface>({
    isLoading: false,
    submitted: false,
    error: false,
    errorMessage: null,
    message: null,
  });

  const [uploadMessageVisible, setUploadMessageVisible] = useState(false);

  const { user, setUser, clearUser } = useUser();
  const { songsPlaying, setSongsPlaying } = useSongsPlaying();
  const maxMobileWidth = useMediaQuery(`(max-width:${MOBILE_MAX_WIDTH})`);
  const { allSongs, setAllSongs } = useAllSongs();

  // const onLoadedMetadata = () => {
  //     if (audioRef.current) {
  //         console.log(audioRef.current.duration);
  //     }
  // };

  const handleUpload = async (e: any) => {
    setShowPicker(false);

    try {
      const authToken = getCookie("tokenCookie");
      console.log("authToken", authToken);
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

        console.log("postSongResponse", postSongResponse);

        let userPreviousSongs: SongInterface[] = [];
        if (user.uploadedSongs) {
          userPreviousSongs = user.uploadedSongs;
        } else {
          userPreviousSongs = [];
        }

        // interface SongInterface {
        //   name: string;
        //   url: string;
        //   id: number | undefined;
        // }

        // const uploadedSongID: UploadedSongType = {
        //   song_id: postSongResponse.data.id,
        // };

        const newSong: SongInterface = {
          name: songName,
          url: songUrl,
          song_id: postSongResponse.data.id,
        };
        // const newSongIDs: (SongInterface | UploadedSongType)[] = [
        //   ...userPreviousSongs,
        //   uploadedSongID,
        // ];
        const newSongs: SongInterface[] = [...userPreviousSongs, newSong];

        console.log("newUserSongs", newSongs);

        const responsePatch = await patchUser(
          user.id,
          { uploadedSongs: newSongs, playLists: user.playLists },
          authToken
        );

        // console.log("responsePatch", responsePatch);

        setUser((prev: any) => ({
          ...prev,
          uploadedSongs: newSongs,
        }));

        setSongsPlaying(
          getUploadedListOfSongsObj(newSongs, -1, "User Uploaded Songs")
        );
        // console.log("userPreviousSongs", userPreviousSongs);

        // console.log("newSongs", newSongs);

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
      console.log("error uploading song", err);

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
    // console.log("upload click");
    setSubmitRequest({
      isLoading: false,
      submitted: false,
      error: false,
      errorMessage: null,
      message: null,
    });
    // const authToken = getCookie("tokenCookie");
    // verifyAuthentication(authToken, setSubmitRequest, clearUser, 'Can not open file picker!')
    setShowPicker(true);
  };

  const handleOnclose = () => {
    setShowPicker(false);
    // console.log("setting piker to false");
  };

  const handleEnded = () => {
    // verifyAuthentication(getCookie("tokenCookie"), setSubmitRequest, clearUser, 'Can not play next song!')
    // console.log("song ended!");
  };

  // useEffect(() => {
  //   if (submitRequest.error) {
  //     setTimeout(() => {
  //       router.push("/login");
  //     }, REDIRECT_TIMEOUT);
  //   }
  // }, [submitRequest.error]);

  return (
    <>
      {/* {console.log("showPicker", showPicker)}

      {console.log("user user", user)}
      {console.log("submitRequest.error", submitRequest.error)} */}

      <FileUploaderContainer>
       {maxMobileWidth ? <FileUploaderMobileButton
          onClick={() => {
            handleUploadButtonClick();
            verifyAuthentication(
              getCookie("tokenCookie"),
              setSubmitRequest,
              clearUser,
              "Can not open file picker!"
            );
          }}
        >
          <UploadIconStyled /> 
        </FileUploaderMobileButton> : <FileUploaderLaptopButton
          onClick={() => {
            handleUploadButtonClick();
            verifyAuthentication(
              getCookie("tokenCookie"),
              setSubmitRequest,
              clearUser,
              "Can not open file picker!"
            );
          }}
        >
          Upload Song
        </FileUploaderLaptopButton>}

        {!submitRequest.error && showPicker && (
          <PickerOverlay
            apikey={process.env.NEXT_PUBLIC_FILESTACK_API_KEY as string}
            // onSuccess={(res) => console.log(res)}
            pickerOptions={{
              accept: ["audio/*"],
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
        {/* {submitRequest.error && (
          <ErrorTimedMessage errorMessage={'You are not logged in! Redirecting to login page...'} />
        )} */}

        {user.id == 0 && (
          <RedirectOnError
            error={submitRequest.error}
            message={"You are not logged in! Redirecting to login page..."}
          />
        )}
      </FileUploaderContainer>
    </>
  );
}

export default FileUploader;
