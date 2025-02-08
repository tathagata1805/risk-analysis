import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";

const ErrorBoundary = ({ children }) => {
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState(null);
  const [errorInfo, setErrorInfo] = useState(null);

  useEffect(() => {
    setHasError(false);
    setError(null);
    setErrorInfo(null);
  }, [children]);

  const handleError = (error, errorInfo) => {
    setHasError(true);
    setError(error);
    setErrorInfo(errorInfo);
  };

  // Catching errors via event listener
  useEffect(() => {
    const handleErrorEvent = (event) => {
      if (event.error) {
        handleError(event.error, event.errorInfo);
      }
    };

    window.addEventListener("error", handleErrorEvent);

    return () => {
      window.removeEventListener("error", handleErrorEvent);
    };
  }, []);

  if (hasError) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          color: "white",
          padding: "20px",
        }}
      >
        <Typography variant="h5" color="white" sx={{ marginBottom: 2 }}>
          Something went wrong. Please try again later.
        </Typography>

        <Typography variant="body1" color="white" sx={{ marginBottom: 2 }}>
          <strong>Error Message:</strong> {error?.message || "Unknown error"}
        </Typography>

        <Typography variant="body1" color="white" sx={{ marginBottom: 2 }}>
          <strong>Stack Trace:</strong>{" "}
          {errorInfo?.componentStack || "No stack trace available."}
        </Typography>
      </Box>
    );
  }

  return children;
};

export default ErrorBoundary;
