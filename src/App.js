import React, { useState } from "react";
import { Box, Typography, Grid } from "@mui/material";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { API_DATA } from "./data/data";
import Loading from "./components/Loading";
import Search from "./components/Search";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [riskData, setRiskData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = () => {
    setLoading(true);
    setTimeout(() => {
      const foundData = API_DATA.find(
        (item) => item.source_address === searchTerm
      );
      setRiskData(foundData);
      setLoading(false);
    }, 2000); // Simulating loading time
  };

  return (
    <Box
      sx={{
        backgroundSize: "cover",
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        color: "white",
      }}
    >
      {/* Page Title */}
      <Typography variant="h3" color="white" gutterBottom>
        Risk Analysis
      </Typography>

      {/* Search Input */}
      <Search
        setSearchTerm={setSearchTerm}
        searchTerm={searchTerm}
        handleSearch={handleSearch}
        loading={loading}
      />

      {/* Loading Indicator */}
      {loading && <Loading />}

      {/* Risk Data Display */}
      {riskData && !loading && riskData.length > 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {/* Address, Risk Level, and Risk Score */}
          <Box
            sx={{
              textAlign: "center",
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              padding: 3,
              borderRadius: 2,
              marginBottom: 4,
              width: "100%",
              maxWidth: "600px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <Typography variant="h5" color="white">
              Address: {riskData.source_address}
            </Typography>
            <Typography
              variant="h6"
              color={riskData.risk === "Highly Risky" ? "red" : "green"}
            >
              Risk Level: {riskData.risk}
            </Typography>
            <Typography variant="h6">
              Risk Score: {riskData.risk_score}
            </Typography>
          </Box>

          {/* Displaying Level-wise Risk Analysis and Charts */}
          <Grid
            container
            spacing={3}
            justifyContent="center"
            sx={{ width: "100%" }}
          >
            {riskData.level_vise_risk_analysis.map((levelData) => (
              <Grid
                item
                xs={12}
                key={levelData.level}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                <Box
                  sx={{
                    backgroundColor: "rgba(0, 0, 0, 0.8)",
                    padding: 3,
                    borderRadius: 2,
                    width: "95%",
                    marginBottom: 3,
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                  }}
                >
                  <Typography variant="h6" color="white">
                    Level {levelData.level} Risk Percentage:{" "}
                    {levelData.risk_percentage}
                  </Typography>
                  <Typography variant="body1" color="white">
                    Risky Entities: {levelData.risky_entities_count}
                  </Typography>
                  <Typography variant="body1" color="white">
                    Non-risky Entities: {levelData.non_risky_entities_count}
                  </Typography>

                  {/* Risk Data Chart */}
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart
                      data={levelData.payer_details.map((item) => ({
                        date: item.date,
                        amount: item.amount,
                      }))}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="amount" stroke="#8884d8" />
                    </LineChart>
                  </ResponsiveContainer>
                </Box>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      ) : (
        <>
          <Typography variant="h6" color="white" gutterBottom>
            No Data Found! Try modifying the search term!
          </Typography>
        </>
      )}
    </Box>
  );
};

export default App;
