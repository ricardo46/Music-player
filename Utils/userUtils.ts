import { CookieValueTypes } from "cookies-next";
import { SetStateAction } from "react";
import {
  ListOfSongs,
  SongInterface,
  UserType,
  submitRequestInterface,
} from "./tsTypes";

const playListsIds = (playLists: any[]) =>
  playLists.map((list) => ({ listofsongs_id: list.listofsongs_id }));

const getNewListObject = (id: number, listName: string): ListOfSongs => {
  return {
    id: id,
    name: listName,
    playList: [],
  };
};

const removeSongFromUserPlaylistsInFrontEnd = (user: UserType, id: number) => {
  const playLists = user.playLists;
  if (playLists == undefined) return [];

  const filteredPlaylists = playLists?.map((list) => {
    const playList = list.playList;
    const newPlaylist = playList?.filter((song) => song.song_id != id);
    const listOfSongs: ListOfSongs = {
      ...list,
      playList: newPlaylist ? newPlaylist : null,
    };

    return listOfSongs;
  });
  return filteredPlaylists;
};

const addSongToUserPlaylistInFrontEnd = (
  user: UserType,
  newSong: SongInterface,
  platListID: number
) => {
  const playLists = user.playLists;

  const newPlaylists = playLists?.map((list) => {
    if (list.id == platListID) {
      const prevPlayList = list.playList ? list.playList : [];

      const newPlaylist = [...prevPlayList, newSong];

      const newListOfSongs: ListOfSongs = {
        ...list,
        playList: newPlaylist ? newPlaylist : null,
      };
      return newListOfSongs;
    }

    return list;
  });
  return newPlaylists;
};

const removeSongFromUserPlaylistInFrontEnd = (
  user: UserType,
  songID: number,
  platListID: number
) => {
  const playLists = user.playLists;

  const newPlaylists = playLists?.map((list) => {
    if (list.id == platListID) {
      const prevPlayList = list.playList ? list.playList : [];
      console.log("prevPlayList", prevPlayList);

      const newPlaylist = prevPlayList.filter((song) => song.song_id != songID);

      const newListOfSongs: ListOfSongs = {
        ...list,
        playList: newPlaylist,
      };
      return newListOfSongs;
    }

    return list;
  });
  return newPlaylists;
};

const removeSongFromUploadedSongs = (user: UserType, id: number) => {
  return user.uploadedSongs?.filter((song) => song.song_id != id);
};

const removeSongFromAllSongs = (allSongs: SongInterface[], id: number) => {
  return allSongs.filter((song) => song.song_id != id);
};

const addSongToAllSongs = (allSongs: SongInterface[], song: SongInterface) => {
  console.log("allSongs", allSongs);
  console.log("song", song);

  if (allSongs) {
    return [...allSongs, song];
  } else {
    return [song];
  }
};

const getUserPlaylistsIDs = (user: UserType) => {
  return user.playLists ? user.playLists.map((playList) => playList.id) : [];
};

const verifyAuthentication = (
  authToken: CookieValueTypes,
  setSubmitRequest: (value: SetStateAction<submitRequestInterface>) => void,
  clearUser: () => void,
  errorMessage: string
) => {
  if (!authToken) {
    setSubmitRequest({
      error: true,
      submitted: true,
      errorMessage: `Did not pass authentication verification!`,
      isLoading: false,
      message: null,
    });
    clearUser();
  }
};

const songExistsInPlaylist = (
  listOfSongs: ListOfSongs | null,
  songID: number | undefined
) => {
  const playList = listOfSongs?.playList;

  if (!playList || !songID) {
    return false;
  }

  return playList.reduce((res, el) => {
    if (el.song_id == songID) {
      return true;
    }
    return res;
  }, false);
};

const getListOfSongsFromID = (lists: ListOfSongs[], id: number) => {
  return lists.find((list) => list.id == id);
};

const removePlaylistFromList = (
  listsOfSongs: ListOfSongs[],
  listID: number
) => {
  return listsOfSongs.filter((list) => list.id != listID);
};

const getSelectOptionsFromListOfSongs = (listOfLists: ListOfSongs[]) =>
  listOfLists.map((listOfSongs) => {
    return { value: listOfSongs.id, label: listOfSongs.name };
  });

export {
  getNewListObject,
  removeSongFromUserPlaylistsInFrontEnd,
  removeSongFromUploadedSongs,
  getUserPlaylistsIDs,
  verifyAuthentication,
  addSongToUserPlaylistInFrontEnd,
  songExistsInPlaylist,
  removeSongFromUserPlaylistInFrontEnd,
  getListOfSongsFromID,
  removePlaylistFromList,
  removeSongFromAllSongs,
  addSongToAllSongs,
  getSelectOptionsFromListOfSongs,
};
