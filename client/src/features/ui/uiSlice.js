import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  snackbar: {
    open: false,
    message: "",
    severity: "success",
  },
};

const uiSlice = createSlice({
  name: "ui",

  initialState,

  reducers: {
    showSnackbar: (state, action) => {
      state.snackbar = {
        open: true,
        message: action.payload.message,
        severity: action.payload.severity || "success",
      };
    },

    hideSnackbar: (state) => {
      state.snackbar.open = false;
    },
  },
});

export const { showSnackbar, hideSnackbar } = uiSlice.actions;

export default uiSlice.reducer;
