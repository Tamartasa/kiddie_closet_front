import React from "react";
import { Typography, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function ThankForShare() {
  const navigate = useNavigate();

  const handleGetAllItems = (event) => {
    event.preventDefault();
    navigate(`/items`);
  };

  const handleShareItem = (event) => {
    event.preventDefault();
    navigate("/shareitem");
  };
  return (
    <Box sx={{ textAlign: "center", marginTop: "60px" }}>
      <Typography variant="h4" gutterBottom>
        Thank you for sharing!
      </Typography>
      <Typography variant="body1">
        Your item has been successfully shared.
      </Typography>
      <Typography variant="body1">
        It will now be visible to others who are looking for second-hand kids
        items.
      </Typography>
      <Typography variant="h6">
        Thank you for contributing to our community!
      </Typography>

      <Box
        style={{ display: "flex" }}
        sx={{
          justifyContent: "center",
          marginTop: "100px",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={handleGetAllItems}
          sx={{ marginRight: "10px", borderRadius: "12px" }}
        >
          Find For You
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleShareItem}
          sx={{ marginLeft: "20px", borderRadius: "12px" }}
        >
          Share More
        </Button>
      </Box>
    </Box>
  );
}
