/**
 * @jest-environment jsdom
 */
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import AudioPlayer from "./AudioPlayer";
import { Dispatch, SetStateAction } from "react";
import { SongsPlayingContext } from "@/Contexts/SongsPlayingContext";
import { SONGS_UPLOADED_BY_CURRENT_USER_LIST_NAME } from "@/globalVariables";
import { ListOfSongs } from "@/Utils/tsTypes";

const mockPlaylist = [
  {
    song_id: 212,
    id: 212,
    created_at: 1705439558276,
    name: "Abroad Again - Jeremy Blake.mp3",
    url: "https://cdn.filestackcontent.com/BCjk9KkSbuIuPQChIuF2",
  },

  {
    song_id: 220,
    id: 220,
    created_at: 1705448395463,
    name: "Never Play - Jeremy Blake.mp3",
    url: "https://cdn.filestackcontent.com/xLAGhU6NRW8mYYKILKex",
  },
  {
    song_id: 221,
    id: 221,
    created_at: 1705448412960,
    name: "Rinse Repeat - DivKid.mp3",
    url: "https://cdn.filestackcontent.com/Xsv51VHhR4OiHSkmfMQq",
  },
  {
    song_id: 222,
    id: 222,
    created_at: 1705448428829,
    name: "Organic Guitar House - Dyalla.mp3",
    url: "https://cdn.filestackcontent.com/m1HCqrOIQDSfYc9VvzZj",
  },
];

const mockSetSongIndex = jest.fn();
const mockSetPlaying = jest.fn();
const mockSetSongsPlaying = jest.fn();
const mockTogglePlaying = jest.fn();
const mockUpdatePlayerCurrentTime = jest.fn();

function renderAudioPlayer(
  songsPlaying: ListOfSongs | null,
  setSongsPlaying: Dispatch<SetStateAction<ListOfSongs | null>>,
  index: number
) {
  return render(
    <SongsPlayingContext.Provider value={{ songsPlaying, setSongsPlaying }}>
      <AudioPlayer
        songIndex={index}
        setSongIndex={mockSetSongIndex}
        playing={false}
        setPlaying={mockSetPlaying}
        animationRef={jest.fn()}
        whilePlaying={function (): void {}}
        audioRef={{ current: { currentTime: 0 } }}
        progressBarRef={{ current: { value: 0 } }}
        updatePlayerCurrentTime={mockUpdatePlayerCurrentTime}
        currentTime={0}
        beforeWidth={0}
        duration={0}
        setDuration={function (value: SetStateAction<number>): void {}}
        togglePlaying={mockTogglePlaying}
      />
    </SongsPlayingContext.Provider>
  );
}

describe("Audio Player", () => {
  it("1- should show name of first song of songsPlaying", async () => {
    const listOfSongs = {
      id: -1,
      name: SONGS_UPLOADED_BY_CURRENT_USER_LIST_NAME,
      playList: mockPlaylist,
    };
    renderAudioPlayer(listOfSongs, mockSetSongsPlaying, 0);

    expect(
      screen.getByText("Playing: Abroad Again - Jeremy Blake.mp3")
    ).toBeInTheDocument();
  });

  it("2- should show name of third song of songsPlaying", async () => {
    const usr = userEvent.setup();
    const listOfSongs = {
      id: -1,
      name: SONGS_UPLOADED_BY_CURRENT_USER_LIST_NAME,
      playList: mockPlaylist,
    };
    const thirdSongIndex = 2;
    renderAudioPlayer(listOfSongs, mockSetSongsPlaying, thirdSongIndex);

    const thirdSong = await screen.findByText(
      "Playing: Rinse Repeat - DivKid.mp3"
    );
    expect(thirdSong).toBeInTheDocument();
  });

  it("3- forwardButton button should call setSongIndex", async () => {
    const listOfSongs = {
      id: -1,
      name: SONGS_UPLOADED_BY_CURRENT_USER_LIST_NAME,
      playList: mockPlaylist,
    };
    renderAudioPlayer(listOfSongs, mockSetSongsPlaying, 2);

    const forwardButton = screen.getByTestId("forwardButton");
    await userEvent.click(forwardButton);

    expect(mockSetSongIndex).toHaveBeenCalledTimes(1);
  });

  it("4- pause button is not visible", async () => {
    const listOfSongs = {
      id: -1,
      name: SONGS_UPLOADED_BY_CURRENT_USER_LIST_NAME,
      playList: mockPlaylist,
    };
    renderAudioPlayer(listOfSongs, mockSetSongsPlaying, 2);

    expect(screen.queryByTestId(/pauseButton/i)).not.toBeInTheDocument();
  });

  it("5- play button calls mockTogglePlaying", async () => {
    const listOfSongs = {
      id: -1,
      name: SONGS_UPLOADED_BY_CURRENT_USER_LIST_NAME,
      playList: mockPlaylist,
    };
    renderAudioPlayer(listOfSongs, mockSetSongsPlaying, 2);

    const playButton = screen.getByTestId("playButton");
    await userEvent.click(playButton);

    expect(mockTogglePlaying).toHaveBeenCalledTimes(1);
  });

  it("6- skip15 button calls updatePlayerCurrentTime", async () => {
    const listOfSongs = {
      id: -1,
      name: SONGS_UPLOADED_BY_CURRENT_USER_LIST_NAME,
      playList: mockPlaylist,
    };
    renderAudioPlayer(listOfSongs, mockSetSongsPlaying, 2);

    const playButton = screen.getByTestId("skip15");
    await userEvent.click(playButton);

    expect(mockUpdatePlayerCurrentTime).toHaveBeenCalledTimes(1);
  });

  it("7- Changing progressBar value calls updatePlayerCurrentTime", async () => {
    const listOfSongs = {
      id: -1,
      name: SONGS_UPLOADED_BY_CURRENT_USER_LIST_NAME,
      playList: mockPlaylist,
    };
    renderAudioPlayer(listOfSongs, mockSetSongsPlaying, 2);

    const progressBar = screen.getByRole("slider");

    fireEvent.change(progressBar, { target: { value: 10 } });

    expect(mockUpdatePlayerCurrentTime).toHaveBeenCalledTimes(2);
  });
});
