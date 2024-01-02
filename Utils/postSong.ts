import axios from "axios";
import { CookieValueTypes } from "cookies-next";

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
  
  export default postSong;