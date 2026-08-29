import { useState, useEffect, useMemo } from "react";
import axios from "axios";

// @mui material components
import Grid from "@mui/material/Grid";
import Autocomplete from "@mui/material/Autocomplete";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDEditor from "components/MDEditor";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDDatePicker from "components/MDDatePicker";

// NewProduct page components
import FormField from "layouts/ecommerce/products/new-product/components/FormField";

const SHOP_CATEGORIES = ["", "Clothing", "Electronics", "Furniture", "Others", "Groceries", "Souvenirs"];

function TransactionInfo({ initialData, onSave, file }) {
  const [shop, setShop] = useState({
    name: "",
    address: "",
    phone_number: "",
    category: ""
  });

  const [products, setProducts] = useState([{
    name: "",
    quantity: 0,
    unit_price: 0
  }]);

  const [transactionTime, setTransactionTime] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState({});
  const [imagePath, setImagePath] = useState(file || null);
  const [receiptImage, setReceiptImage] = useState(null);

  useEffect(() => {
    if (initialData) {
      console.log("TransactionInfo - Received initial data:", initialData);
      setShop(initialData.shop || shop);
      setProducts(initialData.products || products);
      setNotes(initialData.notes || notes);
      if (initialData.transaction_time) {
        setTransactionTime(new Date(initialData.transaction_time));
      }
    }
  }, [initialData]);

  // 如果有 file 参数，获取图片
  useEffect(() => {
    if (file) {
      setImagePath(file); // 更新路径
      fetchReceiptImage(file); // 获取图片
      // console.log(receiptImage);
    }
  }, [file]);

  const fetchReceiptImage = async (imagePath) => {
    try {
      if (!imagePath) {
        throw new Error("Image path is not provided");
      }

      const response = await axios.get(`transactions/get-receipt-image`, {
        params: { fileName: imagePath },
        responseType: 'arraybuffer', // Set response type as arraybuffer to handle binary data
      });

      if (response.status !== 200) {
        throw new Error(`Unexpected response status: ${response.status}`);
      }

      // Convert ArrayBuffer to a Blob
      const blob = new Blob([response.data], { type: 'image/jpeg' });

      // Create a URL for the Blob object
      const imageUrl = URL.createObjectURL(blob);

      // Set the image URL as the receiptImage
      setReceiptImage(imageUrl);

      // console.log(imageUrl);
      console.log("Image successfully fetched and converted to Base64 format");
    } catch (error) {
      console.error("Failed to fetch receipt image:", error.message || error);
    }
  };

  useEffect(() => {
    if (file) {
      setImagePath(file);
    }
  }, [file]);

  const totalQuantity = useMemo(() => products.length, [products]);

  const totalPrice = useMemo(() => {
    return products.reduce((acc, product) =>
      acc + (Number(product.quantity) * Number(product.unit_price) || 0), 0
    );
  }, [products]);

  const handleShopChange = (field, value) => {
    setShop(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const handleProductChange = (index, field, value) => {
    setProducts(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
    if (errors[`product_${index}_${field}`]) {
      setErrors(prev => ({ ...prev, [`product_${index}_${field}`]: null }));
    }
  };

  const addProduct = () => {
    setProducts(prev => [...prev, { name: "", quantity: 0, unit_price: 0 }]);
  };

  const removeProduct = (index) => {
    setProducts(prev => prev.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    const dataToSave = {
      shop,
      products,
      transaction_time: transactionTime.toISOString(),
      notes,
      imagePath
    };
    console.log("Saving data:", dataToSave);

    if (onSave) onSave(dataToSave);
  };

  const handleImagePathChange = (e) => {
    const newPath = e.target.value;
    setImagePath(newPath);
    fetchReceiptImage(newPath); // 更新图片
  };

  return (
    <MDBox>
      <MDTypography variant="h5" fontWeight="bold">
        Transaction Information
      </MDTypography>

      {/* Image Preview */}
      <MDBox mt={3}>
        <MDTypography variant="h6" fontWeight="medium">
          Receipt Image
        </MDTypography>
        <Grid container spacing={3} alignItems="center">

        </Grid>
      </MDBox>

      {/* Transaction Time and Shop Information */}
      <MDBox mt={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <MDBox>
              {/*<MDTypography variant="h6" fontWeight="medium">*/}
              {/*  Receipt Image*/}
              {/*</MDTypography>*/}
              {receiptImage ? (
                <img
                  src={receiptImage}
                  alt="Receipt Preview"
                  style={{ width: "100%", borderRadius: "8px" }}
                />
              ) : (
                <MDTypography variant="body2" color="textSecondary">
                  No image available
              </MDTypography>
                )}
            </MDBox>
          </Grid>
          <Grid item xs={12} sm={6} md={8}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <MDBox>
                  <MDTypography variant="h6" fontWeight="medium">
                    Transaction Time
                  </MDTypography>
                  <MDDatePicker
                    input={{
                      value: transactionTime,
                      placeholder: "Select date and time"
                    }}
                    onChange={setTransactionTime}
                    options={{
                      enableTime: true,
                      dateFormat: "Y-m-d H:i",
                      altInput: true,
                      altFormat: "F j, Y H:i",
                    }}
            />
                </MDBox>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormField
                  type="text"
                  label="Shop Name"
                  value={shop.name}
                  onChange={(e) => handleShopChange("name", e.target.value)}
                  error={errors.name}
            />
          </Grid>

              <Grid item xs={12} sm={6}>
                <MDBox mb={2}>
                  <MDTypography variant="h6" fontWeight="medium">
                    Category
                  </MDTypography>
                  <Autocomplete
                    value={shop.category}
                    options={SHOP_CATEGORIES}
                    renderInput={(params) => (
                      <MDInput
                        {...params}
                        variant="standard"
                        error={!!errors.category}
                        helperText={errors.category}
                      />
                    )}
                    onChange={(e, value) => handleShopChange("category", value)}
                  />
      </MDBox>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormField
                  type="text"
                  label="Address"
                  value={shop.address}
                  onChange={(e) => handleShopChange("address", e.target.value)}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormField
                  type="text"
                  label="Phone Number"
                  value={shop.phone_number}
                  onChange={(e) => handleShopChange("phone_number", e.target.value)}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </MDBox>

      {/* Products Section */}
      <MDBox mt={3}>
        <MDBox mb={2} display="flex" justifyContent="space-between" alignItems="center">
          <MDTypography variant="h6" fontWeight="medium">
            Products
          </MDTypography>
          <MDButton
            variant="gradient"
            color="info"
            size="small"
            onClick={addProduct}
          >
            <Icon>add</Icon>&nbsp;
            Add Product
          </MDButton>
        </MDBox>

        {products.map((product, index) => (
          <MDBox key={index} mb={2}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} sm={6}>
                <FormField
                  type="text"
                  label="Product Name"
                  value={product.name}
                  onChange={(e) => handleProductChange(index, "name", e.target.value)}
                  error={errors[`product_${index}_name`]}
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <FormField
                  type="number"
                  label="Quantity"
                  value={product.quantity}
                  onChange={(e) => handleProductChange(index, "quantity", e.target.value)}
                  error={errors[`product_${index}_quantity`]}
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <FormField
                  type="number"
                  label="Unit Price"
                  value={product.unit_price}
                  onChange={(e) => handleProductChange(index, "unit_price", e.target.value)}
                  error={errors[`product_${index}_unit_price`]}
                />
              </Grid>
              {products.length > 1 && (
                <Grid item xs={12} sm={2}>
                  <MDButton
                    variant="gradient"
                    color="error"
                    size="small"
                    onClick={() => removeProduct(index)}
                  >
                    <Icon>delete</Icon>&nbsp;
                    Remove
                  </MDButton>
                </Grid>
              )}
            </Grid>
          </MDBox>
        ))}
      </MDBox>

      {/* Notes Section */}
      <MDBox mt={3}>
        <MDTypography variant="h6" fontWeight="medium">
          Notes
        </MDTypography>
        <MDBox mt={2}>
          <MDEditor value={notes} onChange={setNotes} />
        </MDBox>
      </MDBox>

      {/* Summary and Submit */}
      <MDBox mt={3} display="flex" justifyContent="space-between" alignItems="center">
        <MDBox>
          <MDTypography variant="h6" fontWeight="medium">
            Summary
          </MDTypography>
          <MDTypography variant="body2">
            Total Products: {totalQuantity}
          </MDTypography>
          <MDTypography variant="body2">
            Total Price: ${totalPrice.toFixed(2)}
          </MDTypography>
        </MDBox>
        <MDButton type="submit" variant="gradient" color="success" onClick={handleSave}>
          Save Transaction
        </MDButton>
      </MDBox>
    </MDBox>
  );
}

export default TransactionInfo;

