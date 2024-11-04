// reduxToolKit/store.ts
import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth/authSlice";
import registrationSlice from "../reduxToolKit/registration/registrationSlice";
import branchSlice from "../reduxToolKit/branch/branchSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    registration: registrationSlice,
    branch: branchSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Create a typed version of useDispatch and useSelector
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
