import { SongInterface } from "@/components/FileUploader/FileUploader";
import { CookieValueTypes } from "cookies-next";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

export interface AllSongsContextInterface {
  allSongs: SongInterface[];
  setAllSongs: Dispatch<SetStateAction<SongInterface[]>>;
}

const defaultState = {
  allSongs: [],
  setAllSongs: (setAllSongs: SongInterface[]) => {},
} as AllSongsContextInterface;

export const AllSongsContext = createContext(defaultState);

type AllSongsProviderProps = {
  children: ReactNode;
};

export const AllSongsProvider = ({ children }: AllSongsProviderProps) => {
  const [allSongs, setAllSongs] = useState<SongInterface[]>([]);

  return (
    <AllSongsContext.Provider
      value={{allSongs, setAllSongs}}
    >
      {children}
    </AllSongsContext.Provider>
  );
};

export const useAllSongs = () => {
  const context = useContext(AllSongsContext);
  if (!context) {
    throw new Error("useAllSongs must be used within a AllSongsProvider");
  }
  return context;
};
