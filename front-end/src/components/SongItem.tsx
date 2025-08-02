import React, { useContext } from "react";
import { PlayerContext } from "../context/PlayerContext";
import { Play } from "lucide-react"; // Optional: example Lucide icon

interface SongItemProps {
  id: string;
  name: string;
  image: string;
  description: string;
}

const SongItem: React.FC<SongItemProps> = ({
  name,
  image,
  description,
  id,
}) => {
  const context = useContext(PlayerContext);

  if (!context) return null;

  const { playWithId } = context;

  return (
    <div
      onClick={() => playWithId(id)}
      className="min-w-[180px] w-[180px] h-[260px] p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26]"
    >
      {/* Image wrapper */}
      <div className="relative group w-full h-[150px]">
        <img
          src={image}
          className="rounded-full w-full h-full object-cover"
          alt={name}
        />

        {/* Play icon on hover */}
        <div className="absolute bottom-3 right-3 bg-black bg-opacity-60 p-1 rounded-full hidden group-hover:flex">
          <Play size={20} className="text-white" />
        </div>
      </div>{" "}
      <p className="font-bold mt-2 mb-1">{name}</p>
      <p className="text-slate-200 text-sm">{description}</p>
    </div>
  );
};

export default SongItem;
