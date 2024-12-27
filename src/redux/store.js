import { configureStore } from "@reduxjs/toolkit";
import dashboard from "./dashboardSlice.js";

export const store = configureStore({
  reducer: { dashboard },
});
