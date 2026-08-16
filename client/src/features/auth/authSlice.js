import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/axios";

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.response?.data?.error ||
          "Login failed. Please check your credentials.",
      );
    }
  },
);

/* =========================
   REGISTER
========================= */

export const register = createAsyncThunk(
  "auth/register",
  async ({ firstName, lastName, email, password }, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/register", {
        firstName,
        lastName,
        email,
        password,
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.response?.data?.error ||
          "Registration failed. Please try again.",
      );
    }
  },
);

/* =========================
   INITIAL STATE
========================= */

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

/* =========================
   SLICE
========================= */

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.error = null;
    },

    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
    },

    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },

  extraReducers: (builder) => {
    /* =========================
       LOGIN
    ========================== */

    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;

        // Backend response:
        // response.data.data.token
        // response.data.data.user

        state.user = action.payload.data.user;
        state.token = action.payload.data.token;
        state.isAuthenticated = true;
        state.error = null;
      })

      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Login failed";
      });

    /* =========================
       REGISTER
    ========================== */

    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(register.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })

      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Registration failed";
      });
  },
});

export const { setCredentials, logout, setLoading } = authSlice.actions;

export default authSlice.reducer;
