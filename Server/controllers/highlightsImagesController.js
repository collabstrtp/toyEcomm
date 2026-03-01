const HighlightsImages = require("../models/HighlightsImages");
const cloudinary = require("../config/cloudinary");

async function uploadToCloudinary(file) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { resource_type: "auto" },
      (error, result) => {
        if (error) reject(error);
        else resolve(result.secure_url);
      },
    );
    stream.end(file.buffer);
  });
}

exports.addImage = async (req, res) => {
  try {
    const { images, product } = req.body;

    const newImage = new HighlightsImages({
      images,
      product,
    });

    const savedImage = await newImage.save();

    res.status(201).json({
      success: true,
      message: "Image added successfully",
      data: savedImage,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error adding image",
      error: error.message,
    });
  }
};

exports.getAllImages = async (req, res) => {
  try {
    const images = await HighlightsImages.find()
      .populate("product");

    res.status(200).json({
      success: true,
      data: images,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching images",
      error: error.message,
    });
  }
};

exports.getSingleImage = async (req, res) => {
  try {
    const image = await HighlightsImages.findById(req.params.id)
      .populate("product");

    if (!image) {
      return res.status(404).json({
        success: false,
        message: "Image not found",
      });
    }

    res.status(200).json({
      success: true,
      data: image,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching image",
      error: error.message,
    });
  }
};

exports.updateImage = async (req, res) => {
  try {
    const { images, product } = req.body;

    const updatedImage = await HighlightsImages.findByIdAndUpdate(
      req.params.id,
      { images, product },
      { new: true }
    );

    if (!updatedImage) {
      return res.status(404).json({
        success: false,
        message: "Image not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Image updated successfully",
      data: updatedImage,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating image",
      error: error.message,
    });
  }
};

exports.deleteImage = async (req, res) => {
  try {
    const deletedImage = await HighlightsImages.findByIdAndDelete(req.params.id);

    if (!deletedImage) {
      return res.status(404).json({
        success: false,
        message: "Image not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Image deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting image",
      error: error.message,
    });
  }
};