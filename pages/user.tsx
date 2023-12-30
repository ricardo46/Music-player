import { useLayoutSubmitRequest } from "@/Contexts/LayoutContext";
import { UserType, useUser } from "@/Contexts/UserContext";
import { requireAuthentication } from "@/Utils/requireAuthentication";
import AudioPlayer from "@/components/AudioPlayer/AudioPlayer";
import FileUploader, {
  SongInterface,
} from "@/components/FileUploader/FileUploader";
import LoadingAnimation from "@/components/LoadingAnimation/LoadingAnimation";
import TimedMessage from "@/components/TimedMessage/TimedMessage";
import axios from "axios";
import { useEffect } from "react";

export async function getServerSideProps(context: any) {
  const currentUrl = context.resolvedUrl;

  return requireAuthentication(context, currentUrl);
}

const User = ({ userData, error }: { userData: UserType; error: any }) => {
  const {
    layoutSubmitRequest,
    setLayoutSubmitRequest,
    clearLayoutSubmitRequest,
  } = useLayoutSubmitRequest();

  const { user, setUser } = useUser();

  const handleEnded = () => {
    console.log("song ended on user page!");
  };

  useEffect(() => {
    setUser(userData);
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
      {layoutSubmitRequest.isLoading && <LoadingAnimation />}

      {!layoutSubmitRequest.isLoading && user.uploadedSongs?.length != 0 && (
        <AudioPlayer
          songs={user.uploadedSongs}
          handleEnded={handleEnded}
        ></AudioPlayer>
      )}
      {!layoutSubmitRequest.isLoading && <FileUploader />}
      {error && <TimedMessage message={layoutSubmitRequest.errorMessage} />}
      {!layoutSubmitRequest.isLoading && user.uploadedSongs?.length == 0 && (
        <TimedMessage message={"No songs uploaded yet!"} />
      )}
    </>
  );
};

export default User;
