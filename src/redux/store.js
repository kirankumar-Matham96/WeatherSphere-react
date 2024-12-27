import { configureStore } from "@reduxjs/toolkit";
import dashboardReducer from "./dashboardSlice.js";

export const store = configureStore({
  reducer: { dashboard: dashboardReducer },
});
