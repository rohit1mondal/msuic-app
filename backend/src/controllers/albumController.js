import { v2 as cloudinary } from "cloudinary";
import albumModel from "../models/albumModel.js";

// add a new album
const addAlbum = async (req, res) => {
  try {
    const name = req.body.name;
    const description = req.body.description;
    const bgColour = req.body.bgColour;
    const imageFile = req.file;

    if (!imageFile) {
      return res.status(400).json({message: "Image file is required"})
    }

    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });

    const albumData = {
      name,
      description,
      bgColour,
      image: imageUpload.secure_url,
    };

    const album = albumModel(albumData);
    await album.save();
    res.json({
      success: true,
      message: `Album added`,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        message: "Error adding album from backend",
        error: error.message,
      });
  }
};

// list all albums
const listAlbum = async (req, res) => {
  try {
    const allAlbums = await albumModel.find({});
    res.json({
      success: true,
      albums: allAlbums,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error listing album from backend", error: error.message });
  }
};


// remove an album
const removeAlbum = async (req, res) => {
  try {
    await albumModel.findByIdAndDelete(req.params.id);
    res.json({
      success: true,
      message: `Album removed`,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error while removing album from backend", error: error.message });
  }
};

export { addAlbum, listAlbum, removeAlbum };
