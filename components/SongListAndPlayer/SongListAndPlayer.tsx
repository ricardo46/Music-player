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
  PlayerAndDropDownContainer,
  PlayerAndSongsContainer,
  UserListsDropDownContainer,
} from "./SongListAndPlayerStyles";
import FileUploader from "../FileUploader/FileUploader";
import { useMediaQuery } from "@mui/material";
import { MOBILE_MAX_WIDTH } from "@/globalVariables";

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

  const maxMobileWidth = useMediaQuery(`(max-width:${MOBILE_MAX_WIDTH})`);

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
        <PlayerAndDropDownContainer>
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
              {router.pathname == "/user" &&
                !layoutSubmitRequest.isLoading &&
                songsPlaying?.id == -1 &&
                !maxMobileWidth && <FileUploader />}
            </UserListsDropDownContainer>
          )}
        </PlayerAndDropDownContainer>

        {/* {router.pathname == "/" && <h4>{songsPlaying?.name}</h4>} */}
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
