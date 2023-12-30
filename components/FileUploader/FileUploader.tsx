import { PickerOverlay } from "filestack-react";
import { useRef, useState } from "react";
import { StyledButton } from "../StyledComponents/StyledComponents";
import { submitRequestInterface } from "../MultipleInputForm/MultipleInputForm";
import axios from "axios";
import { getCookie } from "cookies-next";
import { useUser } from "@/Contexts/UserContext";
import { FileUploaderContainer } from "./FileUploadeStyles";

export interface SongInterface {
  name: string;
  url: string;
  id: number | undefined;
}

type UploadedSongType = {
  song_id: number;
};

function FileUploader() {
  const [showPicker, setShowPicker] = useState(false);
  // const [song, setSong] = useState<SongInterface | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [submitRequest, setSubmitRequest] = useState<submitRequestInterface>({
    isLoading: false,
    submitted: false,
    error: false,
    errorMessage: null,
    message: null,
  });
  const { user, setUser } = useUser();
  // const onLoadedMetadata = () => {
  //     if (audioRef.current) {
  //         console.log(audioRef.current.duration);
  //     }
  // };

  const handleUpload = async (e: any) => {
    setShowPicker(false);

    try {
      const authToken = getCookie("tokenCookie");
      setSubmitRequest({
        isLoading: true,
        error: false,
        submitted: false,
        errorMessage: null,
        message: null,
      });
      console.log("authToken", authToken);

      const songName = e.filesUploaded[0].filename;
      const songUrl = e.filesUploaded[0].url;
      const postSongResponse = await axios.post(
        "https://x8ki-letl-twmt.n7.xano.io/api:71Gy7uAA/song",
        { name: songName, url: songUrl },
        {
          headers: {
            Authorization: "Bearer " + authToken,
          },
        }
      );

      console.log("postSongResponse", postSongResponse);

      let userPreviousSongs: SongInterface[] = [];
      if (user.uploadedSongs) {
        userPreviousSongs = user.uploadedSongs;
      } else {
        userPreviousSongs = [];
      }

      const uploadedSongID: UploadedSongType = {
        song_id: postSongResponse.data.id,
      };

      const newSongIDs: (SongInterface | UploadedSongType)[] = [
        ...userPreviousSongs,
        uploadedSongID,
      ];
      console.log("newUserSongs", newSongIDs);

      const responsePatch = await axios.patch(
        `https://x8ki-letl-twmt.n7.xano.io/api:71Gy7uAA/user/${user.id}`,
        { uploadedSongs: newSongIDs },
        {
          headers: {
            Authorization: "Bearer " + authToken,
          },
        }
      );
      console.log("responsePatch", responsePatch);

      const newSong: SongInterface = {
        name: songName,
        url: songUrl,
        id: postSongResponse.data.id,
      };

      const newSongs: SongInterface[] = [...userPreviousSongs, newSong];

      setUser((prev: any) => ({
        ...prev,
        uploadedSongs: newSongs,
      }));

      setSubmitRequest({
        error: false,
        submitted: true,
        isLoading: false,
        errorMessage: null,
        message: "Song added to backend!",
      });
    } catch (err: any) {
      console.log("error uploading song", err);

      setSubmitRequest({
        error: true,
        submitted: true,
        errorMessage: err ? err.response.data.message : null,
        isLoading: false,
        message: null,
      });
    }
  };

  const handleOnclick = () => {
    setShowPicker(true);
  };

  const handleOnclose = () => {
    setShowPicker(false);
    console.log("setting piker to false");
  };

  const handleEnded = () => {
    console.log("song ended!");
  };

  return (
    <>
      <FileUploaderContainer>
        <StyledButton onClick={handleOnclick}>Upload Song</StyledButton>

        {showPicker && (
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
            onUploadDone={handleUpload}
          />
        )}
      </FileUploaderContainer>
    </>
  );
}

export default FileUploader;
