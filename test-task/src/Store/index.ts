import { combineReducers, configureStore } from "@reduxjs/toolkit";
import photosSlice from "./photosSlice";

const rootReducer = combineReducers({
  photos: photosSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
