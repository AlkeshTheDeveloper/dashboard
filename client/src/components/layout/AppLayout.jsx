import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const SIDEBAR_WIDTH = 30;

const AppLayout = () => {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <Navbar />

      <Sidebar />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          minWidth: 0,
          ml: {
            xs: 0,
            md: `${SIDEBAR_WIDTH}px`,
          },
          width: {
            xs: "100%",
            md: `calc(100% - ${SIDEBAR_WIDTH}px)`,
          },
          pt: {
            xs: 8,
            md: 9,
          },
          px: {
            xs: 2,
            sm: 3,
            md: 4,
          },
          pb: 4,
          boxSizing: "border-box",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default AppLayout;