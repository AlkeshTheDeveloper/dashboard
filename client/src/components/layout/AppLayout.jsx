import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const SIDEBAR_WIDTH = 240;

const AppLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prev) => !prev);
  };

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        width: "100%",
        overflowX: "hidden",
      }}
    >
      <Navbar onMenuClick={handleDrawerToggle} />

      <Sidebar mobileOpen={mobileOpen} onClose={handleDrawerToggle} />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          minWidth: 0,
          width: "100%",
          boxSizing: "border-box",

          ml: {
            xs: 0,
            md: `${SIDEBAR_WIDTH}px`,
          },

          pt: {
            xs: "72px",
            md: "80px",
          },

          px: {
            xs: 1.5,
            sm: 3,
            md: 4,
          },

          pb: 4,
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default AppLayout;
