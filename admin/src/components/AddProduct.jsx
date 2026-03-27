import React, { useState, useEffect } from "react";
import Upload_area from "../assets/upload.png";
import { PlusOutlined } from "@ant-design/icons";
import { toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../api/api";

const AddProduct = () => {
  const [showUpload, setShowUpload] = useState(true);
  const [categories, setCategories] = useState([]);
  const [productData, setProductData] = useState({
    name: "",
    categoryId: "",
    new_price: "",
    description: "",
    ageGroup: "",
    gender: "",
    material: "",
    color: "",
    brand: "",
    stock: "", // ✅ ADD THIS
    images: null,
    imageUrls: [],
    discountPercent: 0,
    available: true,
    popular: false,
  });

  const [showLoader, setShowLoader] = useState(false);
  const [specList, setSpecList] = useState([{ key: "", value: "" }]);

  const requiredFields = {
    name: () => productData.name.trim() !== "",
    categoryId: () => productData.categoryId !== "",
    new_price: () => productData.new_price !== "",
    description: () => productData.description.trim() !== "",
    ageGroup: () => productData.ageGroup !== "",
    gender: () => productData.gender !== "",
    stock: () => productData.stock !== "" && !isNaN(productData.stock),
    images: () => productData.imageUrls && productData.imageUrls.length > 0,
  };

  const renderLabel = (field, text) => {
    const isValid = requiredFields[field] ? requiredFields[field]() : false;
    const starColor = isValid ? "text-black" : "text-red-500";
    return (
      <h4 className="font-anta bold-18 pb-2">
        {requiredFields[field] ? (
          <span className={`${starColor} mr-1`}>*</span>
        ) : null}
        {text}
      </h4>
    );
  };

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
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      setProductData((prevState) => ({
        ...prevState,
        [name]: e.target.checked,
        available: name === "available" ? true : false,
      }));
    } else {
      setProductData((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  const handleImageChange = (e) => {
    const files = e.target.files;
    const urls = Array.from(files).map((file) => URL.createObjectURL(file));
    setProductData((prevState) => ({
      ...prevState,
      images: files,
      imageUrls: urls,
    }));
    setShowUpload(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowLoader(true);

    const formData = new FormData();

    formData.append("name", productData.name);
    formData.append("category", productData.categoryId);
    formData.append("price", productData.new_price);
    formData.append("description", productData.description);
    formData.append("ageGroup", productData.ageGroup);
    formData.append("gender", productData.gender);
    formData.append("material", productData.material);
    formData.append("color", productData.color);
    formData.append("brand", productData.brand);
    formData.append("available", productData.available);
    formData.append("stock", productData.stock);
    formData.append("discountPercent", productData.discountPercent);
    formData.append("popular", productData.popular);

    const specifications = {};
    specList.forEach(({ key, value }) => {
      if (key && value) {
        specifications[key] = value;
      }
    });
    if (
      !productData.name ||
      !productData.categoryId ||
      !productData.new_price ||
      !productData.description ||
      !productData.ageGroup ||
      !productData.gender ||
      !productData.stock ||
      !productData.images ||
      !productData.imageUrls.length
    ) {
      toast.error("Please fill all required fields");
      setShowLoader(false);
      return;
    }

    formData.append("specifications", JSON.stringify(specifications));

    if (productData.images) {
      Array.from(productData.images).forEach((file, index) => {
        formData.append("images", file);
      });
    }

    try {
      const token = localStorage.getItem("token");
      const response = await api.post("/api/products/addproduct", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status >= 200 && response.status < 300) {
        toast.success("🦄 Product Added", {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Zoom,
        });

        setProductData({
          name: "",
          categoryId: "",
          new_price: "",
          description: "",
          ageGroup: "",
          gender: "",
          material: "",
          color: "",
          brand: "",
          stock: "",
          images: null,
          imageUrls: [],
          discountPercent: 0,
          available: true,
          popular: false,
        });
        setSpecList([{ key: "", value: "" }]);
        setShowUpload(true);
      } else {
        console.error("Unexpected response status:", response.status);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error uploading product. Please try again.", {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Zoom,
      });
    } finally {
      setShowLoader(false);
    }
  };

  return (
    <div className="text-black font-anta p-8 box-border bg-white w-full rounded-sm mt-4 lg:m-7 border border-gray-200">
      <h1 className="bold-22 font-anta text-center mb-5">
        PRODUCT ADDING FORM!
      </h1>

      {/* NAME & CATEGORY*/}
      <div className="flex flex-col lg:flex-row gap-x-10">
        {/* NAME */}
        <div className="mb-3 max-w-[300px] w-full">
          {renderLabel("name", "Product Title:")}
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
          {renderLabel("categoryId", "Category:")}
          <select
            name="categoryId"
            value={productData.categoryId}
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
          <div className="flex items-center">
            <input
              type="checkbox"
              id="available"
              name="available"
              checked={productData.available}
              onChange={handleInputChange}
              className="form-checkbox cursor-pointer h-5 w-5 text-black border-gray-300 mr-2"
            />
            <label htmlFor="available" className="font-anta text-sm">
              Available
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="unavailable"
              name="unavailable"
              checked={!productData.available}
              onChange={handleInputChange}
              className="form-checkbox cursor-pointer h-5 w-5 text-black border-gray-300 mr-2"
            />
            <label htmlFor="unavailable" className="font-anta text-sm">
              Unavailable
            </label>
          </div>
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
          {renderLabel("stock", "Stock Quantity:")}
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
          {renderLabel("new_price", "Price:")}
          <input
            type="number"
            name="new_price"
            placeholder="Type here..."
            className="bg-gray-100 border border-gray-300 outline-none w-full py-3 px-4 rounded-md text-black focus:border-black focus:ring-1 focus:ring-black"
            value={productData.new_price}
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
        {renderLabel("description", "Description:")}
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
            {renderLabel("gender", "Gender:")}
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
        {renderLabel("ageGroup", "Age Group:")}
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
          {renderLabel("images", "Add Product Images:")}
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
            name="productImage"
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
                    setProductData((prev) => ({
                      ...prev,
                      imageUrls: prev.imageUrls.filter((_, i) => i !== index),
                      images: prev.images
                        ? Array.from(prev.images).filter((_, i) => i !== index)
                        : null,
                    }));
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
        Add Product
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

export default AddProduct;
