import React, { useState, useEffect } from "react";
import Upload_area from "../assets/upload.png";
import { PlusOutlined } from "@ant-design/icons";
import { toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../api/api";
import { useDispatch } from "react-redux";
import { fetchPostById, updatePost } from "../features/postSlice";
import { useParams, useNavigate } from "react-router-dom";

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showLoader, setShowLoader] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const [blogData, setBlogData] = useState({
    title: "",
    content: "",
    author: "",
    quote: "",
    images: null,
    imageUrls: [],
  });
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await dispatch(fetchPostById(id)).unwrap();
        console.log(response.post);
        setBlogData({
          title: response.post.title,
          author: response.post.author,
          quote: response.post.quote,
          content: response.post.content,
          images: null,
          imageUrls: response.post.bannerImage,
        });
      } catch (error) {
        console.error("Error fetching blog data:", error);
      }
    };

    fetchBlog();
  }, [id, dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBlogData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleImageChange = (e) => {
    const files = e.target.files;
    const urls = Array.from(files).map((file) => URL.createObjectURL(file));
    setBlogData((prevState) => ({
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
    formData.append("title", blogData.title);
    formData.append("author", blogData.author);
    formData.append("quote", blogData.quote);
    formData.append("content", blogData.content);
    if (blogData.images) {
      Array.from(blogData.images).forEach((file, index) => {
        formData.append("images", file);
      });
    }

    try {
      const token = localStorage.getItem("token");
      const response = await api.put(`/api/blogs/edit/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      const data = response.data;
      if (data.success) {
        toast.success("🦄 Blog Updated", {
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

        navigate("/admin/allblogs");
      } else {
        console.error("Unexpected response status:", response.status);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error updating blog. Please try again.", {
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
      setShowLoader(false); // Ensure the loader is hidden after the process
    }
  };

  return (
    <div className="text-black font-anta p-8 box-border bg-white w-full rounded-sm mt-4 lg:m-7 border border-gray-200">
      <h1 className="bold-22 font-anta text-center mb-5">EDIT BLOG</h1>

      {/*  TITLE, AUTHOR, QUOTE */}
      <div className="flex flex-col lg:flex-row gap-x-10">
        {/* TITLE */}
        <div className="mb-3 max-w-[300px] w-full">
          <h4 className="font-anta bold-18 pb-2">Blog Title:</h4>
          <input
            type="text"
            name="title"
            placeholder="Type here..."
            className="bg-gray-100 border border-gray-300 outline-none w-full py-3 px-4 rounded-md text-black focus:border-black focus:ring-1 focus:ring-black"
            value={blogData.title}
            onChange={handleInputChange}
          />
        </div>

        {/* AUTHOR */}
        <div className="mb-3 max-w-[300px] w-full">
          <h4 className="font-anta bold-18 pb-2">Author:</h4>
          <input
            type="text"
            name="author"
            placeholder="Type here..."
            className="bg-gray-100 border border-gray-300 outline-none w-full py-3 px-4 rounded-md text-black focus:border-black focus:ring-1 focus:ring-black"
            value={blogData.author}
            onChange={handleInputChange}
          />
        </div>

        {/* QUOTE */}
        <div className="mb-3 max-w-[300px] w-full">
          <h4 className="font-anta bold-18 pb-2">Quote:</h4>
          <input
            type="text"
            name="quote"
            placeholder="Type here..."
            className="bg-gray-100 border border-gray-300 outline-none w-full py-3 px-4 rounded-md text-black focus:border-black focus:ring-1 focus:ring-black"
            value={blogData.quote}
            onChange={handleInputChange}
          />
        </div>
      </div>

      {/* CONTENT */}
      <div className="mb-3 w-full">
        <h4 className="font-anta bold-18 pb-2">Content:</h4>
        <textarea
          id="content"
          placeholder="Type here..."
          name="content"
          className="bg-gray-100 border border-gray-300 outline-none w-full py-3 px-4 rounded-md text-black focus:border-black focus:ring-1 focus:ring-black"
          value={blogData.content}
          onChange={handleInputChange}
          rows="6"
        />
      </div>

      {/* UPLOAD IMAGES */}
      {showUpload ? (
        <div className="mt-10">
          <h4 className="font-anta bold-18 pb-2">Add Blog Image:</h4>
          <label
            htmlFor="blog-images-input"
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
            id="blog-images-input"
            name="blogImage"
            multiple
            hidden
            className="bg-gray-100 text-black outline-none max-w-80 w-full py-3 px-4 rounded-md"
          />
        </div>
      ) : null}
      {!showUpload && blogData?.imageUrls?.length > 0 && (
        <div className="mt-10">
          <h4 className="font-anta bold-18 pb-2">Selected Images:</h4>
          <div className="gap-x-4">
            {blogData.imageUrls.map((url, index) => (
              <div
                key={index}
                className="mb-2 flex justify-center items-center text-center"
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
        Update Blog
      </button>

      {showLoader && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-white/80">
          <div className="spinner"></div>
        </div>
      )}
    </div>
  );
};

export default EditBlog;
