import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getDashboard } from "./dashboardApi";

const initialState = {
  summary: null,
  categoryBreakdown: [],
  monthlyTrend: [],
  recentExpenses: [],
  loading: false,
  error: null,
};

export const fetchDashboard = createAsyncThunk(
  "dashboard/fetchDashboard",
  async (year, thunkAPI) => {
    try {
      return await getDashboard(year);
    }catch (error) {
  console.log("Dashboard Error:", error);
  console.log("Response:", error.response);
  console.log("Data:", error.response?.data);

  return thunkAPI.rejectWithValue(
    error.response?.data?.message || error.message
  );
}
  },
);

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(fetchDashboard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchDashboard.fulfilled, (state, action) => {
        state.loading = false;

        state.summary = action.payload.summary;
        state.categoryBreakdown = action.payload.categoryBreakdown;
        state.monthlyTrend = action.payload.monthlyTrend;
        state.recentExpenses = action.payload.recentExpenses;
      })

      .addCase(fetchDashboard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default dashboardSlice.reducer;
