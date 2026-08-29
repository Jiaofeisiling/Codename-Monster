import React, { useState, useReducer } from "react";
import { Box, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from "@mui/material";
import { Close, Edit } from "@mui/icons-material";
import Header from "./Header";
import ReceiptSection from "./ReceiptSection";
import TransactionDetails from "../TransactionDetails";
import ProductTable from "../ProductTable";
import MDButton from "components/MDButton";
import ViewAndEditTransaction from "./ViewAndEditTransaction";

//############################################################################
//############################################################################

// Reducer to manage the transaction state
const transactionReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_PRODUCT':
      const updatedProducts = state.products.map((product, index) =>
        index === action.index ? { ...product, [action.field]: action.value } : product
      );
      if (action.field === 'quantity' || action.field === 'unitPrice') {
        updatedProducts[action.index].totalPrice = updatedProducts[action.index].quantity * updatedProducts[action.index].unitPrice;
      }
      return { ...state, products: updatedProducts };

    case 'DELETE_PRODUCT':
      const filteredProducts = state.products.filter((_, index) => index !== action.index);
      return { ...state, products: filteredProducts };

    case 'ADD_PRODUCT':
      return { ...state, products: [...state.products, { name: "", quantity: 1, unitPrice: 0, totalPrice: 0 }] };

    case 'SET_TRANSACTION':
      return action.transaction;

    default:
      return state;
  }
};

const DetailPageModal = ({ open, onClose, transaction, onDelete, onEdit }) => {
  // 如果 transaction 为 null 或 undefined，直接返回 null，避免调用 Hook
  if (!transaction) return null;
  console.log(transaction);
  // console.log(transaction.attributes.image_path);

  // 安全地调用 useState 和 useReducer
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [isEditMode, setIsEditMode] = useState(false);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [state, dispatch] = useReducer(transactionReducer, transaction);

  // Handle save
  const handleSave = () => {
    console.log("Transaction Saved:", state);
    setIsEditMode(false);
  };

  // Handle cancel
  const handleCancel = () => {
    dispatch({ type: 'SET_TRANSACTION', transaction });
    setIsEditMode(false);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        style: {
          backgroundColor: '#eff2f5',
        },
      }}
    >
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <span>Transaction Details</span>
          <IconButton onClick={onClose}><Close /></IconButton>
        </Box>
      </DialogTitle>

      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2}>
          <Header
            shopName={state.attributes.shop.name}
            total_price={state.attributes.total_price}
            category={state.attributes.shop.category}
            user={state.attributes.user}
            onEdit={onEdit}
          />

          {/*<TransactionDetails*/}
          {/*  isEditMode={isEditMode}*/}
          {/*  transactionData={state}*/}
          {/*  setTransactionData={(data) => dispatch({ type: 'SET_TRANSACTION', transaction: data })}*/}
          {/*/>*/}

          <ViewAndEditTransaction initialData={transaction.attributes} file={transaction.attributes.image_path}/>



          {/*<ProductTable*/}
          {/*  isEditMode={isEditMode}*/}
          {/*  products={state.attributes.products}*/}
          {/*  setProducts={(updatedProducts) => dispatch({ type: 'SET_TRANSACTION', transaction: { ...state, products: updatedProducts } })}*/}
          {/*/>*/}

          {/*<ReceiptSection receipt={state.receipt} />*/}

          {/*<DialogActions>*/}
          {/*  {isEditMode ? (*/}
          {/*    <>*/}
          {/*      <MDButton onClick={handleCancel} color="secondary">Cancel</MDButton>*/}
          {/*      <MDButton onClick={handleSave} variant="gradient" color="success">Save</MDButton>*/}
          {/*    </>*/}
          {/*  ) : (*/}
          {/*    <MDButton startIcon={<Edit />} onClick={() => setIsEditMode(true)} variant="gradient" color="primary">*/}
          {/*      Edit*/}
          {/*    </MDButton>*/}
          {/*  )}*/}
          {/*</DialogActions>*/}


        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default DetailPageModal;
