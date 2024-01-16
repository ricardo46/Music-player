import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { Message, StyledButton } from "../StyledComponents/StyledComponents";
import {
  PlayerButtonsContainer,
  PlayerContainer,
  StyledAudio,
} from "./AudioPlayerStyles";
import { useUser } from "@/Contexts/UserContext";
import { useSongsPlaying } from "@/Contexts/SongsPlayingContext";
import {
  BackwardIconStyled,
  ForwardIconStyled,
} from "../Icons/Icons";

interface AudioPlayerInterface {
  // songs: ListOfSongs;
  handleEnded: () => void;
  songIndex: number;
  setSongIndex: Dispatch<SetStateAction<number>>;
  playing: boolean;
  setPlaying: Dispatch<SetStateAction<boolean>>;
}

const AudioPlayer = ({
  // songs,
  handleEnded,
  songIndex,
  setSongIndex,
  playing,
  setPlaying,
}: AudioPlayerInterface) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const { user, setUser, clearUser } = useUser();
  const { songsPlaying, setSongsPlaying } = useSongsPlaying();

  const onSongEnded = () => {
    console.log("prev song", songIndex);

    if (songsPlaying?.playList) {
      if (songIndex == songsPlaying.playList.length - 1) {
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

  // const updateSongIndex = (index: number) => {
  //   setSongIndex(index);
  // };

  // const onSongClick = (e: any, index: number) => {
  //   // updateSongIndex(index);
  //   setPlaying(true);
  // };

  const incrementSongIndex = () => {
    if (songsPlaying?.playList) {
      if (songIndex == songsPlaying.playList.length - 1) {
        setSongIndex(0);
      } else {
        setSongIndex((prevIndex) => prevIndex + 1);
      }
    }
  };

  const decrementSongIndex = () => {
    if (songsPlaying?.playList) {
      if (songIndex == 0) {
        setSongIndex(songsPlaying.playList.length - 1);
      } else {
        setSongIndex((prevIndex) => prevIndex - 1);
      }
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
      {/* {songs && (
          <SongsList
            songs={songs}
            songIndex={songIndex}
            onSongClick={onSongClick}
            onDeleteClick={onDeleteClick}
          />
        )} */}

      <PlayerContainer>
        <PlayerButtonsContainer>
          {songsPlaying?.playList && (
            <>
              <BackwardIconStyled onClick={decrementSongIndex} />

              <StyledAudio
                ref={audioRef}
                src={songsPlaying.playList[songIndex]?.url}
                controls
                onEnded={onSongEnded}
                onPlay={() => setPlaying(true)}
                onPause={() => setPlaying(false)}
              />
              <ForwardIconStyled onClick={incrementSongIndex}/>
            </>
          )}
        </PlayerButtonsContainer>
        <Message>
          {songsPlaying?.playList &&
            `Playing: ${songsPlaying.playList[songIndex].name}`}
        </Message>
      </PlayerContainer>
      {/* {console.log('songsPlaying', songsPlaying)} */}
      {/* {console.log('songsPlaying songIndex', songIndex)} */}
    </>
  );
};

export default AudioPlayer;
