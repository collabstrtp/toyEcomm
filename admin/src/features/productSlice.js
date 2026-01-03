import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/api";

export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (productData, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      const response = await api.post("/api/products/addproduct", productData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const fetchAllProducts = createAsyncThunk(
  "products/fetchAllProducts",
  async () => {
    try {
      const response = await api.get("/api/products/allproducts");
      return response.data.products;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const fetchProductById = createAsyncThunk(
  "products/fetchProductById",
  async ({ id }) => {
    try {
      const response = await api.get(`/api/products/${id}`);
      console.log("Fetched product data:", response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const updateProduct = createAsyncThunk(
  "products/updateproduct",
  async ({ id, productData }, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.put(
        `/api/products/update/${id}`,
        productData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            // ❌ DO NOT set Content-Type manually
          },
        }
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Update failed");
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "products/deleteproduct",
  async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await api.delete(`/api/products/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const fetchProductsByCategory = createAsyncThunk(
  "products/fetchProductsByCategory",
  async (categoryName) => {
    try {
      const response = await axios.get(`/api/category/${categoryName}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    product: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
  builder
    .addCase(createProduct.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.products.push(action.payload.product);
    })

    .addCase(fetchAllProducts.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.products = action.payload;
    })

    .addCase(fetchProductById.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.product = action.payload.product;
    })

    .addCase(updateProduct.fulfilled, (state, action) => {
      state.status = "succeeded";
      const updatedProduct = action.payload.product;

      if (!Array.isArray(state.products)) {
        state.products = [];
        return;
      }

      const index = state.products.findIndex(
        (p) => p._id === updatedProduct._id
      );

      if (index !== -1) {
        state.products[index] = updatedProduct;
      }
    })

    .addCase(deleteProduct.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.products = state.products.filter(
        (p) => p._id !== action.payload.product._id
      );
    });
}

});

export default productSlice.reducer;
