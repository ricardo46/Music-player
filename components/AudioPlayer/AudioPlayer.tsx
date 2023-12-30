import { useEffect, useRef, useState } from "react";
import { SongInterface } from "../FileUploader/FileUploader";
import { SongsList } from "../StyledComponents/IndexStyles";
import { StyledButton } from "../StyledComponents/StyledComponents";
import {
  PlayerAndSongsContainer,
  PlayerContainer,
  StyledAudio,
} from "./AudioPlayerStyles";

interface AudioPlayerInterface {
  songs: SongInterface[] | null;
  handleEnded: () => void;
}

const AudioPlayer = ({ songs, handleEnded }: AudioPlayerInterface) => {
  const [songIndex, setSongIndex] = useState<number>(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  const onSongEnded = () => {
    console.log("prev song", songIndex);

    if (songs) {
      if (songIndex == songs?.length - 1) {
        setSongIndex(0);
        setPlaying(false);

      } else {
        setSongIndex((prev) => prev + 1);
      }
      handleEnded();
    } else {
      console.log("Cant play songs because no songs were uploaded yet!");
    }
  };

  const updateSongIndex = (index: number) => {

    setSongIndex(index);
  };

  const onSongClick = (e: any, index: number) => {
    updateSongIndex(index);
    setPlaying(true);
  };

  const incrementSongIndex = () => {
    if (songs) {
      if (songIndex == songs?.length - 1) {
        setSongIndex(0);
      } else {
        setSongIndex((prevIndex) => prevIndex + 1);
      }
    }
  };

  const decrementSongIndex = () => {
    if (songs) {
      if (songIndex == 0) {
        setSongIndex(songs?.length - 1);
      } else {
        setSongIndex((prevIndex) => prevIndex - 1);
      }
    }
  };

  useEffect(() => {

    if (audioRef.current && playing) {
      audioRef.current.play();
    } else {

      audioRef.current?.pause();
    }
  }, [songIndex, playing]);

  return (
    <>
      <PlayerAndSongsContainer>
        {songs && (
          <SongsList>
            {songs.map((el: SongInterface, index: number) => {
              return (
                <div key={el.id}>
                  {songIndex == index && (
                    <h3
                      onClick={(e) => onSongClick(e, index)}
                    >{`${index}- ${el.name}`}</h3>
                  )}
                  {songIndex != index && (
                    <p onClick={(e) => onSongClick(e, index)}>
                      {`${index}- ${el.name}`}
                    </p>
                  )}
                </div>
              );
            })}
          </SongsList>
        )}

        <PlayerContainer>
          {songs && (
            <>
              <StyledButton onClick={decrementSongIndex}>{"<"}</StyledButton>
              <StyledButton onClick={incrementSongIndex}>{">"}</StyledButton>
              <StyledAudio
                ref={audioRef}
                src={songs[songIndex]?.url}
                controls
                onEnded={onSongEnded}
                onPlay={()=>setPlaying(true)}
                onPause={()=>setPlaying(false)}
              />
            </>
          )}
        </PlayerContainer>
        <p>{songs && `Playing: ${songs[songIndex].name}`}</p>
      </PlayerAndSongsContainer>
    </>
  );
};

export default AudioPlayer;
