import React from "react";
import { ToastContainer } from "react-toastify";
import { Routes, Route } from "react-router-dom";
import AddSong from "./pages/AddSong";
import AddAlbum from "./pages/AddAlbum";
import ListSong from "./pages/ListSong";
import ListAlbum from "./pages/ListAlbum";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

export const url = "http://localhost:4000";

const App: React.FC = () => {
  return (
    <div className="flex items-start min-h-screen p-3 bg-[#212121] text-white">
      <ToastContainer />
      <Sidebar />
      <div className="flex-1 h-screen overflow-y-scroll ">
        <Navbar />
        <div className=" sm:pt-5 sm:pl-5 ">
          <Routes>
            <Route path="/add-song" element={<AddSong />} />
            <Route path="/add-album" element={<AddAlbum />} />
            <Route path="/list-song" element={<ListSong />} />
            <Route path="/list-album" element={<ListAlbum />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
