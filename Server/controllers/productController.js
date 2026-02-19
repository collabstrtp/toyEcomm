const Product = require("../models/Product");
const Category = require("../models/Category");
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

exports.createProduct = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Forbidden" });
    }

    const {
      name,
      category,
      description,
      price,
      discountPercent = 0,
      ageGroup,
      gender,
      material,
      color,
      brand,
      isEducational = false,
      stock,
      popular = false,
      available = true,
    } = req.body;

    // 🧪 Parse specifications
    let specifications = {};
    if (req.body.specifications) {
      specifications =
        typeof req.body.specifications === "string"
          ? JSON.parse(req.body.specifications)
          : req.body.specifications;
    }

    // 🧪 Validation
    if (
      !name ||
      !category ||
      !description ||
      price === undefined ||
      !ageGroup ||
      !gender ||
      stock === undefined
    ) {
      return res.status(400).json({ error: "Required fields missing" });
    }

    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      return res.status(404).json({ error: "Category not found" });
    }

    if (!req.files || !req.files.images) {
      return res.status(400).json({ error: "Images are required" });
    }

    const imageUrls = await Promise.all(
      req.files.images.map((file) => uploadToCloudinary(file)),
    );

    const product = new Product({
      name,
      images: imageUrls,
      category,
      description,
      price,
      discountPercent,
      ageGroup,
      gender,
      material: material || "",
      color: color || "",
      brand,
      isEducational,
      stock,
      popular,
      specifications,
      available,
    });

    await product.save();

    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    console.error("Create product error:", error);
    return res.status(500).json({ error: error.message });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({}).populate("category", "name");
    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// text index search endpoint for suggestions/autocomplete
