import React from "react";
import PropTypes from "prop-types";

// Material-UI Components
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

// Material Dashboard 2 PRO Components
import MDButton from "components/MDButton";

// Sub-components
import ProductRow from "./ProductRow";

const ProductTable = ({ isEditMode, products, setProducts }) => {
  // Add new product
  const addProduct = () => {
    setProducts([
      ...products,
      { name: "", quantity: 1, unitPrice: 0, totalPrice: 0 },
    ]);
  };

  // Update product details
  const updateProduct = (index, field, value) => {
    const updatedProducts = [...products];
    updatedProducts[index][field] = value;

    // Update total price for the product
    if (field === "quantity" || field === "unitPrice") {
      updatedProducts[index].totalPrice =
        updatedProducts[index].quantity * updatedProducts[index].unitPrice;
    }

    setProducts(updatedProducts);
  };

  // Delete product
  const deleteProduct = (index) => {
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Item</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Unit Price</TableCell>
              <TableCell>Total Price</TableCell>
              {isEditMode && <TableCell>Actions</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product, index) => (
              <ProductRow
                key={index}
                index={index}
                product={product}
                isEditMode={isEditMode}
                updateProduct={updateProduct}
                deleteProduct={deleteProduct}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {isEditMode && (
        <MDButton variant="gradient" color="info" onClick={addProduct} sx={{ mt: 2 }}>
          + Add Product
        </MDButton>
      )}
    </>
  );
};

ProductTable.propTypes = {
  isEditMode: PropTypes.bool.isRequired,
  products: PropTypes.array.isRequired,
  setProducts: PropTypes.func.isRequired,
};

export default ProductTable;
