import { Box, Button, TextField } from "@mui/material";
import React from "react";

const Search = ({ searchTerm, setSearchTerm, handleSearch, loading }) => {
  return (
    <Box mb={3} sx={{ textAlign: "center" }}>
      <TextField
        label="Enter Address"
        variant="outlined"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{
          width: 300,
          backgroundColor: "white",
          borderRadius: 2,
          marginRight: 2,
        }}
      />
      <Button
        onClick={handleSearch}
        variant="contained"
        sx={{ backgroundColor: "blue" }}
        disabled={loading}
      >
        {loading ? "Fetching" : "Fetch"}
      </Button>
    </Box>
  );
};

export default Search;
