import React from "react";
import PropTypes from "prop-types";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";

import { Grid } from "@mui/material";

// 交易详情组件
// Transaction details component
const TransactionDetails = ({ isEditMode, transactionData, setTransactionData }) => {
  // 返回交易详情组件
  // Return transaction details component
  return (
    <MDBox mb={3}>
      {/* 使用Grid布局组件进行布局 */}
      {/* Use Grid layout component for layout */}
      <Grid container spacing={2}>
        {/* 商店名称 */}
        {/* Shop Name */}
        <Grid item xs={6}>
          <MDTypography variant="subtitle1">Shop Name:</MDTypography>
          {/* 编辑模式下显示输入框，否则显示文本 */}
          {/* Display input box in edit mode, otherwise display text */}
          {isEditMode ? (
            <MDInput
              fullWidth
              value={transactionData.attributes.shop.name}
              onChange={(e) =>
                setTransactionData({ ...transactionData, shopName: e.target.value })
              }
              placeholder="Enter Shop Name"
            />
          ) : (
            <MDTypography>{transactionData.attributes.shop.name}</MDTypography>
          )}
        </Grid>
        {/* 日期 */}
        {/* Date */}
        <Grid item xs={6}>
          <MDTypography variant="subtitle1">Date:</MDTypography>
          {/* 编辑模式下显示日期选择器，否则显示文本 */}
          {/* Display date picker in edit mode, otherwise display text */}
          {isEditMode ? (
            <MDInput
              fullWidth
              type="date"
              value={transactionData.attributes.transaction_time}
              onChange={(e) =>
                setTransactionData({ ...transactionData, date: e.target.value })
              }
            />
          ) : (
            <MDTypography>{transactionData.attributes.transaction_time}</MDTypography>
          )}
        </Grid>
      </Grid>
    </MDBox>
  );
};

// 定义组件属性类型
// Define component prop types
TransactionDetails.propTypes = {
  isEditMode: PropTypes.bool.isRequired,
  transactionData: PropTypes.object.isRequired,
  setTransactionData: PropTypes.func.isRequired,
};

export default TransactionDetails;