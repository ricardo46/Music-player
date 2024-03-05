import { SongInterface, UserType } from "./tsTypes";

const nameExists = (input: string, lists: string[]) => {
  return lists.includes(input);
};

const getListNamesArray = (lists: any[] | null) => {
  if (!lists) return [];
  return lists.map((list) => list.name);
};

const stringIsEmpty = (input: string) => input == "";

const listIsEmpty = (list: any[]) => {
  return list.length == 0;
};

const getTextWithFirstLetterToUpperCase = (text: string) =>
  text.slice(0, 1).toUpperCase() + text.slice(1).toLowerCase();

const validName = (songName: string) => {
  return songName.length >= 3;
};

const SongNameExists = (user: UserType, songName: string) => {
  return user.uploadedSongs?.find((song) => song.name == songName);
};

const getSongNamesArray = (uploadedSongs: SongInterface[] | null) => {
  if (!uploadedSongs) return [];
  return uploadedSongs.map((list) => list.name);
};

export {
  stringIsEmpty,
  nameExists,
  getListNamesArray,
  listIsEmpty,
  getTextWithFirstLetterToUpperCase,
  validName,
  SongNameExists,
  getSongNamesArray,
};
