import { useLayoutSubmitRequest } from "@/Contexts/LayoutContext";
import { ListOfSongs, UserType, useUser } from "@/Contexts/UserContext";
import { requireAuthentication } from "@/Utils/requireAuthentication";
import LoadingAnimation from "@/components/LoadingAnimation/LoadingAnimation";
import { useEffect } from "react";
import { useSongsPlaying } from "@/Contexts/SongsPlayingContext";
import SongListAndPlayer from "@/components/SongListAndPlayer/SongListAndPlayer";
import { useRouter } from "next/router";
import RedirectOnError from "@/components/Redirect/RedirectOnError";
import getListOfSongsObj from "@/Utils/listOfSongsObj";
import axios from "axios";
import { useAllSongs } from "@/Contexts/AllSongsContext";
import { SongInterface } from "@/components/FileUploader/FileUploader";

export async function getServerSideProps(context: any) {
  const currentUrl = context.resolvedUrl;

  const resAuth = await requireAuthentication(context, currentUrl);
  console.log("resAuth", resAuth);

  if (resAuth.redirect) {
    return await requireAuthentication(context, currentUrl);
  }

  const responseSongs: any = await axios
    .get("https://x8ki-letl-twmt.n7.xano.io/api:71Gy7uAA/song")
    .catch((err) => {
      console.log("errorDataSong", err);
    });

  return {
    props: {
      userData: resAuth.props.userData,
      errorAuth: resAuth.props.errorAuth,
      allUsersSongs: responseSongs?.data || null,
    }
  }

}

const User = ({ userData, error,allUsersSongs }: { userData: UserType; error: any, allUsersSongs: SongInterface[] }) => {
  const {
    layoutSubmitRequest,
    setLayoutSubmitRequest,
    clearLayoutSubmitRequest,
  } = useLayoutSubmitRequest();

  const { user, setUser } = useUser();
  const { allSongs, setAllSongs } = useAllSongs();
  const { songsPlaying, setSongsPlaying } = useSongsPlaying();

  const router = useRouter();

  const uploadedListOfSongs: ListOfSongs = getListOfSongsObj(
    userData.uploadedSongs,
    -1,
    "User Uploaded Songs"
  );

  const listOfAllSongs: ListOfSongs = getListOfSongsObj(
    allSongs, -2, 'All Users Songs'
  );

  useEffect(() => {
    setUser(userData);
    setAllSongs(allUsersSongs)
    console.log("user.uploadedSongs", user.uploadedSongs);
    setSongsPlaying(uploadedListOfSongs);
    setLayoutSubmitRequest({
      error: userData.uploadedSongs ? false : true,
      submitted: true,
      isLoading: false,
      errorMessage: userData.uploadedSongs ? null : error?.message,
    });
  }, []);

  return (
    <>
      <h3>User Page</h3>
      {/* {console.log("user.uploadedSongs", user.uploadedSongs)} */}

      {/* {console.log("songsPlaying", songsPlaying)} */}

      {layoutSubmitRequest.isLoading && <LoadingAnimation />}
      <div>
        <SongListAndPlayer />

        {user.id == 0 && (
          <RedirectOnError
            error={error}
            message={"You are not logged in! Redirecting to login page..."}
          />
        )}
      </div>
    </>
  );
};

export default User;
