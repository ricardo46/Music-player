import {
  Dispatch,
  MutableRefObject,
  RefObject,
  SetStateAction,
  useEffect,
} from "react";
import { Message } from "../StyledComponents/StyledComponents";
import {
  PlayerButtonsContainer,
  PlayerContainer,
  PlayerUIContainer,
  ProgressBarContainer,
  ProgressBarStyled,
  StyledAudio,
  TimeText,
} from "./AudioPlayerStyles";
import { useSongsPlaying } from "@/Contexts/SongsPlayingContext";
import {
  Back15IconStyled,
  BackwardIconStyled,
  Forward15IconStyled,
  ForwardIconStyled,
  PauseIconStyled,
  PlayIconStyled,
} from "../Icons/Icons";

interface AudioPlayerInterface {
  // songs: ListOfSongs;
  songIndex: number;
  setSongIndex: Dispatch<SetStateAction<number>>;
  playing: boolean;
  setPlaying: Dispatch<SetStateAction<boolean>>;
  animationRef: MutableRefObject<any>;
  whilePlaying: () => void;
  audioRef: RefObject<HTMLAudioElement>;
  progressBarRef: MutableRefObject<any>;
  updatePlayerCurrentTime: () => void;
  currentTime: number;
  beforeWidth: number;
  duration: number;
  setDuration: Dispatch<SetStateAction<number>>;
  togglePlaying: () => void;
  setBeforeWidth: Dispatch<SetStateAction<number>>;
  setCurrentTime: Dispatch<SetStateAction<number>>;
}

