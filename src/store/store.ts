import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import askReducer from './slices/askSlice';
export const store = configureStore({
  reducer: {
    user: userReducer,
    ask: askReducer,
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
