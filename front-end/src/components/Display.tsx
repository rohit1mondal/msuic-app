import React, { useContext, useEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { PlayerContext } from "../context/PlayerContext";

type Album = {
  _id: string;
  id?: string; // fallback key if you use this in your data
  name: string;
  image: string;
  description: string;
  bgColour?: string;
};

const Display: React.FC = () => {
  const playerContext = useContext(PlayerContext);
  const location = useLocation();
  const displayRef = useRef<HTMLDivElement>(null);

  if (!playerContext) return null;
  const { albumsData } = playerContext;

  const isAlbum = location.pathname.includes("album");
  const albumId = isAlbum ? location.pathname.split("/").pop() : "";
  const albumObj: Album | undefined = isAlbum
    ? albumsData.find((x) => x._id === albumId || x.id === albumId)
    : undefined;

  const bgColour = albumObj?.bgColour || "#212121";

  useEffect(() => {
    if (!displayRef.current) return;
    displayRef.current.style.background = isAlbum
      ? `linear-gradient(${bgColour}, #121212)`
      : "#121212";
  }, [isAlbum, bgColour]);

  if (albumsData.length === 0) return null;

  return (
    <div
      ref={displayRef}
      className="flex-1 m-2 px-6 pt-4 rounded overflow-auto bg-[#121212] text-white"
    >
      <Outlet />
    </div>
  );
};

export default Display;
