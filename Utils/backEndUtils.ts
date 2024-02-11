import axios from "axios";
import { CookieValueTypes } from "cookies-next";
import { ListOfSongs, SongInterface, UserType } from "./tsTypes";

const patchUserLists = async (
  userId: number,
  newProps: {
    uploadedSongs: SongInterface[] | undefined;
    playLists?: ListOfSongs[] | null;
  },
  authToken: CookieValueTypes
) => {
  const responsePatch = await axios.patch(
    `https://x8ki-letl-twmt.n7.xano.io/api:71Gy7uAA/user/${userId}`,
    newProps,
    {
      headers: {
        Authorization: "Bearer " + authToken,
      },
    }
  );

  return responsePatch;
};

const patchUserDetails = async (
  userId: number,
  newProps: {
    name: string;
    email: string;
    password: string;
  },
  authToken: CookieValueTypes
) => {
  const responsePatch = await axios.patch(
    `https://x8ki-letl-twmt.n7.xano.io/api:71Gy7uAA/user_details/${userId}`,
    newProps,
    {
      headers: {
        Authorization: "Bearer " + authToken,
      },
    }
  );

  return responsePatch;
};

const postSong = async (
  songName: string,
  songUrl: string,
  authToken: CookieValueTypes
) => {
  const postSongResponse = await axios.post(
    "https://x8ki-letl-twmt.n7.xano.io/api:71Gy7uAA/song",
    { name: songName, url: songUrl },
    {
      headers: {
        Authorization: "Bearer " + authToken,
      },
    }
  );

  return postSongResponse;
};

const deleteUploadedSong = async (
  user_id: number,
  song_id: number,
  playLists: number[],
  authToken: CookieValueTypes
) => {
  const responsePatch = await axios.patch(
    `https://x8ki-letl-twmt.n7.xano.io/api:71Gy7uAA/delete_uploaded_song`,
    {
      user_id: user_id,
      song_id: song_id,
      listofsongs_id: playLists,
    },
    {
      headers: {
        Authorization: "Bearer " + authToken,
      },
    }
  );

  return responsePatch;
};

const patchPlaylistAddSong = async (
  listofsongs_id: number,
  song_id: number,
  authToken: CookieValueTypes
) => {
  const responsePatch = await axios.patch(
    `https://x8ki-letl-twmt.n7.xano.io/api:71Gy7uAA/listofsongs/${listofsongs_id}`,
    {
      new_song: {
        song_id: song_id,
      },
    },
    {
      headers: {
        Authorization: "Bearer " + authToken,
      },
    }
  );

  return responsePatch;
};

const deleteSongFromPlaylist = async (
  listofsongs_id: number,
  song_id: number,
  authToken: CookieValueTypes
) => {
  const response = await axios.patch(
    `https://x8ki-letl-twmt.n7.xano.io/api:71Gy7uAA/listofsongsRemoveSong`,
    { listofsongs_id: listofsongs_id, song_id: song_id },
    {
      headers: {
        Authorization: "Bearer " + authToken,
      },
    }
  );

  return response;
};

const addPlaylist = async (
  name: string,
  authToken: CookieValueTypes,
  user_id: number
) => {
  const response = await axios.post(
    `https://x8ki-letl-twmt.n7.xano.io/api:71Gy7uAA/listofsongs`,
    { name: name, user_id: user_id },
    {
      headers: {
        Authorization: "Bearer " + authToken,
      },
    }
  );

  return response;
};

const deletePlaylist = async (
  user_id: number,
  listofsongs_id: number,

  authToken: CookieValueTypes
) => {
  const response = await axios.delete(
    `https://x8ki-letl-twmt.n7.xano.io/api:71Gy7uAA/listofsongs/${listofsongs_id}`,
    {
      data: {
        user_id: user_id,
        listofsongs_id: listofsongs_id,
      },

      headers: {
        Authorization: "Bearer " + authToken,
      },
    }
  );
  return response;
};
const getAllSongsDataFromAPI = async (name: string) => {
  const response = await axios.get(
    "https://x8ki-letl-twmt.n7.xano.io/api:71Gy7uAA/song",
    {
      params: { song_name: name },
    }
  );

  return response;
};

const getOtherAndCurrentUserSongsDataFromAPI = async (
  name: string,
  user: UserType
) => {
  const response = await axios.get(
    "https://x8ki-letl-twmt.n7.xano.io/api:71Gy7uAA/song_other_users_and_current",
    {
      params: { song_name: name, user_id: user.id },
    }
  );

  return response;
};

const editSongNameInAPI = async (songName: string, songId: number) => {
  const response = await axios.patch(
    `https://x8ki-letl-twmt.n7.xano.io/api:71Gy7uAA/song/${songId}`,
    {
      name: songName,
    }
  );

  return response;
};

const editListNameInAPI = async (
  name: string,
  listId: number,
  authToken: CookieValueTypes
) => {
  const response = await axios.patch(
    `https://x8ki-letl-twmt.n7.xano.io/api:71Gy7uAA/listofsongs/${listId}/edit_list_name`,
    { name: name },
    {
      headers: {
        Authorization: "Bearer " + authToken,
      },
    }
  );

  return response;
};

export {
  deleteUploadedSong,
  patchUserLists,
  postSong,
  patchPlaylistAddSong,
  deleteSongFromPlaylist,
  addPlaylist,
  deletePlaylist,
  getAllSongsDataFromAPI,
  getOtherAndCurrentUserSongsDataFromAPI,
  editSongNameInAPI,
  patchUserDetails,
  editListNameInAPI,
};
