const HighlightsImages = require("../models/HighlightsImages");
const Product = require("../models/Product");
const cloudinary = require("../config/cloudinary");

// Upload function
const uploadToCloudinary = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { resource_type: "auto" },
      (error, result) => {
        if (error) return reject(error);
        resolve(result.secure_url); // store only URL
      },
    );

    stream.end(fileBuffer);
  });
};

exports.addImage = async (req, res) => {
  try {
    const { product } = req.body;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Image file is required",
      });
    }

    // Check product exists
    const existingProduct = await Product.findById(product);
    if (!existingProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // 🔥 Count images of THIS product only
    const count = await HighlightsImages.countDocuments();
    const nextSerialNumber = count + 1;

    // Upload image
    const imageUrl = await uploadToCloudinary(req.file.buffer);

    const newImage = await HighlightsImages.create({
      images: imageUrl,
      product,
      serialNumber: nextSerialNumber,
    });

    res.status(201).json({
      success: true,
      data: newImage,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error uploading image",
      error: error.message,
    });
  }
};

exports.getAllImages = async (req, res) => {
  try {
    const images = await HighlightsImages.find().sort({ serialNumber: 1 }); // only serial sort

    res.status(200).json({
      success: true,
      count: images.length,
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
    const image = await HighlightsImages.findById(req.params.id);

    if (!image) {
      return res.status(404).json({
        success: false,
        message: "Image not found",
      });
    }

    res.status(200).json({
      success: true,
      data: image, // returns id, product id, image, serialNumber
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
    const { images, serialNumber } = req.body;
    const imageId = req.params.id;

    const existingImage = await HighlightsImages.findById(imageId);

    if (!existingImage) {
      return res.status(404).json({
        success: false,
        message: "Image not found",
      });
    }

    const oldSerial = existingImage.serialNumber;

    // 🔥 Get max serial globally
    const maxImage = await HighlightsImages.findOne().sort({
      serialNumber: -1,
    });

    const maxSerial = maxImage ? maxImage.serialNumber : 0;

    let newSerial = serialNumber;

    // If serial bigger than max → set to max
    if (serialNumber > maxSerial) {
      newSerial = maxSerial;
    }

    if (newSerial !== oldSerial) {
      if (newSerial < oldSerial) {
        // Move up
        await HighlightsImages.updateMany(
          {
            serialNumber: { $gte: newSerial, $lt: oldSerial },
          },
          { $inc: { serialNumber: 1 } },
        );
      } else {
        // Move down
        await HighlightsImages.updateMany(
          {
            serialNumber: { $gt: oldSerial, $lte: newSerial },
          },
          { $inc: { serialNumber: -1 } },
        );
      }
    }

    const updatedImage = await HighlightsImages.findByIdAndUpdate(
      imageId,
      {
        images,
        serialNumber: newSerial,
      },
      { new: true },
    );

    res.status(200).json({
      success: true,
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
    const imageId = req.params.id;

    const deletedImage = await HighlightsImages.findById(imageId);

    if (!deletedImage) {
      return res.status(404).json({
        success: false,
        message: "Image not found",
      });
    }

    const { serialNumber } = deletedImage;

    // 1️⃣ Delete image
    await HighlightsImages.findByIdAndDelete(imageId);

    // 2️⃣ Shift remaining images globally
    await HighlightsImages.updateMany(
      {
        serialNumber: { $gt: serialNumber },
      },
      { $inc: { serialNumber: -1 } },
    );

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
