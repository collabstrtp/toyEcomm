import React, { useState, useEffect } from "react";
import { TbTrash } from "react-icons/tb";
import { RiEdit2Line } from "react-icons/ri";
import { toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Empty from "../assets/empty-cart.jpg";
import Modal from "react-modal";
import api from "../api/api";
import { useDispatch } from "react-redux";
import { deleteProduct, fetchAllProducts } from "../features/productSlice";
import CategoryName from "../features/categoryName";

const ProductList = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [showLoader, setShowLoader] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchInfo = async () => {
      setShowLoader(true);
      try {
        const response = await dispatch(fetchAllProducts()).unwrap();
        setAllProducts(response);
        // console.log(response);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
      setShowLoader(false);
    };

    fetchInfo();
  }, []);

  const handleRemoveProduct = async (id) => {
    setProductToDelete(id);
    setIsModalOpen(true);
  };

  const deleteProducts = async (id) => {
    setShowLoader(true);
    try {
      // Await the dispatch and unwrap the result to catch errors
      await dispatch(deleteProduct(id)).unwrap();

      setAllProducts(allProducts.filter((product) => product._id !== id));
      toast.success("Product removed successfully", {
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
    } catch (error) {
      toast.error("Error removing product", {
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
      // Optionally log the error
      console.error("Error removing product:", error);
    }
    setShowLoader(false);
    setIsModalOpen(false);
  };

  const handleEditProduct = (id) => {
    setShowLoader(true);
    navigate(`/admin/editproduct/${id}`);
    setShowLoader(false);
  };

  const toggleProductStatus = async (id) => {
    setShowLoader(true);
    try {
      const token = localStorage.getItem("token");
      await api.put(
        `/api/products/toggle-availability/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAllProducts(
        allProducts.map((product) =>
          product._id === id
            ? { ...product, available: !product.available }
            : product
        )
      );
      toast.success("Product status toggled successfully", {
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
    } catch (error) {
      toast.error("Error toggling product status", {
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

      //console.error("Error toggling product status:", error);
    }
    setShowLoader(false);
  };

  return (
    <div className="text-black flex-col font-anta p-8 box-border bg-white w-full h-screen lg:max-w-[100%] rounded-sm mt-4 lg:m-7 border border-gray-200">
      <h1 className="bold-22 font-anta text-center mb-5">PRODUCT LIST</h1>
      <div>
        {allProducts?.length === 0 ? (
          <div className="flex flex-col justify-center items-center bg-gray-100 py-8 rounded-lg border border-gray-300">
            <img src={Empty} className="rounded-full h-64" alt="Empty cart" />
            <p className="font-anta text-black text-center mt-5">
              No Products to show
            </p>
          </div>
        ) : (
          <div className="max-h-[77vh] overflow-auto px-4 text-center">
            <table className="w-full mx-auto">
              <thead>
                <tr className="overflow-auto border-b-2 border-black">
                  <th className="p-2 font-anta uppercase">Products</th>
                  <th className="p-2 font-anta uppercase">Title</th>
                  <th className="p-2 font-anta uppercase">Price</th>
                  <th className="p-2 font-anta uppercase">Stock</th>
                  <th className="p-2 font-anta uppercase">Category</th>
                  <th className="p-2 font-anta uppercase">Remove/Edit</th>
                  <th className="p-2 font-anta uppercase">Available</th>
                </tr>
              </thead>
              <tbody>
                {allProducts?.map((product) => (
                  <tr
                    key={product._id}
                    className="border-b border-gray-300 p-6 medium-14 hover:bg-gray-50"
                  >
                    <td className="p-2">
                      <img
                        src={product.images[0]}
                        className="h-16 w-16 object-cover rounded border border-gray-300"
                        alt={product.name}
                      />
                    </td>
                    <td className="p-2 font-anta">{product.name}</td>
                    <td className="p-2 font-anta">
                      &#8377;{product.price}
                    </td>
                    <td className="p-2 font-anta">
                      {product.stock}
                    </td>
                    <td className="p-2 font-anta">
                      {typeof product.category === "object" &&
                      product.category !== null
                        ? product.category.name
                        : "Unknown"}
                    </td>
                    <td className="p-2 flex mt-6 gap-x-5 justify-center items-center">
                      <button
                        className="hover:text-red-600 transition-colors"
                        onClick={() => handleRemoveProduct(product._id)}
                      >
                        <TbTrash className="text-[22px]" />
                      </button>
                      <button
                        className="hover:text-blue-600 transition-colors"
                        onClick={() => handleEditProduct(product._id)}
                      >
                        <RiEdit2Line className="text-[22px]" />
                      </button>
                    </td>
                    <td className="p-2">
                      <label className="switch font-anta">
                        <input
                          type="checkbox"
                          className="toggle"
                          checked={product.available}
                          onChange={() => toggleProductStatus(product._id)}
                        />
                        <span className="slider"></span>
                      </label>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {showLoader && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-white/80">
            <div className="spinner"></div>
          </div>
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Delete Confirmation"
        className="modal-content bg-white text-black border-2 border-gray-300 rounded-lg p-6 max-w-md mx-auto mt-20"
        overlayClassName="modal-overlay fixed inset-0 bg-black/50 flex items-center justify-center"
      >
        <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
        <p className="mb-6">Are you sure you want to delete this product?</p>
        <div className="flex gap-x-5 mt-3">
          <button
            onClick={() => setIsModalOpen(false)}
            className="btn_dark_rounded bg-gray-300 text-black px-6 py-2 rounded hover:bg-gray-400 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => deleteProducts(productToDelete)}
            className="btn_dark_rounded bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition-colors"
          >
            Delete
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default ProductList;
