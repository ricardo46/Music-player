
import {
  SONGS_UPLOADED_BY_ALL_USERS_LIST_ID,
  SONGS_UPLOADED_BY_ALL_USERS_LIST_NAME,
  SONGS_UPLOADED_BY_CURRENT_USER_LIST_ID,
  SONGS_UPLOADED_BY_CURRENT_USER_LIST_NAME,
} from "@/globalVariables";
import { SongInterface, UserType } from "./tsTypes";

const getListOfSongsObj = (
  songs: SongInterface[] | null,
  id: number,
  name: string
) => {
  if (songs) {
    return {
      id: id,
      name: name,
      playList: songs,
    };
  } else {
    return {
      id: id,
      name: name,
      playList: null,
    };
  }
};

const getUserUploadedSongsObj = (uploadedSongs: SongInterface[] | null, user: UserType) => {
  return getListOfSongsObj(
    uploadedSongs,
    SONGS_UPLOADED_BY_CURRENT_USER_LIST_ID,
    `${user.name} ${SONGS_UPLOADED_BY_CURRENT_USER_LIST_NAME}`
  );
};

const getAllUsersUploadedSongsObj = (allSongs: SongInterface[]) => {
  return getListOfSongsObj(
    allSongs,
    SONGS_UPLOADED_BY_ALL_USERS_LIST_ID,
    `${SONGS_UPLOADED_BY_ALL_USERS_LIST_NAME}`
  );
};

export { getUserUploadedSongsObj, getAllUsersUploadedSongsObj };
