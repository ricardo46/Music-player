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

export type ListOfSongs = {
  id: number;
  name: string;
  playList: SongInterface[] | null;
};

export type UserType = {
  id: number;
  name: string;
  email: string;
  uploadedSongs: SongInterface[] | null;
  playLists: ListOfSongs[] | null;
};

export interface UserContextInterface {
  user: UserType;
  setUser: Dispatch<SetStateAction<UserType>>;
  clearUser: () => void;
  authToken: CookieValueTypes | null;
  setAuthToken: Dispatch<CookieValueTypes | null>;
}

const defaultState = {
  user: {
    id: 0,
    name: "",
    email: "",
    uploadedSongs: null,
  },
  setUser: (user: UserType) => {},
} as UserContextInterface;

export const UserContext = createContext(defaultState);

type UserProviderProps = {
  children: ReactNode;
};

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<UserType>({
    id: 0,
    name: "",
    email: "",
    uploadedSongs: [],
    playLists: null,
  });

  const [authToken, setAuthToken] = useState<CookieValueTypes | null>(null);

  const clearUser = () => {
    setUser({
      id: 0,
      name: "",
      email: "",
      uploadedSongs: [],
      playLists: null,
    });
    setAuthToken(null);
  };

  return (
    <UserContext.Provider
      value={{ user, setUser, clearUser, authToken, setAuthToken }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
