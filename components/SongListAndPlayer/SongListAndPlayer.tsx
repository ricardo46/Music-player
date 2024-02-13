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
import { USER_PAGE_PATH } from "@/globalVariables";
import { usePlaying } from "@/Contexts/PlayingContext";

interface ListOfSongsPropInterface {}

const SongListAndPlayer = ({}: ListOfSongsPropInterface) => {
  const { layoutSubmitRequest } = useLayoutSubmitRequest();
  const { songsPlaying } = useSongsPlaying();
  const [songIndex, setSongIndex] = useState<number>(0);
  const [beforeWidth, setBeforeWidth] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const { playing, setPlaying } = usePlaying();

  const router = useRouter();

  const audioRef = useRef<HTMLAudioElement>(null);
  const progressBarRef = useRef<any>();

  const togglePlaying = () => {
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
              audioRef={audioRef}
              progressBarRef={progressBarRef}
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
