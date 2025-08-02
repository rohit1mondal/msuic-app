import songModel from "../models/songModel.js";
import { v2 as cloudinary } from "cloudinary";

const addSong = async (req, res) => {
  try {
    const name = req.body.name;
    const description = req.body.description;
    const album = req.body.album;
    const audioFile = req.files?.audio?.[0];
    const imageFile = req.files?.image?.[0];
    const audioUpload = await cloudinary.uploader.upload(audioFile.path, {
      resource_type: "video",
    });
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });

    // console.log(name, description, album, audioUpload, imageUpload);

    const duration = `${Math.floor(audioUpload.duration / 60)}:${Math.floor(
      audioUpload.duration % 60
    )}`;

    const songData = {
      name,
      description,
      album,
      image: imageUpload.secure_url,
      file: audioUpload.secure_url,
      duration,
    };

    const song = songModel(songData);
    await song.save();
    res.json({ success: true, message: `Song added` });
  } catch (error) {
    console.error(error); // Add this for logging
    res
      .status(500)
      .json({ message: "Error adding song", error: error.message });
  }
};

const listSong = async (req, res) => {
  try {
    const allsongs = await songModel.find();
    res.json({ success: true, songs: allsongs });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding song", error: error.message });
  }
};

const removeSong = async (req, res) => {
  try {
    await songModel.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "song removed" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error removing song", error: error.message });
  }
};

export { addSong, listSong, removeSong };
