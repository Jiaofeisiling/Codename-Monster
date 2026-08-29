import React from "react";
import { Box, Button, Typography } from "@mui/material";

const ReceiptSection = ({ receipt }) => {
  return (
    <Box>
      <Button variant="text" sx={{ textTransform: "none" }}>
        View Receipt
      </Button>
      <Typography variant="caption" color="success.main">
        {/*{receipt.status}*/}
      </Typography>
      <Button variant="outlined" sx={{ mt: 2 }}>
        + Additional Receipt
      </Button>
    </Box>
  );
};

export default ReceiptSection;
