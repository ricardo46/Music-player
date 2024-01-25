import { Dispatch, SetStateAction } from "react";

export interface SongInterface {
    name: string;
    url: string;
    song_id: number | undefined;
  }
  
  export type UploadedSongType = {
    song_id: number;
  };

  export interface submitRequestInterface {
    isLoading: boolean;
    submitted: boolean;
    error: boolean;
    errorMessage: null | string;
    message: null | string;
  }

  export type selectComponentOptionsType = {
    value: number;
    label: string;
  }[];

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

  