const AudioPlayer = ({
  // songs,
  songIndex,
  setSongIndex,
  playing,
  setPlaying,
  animationRef,
  whilePlaying,
  audioRef,
  progressBarRef,
  updatePlayerCurrentTime,
  currentTime,
  beforeWidth,
  duration,
  setDuration,
  togglePlaying,
  setBeforeWidth,
  setCurrentTime,
}: AudioPlayerInterface) => {
  const { songsPlaying, setSongsPlaying } = useSongsPlaying();

  const onSongEnd = () => {
    if (songsPlaying?.playList) {
      if (songIndex == songsPlaying.playList.length - 1) {
        setSongIndex(0);
        setPlaying(false);
      } else {
        setSongIndex((prev) => prev + 1);
      }
    } else {
      console.log("Cant play songs because no songs were uploaded yet!");
    }
    setBeforeWidth(0);
  };

  const incrementSongIndex = () => {
    if (songsPlaying?.playList) {
      if (songIndex == songsPlaying.playList.length - 1) {
        setSongIndex(0);
      } else {
        setSongIndex((prevIndex) => prevIndex + 1);
      }
    }
    setBeforeWidth(0);
  };

  const decrementSongIndex = () => {
    if (songsPlaying?.playList) {
      if (songIndex == 0) {
        setSongIndex(songsPlaying.playList.length - 1);
      } else {
        setSongIndex((prevIndex) => prevIndex - 1);
      }
    }
    setBeforeWidth(0);
  };

  const calculateTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const finalMinutes = minutes < 10 ? `0${minutes}` : "minutes";
    const flooredSeconds = Math.floor(seconds % 60);
    const remainingSeconds =
      flooredSeconds < 10 ? `0${flooredSeconds}` : flooredSeconds;
    return `${finalMinutes} : ${remainingSeconds}`;
  };

  const updateRange = () => {
    // audioRef.current!.currentTime = progressBarRef.current.value;

    if (audioRef.current && audioRef.current.duration && progressBarRef.current.value) {
      audioRef.current!.currentTime =
        (audioRef.current?.duration / 100) * progressBarRef.current.value;
    }
    
    setBeforeWidth(progressBarRef.current.value);

    // updatePlayerCurrentTime();

    // animationRef.current = requestAnimationFrame(whilePlaying);
  };

  const back15 = () => {
    progressBarRef.current.value = Number(progressBarRef.current.value) -  (15 / duration) * 100;
    updateRange();
  };

  const skip15 = () => {
    progressBarRef.current.value = Number(progressBarRef.current.value) +  (15 / duration) * 100;
    updateRange();

  };

  const handleOnLoadedMetadata = () => {
    // if (audioRef.current && progressBarRef.current) {
    //   const seconds = Math.floor(audioRef.current.duration);
    //   setDuration(seconds);
    // }
    // setBeforeWidth(0)
    if (audioRef.current) {
      setDuration(+audioRef.current.duration.toFixed(2));
    }
  };

  const onTimeUpdate = () => {
    if (audioRef.current) {
      const percent = (
        (audioRef.current.currentTime / audioRef.current.duration) *
        100
      ).toFixed(2);
      const time = audioRef.current.currentTime;
      if (+percent) {
        setBeforeWidth(+percent);
        setCurrentTime(+time.toFixed(2));
      } else {
        setBeforeWidth(0);
        setCurrentTime(0);
      }
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.3;
    }

    if (audioRef.current && playing) {
      audioRef.current.play();
    } else {
      audioRef.current?.pause();
    }
  }, [songIndex, playing]);

  

  // useEffect(() => {
  //   if (audioRef.current && progressBarRef.current) {
  //     const seconds = Math.floor(audioRef.current.duration);

  //     progressBarRef.current.max = seconds;
  //   }
  // }, [audioRef?.current?.onloadedmetadata, audioRef?.current?.readyState]);

  return (
    <>
      <PlayerContainer>
        <PlayerUIContainer>
          {songsPlaying?.playList && (
            <>
              {/* <StyledAudio
                ref={audioRef}
                src={songsPlaying.playList[songIndex]?.url}
                onEnded={onSongEnd}
                onLoadedMetadata={handleOnLoadedMetadata}
              /> */}

              <StyledAudio
                ref={audioRef}
                src={songsPlaying.playList[songIndex]?.url}
                onEnded={onSongEnd}
                onLoadedMetadata={handleOnLoadedMetadata}
                onTimeUpdate={onTimeUpdate}
              />

              <PlayerButtonsContainer>
                <BackwardIconStyled
                  onClick={decrementSongIndex}
                  data-testid="backwardButton"
                />
                <Back15IconStyled onClick={back15} />

                {playing ? (
                  <PauseIconStyled
                    onClick={togglePlaying}
                    data-testid="pauseButton"
                  />
                ) : (
                  <PlayIconStyled
                    onClick={togglePlaying}
                    data-testid="playButton"
                  />
                )}
                <Forward15IconStyled onClick={skip15} data-testid="skip15" />

                <ForwardIconStyled
                  onClick={incrementSongIndex}
                  data-testid="forwardButton"
                />
              </PlayerButtonsContainer>
              <ProgressBarContainer>
                {/* current time */}
                <TimeText>{calculateTime(currentTime)}</TimeText>
                {/* progress bar */}

                {/* <ProgressBarStyled
                  type="range"
                  defaultValue="0"
                  ref={progressBarRef}
                  onChange={updateRange}
                  $beforeWidth={beforeWidth}
                  // data-testid="progressBar"
                /> */}

                <ProgressBarStyled
                  value={beforeWidth}
                  type="range"
                  step="0.01"
                  ref={progressBarRef}
                  onChange={updateRange}
                  $beforeWidth={beforeWidth}
                  // data-testid="progressBar"
                />

                {/* duration */}
                {duration && !isNaN(duration) && (
                  <TimeText>{calculateTime(duration)}</TimeText>
                )}
              </ProgressBarContainer>
            </>
          )}
        </PlayerUIContainer>
        <Message data-testid="songPlaying">
          {songsPlaying?.playList &&
            songsPlaying.playList[songIndex] &&
            `Playing: ${songsPlaying.playList[songIndex].name}`}
        </Message>
      </PlayerContainer>
    </>
  );
};

export default AudioPlayer;
