import { CookieValueTypes } from "cookies-next";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

export type SubmitRequestType = {
  isLoading: boolean;
  submitted: boolean;
  error: boolean;
  errorMessage: string | null;
};

export interface LayoutSubmitRequestContextInterface {
  layoutSubmitRequest: SubmitRequestType;
  setLayoutSubmitRequest: Dispatch<SetStateAction<SubmitRequestType>>;
  clearLayoutSubmitRequest: () => void;
}

const defaultState = {
  layoutSubmitRequest: {
    isLoading: true,
    submitted: false,
    error: false,
    errorMessage: null,
  },
  setLayoutSubmitRequest: (submitRequest: SubmitRequestType) => {},
} as LayoutSubmitRequestContextInterface;

export const LayoutSubmitRequestContext = createContext(defaultState);

type LayoutSubmitRequestProviderProps = {
  children: ReactNode;
};

export const LayoutSubmitRequestProvider = ({ children }: LayoutSubmitRequestProviderProps) => {
  const [layoutSubmitRequest, setLayoutSubmitRequest] = useState<SubmitRequestType>({
    isLoading: true,
    submitted: false,
    error: false,
    errorMessage: null,
  });

  const clearLayoutSubmitRequest = () => {
    setLayoutSubmitRequest({
      isLoading: true,
      submitted: false,
      error: false,
      errorMessage: null,
    });
  };

  return (
    <LayoutSubmitRequestContext.Provider
      value={{ layoutSubmitRequest, setLayoutSubmitRequest, clearLayoutSubmitRequest }}
    >
      {children}
    </LayoutSubmitRequestContext.Provider>
  );
};

export const useLayoutSubmitRequest = () => {
  const context = useContext(LayoutSubmitRequestContext);
  if (!context) {
    throw new Error(
      "useSubmitRequest must be used within a SubmitRequestProvider"
    );
  }
  return context;
};
