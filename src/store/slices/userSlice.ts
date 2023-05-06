import { createSlice } from '@reduxjs/toolkit';
export interface InitialState {
  isAuthenticated: boolean;
  user: any;
}
const initialState: InitialState = {
  isAuthenticated: true,
  user: null,
};
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
});

export const {} = userSlice.actions;

export default userSlice.reducer;
