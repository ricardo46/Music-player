import { useLayoutSubmitRequest } from "@/Contexts/LayoutContext";
import { useSongsPlaying } from "@/Contexts/SongsPlayingContext";
import { useUser } from "@/Contexts/UserContext";
import { getAllSongsDataFromAPI } from "@/Utils/backEndUtils";
import { getAllUsersUploadedSongsObj } from "@/Utils/listOfSongsObj";
import { ListOfSongs, UserType } from "@/Utils/tsTypes";
import Description from "@/components/Description/Description";
import { DescriptionStyled } from "@/components/Description/DescriptionStyles";
import Descriptions from "@/components/Descriptions/Descriptions";
import LoadingAnimation from "@/components/LoadingAnimation/LoadingAnimation";
import SearchSongsForm from "@/components/SearchSongsForm/SearchSongsForm";
import SongListAndPlayer from "@/components/SongListAndPlayer/SongListAndPlayer";
import { DescriptionsContainer } from "@/components/StyledComponents/StyledComponents";
import TimedMessage from "@/components/TimedMessage/TimedMessage";
import { APP_NAME, HOME_PAGE_NAME, MESSAGES_TIMEOUT } from "@/globalVariables";
import axios from "axios";
import Head from "next/head";
import { useEffect, useState } from "react";

export async function getServerSideProps(context: any) {
  let errorDataAuth = null;

  const authToken = context.req.cookies.tokenCookie;

  const responseAuth = await axios
    .get("https://x8ki-letl-twmt.n7.xano.io/api:71Gy7uAA/auth/me", {
      headers: { Authorization: "Bearer " + authToken },
    })
    .catch((err) => {
      errorDataAuth = err.response.data;
    });

  let errorDataSong = null;
  const responseSongs: any = await getAllSongsDataFromAPI("").catch((err) => {
    errorDataSong = err.response.data;
  });
  console.log("responseSongs", responseSongs);

  const user: UserType = responseAuth?.data ? responseAuth?.data : null;

  return {
    props: {
      songs: responseSongs?.data || null,
      errorSongs: errorDataSong,
      userData: user,
      errorAuth: errorDataAuth,
    },
  };
}

export default function Home({ userData, songs, errorSongs, errorAuth }: any) {
  const { user, setUser, clearUser } = useUser();
  const listOfSongs: ListOfSongs = getAllUsersUploadedSongsObj(songs);
  const { songsPlaying, setSongsPlaying } = useSongsPlaying();
  const [messageIsVisible, setMessageIsVisible] = useState(false);

  const [songIndex, setSongIndex] = useState<number>(0);
  const {
    layoutSubmitRequest,
    setLayoutSubmitRequest,
    clearLayoutSubmitRequest,
  } = useLayoutSubmitRequest();

  useEffect(() => {
    console.log("errorSongs", errorSongs);
    console.log("songs", songs);
    if (errorAuth) {
      console.log("errorAuth");
      clearUser();
    }
    if (user.id == 0 && userData) {
      setUser(userData);
    }

    const error = errorSongs || errorAuth ? true : false;

    let errorMessages = null;
    if (errorSongs || errorAuth) {
      errorMessages = errorSongs
        ? errorSongs.message
        : "" + errorAuth
        ? errorAuth.message
        : "";
    }
    setSongsPlaying(listOfSongs);
    setLayoutSubmitRequest({
      error: error,
      submitted: true,
      isLoading: false,
      errorMessage: errorMessages,
    });

    if (error) {
      setMessageIsVisible(true);
      setTimeout(() => {
        setMessageIsVisible(false);
      }, MESSAGES_TIMEOUT);
    }
  }, []);

  return (
    <>
      <Head>
        <title>{`${APP_NAME} | ${HOME_PAGE_NAME}`}</title>
      </Head>
      {
        !layoutSubmitRequest.isLoading &&
        <Descriptions />
      }
      {layoutSubmitRequest.isLoading && <LoadingAnimation />}
      {(
        <>
          <SongListAndPlayer />
          <SearchSongsForm />
        </>
      )}

      {!layoutSubmitRequest.isLoading && messageIsVisible && layoutSubmitRequest.errorMessage && (
        <TimedMessage visible={true} message={"You are not logged in!"} />
      )}

      {!layoutSubmitRequest.isLoading && songs?.length == 0 && (
        <TimedMessage visible={true} message={"No songs uploaded yet!"} />
      )}
    </>
  );
}
