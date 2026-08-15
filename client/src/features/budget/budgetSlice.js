import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { getBudget, saveBudget as saveBudgetApi } from "./budgetApi";

const currentDate = new Date();

const initialState = {
  budget: null,

  month: currentDate.getMonth() + 1,

  year: currentDate.getFullYear(),

  loading: false,

  saving: false,

  error: null,
};

export const fetchBudget = createAsyncThunk(
  "budget/fetchBudget",
  async ({ month, year }, thunkAPI) => {
    try {
      return await getBudget({
        month,
        year,
      });
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch budget",
      );
    }
  },
);

export const saveBudget = createAsyncThunk(
  "budget/saveBudget",
  async (data, thunkAPI) => {
    try {
      return await saveBudgetApi(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to save budget",
      );
    }
  },
);

const budgetSlice = createSlice({
  name: "budget",

  initialState,

  reducers: {
    setBudgetMonth: (state, action) => {
      state.month = action.payload.month;
      state.year = action.payload.year;
    },
  },

  extraReducers: (builder) => {
    // FETCH
    builder.addCase(fetchBudget.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(fetchBudget.fulfilled, (state, action) => {
      state.loading = false;
      state.budget = action.payload;
    });

    builder.addCase(fetchBudget.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // SAVE
    builder.addCase(saveBudget.pending, (state) => {
      state.saving = true;
      state.error = null;
    });

    builder.addCase(saveBudget.fulfilled, (state, action) => {
      state.saving = false;

      state.budget = {
        ...state.budget,
        ...action.payload,
      };
    });

    builder.addCase(saveBudget.rejected, (state, action) => {
      state.saving = false;
      state.error = action.payload;
    });
  },
});

export const { setBudgetMonth } = budgetSlice.actions;

export default budgetSlice.reducer;
