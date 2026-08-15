import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/Login/Login";
import Dashboard from "../pages/Dashboard/Dashboard";
import Expenses from "../pages/Expenses/Expenses";
import Budget from "../pages/Budget/Budget";
import Profile from "../pages/Profile/Profile";

import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import AppLayout from "../components/layout/AppLayout";

const AppRoutes = () => {
  return (
    <BrowserRouter basename="/dashboard">
      <Routes>
        {/* =========================
            PUBLIC ROUTES
        ========================== */}

        <Route
          path="/"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        {/* =========================
            PROTECTED ROUTES
            All pages use AppLayout
        ========================== */}

        <Route
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/expenses" element={<Expenses />} />

          <Route path="/budget" element={<Budget />} />

          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;