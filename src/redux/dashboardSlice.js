import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

/**
 * Fetch weather data using Open-Meteo API
 *
 * This asynchronous function fetches historical weather data based on latitude, longitude, start date, and end date.
 * It caches responses to minimize redundant API calls and improve performance.
 *
 * Parameters:
 * @param {Object} params - Object containing latitude, longitude, startDate, and endDate.
 * @param {string} params.latitude - Latitude coordinate.
 * @param {string} params.longitude - Longitude coordinate.
 * @param {string} params.startDate - Start date for the weather data.
 * @param {string} params.endDate - End date for the weather data.
 *
 * @param {Object} thunkApi - Thunk API object for handling errors.
 *
 * Returns:
 * @returns {Object} Weather data report containing daily temperature metrics.
 * @throws {Error} Error message in case of failure.
 */

// setting up cache mechanism
const cache = {};

export const fetchWeatherData = createAsyncThunk(
  "dashboard/fetchWeatherData",
  async ({ latitude, longitude, startDate, endDate }, thunkApi) => {
    try {
      const params = {
        latitude: latitude,
        longitude: longitude,
        start_date: startDate,
        end_date: endDate,
        daily:
          "temperature_2m_max,temperature_2m_min,temperature_2m_mean,apparent_temperature_max,apparent_temperature_min,apparent_temperature_mean",
        timezone: "auto",
      };

      const key = `${latitude}-${longitude}-${startDate}-${endDate}-`;
      if (cache[key]) {
        return cache[key];
      }

      // if new request
      const resp = await axios.get(
        "https://archive-api.open-meteo.com/v1/archive",
        {
          params,
        }
      );

      const data = resp.data.daily.time.map((time, index) => {
        return {
          time,
          apparentTempMax: resp.data.daily.apparent_temperature_max[index],
          apparentTempMin: resp.data.daily.apparent_temperature_min[index],
          apparentTempMean: resp.data.daily.apparent_temperature_mean[index],
          temp2MMax: resp.data.daily.temperature_2m_max[index],
          temp2MMin: resp.data.daily.temperature_2m_min[index],
          temp2MMean: resp.data.daily.temperature_2m_mean[index],
        };
      });

      const units = resp.data.daily_units;

      cache[key] = { data, units };

      return { data, units };
    } catch (error) {
      console.error(error);
      if (error.response) {
        return thunkApi.rejectWithValue(
          `Weather data could not be retrieved. Server responded with status: ${error.response.status}`
        );
      } else if (error.request) {
        return thunkApi.rejectWithValue(
          `Weather data could not be retrieved. No response from server. Try again later!`
        );
      } else {
        return thunkApi.rejectWithValue(
          `Weather data could not be retrieved. Something went wrong!`
        );
      }
    }
  }
);

const INITIAL_STATE = {
  data: null,
  loading: false,
  error: false,
  currentPage: 1,
  rowsPerPage: 10,
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: INITIAL_STATE,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setRowsPerPage: (state, action) => {
      state.rowsPerPage = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchWeatherData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchWeatherData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchWeatherData.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      }),
});

export default dashboardSlice.reducer;
export const { setCurrentPage, setRowsPerPage } = dashboardSlice.actions;
export const dashboardSelector = (state) => state.dashboard;
