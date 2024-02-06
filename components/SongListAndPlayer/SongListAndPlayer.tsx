import { useLayoutSubmitRequest } from "@/Contexts/LayoutContext";
import { useSongsPlaying } from "@/Contexts/SongsPlayingContext";
import { useRef, useState } from "react";
import AudioPlayer from "../AudioPlayer/AudioPlayer";
import TimedMessage from "../TimedMessage/TimedMessage";
import SongsList from "../SongsList/SongsList";
import UserListsDropDown from "../UserListsDropDown/UserListsDropDown";
import { useRouter } from "next/router";
import DeletePlaylistButton from "../DeletePlaylistButton/DeletePlaylistButton";
import {
  PlayerAndDropDownContainer,
  PlayerAndSongsContainer,
  UserListsDropDownContainer,
} from "./SongListAndPlayerStyles";
import FileUploader from "../FileUploader/FileUploader";
import { useMediaQuery } from "@mui/material";
import {
  MOBILE_MAX_WIDTH,
  SONGS_UPLOADED_BY_CURRENT_USER_LIST_ID,
  USER_PAGE_PATH,
} from "@/globalVariables";
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
    animationRef.current = requestAnimationFrame(whilePlaying);
  };

  const updatePlayerCurrentTime = () => {
    if (progressBarRef.current) {
      setBeforeWidth((progressBarRef.current.value / duration) * 100);

      setCurrentTime(progressBarRef.current.value);
    }
  };

  const togglePlaying = () => {
    const prev = playing;
    setPlaying(!prev);
    if (!prev) {
      animationRef.current = requestAnimationFrame(whilePlaying);
    } else {
      audioRef.current?.play();
      cancelAnimationFrame(animationRef.current);
    }
  };

  const handleSongClick = (e: any, index: number) => {
    setSongIndex(index);
    setPlaying(true);

    animationRef.current = requestAnimationFrame(whilePlaying);
  };

  return (
    <>
      <PlayerAndSongsContainer>
        <PlayerAndDropDownContainer>
          {
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
            />
          }
          {router.pathname == USER_PAGE_PATH && (
            <UserListsDropDownContainer>
              <UserListsDropDown
                updateSongIndex={setSongIndex}
                setPlaying={setPlaying}
              />

              {/* <DeletePlaylistButton /> */}
              {/* {router.pathname == USER_PAGE_PATH &&
                !layoutSubmitRequest.isLoading &&
                songsPlaying?.id == SONGS_UPLOADED_BY_CURRENT_USER_LIST_ID &&
                !maxMobileWidth && <FileUploader />} */}
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
