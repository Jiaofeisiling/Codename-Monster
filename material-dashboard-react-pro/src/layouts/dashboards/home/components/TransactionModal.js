// TransactionModal.jsx
import React, { useState } from "react";
import PropTypes from "prop-types";

// Material Dashboard 2 PRO Components

import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";

// Material Dashboard 2 React Examples
import DataTable from "examples/Tables/ProductTable";

// Material-UI Components
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Grid,
} from "@mui/material";

// Material-UI Icons
import CloseIcon from "@mui/icons-material/Close";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";

// Subcomponents
import TransactionDetails from "./TransactionDetails";
import ProductTable from "./ProductTable";
import Header from "./detailModal/Header";

const TransactionModal = ({ open, onClose, transaction }) => {
  if (!transaction) return null;
  console.log(transaction);

  const [isEditMode, setIsEditMode] = useState(false);
  const [transactionData, setTransactionData] = useState(transaction);

  const handleSave = () => {
    console.log("Transaction Saved:", transactionData);
    setIsEditMode(false);
  };

  const handleCancel = () => {
    setTransactionData(transaction);
    setIsEditMode(false);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">

      <DialogTitle>
        {isEditMode ? "Edit Transaction" : "Transaction Details"}
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
      <Header
        shopName={transaction.attributes.shop.name}
        total_price={transaction.attributes.total_price}
        category={transaction.attributes.shop.category}
        user={transaction.attributes.user}
      />
        </DialogContent>
      <DialogContent dividers>
        <TransactionDetails
          isEditMode={isEditMode}
          transactionData={transactionData}
          setTransactionData={setTransactionData}
        />

        {/*<DataTable*/}
        {/*  table={{*/}
        {/*    columns: [*/}
        {/*      { Header: "Item", accessor: "item", width: "55%" },*/}
        {/*      { Header: "Quantity", accessor: "quantity", width: "13%" },*/}
        {/*      { Header: "Unit Price", accessor: "unit_price", width: "14% "},*/}
        {/*      { Header: "Total Price", accessor: "total_price", width: "15%" },*/}
        {/*    ],*/}
        {/*    rows: [*/}
        {/*      {*/}
        {/*        item: "NZ BEEF PREMIUM MINCE",*/}
        {/*        quantity: 1,*/}
        {/*        unit_price: 8,*/}
        {/*        total_price: 8,*/}
        {/*      },*/}
        {/*      {*/}
        {/*        item: "Apples",*/}
        {/*        quantity: 5,*/}
        {/*        unit_price: 1.0,*/}
        {/*        total_price: 5.0,*/}
        {/*      },*/}
        {/*      {*/}
        {/*        item: "Milk",*/}
        {/*        quantity: 1,*/}
        {/*        unit_price: 3.0,*/}
        {/*        total_price: 3,*/}
        {/*      }*/}
        {/*    ]*/}
        {/*  }}*/}
        {/*/>*/}

        <ProductTable
          isEditMode={isEditMode}
          products={transactionData.attributes.products}
          setProducts={(updatedProducts) =>
            setTransactionData({ ...transactionData, products: updatedProducts })
          }
        />
      </DialogContent>

      <DialogActions>
        {isEditMode ? (
          <>
            <MDButton onClick={handleCancel} color="secondary">
              Cancel
            </MDButton>
            <MDButton onClick={handleSave} variant="gradient" color="success">
              Save
            </MDButton>
          </>
        ) : (
          <MDButton
            onClick={() => setIsEditMode(true)}
            variant="gradient"
            color="primary"
          >
            Edit
          </MDButton>
        )}
      </DialogActions>
    </Dialog>
  );
};

TransactionModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  transaction: PropTypes.object.isRequired,
};

export default TransactionModal;