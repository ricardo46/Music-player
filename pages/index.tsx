import { useLayoutSubmitRequest } from "@/Contexts/LayoutContext";
import { UserType, useUser } from "@/Contexts/UserContext";
import AudioPlayer from "@/components/AudioPlayer/AudioPlayer";
import LoadingAnimation from "@/components/LoadingAnimation/LoadingAnimation";
import TimedMessage from "@/components/TimedMessage/TimedMessage";
import axios from "axios";
import {
  DetailedHTMLProps,
  LiHTMLAttributes,
  MouseEvent,
  MouseEventHandler,
  useEffect,
  useState,
} from "react";

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

  const [songIndex, setSongIndex] = useState<number>(0);
  const {
    layoutSubmitRequest,
    setLayoutSubmitRequest,
    clearLayoutSubmitRequest,
  } = useLayoutSubmitRequest();

  const handleEnded = () => {
    console.log("song ended on home page!");
  };

  useEffect(() => {
    console.log("errorSongs", errorSongs);
    console.log("userData", userData);
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

    setLayoutSubmitRequest({
      error: error,
      submitted: true,
      isLoading: false,
      errorMessage: errorMessages,
    });
  }, []);

  return (
    <>
      <h3>Home</h3>
      {layoutSubmitRequest.isLoading && <LoadingAnimation />}
      {!layoutSubmitRequest.isLoading && songs?.length != 0 && (
        <AudioPlayer songs={songs} handleEnded={handleEnded}></AudioPlayer>
      )}
      {layoutSubmitRequest.error && (
        <TimedMessage message={layoutSubmitRequest.errorMessage} />
      )}
      {songs?.length == 0 && (
        <TimedMessage message={"No songs uploaded yet!"} />
      )}
    </>
  );
}
