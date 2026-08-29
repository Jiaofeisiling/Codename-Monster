import React from "react";
import PropTypes from "prop-types";

// Material-UI Components
import { TableRow, TableCell, IconButton } from "@mui/material";

// Icons
import DeleteIcon from "@mui/icons-material/Delete";

// Material Dashboard 2 PRO Components
import MDInput from "components/MDInput";

const ProductRow = ({ index, product, isEditMode, updateProduct, deleteProduct }) => {
  return (
    <TableRow>
      <TableCell>
        {isEditMode ? (
          <MDInput
            fullWidth
            value={product.name}
            onChange={(e) => updateProduct(index, "name", e.target.value)}
            placeholder="Enter Item Name"
          />
        ) : (
          product.name
        )}
      </TableCell>
      <TableCell>
        {isEditMode ? (
          <MDInput
            type="number"
            value={product.quantity}
            onChange={(e) => updateProduct(index, "quantity", Number(e.target.value))}
          />
        ) : (
          product.quantity
        )}
      </TableCell>
      <TableCell>
        {isEditMode ? (
          <MDInput
            type="number"
            value={product.unit_price}
            onChange={(e) => updateProduct(index, "unitPrice", Number(e.target.value))}
          />
        ) : (
          `$${product.unit_price.toFixed(2)}`
        )}
      </TableCell>
      <TableCell>${(product.quantity * product.unit_price).toFixed(2)}</TableCell>
      {isEditMode && (
        <TableCell>
          <IconButton color="error" onClick={() => deleteProduct(index)}>
            <DeleteIcon />
          </IconButton>
        </TableCell>
      )}
    </TableRow>
  );
};

ProductRow.propTypes = {
  index: PropTypes.number.isRequired,
  product: PropTypes.object.isRequired,
  isEditMode: PropTypes.bool.isRequired,
  updateProduct: PropTypes.func.isRequired,
  deleteProduct: PropTypes.func.isRequired,
};

export default ProductRow;
