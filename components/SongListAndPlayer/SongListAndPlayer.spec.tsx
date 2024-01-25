/**
 * @jest-environment jsdom
 */
import { SongsPlayingContext } from "@/Contexts/SongsPlayingContext";
import { UserContext } from "@/Contexts/UserContext";
import { CookieValueTypes } from "cookies-next";
import { Dispatch, SetStateAction } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SongListAndPlayer from "./SongListAndPlayer";
import { LayoutSubmitRequestContext } from "@/Contexts/LayoutContext";
import "@testing-library/jest-dom";
import { SONGS_UPLOADED_BY_CURRENT_USER_LIST_NAME, USER_PAGE_PATH } from "@/globalVariables";
import { ListOfSongs, SubmitRequestType, UserType } from "@/Utils/tsTypes";
import { getUserUploadedSongsObj } from "@/Utils/listOfSongsObj";

// mock Axios
const axios = require("axios");
const { deleteUploadedSong } = require("./Utils/backEndUtils");

jest.mock("axios");

jest.mock("next/router", () => ({
  useRouter() {
    return {
      route: USER_PAGE_PATH,
      pathname: USER_PAGE_PATH,
      query: "",
      asPath: "",
      push: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn(),
      },
      beforePopState: jest.fn(() => null),
      prefetch: jest.fn(() => null),
    };
  },
}));

const mockUser = {
  id: 1,
  created_at: 1701897606237,
  name: "Ric",
  email: "ric@gmail.com",
  playLists: [
    {
      listofsongs_id: 59,
      id: 59,
      created_at: 1705701037045,
      name: "ric list1",
      playList: [
        {
          song_id: 218,
          id: 218,
          created_at: 1705448354664,
          name: "song 1",
          url: "https://cdn.filestackcontent.com/dTayWH0wREu5XP3MyBBw",
        },
        {
          song_id: 230,
          id: 230,
          created_at: 1705452351593,
          name: "song 2",
          url: "https://cdn.filestackcontent.com/W6OL0BblRtHeJjgeth8w",
        },
        {
          song_id: 230,
          id: 230,
          created_at: 1705452351593,
          name: "song 3",
          url: "https://cdn.filestackcontent.com/W6OL0BblRtHeJjgeth8w",
        },
        {
          song_id: 230,
          id: 230,
          created_at: 1705452351593,
          name: "song 4",
          url: "https://cdn.filestackcontent.com/W6OL0BblRtHeJjgeth8w",
        },
      ],
    },
    {
      listofsongs_id: 5,
      id: 5,
      created_at: 170570103704,
      name: "ric list2",
      playList: [
        {
          song_id: 212,
          id: 212,
          created_at: 1705439558276,
          name: "Abroad Again - Jeremy Blake.mp3",
          url: "https://cdn.filestackcontent.com/BCjk9KkSbuIuPQChIuF2",
        },
        {
          song_id: 218,
          id: 218,
          created_at: 1705448354664,
          name: "song 15",
          url: "https://cdn.filestackcontent.com/dTayWH0wREu5XP3MyBBw",
        },
        {
          song_id: 230,
          id: 230,
          created_at: 1705452351593,
          name: "song 24",
          url: "https://cdn.filestackcontent.com/W6OL0BblRtHeJjgeth8w",
        },
      ],
    },
    {
      listofsongs_id: 2,
      id: 5,
      created_at: 170570103704,
      name: "ric list2",
      playList: [
        {
          song_id: 212,
          id: 212,
          created_at: 1705439558276,
          name: "Abroad Again - Jeremy Blake.mp3",
          url: "https://cdn.filestackcontent.com/BCjk9KkSbuIuPQChIuF2",
        },
        {
          song_id: 218,
          id: 218,
          created_at: 1705448354664,
          name: "song 19",
          url: "https://cdn.filestackcontent.com/dTayWH0wREu5XP3MyBBw",
        },
        {
          song_id: 230,
          id: 230,
          created_at: 1705452351593,
          name: "song 22",
          url: "https://cdn.filestackcontent.com/W6OL0BblRtHeJjgeth8w",
        },
      ],
    },
  ],
  uploadedSongs: [
    {
      song_id: 212,
      id: 212,
      created_at: 1705439558276,
      name: "Abroad Again - Jeremy Blake.mp3",
      url: "https://cdn.filestackcontent.com/BCjk9KkSbuIuPQChIuF2",
    },
    {
      song_id: 217,
      id: 217,
      created_at: 1705448342172,
      name: "song 54",
      url: "https://cdn.filestackcontent.com/ra9Jwgd4RWSR92AMEmpz",
    },
    {
      song_id: 218,
      id: 218,
      created_at: 1705448354664,
      name: "song 31",
      url: "https://cdn.filestackcontent.com/dTayWH0wREu5XP3MyBBw",
    },
  ],
};

