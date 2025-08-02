import React, { useState } from "react";
import axios from "axios";
import { url } from "../App";
import { toast } from "react-toastify";
import { ImagePlus } from "lucide-react";

const AddAlbum: React.FC = () => {
  const [image, setImage] = useState<File | null>(null);
  const [colour, setColour] = useState<string>("#458562");
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      if (image) formData.append("image", image);
      formData.append("bgColour", colour);

      const response = await axios.post(`${url}/api/album/add`, formData);

      if (response.data.success) {
        toast.success("Album added");
        setName("");
        setDescription("");
        setImage(null);
      } else {
        toast.error(response.data.message || "Unable to add album");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Error while adding album");
    } finally {
      setLoading(false);
    }
  };

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
      className="flex flex-col items-start p-8 gap-8 text-white bg-[#242424]"
    >
      {/* Upload Image */}
      <div className="flex flex-col gap-4">
        <p>Upload Image</p>
        <input
          onChange={(e) => {
            if (e.target.files) setImage(e.target.files[0]);
          }}
          type="file"
          id="image"
          accept="image/*"
          hidden
        />
        <label htmlFor="image" className="cursor-pointer">
          {image ? (
            <img
              src={URL.createObjectURL(image)}
              className="w-24 h-24 object-cover rounded"
              alt="Uploaded"
            />
          ) : (
            <div className="w-24 h-24 bg-gray-200 flex items-center justify-center border border-dashed border-gray-400 rounded">
              <ImagePlus className="w-6 h-6 text-gray-500" />
            </div>
          )}
        </label>
      </div>

      {/* Album Name */}
      <div className="flex flex-col gap-2.5">
        <p>Album Name</p>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          type="text"
          placeholder="Type here"
          className="bg-transparent outline-green-300 border-2 border-gray-400 p-2.5 w-[max(40vw,250px)]"
        />
      </div>

      {/* Album Description */}
      <div className="flex flex-col gap-2.5">
        <p>Album Description</p>
        <input
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          type="text"
          placeholder="Type here"
          className="bg-transparent outline-green-300 border-2 border-gray-400 p-2.5 w-[max(40vw,250px)]"
        />
      </div>

      {/* Background Colour */}
      <div className="flex flex-col gap-3">
        <p>Background Color</p>
        <input
          onChange={(e) => setColour(e.target.value)}
          value={colour}
          type="color"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="text-base bg-black text-white py-2.5 px-10 cursor-pointer rounded-3xl disabled:opacity-50"
      >
        {loading ? "Adding..." : "Add"}
      </button>
    </form>
  );
};

export default AddAlbum;
