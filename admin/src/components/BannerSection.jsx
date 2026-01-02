import React, { useState } from "react";
import Upload_area from "../assets/upload.png";
import { PlusOutlined } from "@ant-design/icons";
import { toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { uploadBannerImages } from "../features/bannerSlice";
import { useNavigate } from "react-router-dom";

const BannerSection = () => {
  const [showUpload, setShowUpload] = useState(true);
  const [bannerData, setBannerData] = useState({
    pageName: "",
    images: null,
    imageUrls: [],
  });
  const [showLoader, setShowLoader] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      setBannerData((prevState) => ({
        ...prevState,
        [name]: e.target.checked,
        available: name === "available" ? true : false,
      }));
    } else {
      setBannerData((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  const handleImageChange = (e) => {
    const files = e.target.files;
    const urls = Array.from(files).map((file) => URL.createObjectURL(file));
    setBannerData((prevState) => ({
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
    formData.append("pageName", bannerData.pageName);
    if (bannerData.images) {
      Array.from(bannerData.images).forEach((file, index) => {
        formData.append("images", file);
      });
    }

    try {
      const response = await dispatch(uploadBannerImages(formData)).unwrap();
      if (response.success) {
        toast.success("🦄 Banner Added", {
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
        console.log("Navigating to /admin/allbanners");
        navigate("/admin/allbanners");
      } else {
        toast.error("Failed to upload banner images", {
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
        console.error("Unexpected response status:", response.status);
      }
      setBannerData({
        pageName: "",
        images: null,
        imageUrls: [],
      });
      setShowUpload(true);
      setShowLoader(false);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error uploading banner. Please try again.", {
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
      setShowLoader(false);
    }
  };

  return (
    <div className="text-black font-anta p-8 box-border bg-white w-full h-screen rounded-sm mt-4 lg:m-7 border border-gray-200">
      <h1 className="bold-22 font-anta text-center mb-5">BANNER FORM!</h1>

      <div className="flex flex-col lg:flex-row gap-x-10">
        <div className="mb-3 max-w-[300px] w-full">
          <h4 className="font-anta bold-18 pb-2">Page Name:</h4>
          <select
            name="pageName"
            value={bannerData.pageName}
            onChange={handleInputChange}
            className="bg-gray-100 border border-gray-300 outline-none w-full py-3 px-4 rounded-md text-black focus:border-black focus:ring-1 focus:ring-black"
          >
            <option value="_">-</option>
            <option value="HomePage">Home Page</option>
            <option value="BlogPage">Blog Page</option>
            <option value="LiveclassPage">Liveclass Page</option>
            <option value="WorkshopPage">Workshop Page</option>
            <option value="Offers">Offers</option>
          </select>
        </div>
      </div>

      {/*  UPLOAD IMAGES */}
      {showUpload ? (
        <div className="mt-10">
          <h4 className="font-anta bold-18 pb-2">Add Banner Images:</h4>
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
      {!showUpload && bannerData?.imageUrls?.length > 0 && (
        <div className="mt-10">
          <h4 className="font-anta bold-18 pb-2">Selected Images:</h4>
          <div className="flex flex-col gap-y-4">
            {bannerData.imageUrls.map((url, index) => (
              <div
                key={index}
                className="mb-2 flex justify-center w-full items-center text-center"
              >
                <img
                  src={url}
                  alt={`Selected ${index + 1}`}
                  className="w-full h-full object-cover rounded-md border border-gray-300"
                />
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

      <button
        onClick={handleSubmit}
        className="btn_dark_rounded mt-5 !rounded gap-x-1 flex justify-center items-center bg-black text-white px-6 py-3 hover:bg-gray-800 transition-colors"
      >
        <PlusOutlined className="font-anta" />
        Add Banner
      </button>

      {showLoader && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-white/80">
          <div className="spinner"></div>
        </div>
      )}
    </div>
  );
};

export default BannerSection;
