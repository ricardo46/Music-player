import { useSongsPlaying } from "@/Contexts/SongsPlayingContext";
import { useState } from "react";
import { useRouter } from "next/router";
import LoadingAnimation from "../LoadingAnimation/LoadingAnimation";
import {
  ListName,
  PlayingSongNameContainer,
  SongButtonsContainer,
  SongContainer,
  SongNameContainer,
  SongsContainer,
  SongsListTop,
  StyledSongsList,
} from "./SongsListStyles";
import {
  AddToPlaylistIconStyled,
  RemoveSongFromListIconStyled,
  TrashIconStyled,
} from "../Icons/Icons";
import { AddToPlaylistModal } from "../AddToPlaylistModal/AddToPlaylistModal";
import { DeleteSongModal } from "../DeleteSongModal/DeleteSongModal";
import { RemoveSongFromPlaylistModal } from "../RemoveSongFromPlaylistModal/RemoveSongFromPlaylistModal";
import {
  MOBILE_MAX_WIDTH,
  SONGS_UPLOADED_BY_ALL_USERS_LIST_ID,
  SONGS_UPLOADED_BY_CURRENT_USER_LIST_ID,
  USER_PAGE_PATH,
} from "@/globalVariables";
import {
  ListOfSongs,
  SongInterface,
  submitRequestInterface,
} from "@/Utils/tsTypes";
import { useUser } from "@/Contexts/UserContext";
import FileUploader from "../FileUploader/FileUploader";
import { useLayoutSubmitRequest } from "@/Contexts/LayoutContext";
import { useMediaQuery } from "@mui/material";
import DeletePlaylistButton from "../DeletePlaylistButton/DeletePlaylistButton";
import TimedMessage from "../TimedMessage/TimedMessage";
import { getNumberOfOtherUserSongsInSearchResults } from "@/Utils/userUtils";
import { useSearchSongs } from "@/Contexts/SearchSongsContext";
import OtherUsersSearchTitle from "./OtherUsersSearchTitle";
import CurrentUserSearchTitle from "./CurrentUserSearchTitle";

interface SongsListProps {
  songIndex: number;
  handleSongClick: (e: any, index: number) => void;
}

const SongsList = ({ songIndex, handleSongClick }: SongsListProps) => {
  const [submitRequest, setSubmitRequest] = useState<submitRequestInterface>({
    isLoading: false,
    submitted: false,
    error: false,
    errorMessage: null,
    message: null,
  });

  const { user } = useUser();


  const { songsPlaying } = useSongsPlaying();


  const router = useRouter();

  const [playListToAddSong, setPlayListToAddSong] =
    useState<ListOfSongs | null>(null);

  const [modalSong, setModalSong] = useState<null | SongInterface>(null);

  const [addSongModalVisible, setAddSongModalVisible] = useState(false);

  const [deleteSongModalVisible, setDeleteSongModalVisible] = useState(false);

  const [
    removeSongFromPlaylistModalVisible,
    setRemoveSongFromPlaylistModalVisible,
  ] = useState(false);

  const toggleAddSongModal = () => {
    setAddSongModalVisible(!addSongModalVisible);
  };
  const toggleDeleteSongModal = () => {
    setDeleteSongModalVisible(!deleteSongModalVisible);
  };

  const toggleRemoveSongFromPlaylistModal = () => {
    setRemoveSongFromPlaylistModalVisible(!removeSongFromPlaylistModalVisible);
  };

  const onListChange = (selectedOption: any) => {
    const playList = user.playLists?.find(
      (playList) => playList.id == selectedOption.value
    );
    if (playList) {
      setPlayListToAddSong(playList);
    }
  };

  const handleAddSongToPlayList = (song: SongInterface) => {
    setModalSong(song);

    toggleAddSongModal();
  };

  const handleRemoveSongFromPlayList = (song: SongInterface) => {
    setModalSong(song);

    toggleRemoveSongFromPlaylistModal();
  };

  const handleDeleteSong = (song: SongInterface) => {
    setModalSong(song);

    toggleDeleteSongModal();
  };


  return (
    <>
      {addSongModalVisible && (
        <AddToPlaylistModal
          toggleAddSongModal={toggleAddSongModal}
          modalSong={modalSong}
          onListChange={onListChange}
          playListToAddSong={playListToAddSong}
          setPlayListToAddSong={setPlayListToAddSong}
        />
      )}
      {deleteSongModalVisible && (
        <DeleteSongModal
          modalSong={modalSong}
          toggleDeleteSongModal={toggleDeleteSongModal}
        />
      )}
      {removeSongFromPlaylistModalVisible && (
        <RemoveSongFromPlaylistModal
          modalSong={modalSong}
          toggleRemoveSongFromPlaylistModal={toggleRemoveSongFromPlaylistModal}
        />
      )}

      {submitRequest.isLoading && <LoadingAnimation />}

      <StyledSongsList>
        <SongsListTop>
          {<ListName>{songsPlaying?.name}</ListName>}
          {router.pathname == USER_PAGE_PATH &&
          songsPlaying?.id == SONGS_UPLOADED_BY_CURRENT_USER_LIST_ID ? (
            <FileUploader />
          ) : (
            <DeletePlaylistButton />
          )}
        </SongsListTop>
        <SongsContainer>
          {songsPlaying?.playList &&
            songsPlaying.playList.map((song: SongInterface, index: number) => {
              return (
                <>
                  <OtherUsersSearchTitle songIndexInSearchList={index} />
                  <CurrentUserSearchTitle songIndexInSearchList={index} />

                  <SongContainer key={song.song_id}>
                    {songIndex == index && (
                      <PlayingSongNameContainer
                        onClick={(e) => handleSongClick(e, index)}
                      >
                        
                        {`${index + 1}- ${song.name}`}
                      </PlayingSongNameContainer>
                    )}
                    {songIndex != index && (
                      <SongNameContainer
                        onClick={(e) => handleSongClick(e, index)}
                      >
                        
                        {`${index + 1}- ${song.name}`}
                      </SongNameContainer>
                    )}
                    <SongButtonsContainer>
                      {router.pathname == USER_PAGE_PATH &&
                        song.song_id &&
                        user.id != 0 &&
                        songsPlaying.id ==
                          SONGS_UPLOADED_BY_CURRENT_USER_LIST_ID && (
                          <TrashIconStyled
                            data-testid="deleteButton"
                            onClick={() => handleDeleteSong(song)}
                          />
                        )}
                      {router.pathname == USER_PAGE_PATH &&
                        (songsPlaying.id ==
                          SONGS_UPLOADED_BY_CURRENT_USER_LIST_ID ||
                          songsPlaying.id ==
                            SONGS_UPLOADED_BY_ALL_USERS_LIST_ID) && (
                          <AddToPlaylistIconStyled
                            onClick={() => handleAddSongToPlayList(song)}
                            data-testid="addSongToPlayListButton"
                          />
                        )}
                      {songsPlaying.id !=
                        SONGS_UPLOADED_BY_CURRENT_USER_LIST_ID &&
                        songsPlaying.id !=
                          SONGS_UPLOADED_BY_ALL_USERS_LIST_ID && (
                          <RemoveSongFromListIconStyled
                            onClick={() => handleRemoveSongFromPlayList(song)}
                          />
                        )}
                    </SongButtonsContainer>
                  </SongContainer>
                </>
              );
            })}
        </SongsContainer>
        {songsPlaying?.playList?.length == 0 && (
          <TimedMessage visible={true} message={"No songs found!"} />
        )}
      </StyledSongsList>
    </>
  );
};

export default SongsList;
