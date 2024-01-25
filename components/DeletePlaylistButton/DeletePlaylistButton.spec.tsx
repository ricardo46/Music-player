/**
 * @jest-environment jsdom
 */
import { SongsPlayingContext } from "@/Contexts/SongsPlayingContext";
import { UserContext } from "@/Contexts/UserContext";
import { CookieValueTypes } from "cookies-next";
import { Dispatch, SetStateAction } from "react";
import DeletePlaylistButton from "./DeletePlaylistButton";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ListOfSongs, UserType } from "@/Utils/tsTypes";

import "@testing-library/jest-dom";

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
          name: "Puppy Love - Jeremy Blake.mp3",
          url: "https://cdn.filestackcontent.com/dTayWH0wREu5XP3MyBBw",
        },
        {
          song_id: 230,
          id: 230,
          created_at: 1705452351593,
          name: "No Starlight Dey Beat - Nana Kwabena.mp3",
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
          song_id: 217,
          id: 217,
          created_at: 1705448342172,
          name: "Abroad Again - Jeremy Blake.mp3",
          url: "https://cdn.filestackcontent.com/ra9Jwgd4RWSR92AMEmpz",
        },
        {
          song_id: 230,
          id: 230,
          created_at: 1705452351593,
          name: "No Starlight Dey Beat - Nana Kwabena.mp3",
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
          song_id: 217,
          id: 217,
          created_at: 1705448342172,
          name: "Abroad Again - Jeremy Blake.mp3",
          url: "https://cdn.filestackcontent.com/ra9Jwgd4RWSR92AMEmpz",
        },
        {
          song_id: 230,
          id: 230,
          created_at: 1705452351593,
          name: "No Starlight Dey Beat - Nana Kwabena.mp3",
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
      name: "Abroad Again - Jeremy Blake.mp3",
      url: "https://cdn.filestackcontent.com/ra9Jwgd4RWSR92AMEmpz",
    },
    {
      song_id: 218,
      id: 218,
      created_at: 1705448354664,
      name: "Puppy Love - Jeremy Blake.mp3",
      url: "https://cdn.filestackcontent.com/dTayWH0wREu5XP3MyBBw",
    },
  ],
};

const mockSetUser = jest.fn();
const mockClearUser = jest.fn();
const mockSetAuthToken = jest.fn();

const mockSetPlaying = jest.fn();
const mockSetSongsPlaying = jest.fn();

function renderDeletePlaylistButton(
  user: UserType,
  setUser: Dispatch<SetStateAction<UserType>>,
  songsPlaying: ListOfSongs | null,
  setSongsPlaying: Dispatch<SetStateAction<ListOfSongs | null>>,
  clearUser: () => void,
  authToken: string,
  setAuthToken: Dispatch<CookieValueTypes | null>
) {
  return render(
    <UserContext.Provider
      value={{ user, setUser, clearUser, authToken, setAuthToken }}
    >
      <SongsPlayingContext.Provider value={{ songsPlaying, setSongsPlaying }}>
        <DeletePlaylistButton />
      </SongsPlayingContext.Provider>
    </UserContext.Provider>
  );
}

describe("DeletePlaylistButton", () => {
  it("should run DeletePlaylistButton", async () => {
    renderDeletePlaylistButton(
      mockUser,
      mockSetUser,
      mockUser.playLists[0],
      mockSetSongsPlaying,
      mockClearUser,
      "authToken",
      mockSetAuthToken
    );

    const deletePlayListButton = screen.getByTestId("deletePlayListButton");
    await userEvent.click(deletePlayListButton);
    const modalWindowHeader = await screen.findByText(
      "Delete playlist ric list1?"
    );
    expect(modalWindowHeader).toBeInTheDocument();
    const yesButton = await screen.findByText(/yes/i);
    expect(yesButton).toBeInTheDocument();
    const noButton = await screen.findByText(/no/i);
    expect(noButton).toBeInTheDocument();
  });
});
