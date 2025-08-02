import axios from "axios";
import React, { useEffect, useState } from "react";
import { url } from "../App";
import { toast } from "react-toastify";
import { Trash2 } from "lucide-react";

interface Song {
  _id: string;
  name: string;
  album: string;
  image: string;
  duration: string;
}

const ListSong: React.FC = () => {
  const [data, setData] = useState<Song[]>([]);

  const fetchSongs = async () => {
    try {
      const response = await axios.get(`${url}/api/song/list`);
      if (response.data.success) {
        setData(response.data.songs);
      }
    } catch (error: any) {
      toast.error("Error while listing songs");
    }
  };

  const removeSong = async (id: string) => {
    try {
      const response = await axios.delete(`${url}/api/song/${id}`);
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchSongs();
      }
    } catch (error: any) {
      toast.error("Error while removing song");
    }
  };

  useEffect(() => {
    fetchSongs();
  }, []);

  return (
    <div>
      <p className="text-lg font-semibold mb-3 text-white">All Songs List</p>

      <div>
        {/* Header */}
        <div className="sm:grid hidden grid-cols-[0.5fr_1fr_1fr_1fr_1fr] items-center gap-2 p-3 border border-gray-300 text-sm mr-2 bg-[#212121] text-white font-semibold">
          <span>Image</span>
          <span>Name</span>
          <span>Album</span>
          <span>Duration</span>
          <span>Action</span>
        </div>

        {/* Song Rows */}
        {data.map((item) => (
          <div
            key={item._id}
            className="grid grid-cols-[1fr_1fr_1fr] sm:grid-cols-[0.5fr_1fr_1fr_1fr_1fr] items-center gap-2 p-3 border border-gray-300 text-sm mr-2 bg-[#212121] text-white"
          >
            <img className="w-12 h-12 object-cover rounded" src={item.image} alt={item.name} />
            <p>{item.name}</p>
            <p>{item.album}</p>
            <p>{item.duration}</p>
            <button
              onClick={() => removeSong(item._id)}
              className="text-red-600 hover:text-red-800"
              title="Delete Song"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListSong;
