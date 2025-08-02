import React from "react";
import { NavLink } from "react-router-dom";
import {
  PlusCircle,
  ListMusic,
  Album,
  DiscAlbum,
  Music2Icon,
} from "lucide-react";

const Sidebar: React.FC = () => {
  return (
    <div className=" text-white rounded-2xl pr-3  sm:pt-5 sm:pl-5 bg-[#161B22]">
      {/* Replace logo with icon or text */}
     <div className="min-h-screen">
       <div className="mt-5 hidden sm:block text-white text-2xl font-bold">
        Admin Panel
      </div>
      <div className="mt-5 sm:hidden block text-white text-lg font-semibold mr-5">
        Admin
      </div>

      <div className="flex flex-col gap-5 mt-10 ">
        <NavLink
          to="/add-song"
          className="flex rounded items-center gap-2.5 text-white bg-[#242424] border mr-4  p-2 text-sm font-medium"
        >
          <PlusCircle className="w-5 h-5" />
          <p className="hidden sm:block">Add Song</p>
        </NavLink>

        <NavLink
          to="/list-song"
          className="flex items-center rounded gap-2.5 text-white bg-[#242424] border mr-4  p-2  text-sm font-medium"
        >
          <Music2Icon className="w-5 h-5" />
          <p className="hidden sm:block">List Song</p>
        </NavLink>

        <NavLink
          to="/add-album"
          className="flex items-center rounded gap-2.5 text-white bg-[#242424] border mr-4 p-2 text-sm font-medium"
        >
          <Album className="w-5 h-5" />
          <p className="hidden sm:block">Add Album</p>
        </NavLink>

        <NavLink
          to="/list-album"
          className="flex items-center rounded gap-2.5 text-white bg-[#242424] border mr-4  p-2 pr-[max(8vw,10px)] text-sm font-medium"
        >
          <DiscAlbum className="w-5 h-5" />
          <p className="hidden sm:block">List Album</p>
        </NavLink>
      </div>
     </div>
    </div>
  );
};

export default Sidebar;
