import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { updateProfile as updateProfileApi } from "./profileApi";

const initialState = {
  loading: false,
  error: null,
};

export const updateProfile = createAsyncThunk(
  "profile/updateProfile",
  async (data, thunkAPI) => {
    try {
      return await updateProfileApi(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to update profile",
      );
    }
  },
);

const profileSlice = createSlice({
  name: "profile",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(updateProfile.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(updateProfile.fulfilled, (state) => {
      state.loading = false;
    });

    builder.addCase(updateProfile.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default profileSlice.reducer;
