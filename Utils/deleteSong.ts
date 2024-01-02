import axios from "axios";
import { CookieValueTypes } from "cookies-next";

const deleteSong = async (songID: number, authToken: CookieValueTypes) => {
  const deleteSongResponse = await axios.delete(
    `https://x8ki-letl-twmt.n7.xano.io/api:71Gy7uAA/song/${songID}`,
    {
      headers: {
        Authorization: "Bearer " + authToken,
      },
    }
  );
  //   console.log("deleteSongResponse", deleteSongResponse);

  return deleteSongResponse;
};

export default deleteSong;
