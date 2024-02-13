import { useLayoutSubmitRequest } from "@/Contexts/LayoutContext";
import { useSongsPlaying } from "@/Contexts/SongsPlayingContext";
import { useRef, useState } from "react";
import AudioPlayer from "../AudioPlayer/AudioPlayer";
import SongsList from "../SongsList/SongsList";
import UserListsDropDown from "../UserListsDropDown/UserListsDropDown";
import { useRouter } from "next/router";
import {
  PlayerAndDropDownContainer,
  PlayerAndSongsContainer,
  UserListsDropDownContainer,
} from "./SongListAndPlayerStyles";
import { useMediaQuery } from "@mui/material";
import { MOBILE_MAX_WIDTH, USER_PAGE_PATH } from "@/globalVariables";
import { usePlaying } from "@/Contexts/PlayingContext";

interface ListOfSongsPropInterface {}

const SongListAndPlayer = ({}: ListOfSongsPropInterface) => {
  const {
    layoutSubmitRequest,
    setLayoutSubmitRequest,
    clearLayoutSubmitRequest,
  } = useLayoutSubmitRequest();
  const { songsPlaying, setSongsPlaying } = useSongsPlaying();
  const [songIndex, setSongIndex] = useState<number>(0);
  const [beforeWidth, setBeforeWidth] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const { playing, setPlaying } = usePlaying();

  const router = useRouter();

  const audioRef = useRef<HTMLAudioElement>(null);
  const progressBarRef = useRef<any>();
  const animationRef = useRef<any>();

  const maxMobileWidth = useMediaQuery(`(max-width:${MOBILE_MAX_WIDTH})`);

  const whilePlaying = () => {
    if (progressBarRef.current) {
      progressBarRef.current.value = audioRef.current?.currentTime;
    }
    updatePlayerCurrentTime();
    // animationRef.current = requestAnimationFrame(whilePlaying);
  };

  const updatePlayerCurrentTime = () => {
    // console.log("duration", duration);

    if (progressBarRef.current) {
      setBeforeWidth((progressBarRef.current.value / duration) * 100);

      setCurrentTime(progressBarRef.current.value);
    }
  };

  const togglePlaying = () => {
    // const prev = playing;
    // setPlaying(!prev);
    // if (!prev) {
    //   // animationRef.current = requestAnimationFrame(whilePlaying);
    // } else {
    //   audioRef.current?.play();
    //   // cancelAnimationFrame(animationRef.current);
    //}
    if (audioRef.current) {
      audioRef.current.volume = 0.3;
    }
    if (!playing) {
      setPlaying(true);
      audioRef.current?.play();
    }
    if (playing) {
      setPlaying(false);
      audioRef.current?.pause();
    }
  };

  const handleSongClick = (e: any, index: number) => {
    setSongIndex(index);
    setPlaying(true);

    // animationRef.current = requestAnimationFrame(whilePlaying);
  };

  return (
    <>
      <PlayerAndSongsContainer>
        <PlayerAndDropDownContainer>
          {!layoutSubmitRequest.isLoading && (
            <AudioPlayer
              songIndex={songIndex}
              setSongIndex={setSongIndex}
              playing={playing}
              setPlaying={setPlaying}
              animationRef={animationRef}
              whilePlaying={whilePlaying}
              audioRef={audioRef}
              progressBarRef={progressBarRef}
              updatePlayerCurrentTime={updatePlayerCurrentTime}
              currentTime={currentTime}
              beforeWidth={beforeWidth}
              duration={duration}
              setDuration={setDuration}
              togglePlaying={togglePlaying}
              setBeforeWidth={setBeforeWidth}
              setCurrentTime={setCurrentTime}

              
            />
          )}
          {router.pathname == USER_PAGE_PATH && (
            <UserListsDropDownContainer>
              <UserListsDropDown
                updateSongIndex={setSongIndex}
                setPlaying={setPlaying}
              />
            </UserListsDropDownContainer>
          )}
        </PlayerAndDropDownContainer>

        {songsPlaying && (
          <SongsList songIndex={songIndex} handleSongClick={handleSongClick} />
        )}
      </PlayerAndSongsContainer>
    </>
  );
};

export default SongListAndPlayer;
