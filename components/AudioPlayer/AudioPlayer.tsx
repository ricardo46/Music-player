import { useEffect, useRef, useState } from "react";
import { SongInterface } from "../FileUploader/FileUploader";
import { SongsList } from "../StyledComponents/IndexStyles";
import { StyledButton } from "../StyledComponents/StyledComponents";
import {
  PlayerAndSongsContainer,
  PlayerContainer,
  StyledAudio,
} from "./AudioPlayerStyles";
import { useUser } from "@/Contexts/UserContext";
import { getCookie } from "cookies-next";
import { submitRequestInterface } from "../MultipleInputForm/MultipleInputForm";
import deleteSong from "@/Utils/deleteSong";
import patchUser from "@/Utils/patchUser";

interface AudioPlayerInterface {
  songs: SongInterface[] | null;
  handleEnded: () => void;
}

const AudioPlayer = ({ songs, handleEnded }: AudioPlayerInterface) => {
  const [songIndex, setSongIndex] = useState<number>(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const { user, setUser, clearUser } = useUser();
  const [submitRequest, setSubmitRequest] = useState<submitRequestInterface>({
    isLoading: false,
    submitted: false,
    error: false,
    errorMessage: null,
    message: null,
  });

  const onSongEnded = () => {
    console.log("prev song", songIndex);

    if (songs) {
      if (songIndex == songs?.length - 1) {
        setSongIndex(0);
        setPlaying(false);
      } else {
        setSongIndex((prev) => prev + 1);
      }
      handleEnded();
    } else {
      console.log("Cant play songs because no songs were uploaded yet!");
    }
  };

  const updateSongIndex = (index: number) => {
    setSongIndex(index);
  };

  const onSongClick = (e: any, index: number) => {
    updateSongIndex(index);
    setPlaying(true);
  };

  const incrementSongIndex = () => {
    if (songs) {
      if (songIndex == songs?.length - 1) {
        setSongIndex(0);
      } else {
        setSongIndex((prevIndex) => prevIndex + 1);
      }
    }
  };

  const decrementSongIndex = () => {
    if (songs) {
      if (songIndex == 0) {
        setSongIndex(songs?.length - 1);
      } else {
        setSongIndex((prevIndex) => prevIndex - 1);
      }
    }
  };

  const onDeleteClick = async (e: any, songID: number | undefined) => {
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

      const deleteSongResponse = songID
        ? await deleteSong(songID, authToken)
        : null;

      console.log("deleteSongResponse", deleteSongResponse);

      let userPreviousSongs: SongInterface[] | null = user.uploadedSongs;

      const newSongs: SongInterface[] | undefined = userPreviousSongs?.filter(
        (song) => song.song_id != songID
      );

      console.log("newSongs", newSongs);

      const responsePatch = await patchUser(
        user.id,
        { uploadedSongs: newSongs },
        authToken
      );

      // console.log("responsePatch", responsePatch);

      setUser((prev: any) => ({
        ...prev,
        uploadedSongs: newSongs,
      }));

      setSubmitRequest({
        error: false,
        submitted: true,
        isLoading: false,
        errorMessage: null,
        message: "Song deleted from backend!",
      });
    } catch (err: any) {
      console.log("error deleting song", err);

      setSubmitRequest({
        error: true,
        submitted: true,
        errorMessage: err ? err.response.data.message : null,
        isLoading: false,
        message: null,
      });
    }
  };

  useEffect(() => {
    if (audioRef.current && playing) {
      audioRef.current.play();
    } else {
      audioRef.current?.pause();
    }
  }, [songIndex, playing]);

  return (
    <>
      <PlayerAndSongsContainer>
        {songs && (
          <SongsList>
            {songs.map((el: SongInterface, index: number) => {
              return (
                <div key={el.song_id}>
                  {songIndex == index && (
                    <h3
                      onClick={(e) => onSongClick(e, index)}
                    >{`${index}- ${el.name}`}</h3>
                  )}
                  {songIndex != index && (
                    <p onClick={(e) => onSongClick(e, index)}>
                      {`${index}- ${el.name}`}
                    </p>
                  )}
                  {el.song_id && user.id != 0 && (
                    <StyledButton onClick={(e) => onDeleteClick(e, el.song_id)}>
                      X
                    </StyledButton>
                  )}
                </div>
              );
            })}
          </SongsList>
        )}

        <PlayerContainer>
          {songs && (
            <>
              <StyledButton onClick={decrementSongIndex}>{"<"}</StyledButton>
              <StyledButton onClick={incrementSongIndex}>{">"}</StyledButton>
              <StyledAudio
                ref={audioRef}
                src={songs[songIndex]?.url}
                controls
                onEnded={onSongEnded}
                onPlay={() => setPlaying(true)}
                onPause={() => setPlaying(false)}
              />
            </>
          )}
        </PlayerContainer>
        <p>{songs && `Playing: ${songs[songIndex].name}`}</p>
      </PlayerAndSongsContainer>
    </>
  );
};

export default AudioPlayer;
