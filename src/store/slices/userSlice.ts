import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchOneUserById } from '../../apiService/fetchingFunctions';
export interface InitialState {
  isAuthenticated: boolean;
  user: any;
  status: 'loading' | 'idle' | 'failed' | 'successful';
}
const initialState: InitialState = {
  isAuthenticated: false,
  user: null,
  status: 'idle',
};
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateProfile: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
    },
    updateAuthStatus: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUserById.fulfilled, state => {
        state.status = 'idle';
      })
      .addCase(fetchUserById.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchUserById.rejected, state => {
        state.status = 'failed';
      });
  },
});

export const { updateProfile, updateAuthStatus } = userSlice.actions;

export default userSlice.reducer;

export const fetchUserById = createAsyncThunk(
  'users/user',
  async (userId: string, { dispatch }) => {
    fetchOneUserById(userId)
      .then(data => {
        dispatch(updateProfile(data));
      })
      .catch(error => {
        console.log('An error occured in fetch api: ', error);
        dispatch(updateProfile(null));
      });
  },
);
