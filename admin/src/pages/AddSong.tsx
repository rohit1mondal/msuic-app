import React, { useEffect, useState } from "react";
import axios from "axios";
import { url } from "../App";
import { toast } from "react-toastify";
import { ImagePlus, Music, UploadCloud } from "lucide-react";

interface Album {
  name: string;
  _id: string;
}

const AddSong: React.FC = () => {
  const [image, setImage] = useState<File | null>(null);
  const [song, setSong] = useState<File | null>(null);
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [album, setAlbum] = useState<string>("none");
  const [loading, setLoading] = useState<boolean>(false);
  const [albumData, setAlbumData] = useState<Album[]>([]);

  // handle form submission
  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      if (image) formData.append("image", image);
      if (song) formData.append("audio", song);
      formData.append("album", album);

      const response = await axios.post(`${url}/api/song/add`, formData);

      if (response.data.success) {
        toast.success("Song added");
        setName("");
        setDescription("");
        setAlbum("none");
        setImage(null);
        setSong(null);
      } else {
        toast.error("Unable to add song");
      }
    } catch (error: any) {
      toast.error("Error occurred while adding song");
    } finally {
      setLoading(false);
    }
  };


  const loadAlbumData = async () => {
    try {
      const response = await axios.get(`${url}/api/album/list`);
      if (response.data.success) {
        setAlbumData(response.data.albums);
      } else {
        toast.error("Unable to load albums data");
      }
    } catch (error: any) {
      toast.error("Error while loading albums");
    }
  };

  useEffect(() => {
    loadAlbumData();
  }, []);

  if (loading) {
    return (
      <div className="grid place-items-center min-h-[80vh]">
        <div className="w-16 h-16 border-4 border-gray-500 rounded-full animate-spin border-t-green-700" />
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-start gap-8 text-white bg-[#242424]"
    >
      <div className="flex gap-8">
        {/* Upload Song */}
        <div className="flex flex-col gap-4">
          <p>Upload Song</p>
          <input
            onChange={(e) => e.target.files && setSong(e.target.files[0])}
            type="file"
            id="song"
            accept="audio/*"
            hidden
          />
          <label htmlFor="song" className="cursor-pointer">
            <div className="w-24 h-24 bg-gray-200 flex items-center justify-center border border-dashed border-gray-400 rounded">
              {song ? (
                <UploadCloud className="w-6 h-6 text-green-700" />
              ) : (
                <Music className="w-6 h-6 text-gray-600" />
              )}
            </div>
          </label>
        </div>

        {/* Upload Image */}
        <div className="flex flex-col gap-4">
          <p>Upload Image</p>
          <input
            onChange={(e) => e.target.files && setImage(e.target.files[0])}
            type="file"
            id="image"
            accept="image/*"
            hidden
          />
          <label htmlFor="image" className="cursor-pointer">
            {image ? (
              <img
                src={URL.createObjectURL(image)}
                alt="Song thumbnail"
                className="w-24 h-24 object-cover rounded"
              />
            ) : (
              <div className="w-24 h-24 bg-gray-200 flex items-center justify-center border border-dashed border-gray-400 rounded">
                <ImagePlus className="w-6 h-6 text-gray-600" />
              </div>
            )}
          </label>
        </div>
      </div>

      {/* Song Name */}
      <div className="flex flex-col gap-2.5">
        <p>Song Name</p>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          type="text"
          className="bg-transparent outline-green-400 border-2 border-gray-600 p-2.5 w-[max(40vw,250px)]"
          placeholder="Type here"
          required
        />
      </div>

      {/* Song Description */}
      <div className="flex flex-col gap-2.5">
        <p>Song Description</p>
        <input
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          type="text"
          className="bg-transparent outline-green-400 border-2 border-gray-600 p-2.5 w-[max(40vw,250px)]"
          placeholder="Type here"
          required
        />
      </div>

      {/* Select Album */}
      <div className="flex flex-col gap-2.5">
        <p>Album</p>
        <select
          onChange={(e) => setAlbum(e.target.value)}
          value={album}
          className="bg-[#212121] outline-green-400 border-2 border-gray-600 p-2.5 w-[150px]"
        >
          <option value="none">None</option>
          {albumData.map((item) => (
            <option key={item._id} value={item.name}>
              {item.name}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="text-base bg-black  text-white py-2.5 px-14 cursor-pointer rounded-3xl"
      >
        Add
      </button>
    </form>
  );
};

export default AddSong;
