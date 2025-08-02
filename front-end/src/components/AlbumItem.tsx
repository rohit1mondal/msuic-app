import React from "react";
import { useNavigate } from "react-router-dom";
import { Play } from "lucide-react"; // Optional: example Lucide icon

interface AlbumItemProps {
  id: string;
  image: string;
  name: string;
  description: string;
}

const AlbumItem: React.FC<AlbumItemProps> = ({
  id,
  image,
  name,
  description,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/app/album/${id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer p-4 hover:bg-[#ffffff1a] rounded w-36 sm:w-40"
    >
      <div className="relative group w-full">
        <img
          src={image}
          alt={name}
          className="w-full h-auto object-cover rounded mb-2"
        />
        {/* Optional Play icon overlay */}
        <div className="absolute bottom-3 right-3 bg-black bg-opacity-60 p-1 rounded-full hidden group-hover:flex">
          <Play size={20} className="text-white" />
        </div>
      </div>
      <h3 className="text-white text-lg font-semibold">{name}</h3>
      <p className="text-sm text-gray-400">{description}</p>
    </div>
  );
};

export default AlbumItem;
