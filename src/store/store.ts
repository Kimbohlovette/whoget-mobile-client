import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import askReducer from './slices/askSlice';
import categoryReducer from './slices/categorySlice';
import locationReducer from './slices/locationSlice';
export const store = configureStore({
  reducer: {
    user: userReducer,
    ask: askReducer,
    category: categoryReducer,
    location: locationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
