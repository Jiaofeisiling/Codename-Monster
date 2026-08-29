import React from "react";
import { ListItem, ListItemAvatar, Avatar, IconButton, Tooltip } from "@mui/material";
import { Icon } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

const TransactionCard = ({ transaction, onOpenDetail }) => {
  return (
    <ListItem
      divider
      sx={{
        width: "100%",
        minWidth: "800px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        py: 2,
      }}
    >
      {/* 左侧：图标和文本 */}
      <MDBox display="flex" alignItems="center" flex="1">
        <ListItemAvatar>
          <Avatar sx={{ bgcolor: "primary.light" }}>
            <Icon>{transaction.icon}</Icon>
          </Avatar>
        </ListItemAvatar>
        <MDBox>
          <MDTypography variant="body1" noWrap>
            {transaction.attributes.shop.name}
          </MDTypography>
          <MDTypography variant="caption" color="textSecondary">
            {transaction.attributes.shop.category}
          </MDTypography>
        </MDBox>
      </MDBox>

      {/* 金额 */}
      <MDTypography
        variant="h3"
        color="error"
        sx={{
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        -${Math.abs(transaction.attributes.total_price).toFixed(2)}
      </MDTypography>

      {/* More actions button */}
      <Tooltip title="More actions" placement="top">
        <IconButton onClick={() => onOpenDetail(transaction)}>
          <Icon>more_vert</Icon>
        </IconButton>
      </Tooltip>
    </ListItem>
  );
};

export default TransactionCard;
