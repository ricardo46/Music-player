import { useSearchSongs } from "@/Contexts/SearchSongsContext";
import { useSongsPlaying } from "@/Contexts/SongsPlayingContext";
import { useUser } from "@/Contexts/UserContext";
import {
  SONGS_UPLOADED_BY_ALL_USERS_LIST_ID,
  USER_PAGE_PATH,
} from "@/globalVariables";
import { useRouter } from "next/router";
import { SearchTitle } from "./SongsListStyles";

const OtherUsersSearchTitle = ({
  songIndexInSearchList,
}: {
  songIndexInSearchList: number;
}) => {
  const router = useRouter();
  const { user, setUser } = useUser();
  const { songsPlaying, setSongsPlaying } = useSongsPlaying();
  const {
    otherUserSongs,
    setOtherUserSongs,
    currentUserSongs,
    setCurrentUserSongs,
  } = useSearchSongs();

  const numberOfOtherUserSongsInSearchResults = otherUserSongs.length;

  return (
    <>
      {router.pathname == USER_PAGE_PATH &&
        user.id != 0 &&
        songsPlaying?.id == SONGS_UPLOADED_BY_ALL_USERS_LIST_ID &&
        songIndexInSearchList == 0 &&
        numberOfOtherUserSongsInSearchResults > 0 &&
        <SearchTitle>Other users songs:</SearchTitle>}
    </>
  );
};

export default OtherUsersSearchTitle;
