import { createSlice } from '@reduxjs/toolkit';
export interface InitialState {
  categories: { name: string; id: string }[];
}

const initialState = {
  categories: [],
};
const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    updateCategories: (state, action) => {
      state.categories = action.payload;
    },
  },
});

export default categorySlice.reducer;

export const { updateCategories } = categorySlice.actions;
