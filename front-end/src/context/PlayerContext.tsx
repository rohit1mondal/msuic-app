import React, {
  createContext,
  useEffect,
  useRef,
  useState,
  ReactNode,
  MutableRefObject,
} from "react";
import axios from "axios";

// Types
interface Song {
  _id: string;
  name: string;
  file: string;
  [key: string]: any; // add any other fields if needed
}

interface Album {
  _id: string;
  name: string;
  image: string;
  description: string;
  [key: string]: any;
}

interface TimeFormat {
  currentTime: {
    second: number;
    minute: number;
  };
  totalTime: {
    second: number;
    minute: number;
  };
}

interface PlayerContextType {
  audioRef: MutableRefObject<HTMLAudioElement | null>;
  seekBar: MutableRefObject<HTMLDivElement | null>;
  seekBg: MutableRefObject<HTMLDivElement | null>;
  track: Song | undefined;
  setTrack: React.Dispatch<React.SetStateAction<Song | undefined>>;
  playStatus: boolean;
  setPlayStatus: React.Dispatch<React.SetStateAction<boolean>>;
  time: TimeFormat;
  setTime: React.Dispatch<React.SetStateAction<TimeFormat>>;
  play: () => void;
  pause: () => void;
  playWithId: (id: string) => void;
  previous: () => void;
  next: () => void;
  seekSong: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  songsData: Song[];
  albumsData: Album[];
  handleLoadedMetadata: (
    e: React.SyntheticEvent<HTMLAudioElement, Event>
  ) => void;
  handleTimeUpdate: (e: React.SyntheticEvent<HTMLAudioElement, Event>) => void;
}

// Context
export const PlayerContext = createContext<PlayerContextType | null>(null);

// Provider
interface PlayerProviderProps {
  children: ReactNode;
}

const PlayerContextProvider: React.FC<PlayerProviderProps> = ({ children }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const seekBg = useRef<HTMLDivElement | null>(null);
  const seekBar = useRef<HTMLDivElement | null>(null);

  const url = "http://localhost:4000";

  const [songsData, setSongsData] = useState<Song[]>([]);
  const [albumsData, setAlbumsData] = useState<Album[]>([]);
  const [track, setTrack] = useState<Song | undefined>(undefined);
  const [playStatus, setPlayStatus] = useState<boolean>(false);

  const [time, setTime] = useState<TimeFormat>({
    currentTime: { second: 0, minute: 0 },
    totalTime: { second: 0, minute: 0 },
  });

  const play = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setPlayStatus(true);
    }
  };

  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setPlayStatus(false);
    }
  };

  const playWithId = (id: string) => {
    const selectedTrack = songsData.find((item) => item._id === id);
    if (!selectedTrack) return;

    setTrack(selectedTrack);
    setPlayStatus(true);
    setTimeout(() => {
      audioRef.current?.play();
    }, 200);
  };

  const previous = () => {
    const currentIndex = songsData.findIndex((item) => item._id === track?._id);
    if (currentIndex > 0) {
      const newTrack = songsData[currentIndex - 1];
      setTrack(newTrack);
      setTimeout(() => {
        audioRef.current?.play();
        setPlayStatus(true);
      }, 200);
    }
  };

  const next = () => {
    const currentIndex = songsData.findIndex((item) => item._id === track?._id);
    if (currentIndex < songsData.length - 1) {
      const newTrack = songsData[currentIndex + 1];
      setTrack(newTrack);
      setTimeout(() => {
        audioRef.current?.play();
        setPlayStatus(true);
      }, 200);
    }
  };

  const seekSong = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (audioRef.current && seekBg.current) {
      const offsetX = e.nativeEvent.offsetX;
      const width = seekBg.current.offsetWidth;
      const duration = audioRef.current.duration;

      audioRef.current.currentTime = (offsetX / width) * duration;
    }
  };

  const getSongsData = async () => {
    try {
      const response = await axios.get(`${url}/api/song/list`);
      setSongsData(response.data.songs);
      setTrack(response.data.songs[0]);
    } catch (error) {
      console.error("Error fetching songs:", error);
    }
  };

  const getAlbumsData = async () => {
    try {
      const response = await axios.get(`${url}/api/album/list`);
      setAlbumsData(response.data.albums);
    } catch (error) {
      console.error("Error fetching albums:", error);
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => {
      if (!audioRef.current || !seekBar.current || !audio.duration) return;

      seekBar.current.style.width =
        Math.floor((audio.currentTime / audio.duration) * 100) + "%";

      setTime({
        currentTime: {
          second: Math.floor(audio.currentTime % 60),
          minute: Math.floor(audio.currentTime / 60),
        },
        totalTime: {
          second: Math.floor(audio.duration % 60),
          minute: Math.floor(audio.duration / 60),
        },
      });
    };

    audio.addEventListener("timeupdate", updateTime);
    return () => {
      audio.removeEventListener("timeupdate", updateTime);
    };
  }, [track]);

  useEffect(() => {
    getSongsData();
    getAlbumsData();
  }, []);

  // event handlers for audio element
  const handleLoadedMetadata = (
    e: React.SyntheticEvent<HTMLAudioElement, Event>
  ) => {
    const audio = e.currentTarget;
    setTime((prev) => ({
      ...prev,
      totalTime: {
        second: Math.floor(audio.duration % 60),
        minute: Math.floor(audio.duration / 60),
      },
    }));
  };

  const handleTimeUpdate = (
    e: React.SyntheticEvent<HTMLAudioElement, Event>
  ) => {
    const audio = e.currentTarget;
    setTime((prev) => ({
      ...prev,
      currentTime: {
        second: Math.floor(audio.currentTime % 60),
        minute: Math.floor(audio.currentTime / 60),
      },
    }));
    if (seekBar.current && audio.duration) {
      seekBar.current.style.width =
        Math.floor((audio.currentTime / audio.duration) * 100) + "%";
    }
  };

  const contextValue: PlayerContextType = {
    audioRef,
    seekBar,
    seekBg,
    track,
    setTrack,
    playStatus,
    setPlayStatus,
    time,
    setTime,
    play,
    pause,
    playWithId,
    previous,
    next,
    seekSong,
    songsData,
    albumsData,
    handleLoadedMetadata,
    handleTimeUpdate,
  };

  return (
    <PlayerContext.Provider value={contextValue}>
      {children}
    </PlayerContext.Provider>
  );
};

export default PlayerContextProvider;
