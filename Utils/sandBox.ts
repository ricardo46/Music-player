//   (alias) type ListOfSongs = {
//     id: number;
//     name: string;
//     playList: SongInterface[] | null;
// }

import { ListOfSongs } from "@/Contexts/UserContext";

const getSelectOptionsFromListOfSongs = (listOfLists: ListOfSongs[]) =>
listOfLists.map((ListOfSongs) => {
    return { value: ListOfSongs.name.toLowerCase(), label: ListOfSongs.name };
  });


  getSelectOptionsFromListOfSongs([
    {
      id: 59,
      name: "ric list1",
      playList: [
        {
          song_id: 218,
          name: "song 1",
          url: "https://cdn.filestackcontent.com/dTayWH0wREu5XP3MyBBw",
        },
        {
          song_id: 230,
          name: "song 2",
          url: "https://cdn.filestackcontent.com/W6OL0BblRtHeJjgeth8w",
        },
        {
          song_id: 230,
          name: "song 3",
          url: "https://cdn.filestackcontent.com/W6OL0BblRtHeJjgeth8w",
        },
        {
          song_id: 230,
          name: "song 4",
          url: "https://cdn.filestackcontent.com/W6OL0BblRtHeJjgeth8w",
        },
      ],
    },
    {
      id: 5,
      name: "ric list2",
      playList: [
        {
          song_id: 212,
          name: "Abroad Again - Jeremy Blake.mp3",
          url: "https://cdn.filestackcontent.com/BCjk9KkSbuIuPQChIuF2",
        },
        {
          song_id: 218,
          name: "song 15",
          url: "https://cdn.filestackcontent.com/dTayWH0wREu5XP3MyBBw",
        },
        {
          song_id: 230,
          name: "song 24",
          url: "https://cdn.filestackcontent.com/W6OL0BblRtHeJjgeth8w",
        },
      ],
    },
    {
      id: 5,
      name: "ric list2",
      playList: [
        {
          song_id: 212,
          name: "Abroad Again - Jeremy Blake.mp3",
          url: "https://cdn.filestackcontent.com/BCjk9KkSbuIuPQChIuF2",
        },
        {
          song_id: 218,
          name: "song 19",
          url: "https://cdn.filestackcontent.com/dTayWH0wREu5XP3MyBBw",
        },
        {
          song_id: 230,
          name: "song 22",
          url: "https://cdn.filestackcontent.com/W6OL0BblRtHeJjgeth8w",
        },
      ],
    },
  ])