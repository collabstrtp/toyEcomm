import React, { useState, useEffect, useRef } from "react";
import {
  PlusOutlined,
  DeleteOutlined,
  EditOutlined,
  CloseOutlined,
  PictureOutlined,
} from "@ant-design/icons";
import { toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../api/api";

const token = () => localStorage.getItem("token");
const authHeaders = () => ({ Authorization: `Bearer ${token()}` });

// ── Delete Confirm Modal ──────────────────────────────────────────────────────
function DeleteModal({ open, onClose, onConfirm, busy }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl p-6 text-center">
        <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4 text-red-500 text-2xl">
          <DeleteOutlined />
        </div>
        <h3 className="text-lg font-bold text-gray-800 mb-2">Delete Image?</h3>
        <p className="text-sm text-gray-500 mb-6">
          This action cannot be undone. The image will be permanently removed.
        </p>
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-600 text-sm font-semibold hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={busy}
            className="flex-1 py-2.5 rounded-xl bg-red-500 text-white text-sm font-semibold hover:bg-red-600 transition-colors disabled:opacity-60"
          >
            {busy ? "Deleting…" : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Image Form Modal ──────────────────────────────────────────────────────────
function ImageFormModal({ open, onClose, products, initial, onSubmit, busy }) {
  const [productId, setProductId] = useState("");
  const [serialNumber, setSerialNumber] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const fileRef = useRef();
  const isEdit = !!initial;

  useEffect(() => {
    if (open) {
      setProductId(initial?.product?._id || initial?.product || "");
      setSerialNumber(initial?.serialNumber || "");
      setFile(null);
      setPreview(initial?.images || null);
    }
  }, [open, initial]);

  const handleFile = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const f = e.dataTransfer.files[0];
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("product", productId);
    if (serialNumber) fd.append("serialNumber", serialNumber);
    if (file) fd.append("image", file);
    else if (isEdit && initial?.images) fd.append("images", initial.images);
    onSubmit(fd);
  };

  const selectedProduct = products.find((p) => p._id === productId);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-800">
            {isEdit ? "Edit Image" : "Add New Image"}
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
          >
            <CloseOutlined />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">
          {/* Product Select */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Product
            </label>
            <div className="flex items-center gap-3">
              {/* Thumbnail of selected product */}
              <div className="w-11 h-11 rounded-xl overflow-hidden border border-gray-200 flex-shrink-0 bg-gray-50 flex items-center justify-center">
                {selectedProduct?.images?.[0] ? (
                  <img
                    src={selectedProduct.images[0]}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <PictureOutlined className="text-gray-300 text-lg" />
                )}
              </div>
              <select
                className="flex-1 border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
                required
              >
                <option value="">— Select a product —</option>
                {products.map((p) => (
                  <option key={p._id} value={p._id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Serial Number — edit only */}
          {isEdit && (
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                Serial Number
              </label>
              <input
                type="number"
                min="1"
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                value={serialNumber}
                onChange={(e) => setSerialNumber(e.target.value)}
                placeholder="e.g. 1"
              />
            </div>
          )}

          {/* Image Upload */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Image{" "}
              {isEdit && (
                <span className="normal-case font-normal text-gray-400">
                  (leave empty to keep current)
                </span>
              )}
            </label>
            <div
              className={`border-2 border-dashed rounded-xl cursor-pointer transition-colors overflow-hidden
                ${
                  preview
                    ? "border-orange-300 bg-orange-50"
                    : "border-gray-200 bg-gray-50 hover:border-orange-300 hover:bg-orange-50"
                }`}
              onClick={() => fileRef.current.click()}
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
            >
              {preview ? (
                <div className="relative group h-44">
                  <img
                    src={preview}
                    alt="preview"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white text-sm font-medium">
                      Click to change
                    </span>
                  </div>
                </div>
              ) : (
                <div className="h-44 flex flex-col items-center justify-center gap-2">
                  <PictureOutlined className="text-4xl text-gray-300" />
                  <p className="text-sm text-gray-400">
                    Click or drag &amp; drop to upload
                  </p>
                  <p className="text-xs text-gray-300">PNG, JPG, WEBP</p>
                </div>
              )}
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFile}
                required={!isEdit}
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={busy}
            className="w-full py-3 rounded-xl bg-orange-500 hover:bg-orange-600 active:scale-95 text-white text-sm font-bold transition-all disabled:opacity-60 shadow-md shadow-orange-200 flex items-center justify-center gap-2"
          >
            {busy ? (
              <>
                <svg
                  className="animate-spin w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"
                  />
                </svg>
                Saving…
              </>
            ) : isEdit ? (
              "Update Image"
            ) : (
              <>
                <PlusOutlined /> Add Image
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

// ── Image Card ────────────────────────────────────────────────────────────────
function ImageCard({ img, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-200 group">
      <div className="relative h-44 overflow-hidden bg-gray-100">
        <img
          src={img.images}
          alt=""
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {/* hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
        {/* quick action buttons on hover */}
        <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={() => onEdit(img)}
            className="w-8 h-8 rounded-lg bg-white/90 backdrop-blur-sm flex items-center justify-center text-orange-500 hover:bg-orange-500 hover:text-white transition-colors shadow text-sm"
          >
            <EditOutlined />
          </button>
          <button
            onClick={() => onDelete(img)}
            className="w-8 h-8 rounded-lg bg-white/90 backdrop-blur-sm flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white transition-colors shadow text-sm"
          >
            <DeleteOutlined />
          </button>
        </div>
      </div>
      <div className="px-3 py-2.5 flex items-center justify-between">
        <span className="text-xs text-gray-400 font-medium">
          #<span className="text-orange-500 font-bold">{img.serialNumber}</span>
        </span>
        <div className="flex gap-1.5">
          <button
            onClick={() => onEdit(img)}
            className="w-7 h-7 rounded-lg bg-orange-50 flex items-center justify-center text-orange-500 hover:bg-orange-100 transition-colors text-sm"
          >
            <EditOutlined />
          </button>
          <button
            onClick={() => onDelete(img)}
            className="w-7 h-7 rounded-lg bg-red-50 flex items-center justify-center text-red-400 hover:bg-red-100 transition-colors text-sm"
          >
            <DeleteOutlined />
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Skeleton ──────────────────────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
      <div className="h-44 bg-gray-200 animate-pulse" />
      <div className="px-3 py-2.5">
        <div className="h-3 w-16 bg-gray-200 animate-pulse rounded-full" />
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function Highlightsimages() {
  const [images, setImages] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [busy, setBusy] = useState(false);

  const fetchImages = async () => {
    try {
      const res = await api.get("/api/highlightsimages/getimages");

      setImages(res.data.data || []);
    } catch (error) {
      toast.error("Failed to load images", { transition: Zoom });
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await api.get("/api/products/allproducts");

      setProducts(res.data.products || []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchImages();
    fetchProducts();
  }, []);

  const handleAdd = async (fd) => {
    setBusy(true);
    try {
      const res = await api.post("/api/highlightsimages/addimages", fd);

      if (!res.data.success) throw new Error(res.data.message);

      toast.success("Image added successfully!", { transition: Zoom });
      setModalOpen(false);
      fetchImages();
    } catch (e) {
      toast.error(e.response?.data?.message || e.message, {
        transition: Zoom,
      });
    } finally {
      setBusy(false);
    }
  };

  const handleEdit = async (fd) => {
    setBusy(true);
    try {
      const res = await api.put(
        `/api/highlightsimages/editimages/${editTarget._id}`,
        fd,
      );

      if (!res.data.success) throw new Error(res.data.message);

      toast.success("Image updated successfully!", { transition: Zoom });
      setModalOpen(false);
      setEditTarget(null);
      fetchImages();
    } catch (e) {
      toast.error(e.response?.data?.message || e.message, {
        transition: Zoom,
      });
    } finally {
      setBusy(false);
    }
  };

  const handleDelete = async () => {
    setBusy(true);
    try {
      const res = await api.delete(
        `/api/highlightsimages/deleteimages/${deleteTarget._id}`,
      );

      if (!res.data.success) throw new Error(res.data.message);

      toast.success("Image deleted!", { transition: Zoom });
      setDeleteTarget(null);
      fetchImages();
    } catch (e) {
      toast.error(e.response?.data?.message || e.message, {
        transition: Zoom,
      });
    } finally {
      setBusy(false);
    }
  };

  const openAdd = () => {
    setEditTarget(null);
    setModalOpen(true);
  };

  const openEdit = (img) => {
    setEditTarget(img);
    setModalOpen(true);
  };

  const totalImages = images.length;

  return (
    <div className="min-h-screen min-w-screen p-6 md:p-8">
      {/* ── Top Bar ── */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="bold-22 font-anta text-center mb-5">
            HIGHLIGHT IMAGES
          </h1>
          <p className="text-sm text-gray-400 mt-0.5">
            {totalImages} image{totalImages !== 1 ? "s" : ""} across{" "}
          </p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 active:scale-95 text-white px-4 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-orange-200 transition-all"
        >
          <PlusOutlined />
          Add Image
        </button>
      </div>

      {/* ── Content ── */}
      {/* ── Content ── */}
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {Array.from({ length: 10 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : images.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <PictureOutlined className="text-6xl text-gray-200 mb-4" />
          <h3 className="text-lg font-semibold text-gray-400">No images yet</h3>
          <p className="text-sm text-gray-300 mb-6">
            Click "Add Image" to upload your first highlight image.
          </p>

          <button
            onClick={openAdd}
            className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-md shadow-orange-200 transition-colors"
          >
            <PlusOutlined /> Add Image
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {images.map((img) => (
            <ImageCard
              key={img._id}
              img={img}
              onEdit={openEdit}
              onDelete={setDeleteTarget}
            />
          ))}
        </div>
      )}

      {/* ── Add / Edit Modal ── */}
      <ImageFormModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditTarget(null);
        }}
        products={products}
        initial={editTarget}
        onSubmit={editTarget ? handleEdit : handleAdd}
        busy={busy}
      />

      {/* ── Delete Confirm ── */}
      <DeleteModal
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        busy={busy}
      />
    </div>
  );
}
