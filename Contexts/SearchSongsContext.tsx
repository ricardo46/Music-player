import { ListOfSongs, SongInterface } from "@/Utils/tsTypes";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
  createContext,
} from "react";

export interface SearchSongsContextInterface {
  otherUserSongs: SongInterface[];
  setOtherUserSongs: Dispatch<SetStateAction<SongInterface[]>>;
  currentUserSongs: SongInterface[];
  setCurrentUserSongs: Dispatch<SetStateAction<SongInterface[]>>;
}

const defaultState = {
  otherUserSongs: [],
  setOtherUserSongs: (otherUserSongs: SongInterface[]) => {},
  currentUserSongs: [],
  setCurrentUserSongs: (currentUserSongs: SongInterface[]) => {},
} as SearchSongsContextInterface;

export const SearchSongsContext = createContext(defaultState);

type SearchSongsProviderProps = {
  children: ReactNode;
};

export const SearchSongsProvider = ({ children }: SearchSongsProviderProps) => {
  const [otherUserSongs, setOtherUserSongs] = useState<SongInterface[]>([]);

  const [currentUserSongs, setCurrentUserSongs] = useState<SongInterface[]>([]);

  

  return (
    <SearchSongsContext.Provider
      value={{
        otherUserSongs,
        setOtherUserSongs,
        currentUserSongs,
        setCurrentUserSongs,
      }}
    >
      {children}
    </SearchSongsContext.Provider>
  );
};

export const useSearchSongs = () => {
  const context = useContext(SearchSongsContext);
  if (!context) {
    throw new Error("useSearchSongs must be used within a SearchSongsProvider");
  }
  return context;
};
