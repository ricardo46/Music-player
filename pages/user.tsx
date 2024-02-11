import { useLayoutSubmitRequest } from "@/Contexts/LayoutContext";
import { useUser } from "@/Contexts/UserContext";
import { requireAuthentication } from "@/Utils/requireAuthentication";
import LoadingAnimation from "@/components/LoadingAnimation/LoadingAnimation";
import { useEffect } from "react";
import { useSongsPlaying } from "@/Contexts/SongsPlayingContext";
import SongListAndPlayer from "@/components/SongListAndPlayer/SongListAndPlayer";
import { useRouter } from "next/router";
import RedirectOnError from "@/components/Redirect/RedirectOnError";
import {
  getAllUsersUploadedSongsObj,
  getUserUploadedSongsObj,
} from "@/Utils/listOfSongsObj";
import axios from "axios";
import { useAllSongs } from "@/Contexts/AllSongsContext";
import SearchSongsForm from "@/components/SearchSongsForm/SearchSongsForm";
import { ListOfSongs, SongInterface, UserType } from "@/Utils/tsTypes";
import { APP_NAME, LOGIN_PAGE_NAME, USER_PAGE_NAME } from "@/globalVariables";
import Head from "next/head";
import { UserDetailsModal } from "@/components/UserDetailsModal/UserDetailsModal";

export async function getServerSideProps(context: any) {
  const currentUrl = context.resolvedUrl;

  const resAuth = await requireAuthentication(context, currentUrl);
  console.log("resAuth", resAuth);

  if (resAuth.redirect) {
    return await requireAuthentication(context, currentUrl);
  }

  // const responseSongs: any = await axios
  //   .get("https://x8ki-letl-twmt.n7.xano.io/api:71Gy7uAA/song_other_users",{
  //     params: { user_id: resAuth.props.userData?.id },
  //   })
  //   .catch((err) => {
  //     console.log("errorDataSong", err);
  //   });

  return {
    props: {
      userData: resAuth.props.userData,
      errorAuth: resAuth.props.errorAuth,
      // otherUsersSongs: responseSongs?.data || null,
    },
  };
}

const User = ({
  userData,
  error,
}: // otherUsersSongs,
{
  userData: UserType;
  error: any;
  // otherUsersSongs: SongInterface[];
}) => {
  const {
    layoutSubmitRequest,
    setLayoutSubmitRequest,
    clearLayoutSubmitRequest,
  } = useLayoutSubmitRequest();

  const { user, setUser } = useUser();
  // const { allSongs, setAllSongs } = useAllSongs();
  const { songsPlaying, setSongsPlaying } = useSongsPlaying();

  const router = useRouter();

  const uploadedListOfSongs: ListOfSongs = getUserUploadedSongsObj(
    userData.uploadedSongs,
    userData
  );

  // const listOfAllSongs: ListOfSongs = getAllUsersUploadedSongsObj(allSongs);

  useEffect(() => {
    setUser(userData);
    // setAllSongs(otherUsersSongs);
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
      <Head>
        <title>{`${APP_NAME} | ${USER_PAGE_NAME}`}</title>
      </Head>
      {layoutSubmitRequest.isLoading && <LoadingAnimation />}
      
      {!layoutSubmitRequest.isLoading && (
        <>
          <SongListAndPlayer />
          <SearchSongsForm />
        </>
      )}

      {!layoutSubmitRequest.isLoading && user.id == 0 && (
        <RedirectOnError
          error={error}
          message={`You are not logged in! Redirecting to ${LOGIN_PAGE_NAME} page...`}
        />
      )}
    </>
  );
};

export default User;
