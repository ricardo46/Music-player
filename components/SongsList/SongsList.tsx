import { ListOfSongs, useUser } from "@/Contexts/UserContext";
import { SongInterface } from "../FileUploader/FileUploader";
import { StyledButton } from "../StyledComponents/StyledComponents";
import { useSongsPlaying } from "@/Contexts/SongsPlayingContext";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import { submitRequestInterface } from "../MultipleInputForm/MultipleInputForm";
import { useRouter } from "next/router";
import {
  addSongToUserPlaylistInFrontEnd,
  getListOfSongsFromID,
  removeSongFromUserPlaylistInFrontEnd,
  songExistsInPlaylist,
} from "@/Utils/userUtils";
import {
  deleteSongFromPlaylist,
  patchPlaylistAddSong,
} from "@/Utils/backEndUtils";
import ErrorTimedMessage from "../ErrorMessage/ErrorMessage";
import DropDown from "../DropDown/DropDown";
import { Modal } from "../Modal/Modal";
import TimedMessage from "../TimedMessage/TimedMessage";
import { MESSAGES_TIMEOUT } from "@/globalVariables";
import NewListForm from "../NewListForm/NewListForm";
import LoadingAnimation from "../LoadingAnimation/LoadingAnimation";
import OnDeleteSongClick from "./OnDeleteSongClick";
import {
  ListName,
  PlayingSongNameContainer,
  SongButtonsContainer,
  SongContainer,
  SongNameContainer,
  SongsContainer,
  StyledSongsList,
} from "./SongsListStyles";
import { AddToPlaylistIconStyled, RemoveSongFromListIconStyled, TrashIconStyled } from "../Icons/Icons";
import { useAllSongs } from "@/Contexts/AllSongsContext";

interface SongsListProp {
  // songs: ListOfSongs ;
  songIndex: number;
  handleSongClick: (e: any, index: number) => void;
  // onDeleteClick: (e: any, songID: number | undefined) => Promise<void>;
}

