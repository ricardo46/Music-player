import {
  SongInterface,
  UploadedSongType,
} from "@/components/FileUploader/FileUploader";
import axios from "axios";
import { CookieValueTypes } from "cookies-next";

const patchUser = async (
  userId: number,
  newProp: {
    uploadedSongs: SongInterface[] | undefined;
  },
  authToken: CookieValueTypes
) => {
  const responsePatch = await axios.patch(
    `https://x8ki-letl-twmt.n7.xano.io/api:71Gy7uAA/user/${userId}`,
    newProp,
    {
      headers: {
        Authorization: "Bearer " + authToken,
      },
    }
  );
  //   console.log("responsePatch", responsePatch);

  return responsePatch;
};

export default patchUser;