exports.searchProducts = async (req, res) => {
  try {
    const query = req.query.q || "";
    if (!query.trim()) {
      return res.status(200).json({ products: [] });
    }
    const products = await Product.find(
      { $text: { $search: query }, available: true },
      { score: { $meta: "textScore" } },
    )
      .sort({ score: { $meta: "textScore" } })
      .limit(10);
    res.status(200).json({ products });
  } catch (error) {
    console.error("Search products error:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate(
      "category",
      "name",
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const productObj = product.toObject();

    // 🔥 FIX: Convert Map → Object
    productObj.specifications = Object.fromEntries(
      product.specifications || [],
    );

    // Ratings
    const ratingsArr = product.ratings?.map((r) => r.rating) || [];
    productObj.averageRating = ratingsArr.length
      ? ratingsArr.reduce((a, b) => a + b, 0) / ratingsArr.length
      : 0;
    productObj.totalRatings = ratingsArr.length;

    res.status(200).json({ product: productObj });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    // 🔐 Admin check (authMiddleware + adminMiddleware already ran)
    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({ message: "Forbidden" });
    }

    const productId = req.params.id;

    const {
      name,
      category,
      description,
      price,
      discountPercent = 0,
      ageGroup,
      gender,
      material,
      color,
      brand,
      isEducational = false,
      stock,
      popular = false,
      available = true,
    } = req.body;

    let specifications = {};
    if (req.body.specifications) {
      specifications =
        typeof req.body.specifications === "string"
          ? JSON.parse(req.body.specifications)
          : req.body.specifications;
    }

    const removedImages = req.body.removedImages
      ? JSON.parse(req.body.removedImages)
      : [];

    const existingProduct = await Product.findById(productId);
    if (!existingProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    if (category && category !== existingProduct.category.toString()) {
      const categoryExists = await Category.findById(category);
      if (!categoryExists) {
        return res.status(404).json({ error: "Category not found" });
      }
    }

    let images = existingProduct.images || [];

    // ❌ Remove deleted images
    if (removedImages.length > 0) {
      images = images.filter((img) => !removedImages.includes(img));
    }

    // ➕ Add newly uploaded images
    if (req.files?.images?.length > 0) {
      const newImageUrls = await Promise.all(
        req.files.images.map((file) => uploadToCloudinary(file)),
      );
      images = [...images, ...newImageUrls];
    }

    existingProduct.name = name ?? existingProduct.name;
    existingProduct.category = category ?? existingProduct.category;
    existingProduct.description = description ?? existingProduct.description;
    existingProduct.price =
      price !== undefined ? Number(price) : existingProduct.price;
    existingProduct.discountPercent = Number(discountPercent) || 0;
    existingProduct.ageGroup = ageGroup ?? existingProduct.ageGroup;
    existingProduct.gender = gender ?? existingProduct.gender;
    existingProduct.material = material ?? existingProduct.material;
    existingProduct.color = color ?? existingProduct.color;
    existingProduct.brand = brand ?? existingProduct.brand;
    existingProduct.isEducational =
      isEducational === "true" || isEducational === true;
    existingProduct.stock =
      stock !== undefined ? Number(stock) : existingProduct.stock;
    existingProduct.popular = popular === "true" || popular === true;
    existingProduct.available = available === "true" || available === true;
    existingProduct.specifications = specifications;
    existingProduct.images = images;

    await existingProduct.save();

    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product: existingProduct,
    });
  } catch (error) {
    console.error("Update product error:", error);
    return res.status(500).json({ error: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  if (req.user.role !== "admin") {
    return res
      .status(403)
      .json({ message: "Forbidden: only admins can delete products!" });
  }
  try {
    // Find the product by ID
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Delete images from Cloudinary
    //   console.log("Deleting images from Cloudinary...");
    const imageUrls = [
      ...(product.images || []),
      product.category_banner,
      product.category_thumbnail,
    ].filter((url) => url && typeof url === "string"); // Filter out null, undefined, and non-string values

    const deletionPromises = imageUrls.map(async (imageUrl) => {
      try {
        // Extract public Id from the URL
        const publicId = imageUrl.substring(
          imageUrl.lastIndexOf("/") + 1,
          imageUrl.lastIndexOf("."),
        );
        await cloudinary.uploader.destroy(publicId);
        //     console.log(`Image with publicId ${publicId} deleted from cloudinary.`);
      } catch (err) {
        console.error(
          `Error deleting image with publicId ${publicId}from Cloudinary:`,
          err,
        );
        return null;
      }
    });

    // Wait for all images to be deleted from Cloudinary
    await Promise.all(deletionPromises);

    // Delete the product from the database
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error in deleteProduct:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

exports.getProductByCategoryId = async (req, res) => {
  try {
    const categoryName = req.params.name;

    // Find category by name (case-insensitive)
    const category = await Category.findOne({
      name: { $regex: new RegExp(`^${categoryName}$`, "i") },
    });

    if (!category) {
      return res.status(404).json({
        message: `Category "${categoryName}" not found`,
        error: "CATEGORY_NOT_FOUND",
      });
    }

    const products = await Product.find({
      category: category._id,
      available: true, // Only return available products
    });

    if (!products.length) {
      return res.status(200).json({
        category: {
          name: category.name,
          bannerImage: category.banner_image,
        },
        products: [],
        message: "No products found for this category",
      });
    }

    res.status(200).json({
      category: {
        name: category.name,
        bannerImage: category.banner_image,
      },
      products,
    });
  } catch (error) {
    console.error("Error in getProductByCategoryId:", error);
    res.status(500).json({
      message: "Server error while fetching category products",
      error: error.message,
    });
  }
};

// ... existing code ...
exports.toggleProductAvailability = async (req, res) => {
  try {
    // Find the product by ID
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Toggle the 'available' status
    product.available = !product.available;

    // Save the updated product
    await product.save();

    res
      .status(200)
      .json({ message: "Product availability toggled successfully", product });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

exports.getPopularProducts = async (req, res) => {
  try {
    const popularProducts = await Product.find({ popular: true });
    res.status(200).json({ popularProducts });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

exports.rateProduct = async (req, res) => {
  if (!req.user || !req.user._id) {
    return res.status(401).json({ message: "Not authorized" });
  }
  const { productId } = req.params;
  const { rating } = req.body;
  const userId = req.user._id; // assuming auth middleware sets req.user

  try {
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    // Check if user already rated
    const existing = product.ratings.find(
      (r) => r.user.toString() === userId.toString(),
    );
    if (existing) {
      existing.rating = rating;
    } else {
      product.ratings.push({ user: userId, rating });
    }
    await product.save();

    // Calculate new average
    const ratingsArr = product.ratings.map((r) => r.rating);
    const averageRating = ratingsArr.length
      ? ratingsArr.reduce((a, b) => a + b, 0) / ratingsArr.length
      : 0;

    res.json({
      message: "Rating submitted",
      averageRating,
      totalRatings: ratingsArr.length,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
