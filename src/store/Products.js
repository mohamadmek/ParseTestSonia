import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

const initialState = {
  products: []
};

const slice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts : (state, action) => {
      state.products = action.payload.products
    },
    deleteProduct: (state, action) => {
     state.products =  state.products.filter(product => product.objectId != action.payload.id);
    }
  }
})

export const { setProducts, deleteProduct } = slice.actions;
export default slice.reducer;