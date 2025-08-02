import React, { useEffect, useState } from "react";
import { url } from "../App";
import axios from "axios";
import { toast } from "react-toastify";
import { Trash2 } from "lucide-react";

interface Album {
  _id: string;
  name: string;
  description: string;
  image: string;
  bgColor: string;
}

const ListAlbum: React.FC = () => {
  const [data, setData] = useState<Album[]>([]);

  const fetchAlbums = async () => {
    try {
      const response = await axios.get(`${url}/api/album/list`);
      if (response.data.success) {
        setData(response.data.albums);
      }
    } catch (error: any) {
      toast.error("Error while fetching album list");
    }
  };

  useEffect(() => {
    fetchAlbums();
  }, []);

  const removeAlbum = async (id: string) => {
    try {
      const response = await axios.delete(`${url}/api/album/${id}`);
      if (response.data.success) {
        toast.success(response.data.message);
        fetchAlbums();
      }
    } catch (error: any) {
      toast.error("Error while removing album");
    }
  };

  return (
    <div>
      <p className="text-lg font-semibold mb-3 bg-[#212121]">All Albums List</p>
      <div>
        {/* Header Row */}
        <div className="sm:grid hidden grid-cols-[0.5fr_1fr_1fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-green-300 text-sm mr-5 font-semibold">
          <span>Image</span>
          <span>Name</span>
          <span>Description</span>
          <span>Color</span>
          <span>Action</span>
        </div>

        {/* Data Rows */}
        {data.map((item) => (
          <div
            key={item._id}
            className="sm:grid hidden grid-cols-[0.5fr_1fr_1fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5 "
          >
            <img className="w-12 h-12 object-cover rounded" src={item.image} alt={item.name} />
            <p>{item.name}</p>
            <p>{item.description}</p>
            <input type="color" value={item.bgColor} readOnly className="w-10 h-6 border-none" />
            <button
              className="text-red-600 hover:text-red-800"
              onClick={() => removeAlbum(item._id)}
              title="Delete Album"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListAlbum;
