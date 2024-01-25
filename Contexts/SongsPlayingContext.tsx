import { ListOfSongs } from "@/Utils/tsTypes";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
  createContext,
} from "react";

export interface SongsPlayingContextInterface {
  songsPlaying: ListOfSongs | null;
  setSongsPlaying: Dispatch<SetStateAction<ListOfSongs | null>>;
}

const defaultState = {
  songsPlaying: {
    id: 0,
    name: "",
    playList: null,
  },
  setSongsPlaying: (songsPlaying: ListOfSongs) => {},
} as SongsPlayingContextInterface;

export const SongsPlayingContext = createContext(defaultState);

type SongsPlayingProviderProps = {
  children: ReactNode;
};

export const SongsPlayingProvider = ({
  children,
}: SongsPlayingProviderProps) => {
  const [songsPlaying, setSongsPlaying] = useState<ListOfSongs | null>({
    id: 0,
    name: "",
    playList: null,
  });

  return (
    <SongsPlayingContext.Provider value={{ songsPlaying, setSongsPlaying }}>
      {children}
    </SongsPlayingContext.Provider>
  );
};

export const useSongsPlaying = () => {
  const context = useContext(SongsPlayingContext);
  if (!context) {
    throw new Error("useUser must be used within a SongsPlayingProvider");
  }
  return context;
};