const mockSetUser = jest.fn();
const mockClearUser = jest.fn();
const mockSetAuthToken = jest.fn();
const mockSetLayoutSubmitRequest = jest.fn();
const mockClearLayoutSubmitRequest = jest.fn();

const mockSetPlaying = jest.fn();
const mockSetSongsPlaying = jest.fn();

const mockLayoutSubmitRequest = {
  isLoading: false,
  submitted: true,
  error: false,
  errorMessage: null,
};

function renderSongListAndPlayer(
  user: UserType,
  setUser: Dispatch<SetStateAction<UserType>>,
  songsPlaying: ListOfSongs | null,
  setSongsPlaying: Dispatch<SetStateAction<ListOfSongs | null>>,
  clearUser: () => void,
  authToken: string,
  setAuthToken: Dispatch<CookieValueTypes | null>,
  layoutSubmitRequest: SubmitRequestType,
  setLayoutSubmitRequest: Dispatch<SetStateAction<SubmitRequestType>>,
  clearLayoutSubmitRequest: () => void
) {
  return render(
    <LayoutSubmitRequestContext.Provider
      value={{
        layoutSubmitRequest,
        setLayoutSubmitRequest,
        clearLayoutSubmitRequest,
      }}
    >
      <UserContext.Provider
        value={{ user, setUser, clearUser, authToken, setAuthToken }}
      >
        <SongsPlayingContext.Provider value={{ songsPlaying, setSongsPlaying }}>
          <SongListAndPlayer />
        </SongsPlayingContext.Provider>
      </UserContext.Provider>
    </LayoutSubmitRequestContext.Provider>
  );
}