const SongsList = ({
  // songs,
  songIndex,
  handleSongClick,
}: // onDeleteClick,
SongsListProp) => {
  const [submitRequest, setSubmitRequest] = useState<submitRequestInterface>({
    isLoading: false,
    submitted: false,
    error: false,
    errorMessage: null,
    message: null,
  });
  const { user, setUser } = useUser();
  const playLists = user.playLists ? user.playLists : [];

  const { songsPlaying, setSongsPlaying } = useSongsPlaying();
  const router = useRouter();

  const [playListToAddSong, setPlayListToAddSong] =
    useState<ListOfSongs | null>(user.playLists ? user.playLists[0] : null);

  const [playlistNewSong, setPlaylistNewSong] = useState<null | SongInterface>(
    null
  );

  const [addSongModalVisible, setAddSongModalVisible] = useState(false);

  const [addSongMessageIsVisible, setAddSongMessageIsVisible] = useState(false);
  const [deleteSongMessageIsVisible, setDeleteSongMessageIsVisible] =
    useState(false);

    const { allSongs, setAllSongs } = useAllSongs();

  const toggleAddSongModal = () => {
    setAddSongModalVisible(!addSongModalVisible);
  };

  const onModalClose = () => {
    toggleAddSongModal();
  };

  const addToPlaylist = async () => {
    if (songExistsInPlaylist(playListToAddSong, playlistNewSong?.song_id)) {
      setSubmitRequest({
        error: false,
        submitted: true,
        isLoading: false,
        errorMessage:
          "Song already exists in this playlist! Please choose another playlist or create a new playlist.",
        message: null,
      });
    } else {
      try {
        const authToken = getCookie("tokenCookie");
        setSubmitRequest({
          isLoading: true,
          error: false,
          submitted: false,
          errorMessage: null,
          message: null,
        });

        if (playListToAddSong && playlistNewSong?.song_id) {
          await patchPlaylistAddSong(
            playListToAddSong.id,
            playlistNewSong.song_id,
            authToken
          );

          const newPlaylists: ListOfSongs[] | undefined =
            addSongToUserPlaylistInFrontEnd(
              user,
              playlistNewSong,
              playListToAddSong.id
            );

          console.log("user prev playLists", user.playLists);

          console.log("newPlaylists", newPlaylists);

          setUser((prev: any) => ({
            ...prev,
            playLists: newPlaylists,
          }));
          setSubmitRequest({
            error: false,
            submitted: true,
            isLoading: false,
            errorMessage: null,
            message: "Song added to playlist!",
          });
          setTimeout(() => {
            toggleAddSongModal();
          }, MESSAGES_TIMEOUT);
        } else {
          setSubmitRequest({
            error: false,
            submitted: true,
            isLoading: false,
            errorMessage: null,
            message: "No playlists created! Create a playlist.",
          });
        }
      } catch (err: any) {
        console.log("error adding song to playlist", err);

        setSubmitRequest({
          error: true,
          submitted: true,
          errorMessage: `Error adding song to playlist! ${
            err.response
              ? err.response.data.message
              : err.message
              ? err.message
              : `Error adding song to playlist ${playListToAddSong?.name} !`
          }`,
          isLoading: false,
          message: null,
        });
      }
    }

    setAddSongMessageIsVisible(true);
    setTimeout(() => {
      setAddSongMessageIsVisible(false);
    }, MESSAGES_TIMEOUT);
  };

  const onListChange = (e: any) => {
    const playList = user.playLists?.find(
      (playList) => playList.id == e.target.value
    );
    if (playList) {
      setPlayListToAddSong(playList);
    }
  };

  const handleRemoveSongFromPlayList = async (
    listOfSongs: ListOfSongs,
    song: SongInterface
  ) => {
    const listOfSongsID = listOfSongs.id;
    const songID = song.song_id;

    try {
      const authToken = getCookie("tokenCookie");
      setSubmitRequest({
        isLoading: true,
        error: false,
        submitted: false,
        errorMessage: null,
        message: null,
      });

      if (songID) {
        await deleteSongFromPlaylist(listOfSongsID, songID, authToken);

        const newPlaylists: ListOfSongs[] | undefined =
          removeSongFromUserPlaylistInFrontEnd(user, songID, listOfSongsID);


        setUser((prev: any) => ({
          ...prev,
          playLists: newPlaylists,
        }));

        if (newPlaylists) {
          const newPlaylist = getListOfSongsFromID(newPlaylists, listOfSongsID);

          if (newPlaylist) {
            setSongsPlaying(newPlaylist);
          }
        }
      }

      setSubmitRequest({
        error: false,
        submitted: true,
        isLoading: false,
        errorMessage: null,
        message: "Song removed from playlist!",
      });
    } catch (err: any) {
      console.log("error removing song from playlist", err);

      setSubmitRequest({
        error: true,
        submitted: true,
        errorMessage: `Error removing song from playlist! ${
          err.response
            ? err.response.data.message
            : err.message
            ? err.message
            : `${playListToAddSong?.name}!`
        }`,
        isLoading: false,
        message: null,
      });
    }
  };

  const handleAddSongToPlayList = (song: SongInterface) => {
    console.log("new song", song);
    setPlaylistNewSong(song);
    if (user.playLists) {
      setPlayListToAddSong(user.playLists[0]);
    }

    toggleAddSongModal();
  };

  useEffect(() => {
    if (user.playLists) {
      setPlayListToAddSong(user.playLists[0]);
    }
  }, [user]);

  return (
    <>
      {addSongModalVisible && (
        <Modal onModalClose={onModalClose}>
          <h4>{playlistNewSong?.name}</h4>

          <h4>Add to playlist</h4>

          {user.playLists && (
            <DropDown
              onChangeFunction={onListChange}
              defaultDropDownValue={
                user.playLists[0] ? user.playLists[0].name : "No lists created!"
              }
              listOfLists={user.playLists ? user.playLists : []}
              listProp={"id"}
              itemPropertyToShow={"name"}
            />
          )}
          {!user.playLists && <p>Create a new list to add songs!</p>}
          <StyledButton
            onClick={() => {
              addToPlaylist();
            }}
          >
            Add to playlist
          </StyledButton>
          {submitRequest.isLoading && <LoadingAnimation />}
          {submitRequest.errorMessage && (
            <ErrorTimedMessage
              visible={addSongMessageIsVisible}
              errorMessage={submitRequest.errorMessage}
            />
          )}
          {submitRequest.message && (
            <TimedMessage
              visible={addSongMessageIsVisible}
              message={submitRequest.message}
            />
          )}
          {console.log(
            "submitRequest.errorMessage",
            submitRequest.errorMessage
          )}
          <NewListForm />
        </Modal>
      )}
      {submitRequest.isLoading && <LoadingAnimation />}
      {submitRequest.errorMessage && (
        <ErrorTimedMessage
          visible={deleteSongMessageIsVisible}
          errorMessage={submitRequest.errorMessage}
        />
      )}
      {submitRequest.message && (
        <TimedMessage
          visible={deleteSongMessageIsVisible}
          message={submitRequest.message}
        />
      )}
      <StyledSongsList>
        {<ListName>{songsPlaying?.name}</ListName>}
        <SongsContainer>
          {songsPlaying?.playList &&
            songsPlaying.playList.map((song: SongInterface, index: number) => {
              return (
                <SongContainer key={song.song_id}>
                  {songIndex == index && (
                    <PlayingSongNameContainer
                      onClick={(e) => handleSongClick(e, index)}
                    >{`${index}- ${song.name}`}</PlayingSongNameContainer>
                  )}
                  {songIndex != index && (
                    <SongNameContainer
                      onClick={(e) => handleSongClick(e, index)}
                    >
                      {`${index}- ${song.name}`}
                    </SongNameContainer>
                  )}
                  <SongButtonsContainer>
                    {router.pathname == "/user" &&
                      song.song_id &&
                      user.id != 0 &&
                      songsPlaying.id == -1 && (
                        <TrashIconStyled
                          onClick={() =>
                            OnDeleteSongClick(
                              user,
                              setUser,
                              setSongsPlaying,
                              song.song_id,
                              setSubmitRequest,
                              setDeleteSongMessageIsVisible,allSongs, setAllSongs
                            )
                          }
                        />
                      )}
                    {router.pathname == "/user" &&
                      (songsPlaying.id == -1 || songsPlaying.id == -2) && (
                        <AddToPlaylistIconStyled
                          onClick={() => handleAddSongToPlayList(song)}
                        />
                      )}
                    {songsPlaying.id != -1 && songsPlaying.id != -2 && (
                      <RemoveSongFromListIconStyled
                        onClick={() =>
                          handleRemoveSongFromPlayList(songsPlaying, song)
                        }
                      />
                        
                      
                    )}
                  </SongButtonsContainer>
                </SongContainer>
              );
            })}
        </SongsContainer>
      </StyledSongsList>
    </>
  );
};

export default SongsList;
