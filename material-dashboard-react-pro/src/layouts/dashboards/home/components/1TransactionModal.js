import React, { useState } from "react";
import PropTypes from "prop-types";

// Material Dashboard 2 PRO Components
import MDButton from "components/MDButton";

// Material-UI Components
import { Dialog, DialogTitle, DialogContent, DialogActions, IconButton } from "@mui/material";

// Icons
import CloseIcon from "@mui/icons-material/Close";

// Sub-components
import TransactionDetails from "./TransactionDetails";
import ProductTable from "./ProductTable";

const TransactionModal = ({ open, onClose, transaction }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [transactionData, setTransactionData] = useState(transaction);

  // Handle save
  const handleSave = () => {
    console.log("Transaction Saved:", transactionData);
    setIsEditMode(false);
  };

  // Handle cancel
  const handleCancel = () => {
    setTransactionData(transaction);
    setIsEditMode(false);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      {/* Modal Header */}
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

      {/* Modal Content */}
      <DialogContent dividers>
        {/* Transaction Details */}
        <TransactionDetails
          isEditMode={isEditMode}
          transactionData={transactionData}
          setTransactionData={setTransactionData}
        />

        {/* Product Table */}
        <ProductTable
          isEditMode={isEditMode}
          products={transactionData.products}
          setProducts={(updatedProducts) =>
            setTransactionData({ ...transactionData, products: updatedProducts })
          }
        />
      </DialogContent>

      {/* Modal Actions */}
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