describe("Songs list", () => {
  it("1- should find first song name and should be the song playing (should have a border)", async () => {
    renderSongListAndPlayer(
      mockUser,
      mockSetUser,
      mockUser.playLists[0],
      mockSetSongsPlaying,
      mockClearUser,
      "authToken",
      mockSetAuthToken,
      mockLayoutSubmitRequest,
      mockSetLayoutSubmitRequest,
      mockClearLayoutSubmitRequest
    );

    const song = await screen.findByText("0- song 1");

    expect(song).toHaveStyle({ border: "1px solid black" });
  });

  it("2- should find second song name and should be the song playing (should have a border) after clicked", async () => {
    renderSongListAndPlayer(
      mockUser,
      mockSetUser,
      mockUser.playLists[0],
      mockSetSongsPlaying,
      mockClearUser,
      "authToken",
      mockSetAuthToken,
      mockLayoutSubmitRequest,
      mockSetLayoutSubmitRequest,
      mockClearLayoutSubmitRequest
    );

    const songBeforeClick = await screen.findByText("1- song 2");

    expect(songBeforeClick).toHaveStyle({ border: "none" });
    await userEvent.click(songBeforeClick);
    const songAfterClick = await screen.findByText("1- song 2");
    expect(songAfterClick).toHaveStyle({ border: "1px solid black" });
  });

  it("3- should find second song name and should be the song playing (should have a border) after forward button is clicked", async () => {
    renderSongListAndPlayer(
      mockUser,
      mockSetUser,
      mockUser.playLists[0],
      mockSetSongsPlaying,
      mockClearUser,
      "authToken",
      mockSetAuthToken,
      mockLayoutSubmitRequest,
      mockSetLayoutSubmitRequest,
      mockClearLayoutSubmitRequest
    );

    const song0BeforeClick = await screen.findByText("0- song 1");

    expect(song0BeforeClick).toHaveStyle({ border: "1px solid black" });

    const song1BeforeClick = await screen.findByText("1- song 2");

    expect(song1BeforeClick).toHaveStyle({ border: "none" });

    const forwardButton = screen.getByTestId("forwardButton");
    await userEvent.click(forwardButton);

    const song0AfterClick = await screen.findByText("0- song 1");

    expect(song0AfterClick).toHaveStyle({ border: "none" });

    const song1AfterClick = await screen.findByText("1- song 2");

    expect(song1AfterClick).toHaveStyle({ border: "1px solid black" });
  });

  it("4- name of song playing under audio player should change after forward button is clicked ", async () => {
    renderSongListAndPlayer(
      mockUser,
      mockSetUser,
      mockUser.playLists[0],
      mockSetSongsPlaying,
      mockClearUser,
      "authToken",
      mockSetAuthToken,
      mockLayoutSubmitRequest,
      mockSetLayoutSubmitRequest,
      mockClearLayoutSubmitRequest
    );

    // const songPlaying = screen.getByTestId("songPlaying");

    // expect(song0BeforeClick).toHaveStyle({ border: "1px solid black" });

    let songPlayingText = await screen.findByText("Playing: song 1");
    expect(songPlayingText).toBeInTheDocument();

    let songPlayingText2 = screen.queryByText("Playing: song 2");

    expect(songPlayingText2).not.toBeInTheDocument();

    const forwardButton = screen.getByTestId("forwardButton");
    await userEvent.click(forwardButton);

    let songPlayingTextAfterClick = screen.queryByText("Playing: song 1");
    expect(songPlayingTextAfterClick).not.toBeInTheDocument();

    let songPlayingText2AfterClick = await screen.findByText("Playing: song 2");

    expect(songPlayingText2AfterClick).toBeInTheDocument();
  });

  it("5- after forward button is clicked 3 times the song playing has to be song four", async () => {
    renderSongListAndPlayer(
      mockUser,
      mockSetUser,
      mockUser.playLists[0],
      mockSetSongsPlaying,
      mockClearUser,
      "authToken",
      mockSetAuthToken,
      mockLayoutSubmitRequest,
      mockSetLayoutSubmitRequest,
      mockClearLayoutSubmitRequest
    );

    const forwardButton = screen.getByTestId("forwardButton");
    await userEvent.click(forwardButton);
    await userEvent.click(forwardButton);
    await userEvent.click(forwardButton);

    let songPlayingAfterClick = screen.queryByText("Playing: song 4");

    expect(songPlayingAfterClick).toBeInTheDocument();
  });

  it("6- Progress bar moves after dragin it", async () => {
    renderSongListAndPlayer(
      mockUser,
      mockSetUser,
      mockUser.playLists[0],
      mockSetSongsPlaying,
      mockClearUser,
      "authToken",
      mockSetAuthToken,
      mockLayoutSubmitRequest,
      mockSetLayoutSubmitRequest,
      mockClearLayoutSubmitRequest
    );
    // console.debug(screen.getByRole('slider', { name: /progressBar/i }))
    const progressBar = await screen.findByRole("slider");
    expect(progressBar).toHaveValue("0");
    fireEvent.change(progressBar, { target: { value: 14 } });
    expect(progressBar).toHaveValue("14");

    const songCurrentTime = await screen.findByText("00 : 14");
    expect(songCurrentTime).toHaveTextContent("00 : 14");

    // const playButton = screen.getByTestId("playButton");
    // await userEvent.click(playButton);

    // expect(await screen.findByText("00 : 16")).toBeInTheDocument();
  });

  it("7- after forward button is clicked 4 times the song playing has to be the first song of the playlist", async () => {
    renderSongListAndPlayer(
      mockUser,
      mockSetUser,
      mockUser.playLists[0],
      mockSetSongsPlaying,
      mockClearUser,
      "authToken",
      mockSetAuthToken,
      mockLayoutSubmitRequest,
      mockSetLayoutSubmitRequest,
      mockClearLayoutSubmitRequest
    );

    const forwardButton = screen.getByTestId("forwardButton");
    await userEvent.click(forwardButton);
    await userEvent.click(forwardButton);
    await userEvent.click(forwardButton);
    await userEvent.click(forwardButton);

    let songPlayingAfterClick = screen.getByText("Playing: song 1");

    expect(songPlayingAfterClick).toBeInTheDocument();
  });

  it("8- after backward button is clicked 1 time the song playing has to be the last song of the playlist", async () => {
    renderSongListAndPlayer(
      mockUser,
      mockSetUser,
      mockUser.playLists[0],
      mockSetSongsPlaying,
      mockClearUser,
      "authToken",
      mockSetAuthToken,
      mockLayoutSubmitRequest,
      mockSetLayoutSubmitRequest,
      mockClearLayoutSubmitRequest
    );

    const backwardButton = screen.getByTestId("backwardButton");
    await userEvent.click(backwardButton);

    let songPlayingAfterClick = screen.getByText("Playing: song 4");

    expect(songPlayingAfterClick).toBeInTheDocument();
  });

  it("9- After clicking the deleteButton of second song it should not be included in mockSetSongsPlaying", async () => {
    renderSongListAndPlayer(
      mockUser,
      mockSetUser,
      getUserUploadedSongsObj(mockUser.uploadedSongs, mockUser),
      mockSetSongsPlaying,
      mockClearUser,
      "authToken",
      mockSetAuthToken,
      mockLayoutSubmitRequest,
      mockSetLayoutSubmitRequest,
      mockClearLayoutSubmitRequest
    );
    const resp = true;
    axios.patch.mockResolvedValue(resp);

    let secondSong = screen.getByText(/song 54/i);
    const deleteButtonOfSecondSong = screen.getAllByTestId("deleteButton")[1];
    await userEvent.click(deleteButtonOfSecondSong);

    const call = mockSetSongsPlaying.mock.calls[0];
    expect(call).toMatchObject([
      {
        id: -1,
        name: SONGS_UPLOADED_BY_CURRENT_USER_LIST_NAME,
        playList: [
          { id: 212, name: "Abroad Again - Jeremy Blake.mp3", song_id: 212 },
          { id: 218, name: "song 31", song_id: 218 },
        ],
      },
    ]);
  });

  it("10- add song to playlist modal is visible after clicking add song to playlist button", async () => {
    renderSongListAndPlayer(
      mockUser,
      mockSetUser,
      getUserUploadedSongsObj(mockUser.uploadedSongs, mockUser),
      mockSetSongsPlaying,
      mockClearUser,
      "authToken",
      mockSetAuthToken,
      mockLayoutSubmitRequest,
      mockSetLayoutSubmitRequest,
      mockClearLayoutSubmitRequest
    );

    const addSongToPlayListButton = screen.getAllByTestId(
      "addSongToPlayListButton"
    )[1];
    await userEvent.click(addSongToPlayListButton);

    // let PlaylistToAddSong = screen.getByText("ric list1");

    const playlistToAddSong = screen.getAllByText("ric list1")[1];
    await userEvent.click(playlistToAddSong);
    let confirmAddToPlaylistButton = screen.getAllByText(/Add to playlist/i)[1];
    expect(confirmAddToPlaylistButton).toBeInTheDocument();

    let songToBeAddedToPlaylist = screen.getByText("song 54");
    expect(songToBeAddedToPlaylist).toBeInTheDocument();

    expect(confirmAddToPlaylistButton).toBeInTheDocument();
  });

  it("11- Upload song button is visible", async () => {
    renderSongListAndPlayer(
      mockUser,
      mockSetUser,
      getUserUploadedSongsObj(mockUser.uploadedSongs, mockUser),
      mockSetSongsPlaying,
      mockClearUser,
      "authToken",
      mockSetAuthToken,
      mockLayoutSubmitRequest,
      mockSetLayoutSubmitRequest,
      mockClearLayoutSubmitRequest
    );

    let uploadSongButton = screen.getByRole("button", { name: "Upload Song" });
    await userEvent.click(uploadSongButton);

    expect(uploadSongButton).toBeInTheDocument();
  });
});
