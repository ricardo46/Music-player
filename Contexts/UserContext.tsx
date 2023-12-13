import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

export type User = {
  id: number;
  name: string;
  email: string;
};

export interface UserContextInterface {
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
  clearUser: () => void;
}

const defaultState = {
  user: {
    id: 0,
    name: "",
    email: "",
  },
  setUser: (user: User) => {},
} as UserContextInterface;

// const authInitialValue = {
//     auth: false,
//     setAuth: () => {},
//   };

export const UserContext = createContext(defaultState);

type UserProviderProps = {
  children: ReactNode;
};

// const UserContext = createContext({});

// interface Props {
//   children: React.ReactNode;
// }

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User>({
    id: 0,
    name: "",
    email: "",
  });

  //   const [auth, setAuth] = useState(authInitialValue);

  const clearUser = () => {
    setUser({
      id: 0,
      name: "",
      email: "",
    });
  };

  //   const updateUser = (newData: User) => {
  //     setUser((prev) => ({
  //       ...prev,
  //       ...newData,
  //     }));
  //   };

  return (
    <UserContext.Provider value={{ user, setUser, clearUser }}>
      {/* <UserContext.Provider value={{ user, setUser, updateUser, auth, setAuth }}></UserContext.Provider> */}
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
