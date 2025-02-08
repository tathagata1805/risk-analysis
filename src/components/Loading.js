import { Box, CircularProgress, Typography } from "@mui/material";
import React from "react";

const Loading = () => {
  return (
    <Box sx={{ textAlign: "center", color: "white" }}>
      <CircularProgress />
      <Typography variant="h6">Analysing Data...</Typography>
    </Box>
  );
};

export default Loading;
