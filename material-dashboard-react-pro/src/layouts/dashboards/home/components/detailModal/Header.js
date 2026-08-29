import React from "react";
import { Box, Typography, IconButton, Avatar, styled, Icon } from "@mui/material";
import { Edit } from "@mui/icons-material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";

import new_world from "assets/images/icons/groceries/new_world.png";
import { blue } from "@mui/material/colors";

const StyledAvatar = styled(MDAvatar)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  width: 56,
  height: 56,
  fontSize: "1.5rem",
  fontWeight: "bold",
}));

const StyledCategory = styled(MDTypography)(({ theme }) => ({
  backgroundColor: "#bbdefb",
  padding: theme.spacing(0.5, 2),
  borderRadius: 16,
  marginTop: theme.spacing(1),
  variant: "h4",
  color: theme.palette.info.main,
  fontWeight: "bold"
}));

const Header = ({ shopName, total_price, category, user, onEdit }) => {
  return (
    <Box display="flex" justifyContent="space-between" alignItems="center" p={2} sx={{ backgroundColor: "background.paper", borderRadius: 2, boxShadow: 1 }}>
      <Box display="flex" alignItems="center" gap={2}>
      <StyledAvatar src={new_world} />
        <Box>
          <Typography variant="h6" noWrap fontWeight="bold" color="text.primary">
            {shopName}
        </Typography>
          <Typography variant="caption" color="text.secondary">
            Created by FRANKLIN
          </Typography>
          {/* <Typography variant="caption" color="text.secondary">
            Created by {user}
          </Typography> */}
      </Box>
    </Box>
      <Box display="flex" flexDirection="column" alignItems="flex-end">
        <Typography variant="h4" color="error" fontWeight="bold">
          -${total_price.toFixed(2)}
        </Typography>
        <StyledCategory variant="body2">
          {category}
        </StyledCategory>
      </Box>
      {/*<IconButton onClick={onEdit} sx={{ color: "primary.main" }}>*/}
      {/*  <Edit />*/}
      {/*</IconButton>*/}
    </Box>
  );
};

export default Header;
