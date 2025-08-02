import React, { useContext, RefObject } from "react";
import {
  Shuffle,
  SkipBack,
  SkipForward,
  Play,
  Pause,
  Repeat,
  ListMusic,
  Mic,
  Volume2,
  Maximize,
  Minimize2,
  MonitorSpeaker,
} from "lucide-react";
import { PlayerContext } from "../context/PlayerContext";

const Player: React.FC = () => {
  const playerContext = useContext(PlayerContext);

  if (!playerContext || !playerContext.track) return null;

  const {
    track,
    seekBar,
    seekBg,
    playStatus,
    play,
    pause,
    time,
    previous,
    next,
    seekSong,
  } = playerContext;

  return (
    <div className="h-[10%] bg-black grid grid-cols-3 items-center text-white px-4">
      {/* Left: Song Info */}
      <div className="hidden lg:flex items-center gap-4 col-start-1">
        <img src={track.image} className="w-12 h-12 rounded" alt="song" />
        <div className="max-w-[150px] truncate">
          <p className="font-medium truncate">{track.name}</p>
          <p className="text-sm text-gray-400 truncate">
            {track.description?.slice(0, 20) || ""}
          </p>
        </div>
      </div>

      {/* Center: Controls + Seek Bar */}
      <div className="flex flex-col items-center gap-2 col-start-2">
        {/* Playback controls */}
        <div className="flex gap-4 items-center">
          <Shuffle size={18} className="cursor-pointer" />
          <SkipBack size={18} className="cursor-pointer" onClick={previous} />
          {playStatus ? (
            <Pause size={18} className="cursor-pointer" onClick={pause} />
          ) : (
            <Play size={18} className="cursor-pointer" onClick={play} />
          )}
          <SkipForward size={18} className="cursor-pointer" onClick={next} />
          <Repeat size={18} className="cursor-pointer" />
        </div>

        {/* Seek bar */}
        <div className="flex items-center gap-5 w-full justify-center">
          <p className="text-xs w-10 text-right">
            {time.currentTime.minute}:
            {String(time.currentTime.second).padStart(2, "0")}
          </p>
          <div
            onClick={seekSong}
            ref={seekBg as RefObject<HTMLDivElement>}
            className="w-[60vw] max-w-[500px] h-1 bg-gray-300 rounded-full cursor-pointer relative"
          >
            <div
              ref={seekBar as RefObject<HTMLDivElement>}
              className="absolute top-0 left-0 h-full bg-green-600 rounded-full"
              style={{ width: "0%" }}
            />
          </div>
          <p className="text-xs w-10">
            {time.totalTime.minute}:
            {String(time.totalTime.second).padStart(2, "0")}
          </p>
        </div>
      </div>

      {/* Right: Extra controls */}
      <div className="hidden lg:flex items-center gap-2 justify-end col-start-3 opacity-70">
        <ListMusic size={18} className="cursor-pointer" />
        <Play size={18} className="cursor-pointer" />
        <Mic size={18} className="cursor-pointer" />
        <MonitorSpeaker size={18} className="cursor-pointer" />
        <Volume2 size={18} className="cursor-pointer" />
        <div className="w-20 h-1 bg-slate-50 rounded-full" />
        <Minimize2 size={18} className="cursor-pointer" />
        <Maximize size={18} className="cursor-pointer" />
      </div>
    </div>
  );
};

export default Player;
