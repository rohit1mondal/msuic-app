import React, { useContext } from "react";
import Sidebar from "./Sidebar";
import Player from "./Player";
import { PlayerContext } from "../context/PlayerContext";
import { Outlet } from "react-router-dom";

const AppLayout: React.FC = () => {
  const playerContext = useContext(PlayerContext);

  if (!playerContext) return null;

  const { audioRef, track, songsData, handleTimeUpdate, handleLoadedMetadata } =
    playerContext;

  if (songsData.length === 0) return null;

  return (
    <>
      <div className="h-[90%] flex">
        <Sidebar />
        <Outlet />
      </div>
      <Player />

      <audio
        key={track?.file}
        preload="auto"
        ref={audioRef}
        src={track?.file}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
      />
    </>
  );
};

export default AppLayout;
