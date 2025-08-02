import React from "react";
import { useNavigate } from "react-router-dom";
import { Home, Library, ArrowLeft, Plus } from "lucide-react"; // Import Lucide icons

const Sidebar: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="w-[19%] h-full p-2 flex-col gap-2 text-white hidden lg:flex">
      {/* Home Section */}
      <div className="bg-[#121212] h-[10%] rounded flex flex-col justify-around hover:bg-gray-700">
        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-3 pl-8 cursor-pointer"
        >
          <Home className="w-6 h-6" />
          <p className="font-bold">Home</p>
        </div>
        {/* Uncomment below to enable search */}
        {/* <div className="flex items-center gap-3 pl-8 cursor-pointer">
          <Search className="w-6 h-6" />
          <p className="font-bold">Search</p>
        </div> */}
      </div>

      {/* Library & Playlist Section */}
      <div className="bg-[#121212] h-[90%] rounded">
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Library className="w-6 h-6" />
            <p className="font-semibold">Your Library</p>
          </div>
          <div className="flex items-center gap-3">
            <ArrowLeft className="w-5 h-5 cursor-pointer" />
            <Plus className="w-5 h-5 cursor-pointer" />
          </div>
        </div>

        {/* Create Playlist */}
        <div className="p-4 bg-[#242424] m-2 rounded font-semibold flex flex-col items-start justify-start gap-1 pl-4">
          <h1>Create your first playlist</h1>
          <p className="font-light">It's easy, we'll help you!</p>
          <button className="px-4 py-1.5 bg-white text-[15px] text-black rounded-full mt-4 cursor-pointer">
            Create playlist
          </button>
        </div>

        {/* Browse Podcasts */}
        <div className="p-4 bg-[#242424] m-2 rounded font-semibold flex flex-col items-start justify-start gap-1 pl-4 mt-4">
          <h1>Let's find some podcasts to follow</h1>
          <p className="font-light">We'll keep you updated on new episodes</p>
          <button className="px-4 py-1.5 cursor-pointer bg-white text-[15px] text-black rounded-full mt-4">
            Browse podcasts
          </button>
        </div>
      </div>

      {/* <div className="text-[11px] bg-[#121212] px-3 text-white/50 leading-6">
        <div className="flex flex-wrap gap-x-3">
          <p>Legal</p>
          <p>Privacy Center</p>
          <p>Privacy Policy</p>
          <p>Cookies</p>
          <p>About Ads</p>
          <p>Accessibility</p>
        </div>
        <button className="border border-white/50 px-2 py-1 rounded-full mt-3 text-sm">
          English
        </button>
      </div> */}
    </div>
  );
};

export default Sidebar;
