import React, { useEffect, useState } from "react";
import axios from "axios";

// @mui material components
import Grid from "@mui/material/Grid";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";

// AI provider list
const aiProviders = [
  { label: "Google Gemini" },
  { label: "OpenAI" },
  { label: "Microsoft Azure AI" },
  { label: "Amazon Rekognition" },
];

function Loading({ imagePath, onResponseData }) {
  useEffect(() => {
    console.log("imagePath in Loading component:", imagePath);
    // Perform actions here, such as calling AI processing functions
  }, [imagePath]);  // Watch for imagePath changes

  const [selectedProvider, setSelectedProvider] = useState(null);
  const [loading, setLoading] = useState(false);
  const [responseData, setResponseData] = useState(null);

  const handleDetection = async () => {
    if (selectedProvider && imagePath) {
      setLoading(true);
      try {
        // Extract filename from imagePath
        const fileName = imagePath.split('/').pop(); // Assumes imagePath is a full path
        const modifiedImagePath = `data/receipts/${fileName}`;

        const response = await axios.post("/transactions/process-receipt_gemini", {
          provider: selectedProvider.label,
          imagePath: modifiedImagePath,
        });

        // Directly use the structured JSON response
        setResponseData(response.data.data);
        onResponseData(response.data.data);

      } catch (error) {
        console.error("Request failed:", error);
      } finally {
        setLoading(false);
      }
    } else {
      console.log("Please select an AI provider and ensure an image has been uploaded.");
    }
  };

  return (
    <MDBox>
      <MDTypography variant="h5">Select AI Provider</MDTypography>
      <Grid container spacing={3} mt={2}>
        <Grid item xs={12} md={6}>
          <Autocomplete
            options={aiProviders}
            getOptionLabel={(option) => option.label}
            value={selectedProvider}
            onChange={(event, newValue) => setSelectedProvider(newValue)}
            renderInput={(params) => (
              <MDInput
                {...params}
                label="Select AI Provider"
                variant="outlined"
                fullWidth
              />
            )}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <MDButton
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleDetection}
            disabled={!selectedProvider || loading || !imagePath}
          >
            {loading ? <CircularProgress size={24} /> : "Start Detection"}
          </MDButton>
        </Grid>
      </Grid>

      {responseData && (
        <Grid container spacing={3} mt={2}>
          <Grid item xs={12}>
            <MDTypography variant="h6">Detection Successful!</MDTypography>
          </Grid>
        </Grid>
      )}
    </MDBox>
  );
}

export default Loading;