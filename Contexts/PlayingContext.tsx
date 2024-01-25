import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

export interface PlayingContextInterface {
  playing: boolean;
  setPlaying: Dispatch<SetStateAction<boolean>>;
}

const defaultState = {
  playing: false,
  setPlaying: (playing: boolean) => {},
} as PlayingContextInterface;

export const PlayingContext = createContext(defaultState);

type PlayingProviderProps = {
  children: ReactNode;
};

export const PlayingProvider = ({ children }: PlayingProviderProps) => {
  const [playing, setPlaying] = useState<boolean>(false);

  return (
    <PlayingContext.Provider value={{ playing, setPlaying }}>
      {children}
    </PlayingContext.Provider>
  );
};

export const usePlaying = () => {
  const context = useContext(PlayingContext);
  if (!context) {
    throw new Error("usePlaying must be used within a PlayingProvider");
  }
  return context;
};
