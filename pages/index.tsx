import { useLayoutSubmitRequest } from "@/Contexts/LayoutContext";
import { useSongsPlaying } from "@/Contexts/SongsPlayingContext";
import { ListOfSongs, UserType, useUser } from "@/Contexts/UserContext";
import getListOfSongsObj from "@/Utils/listOfSongsObj";
import LoadingAnimation from "@/components/LoadingAnimation/LoadingAnimation";
import SongListAndPlayer from "@/components/SongListAndPlayer/SongListAndPlayer";
import TimedMessage from "@/components/TimedMessage/TimedMessage";
import { MESSAGES_TIMEOUT } from "@/globalVariables";
import axios from "axios";
import { useEffect, useState } from "react";

export async function getServerSideProps(context: any) {
  let errorDataAuth = null;

  const authToken = context.req.cookies.tokenCookie;

  const responseAuth = await axios
    .get("https://x8ki-letl-twmt.n7.xano.io/api:71Gy7uAA/auth/me", {
      headers: { Authorization: "Bearer " + authToken },
    })
    .catch((err) => {
      console.log("errorDataAuth", err);
      errorDataAuth = err.response.data;
    });

  let errorDataSong = null;
  const responseSongs: any = await axios
    .get("https://x8ki-letl-twmt.n7.xano.io/api:71Gy7uAA/song")
    .catch((err) => {
      console.log("errorDataSong", err);
      errorDataSong = err.response.data;
    });

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
  const listOfSongs: ListOfSongs = getListOfSongsObj(
    songs,
    -2,
    "All Users Songs"
  );
  const { songsPlaying, setSongsPlaying } = useSongsPlaying();
  const [messageIsVisible, setMessageIsVisible] = useState(false);


  const [songIndex, setSongIndex] = useState<number>(0);
  const {
    layoutSubmitRequest,
    setLayoutSubmitRequest,
    clearLayoutSubmitRequest,
  } = useLayoutSubmitRequest();

  const [playing, setPlaying] = useState(false);

  const handleEnded = () => {
    console.log("song ended on home page!");
  };

  // const handleSongClick = (e: any, index: number) => {
  //   setSongIndex(index);
  //   setPlaying(true);
  // };

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

  if(error){
    setMessageIsVisible(true);
    setTimeout(() => {
      setMessageIsVisible(false);
    }, MESSAGES_TIMEOUT);
  }  
  }, []);

  return (
    <>
      <h3>Home</h3>
      {layoutSubmitRequest.isLoading && <LoadingAnimation />}
      <SongListAndPlayer />
      {messageIsVisible && layoutSubmitRequest.errorMessage && (
        <TimedMessage
          visible={true}
          message={'You are not logged in!'}
        />
      )}
      {layoutSubmitRequest.errorMessage &&
        console.log(
          `${layoutSubmitRequest.errorMessage} You are not logged in!`
        )}
      {songs?.length == 0 && (
        <TimedMessage visible={true} message={"No songs uploaded yet!"} />
      )}
      <TimedMessage visible={true} message={"No songs uploaded yet!"}  data-testid="timedMessage" />
    </>
  );
}
