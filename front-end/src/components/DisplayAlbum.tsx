import React, { useContext, useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useParams } from "react-router-dom";
import { PlayerContext } from "../context/PlayerContext";
import { Clock } from "lucide-react"; // ✅ Lucide icon

type Song = {
  _id: string;
  name: string;
  image: string;
  duration: string;
  album: string;
};

type Album = {
  _id: string;
  name: string;
  image: string;
  description: string;
};

const DisplayAlbum = () => {
  const { id } = useParams();
  const [albumData, setAlbumData] = useState<Album | null>(null);
  const playerContext = useContext(PlayerContext);

  if (!playerContext) return null;
  const { playWithId, albumsData, songsData } = playerContext;

  useEffect(() => {
    const found = albumsData.find((item) => item._id === id);
    setAlbumData(found || null);
  }, [id, albumsData]);

  if (!albumData) return null;

  const songCount = songsData.filter(
    (item) => item.album === albumData.name
  ).length;

  return (
    <>
      <Navbar />
      <div className="mt-10 flex gap-8 flex-col md:flex-row md:items-end">
        <img
          src={albumData.image}
          className="w-48 rounded"
          alt={albumData.name}
        />
        <div className="flex flex-col">
          <p>Playlist</p>
          <h2 className="text-5xl font-bold mb-4 md:text-7xl">
            {albumData.name}
          </h2>
          <h4>{albumData.description}</h4>
          <p className="mt-1 text-white">
            <b>Spotify</b>
            <span className="text-gray-400"> • {songCount} songs</span>
          </p>
        </div>
      </div>

      {/* Header row */}
      <div className="grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-2 text-[#a7a7a7]">
        <p>
          <b className="mr-4">#</b>Title
        </p>
        <p>Album</p>
        <p className="hidden sm:block">Date Added</p>
        <Clock className="m-auto w-4 h-4" />
      </div>
      <hr />

      {/* Songs list */}
      {songsData
        .filter((item) => item.album === albumData.name)
        .map((item, index) => (
          <div
            onClick={() => playWithId(item._id)}
            key={item._id}
            className="grid grid-cols-3 sm:grid-cols-4 gap-2 p-2 items-center text-[#a7a7a7] hover:bg-[#ffffff2b] cursor-pointer"
          >
            <p className="text-white flex items-center gap-4">
              <span className="text-[#a7a7a7]">{index + 1}</span>
              <img className="w-10" src={item.image} alt={item.name} />
              {item.name}
            </p>
            <p className="text-[15px]">{albumData.name}</p>
            <p className="text-[15px] hidden sm:block">5 days ago</p>
            <p className="text-[15px] text-center">{item.duration}</p>
          </div>
        ))}
    </>
  );
};

export default DisplayAlbum;
