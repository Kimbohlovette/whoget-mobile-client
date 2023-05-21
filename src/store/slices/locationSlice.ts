import { createSlice } from '@reduxjs/toolkit';

export interface InitialState {
  locaitons: { title: string; id: string };
}
const initialState = {
  locations: [],
};
const locationSlice = createSlice({
  name: 'locations',
  initialState,
  reducers: {
    updateLocations: (state, action) => {
      state.locations = action.payload;
    },
  },
});

export const { updateLocations } = locationSlice.actions;
export default locationSlice.reducer;
