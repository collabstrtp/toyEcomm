import React, { useState, useEffect } from "react";
import Upload_area from "../assets/upload.png";
import { PlusOutlined } from "@ant-design/icons";
import { toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";
import api from "../api/api";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductById, updateProduct } from "../features/productSlice";
import { useNavigate } from "react-router-dom";
const EditProduct = () => {
  const { id } = useParams();
  const [showLoader, setShowLoader] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const [categories, setCategories] = useState([]);
  const [specList, setSpecList] = useState([{ key: "", value: "" }]);
  const [removedImages, setRemovedImages] = useState([]);
  const navigate = useNavigate();

  const [productData, setProductData] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
    ageGroup: "",
    gender: "",
    material: "",
    color: "",
    brand: "",
    stock: "",
    discountPercent: 0,
    available: true,
    popular: false,
    images: null,
    imageUrls: [],
  });

  const dispatch = useDispatch();
  const product = useSelector((state) => state.products.product);
  // console.log("Product: ", product);

  useEffect(() => {
    dispatch(fetchProductById({ id }));
  }, [id, dispatch]);

  useEffect(() => {
    if (product) {
      setProductData({
        name: product.name || "",
        category: product.category?._id || "",
        price: product.price || "",
        description: product.description || "",
        ageGroup: product.ageGroup || "",
        gender: product.gender || "",
        material: product.material || "",
        color: product.color || "",
        brand: product.brand || "",
        stock: product.stock || "",
        discountPercent: product.discountPercent || 0,
        available: product.available ?? true,
        popular: product.popular ?? false,
        imageUrls: product.images || [],
        images: null,
      });

      // preload specifications
      if (
        product?.specifications &&
        Object.keys(product.specifications).length > 0
      ) {
        setSpecList(
          Object.entries(product.specifications).map(([key, value]) => ({
            key,
            value,
          }))
        );
      } else {
        setSpecList([{ key: "", value: "" }]);
      }
    }
  }, [product]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get("/api/categories/allcategories");
        setCategories(response.data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setProductData((prevState) => ({
        ...prevState,
        [name]: checked,
      }));
    } else {
      setProductData((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  const handleSizeChange = (e) => {
    const { checked, value } = e.target;
    setProductData((prevState) => ({
      ...prevState,
      sizes: checked
        ? [...prevState.sizes, value]
        : prevState.sizes.filter((size) => size !== value),
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const urls = files.map((file) => URL.createObjectURL(file));

    setProductData((prev) => ({
      ...prev,
      images: prev.images ? [...prev.images, ...files] : files,
      imageUrls: [...prev.imageUrls, ...urls],
    }));

    setShowUpload(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowLoader(true);

    try {
      const formData = new FormData();

      formData.append("name", productData.name);
      formData.append("category", productData.category);
      formData.append("price", productData.price);
      formData.append("description", productData.description);
      formData.append("ageGroup", productData.ageGroup);
      formData.append("gender", productData.gender);
      formData.append("material", productData.material);
      formData.append("color", productData.color);
      formData.append("brand", productData.brand);
      formData.append("stock", productData.stock);
      formData.append("discountPercent", productData.discountPercent);
      formData.append("available", productData.available);
      formData.append("popular", productData.popular);
      formData.append("removedImages", JSON.stringify(removedImages));

      const specifications = {};
      specList.forEach(({ key, value }) => {
        if (key && value) specifications[key] = value;
      });
      formData.append("specifications", JSON.stringify(specifications));

      if (productData.images?.length > 0) {
        productData.images.forEach((file) => {
          formData.append("images", file);
        });
      }

      // 🔥 WAIT FOR UPLOAD TO FINISH
      await dispatch(updateProduct({ id, productData: formData })).unwrap();

      toast.success("🦄 Product Updated", {
        position: "bottom-right",
        autoClose: 3000,
        transition: Zoom,
      });

      navigate("/admin/productlist");
    } catch (error) {
      console.error(error);
      toast.error("Error updating product");
    } finally {
      setShowLoader(false);
    }
  };

  if (!product) {
    return (
      <div className="flex items-center justify-center h-screen bg-white text-black">
        Loading...
      </div>
    );
  }

  return (
    <div className="text-black font-anta p-8 box-border bg-white w-full rounded-sm mt-4 lg:m-7 border border-gray-200">
      <h1 className="bold-22 font-anta text-center mb-5">
        PRODUCT ADDING FORM!
      </h1>

      {/* NAME & CATEGORY*/}
      <div className="flex flex-col lg:flex-row gap-x-10">
        {/* NAME */}
        <div className="mb-3 max-w-[300px] w-full">
          <h4 className="font-anta bold-18 pb-2">Product Title:</h4>
          <input
            type="text"
            name="name"
            placeholder="Type here..."
            className="bg-gray-100 border border-gray-300 outline-none w-full py-3 px-4 rounded-md text-black focus:border-black focus:ring-1 focus:ring-black"
            value={productData.name}
            onChange={handleInputChange}
          />
        </div>

        {/* CATEGORY */}
        <div className="mb-3 max-w-[300px] w-full">
          <h4 className="font-anta bold-18 pb-2">Category:</h4>
          <select
            name="category"
            value={productData.category}
            onChange={handleInputChange}
            className="bg-gray-100 border border-gray-300 outline-none w-full py-3 px-4 rounded-md text-black focus:border-black focus:ring-1 focus:ring-black"
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option
                key={category._id}
                value={category._id}
                className="capitalize"
              >
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* AVAILABILITY */}
        <div className="mb-3 max-w-[300px] w-full">
          <h4 className="font-anta bold-18 pb-2">Availability:</h4>

          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="available"
              checked={productData.available === true}
              onChange={() =>
                setProductData((prev) => ({ ...prev, available: true }))
              }
            />
            Available
          </label>

          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="available"
              checked={productData.available === false}
              onChange={() =>
                setProductData((prev) => ({ ...prev, available: false }))
              }
            />
            Unavailable
          </label>
        </div>

        <div className="mb-3 max-w-[300px] w-full">
          <h4 className="font-anta bold-18 pb-2">Popular Product:</h4>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="popular"
              name="popular"
              checked={productData.popular}
              onChange={handleInputChange}
              className="form-checkbox cursor-pointer h-5 w-5 text-black border-gray-300"
            />
            <label htmlFor="popular" className="font-anta text-sm">
              Mark as Popular
            </label>
          </div>
        </div>
      </div>

      {/*  PRICES */}
      <div className="flex flex-col lg:flex-row  gap-x-10">
        <div className="mb-3 max-w-[300px] w-full">
          <h4 className="font-anta bold-18 pb-2">Stock Quantity:</h4>
          <input
            type="number"
            name="stock"
            placeholder="Stock Quantity"
            className="bg-gray-100 border border-gray-300 outline-none w-full py-3 px-4 rounded-md text-black focus:border-black focus:ring-1 focus:ring-black"
            value={productData.stock}
            onChange={handleInputChange}
          />
        </div>
        {/* NEW PRICE */}
        <div className="mb-3 max-w-[700px] w-full">
          <h4 className="font-anta bold-18 pb-2">Price:</h4>
          <input
            type="number"
            name="price"
            placeholder="Type here..."
            className="bg-gray-100 border border-gray-300 outline-none w-full py-3 px-4 rounded-md text-black focus:border-black focus:ring-1 focus:ring-black"
            value={productData.price}
            onChange={handleInputChange}
          />
        </div>

        {/* OLD PRICE */}
        <div className="mb-3 max-w-[700px] w-full">
          <h4 className="font-anta bold-18 pb-2">Discount:</h4>
          <input
            type="number"
            name="discountPercent"
            placeholder="In percent..."
            className="bg-gray-100 border border-gray-300 outline-none w-full py-3 px-4 rounded-md text-black focus:border-black focus:ring-1 focus:ring-black"
            value={productData.discountPercent}
            onChange={handleInputChange}
          />
        </div>
      </div>

      {/*  DESCRIPTION*/}
      <div className="mb-3 w-full">
        <h4 className="font-anta bold-18 pb-2">Description:</h4>
        <textarea
          id="description"
          placeholder="Type here..."
          name="description"
          className="bg-gray-100 border border-gray-300 outline-none w-full py-3 px-4 rounded-md text-black focus:border-black focus:ring-1 focus:ring-black"
          value={productData.description}
          onChange={handleInputChange}
        />
      </div>
      {/* //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
      {/* SPECIFICATIONS */}
      <div className="mt-5">
        <h4 className="font-anta bold-18 pb-2">Specifications:</h4>

        <div className="flex flex-col lg:flex-row gap-x-10">
          <div className="mb-3 max-w-[300px] w-full">
            <h4 className="font-anta bold-18 pb-2">Gender:</h4>
            <select
              name="gender"
              value={productData.gender}
              onChange={handleInputChange}
              className="bg-gray-100 border border-gray-300 outline-none w-full py-3 px-4 rounded-md text-black focus:border-black focus:ring-1 focus:ring-black"
            >
              <option value="">Select Gender</option>
              <option value="boys">Boys</option>
              <option value="girls">Girls</option>
              <option value="unisex">Unisex</option>
            </select>
          </div>

          <div className="mb-3 max-w-[300px] w-full">
            <h4 className="font-anta bold-18 pb-2">Material:</h4>

            <input
              type="text"
              name="material"
              placeholder="Material (eg: Plastic)"
              value={productData.material}
              onChange={handleInputChange}
              className="bg-gray-100 border border-gray-300 outline-none w-full py-3 px-4 rounded-md text-black focus:border-black focus:ring-1 focus:ring-black"
            />
          </div>

          <div className="mb-3 max-w-[300px] w-full">
            <h4 className="font-anta bold-18 pb-2">Color:</h4>

            <input
              type="text"
              name="color"
              placeholder="Color (eg: Red)"
              value={productData.color}
              onChange={handleInputChange}
              className="bg-gray-100 border border-gray-300 outline-none w-full py-3 px-4 rounded-md text-black focus:border-black focus:ring-1 focus:ring-black"
            />
          </div>

          <div className="mb-3 max-w-[300px] w-full">
            <h4 className="font-anta bold-18 pb-2">Brand:</h4>

            <input
              type="text"
              name="brand"
              placeholder="Brand (eg: FunLearn)"
              value={productData.brand}
              onChange={handleInputChange}
              className="bg-gray-100 border border-gray-300 outline-none w-full py-3 px-4 rounded-md text-black focus:border-black focus:ring-1 focus:ring-black"
            />
          </div>
        </div>

        {specList.map((spec, index) => (
          <div
            key={index}
            className="flex items-center gap-3 mb-3 max-w-[620px] w-full"
          >
            <input
              placeholder="Key (eg: Weight)"
              value={spec.key}
              onChange={(e) => {
                const updated = [...specList];
                updated[index].key = e.target.value;
                setSpecList(updated);
              }}
              className="bg-gray-100 border border-gray-300 outline-none w-full py-3 px-4 rounded-md text-black focus:border-black focus:ring-1 focus:ring-black"
            />

            <input
              placeholder="Value (eg: 500g)"
              value={spec.value}
              onChange={(e) => {
                const updated = [...specList];
                updated[index].value = e.target.value;
                setSpecList(updated);
              }}
              className="bg-gray-100 border border-gray-300 outline-none w-full py-3 px-4 rounded-md text-black focus:border-black focus:ring-1 focus:ring-black"
            />

            {/* ❌ REMOVE BUTTON */}
            <button
              type="button"
              onClick={() =>
                setSpecList(specList.filter((_, i) => i !== index))
              }
              className="h-10 w-10 flex items-center justify-center rounded-lg border border-red-200 text-red-500 bg-white hover:bg-red-50 hover:border-red-400 hover:text-red-600 transition-all duration-200 shadow-sm hover:shadow"
              title="Remove specification"
            >
              <span className="text-xl leading-none">×</span>
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={() => setSpecList([...specList, { key: "", value: "" }])}
          className="mt-2 px-6 py-3 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
        >
          + Add Specification
        </button>
      </div>

      {/* AGE GROUP */}
      <div className="mb-3">
        <h4 className="font-anta bold-18 pb-2">Age Group:</h4>
        <div className="flex gap-4 flex-wrap">
          {["0-2", "3-5", "6-8", "9-12", "13+"].map((age) => (
            <label key={age} className="flex items-center gap-2">
              <input
                type="radio"
                name="ageGroup"
                value={age}
                checked={productData.ageGroup === age}
                onChange={handleInputChange}
              />
              {age}
            </label>
          ))}
        </div>
      </div>

      {/*  UPLOAD IMAGES */}
      {showUpload ? (
        <div className="mt-10">
          <h4 className="font-anta bold-18 pb-2">Add Product Images:</h4>
          <label
            htmlFor="product-images-input"
            className="flex justify-center items-center flex-col border-2 border-gray-300 bg-gray-50 rounded-md cursor-pointer hover:bg-gray-100 transition-colors"
          >
            <img
              src={Upload_area}
              alt="upload"
              className="w-32 rouned-sm inline-block"
            />
            <h4 className="font-anta py-3 text-black">Upload</h4>
          </label>
          <input
            onChange={handleImageChange}
            type="file"
            id="product-images-input"
            name="images" // ✅ MUST MATCH multer field
            multiple
            hidden
            className="bg-gray-100 text-black outline-none max-w-80 w-full py-3 px-4 rounded-md"
          />
        </div>
      ) : null}

      {/* Display selected images */}
      {!showUpload && productData?.imageUrls?.length > 0 && (
        <div className="mt-10">
          <h4 className="font-anta bold-18 pb-2">Selected Images:</h4>

          <div className="grid lg:grid-cols-4 grid-cols-2 gap-4">
            {productData.imageUrls.map((url, index) => (
              <div key={index} className="relative group w-32 h-32">
                <img
                  src={url}
                  alt={`Selected ${index + 1}`}
                  className="w-full h-full object-cover rounded-md border border-gray-300"
                />

                {/* ❌ REMOVE BUTTON */}
                <button
                  type="button"
                  onClick={() => {
                    setProductData((prev) => {
                      const removedImage = prev.imageUrls[index];

                      return {
                        ...prev,
                        imageUrls: prev.imageUrls.filter((_, i) => i !== index),
                        images: prev.images
                          ? Array.from(prev.images).filter(
                              (_, i) => i !== index
                            )
                          : null,
                      };
                    });

                    // 🔥 Track removed DB image
                    const removedUrl = productData.imageUrls[index];

                    if (!removedUrl.startsWith("blob:")) {
                      setRemovedImages((prev) => [...prev, removedUrl]);
                    }
                  }}
                  className="
                  absolute -top-2 -right-2
                  h-7 w-7
                  flex items-center justify-center
                  rounded-full
                  bg-red-600 text-white
                  shadow-md
                  opacity-0 group-hover:opacity-100
                  transition-opacity
                  hover:bg-red-700
                "
                  title="Remove image"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {!showUpload ? (
        <button
          onClick={() => setShowUpload(true)}
          className="btn_dark_rounded mt-5 !rounded gap-x-1 flex justify-center items-center bg-black text-white px-6 py-3 hover:bg-gray-800 transition-colors"
        >
          Select New Images
        </button>
      ) : null}

      {/* Submit button */}
      <button
        onClick={handleSubmit}
        className="btn_dark_rounded mt-5 !rounded gap-x-1 flex justify-center items-center bg-black text-white px-6 py-3 hover:bg-gray-800 transition-colors"
      >
        <PlusOutlined className="font-anta" />
        Update Product
      </button>

      {/* Loader */}
      {showLoader && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-white/80">
          <div className="spinner"></div>
        </div>
      )}
    </div>
  );
};

export default EditProduct;
