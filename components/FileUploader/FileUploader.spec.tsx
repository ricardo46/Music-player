/**
 * @jest-environment jsdom
 */
import { SongsPlayingContext } from "@/Contexts/SongsPlayingContext";
import { CookieValueTypes } from "cookies-next";
import { Dispatch, SetStateAction } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LayoutSubmitRequestContext } from "@/Contexts/LayoutContext";
import "@testing-library/jest-dom";
import FileUploader from "./FileUploader";
import { ListOfSongs, SubmitRequestType, UserType } from "@/Utils/tsTypes";
import { UserContext } from "@/Contexts/UserContext";
import { getUserUploadedSongsObj } from "@/Utils/listOfSongsObj";

// mock Axios
const axios = require("axios");
const { deleteUploadedSong } = require("./Utils/backEndUtils");

jest.mock("axios");

jest.mock("next/router", () => ({
  useRouter() {
    return {
      route: "/user",
      pathname: "/user",
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

function renderFileUploader(
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
          <FileUploader />
        </SongsPlayingContext.Provider>
      </UserContext.Provider>
    </LayoutSubmitRequestContext.Provider>
  );
}

describe("Songs list", () => {
  it("1- Upload song button is visible", async () => {
    renderFileUploader(
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

    const { deleteUploadedSong } = require("./Utils/backEndUtils");

    let uploadSongButton = screen.getByRole("button", { name: "Upload Song" });
    await userEvent.click(uploadSongButton);

    // let someButton = screen.getByRole("button", { name: "shfd" });

    expect(uploadSongButton).toBeInTheDocument();
  });
});
