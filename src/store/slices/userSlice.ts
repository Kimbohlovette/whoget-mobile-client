import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    isAuthenticated: true,
    user: null,
  },
  reducers: {},
});

export const {} = userSlice.actions;

export default userSlice.reducer;
