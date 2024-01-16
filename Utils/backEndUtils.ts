import { ListOfSongs } from "@/Contexts/UserContext";
import { SongInterface } from "@/components/FileUploader/FileUploader";
import axios from "axios";
import { CookieValueTypes } from "cookies-next";

// const deleteSong = async (songID: number, authToken: CookieValueTypes) => {
//   const deleteSongResponse = await axios.delete(
//     `https://x8ki-letl-twmt.n7.xano.io/api:71Gy7uAA/song/${songID}`,
//     {
//       headers: {
//         Authorization: "Bearer " + authToken,
//       },
//     }
//   );
//   //   console.log("deleteSongResponse", deleteSongResponse);

//   return deleteSongResponse;
// };

// const patchListOfSongs = async (
//   listofsongs_id: number,
//   newProps: {
//     playList: SongInterface[] | undefined;
//   },
//   authToken: CookieValueTypes
// ) => {
//   const responsePatch = await axios.patch(
//     `https://x8ki-letl-twmt.n7.xano.io/api:71Gy7uAA/listofsongs/${listofsongs_id}`,
//     newProps,
//     {
//       headers: {
//         Authorization: "Bearer " + authToken,
//       },
//     }
//   );
//   console.log("responsePatch 111");

//   // return responsePatch;
// };

const patchUser = async (
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
  //   console.log("responsePatch", responsePatch);

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
  //   console.log("postSongResponse", postSongResponse);

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
  //   console.log("responsePatch", responsePatch);

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
  //   console.log("responsePatch", responsePatch);

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

export {
  deleteUploadedSong,
  patchUser,
  postSong,
  patchPlaylistAddSong,
  deleteSongFromPlaylist,
  addPlaylist,
  deletePlaylist,
};
