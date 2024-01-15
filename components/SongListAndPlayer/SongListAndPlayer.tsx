import { useLayoutSubmitRequest } from "@/Contexts/LayoutContext";
import { useSongsPlaying } from "@/Contexts/SongsPlayingContext";
import { useState } from "react";
import AudioPlayer from "../AudioPlayer/AudioPlayer";
import TimedMessage from "../TimedMessage/TimedMessage";
import SongsList from "../SongsList/SongsList";
import UserListsDropDown from "../UserListsDropDown/UserListsDropDown";
import { useRouter } from "next/router";
import DeletePlaylistButton from "../DeletePlaylistButton/DeletePlaylistButton";
import {
  PlayerAndSongsContainer,
  UserListsDropDownContainer,
} from "./SongListAndPlayerStyles";

interface ListOfSongsPropInterface {
  // listOfSongs: ListOfSongs | null;
  // onDeleteClick: (e: any, songID: number | undefined) => Promise<void>;
}

const SongListAndPlayer = ({}: // listOfSongs,
// onDeleteClick,
ListOfSongsPropInterface) => {
  const {
    layoutSubmitRequest,
    setLayoutSubmitRequest,
    clearLayoutSubmitRequest,
  } = useLayoutSubmitRequest();
  const { songsPlaying, setSongsPlaying } = useSongsPlaying();
  const [songIndex, setSongIndex] = useState<number>(0);
  const [playing, setPlaying] = useState(false);
  const router = useRouter();

  const handleEnded = () => {
    console.log("song ended on user page!");
  };

  const handleSongClick = (e: any, index: number) => {
    setSongIndex(index);
    setPlaying(true);
  };

  return (
    <>
      <PlayerAndSongsContainer>
        {!layoutSubmitRequest.isLoading &&
          songsPlaying?.playList?.length != 0 && (
            <AudioPlayer
              handleEnded={handleEnded}
              songIndex={songIndex}
              setSongIndex={setSongIndex}
              playing={playing}
              setPlaying={setPlaying}
            />
          )}
        {router.pathname == "/user" && (
          <UserListsDropDownContainer>
            <UserListsDropDown
              updateSongIndex={setSongIndex}
              setPlaying={setPlaying}
            />

            {/* {router.pathname == "/user" &&
          !layoutSubmitRequest.isLoading &&
          songsPlaying?.id == -1 && <FileUploader />} */}
            <DeletePlaylistButton />
          </UserListsDropDownContainer>
        )}
        {songsPlaying && (
          <SongsList songIndex={songIndex} handleSongClick={handleSongClick} />
        )}

        {!layoutSubmitRequest.isLoading &&
          songsPlaying?.playList?.length == 0 && (
            <TimedMessage visible={true} message={"Playlist is empty!"} />
          )}
      </PlayerAndSongsContainer>
    </>
  );
};

export default SongListAndPlayer;
