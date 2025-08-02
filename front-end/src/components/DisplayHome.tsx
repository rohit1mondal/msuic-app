import React, { useContext, useState } from "react";
import Navbar from "./Navbar";
import AlbumItem from "./AlbumItem";
import SongItem from "./SongItem";
import { PlayerContext } from "../context/PlayerContext";

interface Song {
  _id: string;
  name: string;
  image: string;
  description: string;
}

interface Album {
  _id: string;
  name: string;
  image: string;
  description: string;
}

const DisplayHome: React.FC = () => {
  const context = useContext(PlayerContext);

  if (!context) {
    return <p>Loading player context...</p>; // or fallback UI
  }

  const { songsData, albumsData } = context;

  const [searchTerm, setSearchTerm] = useState<string>("");

  const filteredSongs = songsData.filter(
    (song) =>
      song.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      song.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredAlbums = albumsData.filter(
    (album) =>
      album.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      album.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <div className="p-4">
        {/* search */}
        <input
          type="text"
          placeholder="What do you want to listen to?"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-[#242424] text-white text-sm px-4 py-2 rounded-full w-[300px] focus:outline-none placeholder-white/60"
        />
      </div>

      {/* songs */}
      <div className="mb-4 px-4">
        <h1 className="my-5 font-bold text-2xl">Today's hits</h1>
        <div className="flex overflow-auto">
          {filteredSongs.length > 0 ? (
            filteredSongs.map((item) => (
              <SongItem
                key={item._id}
                name={item.name}
                image={item.image}
                description={item.description}
                id={item._id}
              />
            ))
          ) : (
            <p className="text-gray-400">No songs found.</p>
          )}
        </div>
      </div>

      {/* albums */}
      <div className="mb-4 px-4">
        <h1 className="my-5 font-bold text-2xl">Featured Charts</h1>
        <div className="flex overflow-auto">
          {filteredAlbums.length > 0 ? (
            filteredAlbums.map((item) => (
              <AlbumItem
                key={item._id}
                name={item.name}
                image={item.image}
                description={item.description}
                id={item._id}
              />
            ))
          ) : (
            <p className="text-gray-400">No albums found.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default DisplayHome;
