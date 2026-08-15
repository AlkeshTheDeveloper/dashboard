import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getExpenses,
  createExpense,
  updateExpense as updateExpenseApi,
} from "./expenseApi";

const initialState = {
  expenses: [],

  pagination: {
    page: 1,
    limit: 10,
    totalPages: 1,
    totalExpenses: 0,
  },

  filters: {
    search: "",
    category: "",
    paymentMethod: "",
    page: 1,
    limit: 10,
  },

  loading: false,
  error: null,
};

export const fetchExpenses = createAsyncThunk(
  "expense/fetchExpenses",
  async (params, thunkAPI) => {
    try {
      return await getExpenses(params);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch expenses",
      );
    }
  },
);

export const addExpense = createAsyncThunk(
  "expense/addExpense",
  async (data, thunkAPI) => {
    try {
      return await createExpense(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to create expense",
      );
    }
  },
);

export const updateExpense = createAsyncThunk(
  "expense/updateExpense",
  async ({ id, data }, thunkAPI) => {
    try {
      return await updateExpenseApi({
        id,
        data,
      });
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to update expense",
      );
    }
  },
);

export const deleteExpenses = createAsyncThunk(
  "expense/deleteExpense",
  async () => {},
);

const expenseSlice = createSlice({
  name: "expense",

  initialState,

  reducers: {
    setFilters(state, action) {
      state.filters = {
        ...state.filters,
        ...action.payload,
      };
    },

    resetFilters(state) {
      state.filters = initialState.filters;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addExpense.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(addExpense.fulfilled, (state) => {
      state.loading = false;
    });

    builder.addCase(addExpense.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(fetchExpenses.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(fetchExpenses.fulfilled, (state, action) => {
      state.loading = false;

      console.log("Payload:", action.payload);

      state.expenses = action.payload.expenses;
      state.pagination = action.payload.pagination;
    });

    builder.addCase(fetchExpenses.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(updateExpense.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(updateExpense.fulfilled, (state) => {
      state.loading = false;
    });

    builder.addCase(updateExpense.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { setFilters, resetFilters } = expenseSlice.actions;

export default expenseSlice.reducer;
