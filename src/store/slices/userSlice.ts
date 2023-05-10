import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchOneUserById } from '../../apiService/fetchingFunctions';
export interface InitialState {
  isAuthenticated: boolean;
  user: any;
  status: 'loading' | 'idle' | 'failed';
}
const initialState: InitialState = {
  isAuthenticated: true,
  user: null,
  status: 'idle',
};
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchUserById.fulfilled, state => {
        state.status = 'idle';
      })
      .addCase(fetchUserById.pending, state => {
        state.status = 'loading';
        console.log(state.status);
      })
      .addCase(fetchUserById.rejected, state => {
        state.status = 'failed';
        console.log('failed');
      });
  },
});

export const {} = userSlice.actions;

export default userSlice.reducer;

export const fetchUserById = createAsyncThunk(
  'users/user',
  async (userId: string) => {
    fetchOneUserById(userId)
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.log(error);
      });
  },
);
