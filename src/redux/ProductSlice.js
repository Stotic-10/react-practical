import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = "http://localhost:3000/product";


// Async Thunks
export const fetchProducts = createAsyncThunk("products/fetch", async () => {
    const response = await axios.get(API_URL);
    return response.data;
});

export const addProduct = createAsyncThunk("products/add", async (product) => {
    const response = await axios.post(API_URL, product);
    return response.data;
});

export const updateProduct = createAsyncThunk("products/update", async (product) => {
    const response = await axios.put(`${API_URL}/${product.id}`, product);
    return response.data;
});

export const deleteProduct = createAsyncThunk("products/delete", async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    return id;
});

// Slice
const productsSlice = createSlice({
    name: 'products',
    initialState: { products: [], loading: false },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.products = action.payload;
                state.loading = false;
            })
            .addCase(addProduct.fulfilled, (state, action) => {
                state.products.push(action.payload);
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                const index = state.products.findIndex(p => p.id === action.payload.id);
                if (index !== -1) state.products[index] = action.payload;
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.products = state.products.filter(product => product.id !== action.payload);
            });
    },
});

export default productsSlice.reducer;
