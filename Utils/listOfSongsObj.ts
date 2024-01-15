import { SongInterface } from "@/components/FileUploader/FileUploader";

const getListOfSongsObj = (songs: SongInterface[] | null, id: number, name: string) => {
  if (songs) {
    return {
      id: id,
      name: name,
      playList: songs,
    };
  } else {
    return {
      id: id,
      name: name,
      playList: null,
    };
  }
};

export default getListOfSongsObj;


