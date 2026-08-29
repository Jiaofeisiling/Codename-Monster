import React, { useState, useEffect } from "react";
import useMediaQuery from '@mui/material/useMediaQuery';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  FormControlLabel,
  Checkbox,
  Box,
} from "@mui/material";
import MDButton from "components/MDButton";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

function FilterModal({ open, onClose, transactions, onFilter }) {
  const isMobile = useMediaQuery('(max-width:600px)');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [availableCategories, setAvailableCategories] = useState([]);

  useEffect(() => {
    // 从transactions中提取所有唯一的categories
    const categories = [...new Set(transactions.map(t => t.attributes.shop.category))];
    setAvailableCategories(categories);
  }, [transactions]);

  const handleCategoryChange = (category) => {
    setSelectedCategories(prev => {
      if (prev.includes(category)) {
        return prev.filter(c => c !== category);
      } else {
        return [...prev, category];
      }
    });
  };

  const handleApplyFilter = () => {
    onFilter(selectedCategories);
    onClose();
  };

  const handleClearFilter = () => {
    setSelectedCategories([]);
    onFilter([]);
    onClose();
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="sm" 
      fullWidth
      fullScreen={isMobile}
    >
      <DialogTitle>
        <MDTypography variant="h6">Filter by Category</MDTypography>
      </DialogTitle>
      <DialogContent>
        <MDBox mt={2}>
          <FormControl component="fieldset" sx={{ width: '100%' }}>
            <MDBox 
              display="flex" 
              flexDirection="column"
              gap={1}
            >
              {availableCategories.map((category) => (
                <FormControlLabel
                  key={category}
                  control={
                    <Checkbox
                      checked={selectedCategories.includes(category)}
                      onChange={() => handleCategoryChange(category)}
                      color="primary"
                    />
                  }
                  label={category}
                  sx={{
                    margin: 0,
                    '& .MuiFormControlLabel-label': {
                      fontSize: isMobile ? '0.875rem' : '1rem',
                    },
                  }}
                />
              ))}
            </MDBox>
          </FormControl>
        </MDBox>
      </DialogContent>
      <DialogActions>
        <Box 
          display="flex" 
          flexDirection={isMobile ? "column" : "row"} 
          justifyContent="space-between" 
          width="100%" 
          px={2} 
          pb={2}
          gap={2}
        >
          <MDButton 
            onClick={handleClearFilter} 
            color="error" 
            variant="outlined"
            fullWidth={isMobile}
          >
            Clear Filter
          </MDButton>
          <Box 
            display="flex" 
            flexDirection={isMobile ? "column" : "row"} 
            gap={2}
            width={isMobile ? "100%" : "auto"}
          >
            <MDButton 
              onClick={onClose} 
              color="secondary" 
              variant="outlined" 
              fullWidth={isMobile}
            >
              Cancel
            </MDButton>
            <MDButton 
              onClick={handleApplyFilter} 
              color="info" 
              variant="gradient"
              fullWidth={isMobile}
            >
              Apply Filter
            </MDButton>
          </Box>
        </Box>
      </DialogActions>
    </Dialog>
  );
}

export default FilterModal;
