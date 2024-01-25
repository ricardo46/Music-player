const { addSongToAllSongs } = require("./userUtils");

test("add uploaded song to previous uploaded songs list", () => {
  const previousAllSongs = [
    {
      name: "Abroad Again - Jeremy Blake.mp3",
      url: "https://cdn.filestackcontent.com/MeWqfKC8S1eJA8uYfPVS",
      song_id: 231,
    },
  ];

  const newSong = {
    name: "Puppy Love - Jeremy Blake.mp3",
    url: "https://cdn.filestackcontent.com/lXNLJSdTtK1riVGM0eCU",
    song_id: 232,
  };

  const newAllSongs = [
    {
      name: "Abroad Again - Jeremy Blake.mp3",
      url: "https://cdn.filestackcontent.com/MeWqfKC8S1eJA8uYfPVS",
      song_id: 231,
    },
    {
      name: "Puppy Love - Jeremy Blake.mp3",
      url: "https://cdn.filestackcontent.com/lXNLJSdTtK1riVGM0eCU",
      song_id: 232,
    },
  ];

  expect(JSON.stringify(addSongToAllSongs(previousAllSongs, newSong))).toBe(
    JSON.stringify(newAllSongs)
  );
});

test("add uploaded song to empty uploaded songs list", () => {
  const previousAllSongs = [];

  const newSong = {
    name: "Puppy Love - Jeremy Blake.mp3",
    url: "https://cdn.filestackcontent.com/lXNLJSdTtK1riVGM0eCU",
    song_id: 232,
  };

  const newAllSongs = [
    {
      name: "Puppy Love - Jeremy Blake.mp3",
      url: "https://cdn.filestackcontent.com/lXNLJSdTtK1riVGM0eCU",
      song_id: 232,
    },
  ];

  expect(JSON.stringify(addSongToAllSongs(previousAllSongs, newSong))).toBe(
    JSON.stringify(newAllSongs)
  );
});
