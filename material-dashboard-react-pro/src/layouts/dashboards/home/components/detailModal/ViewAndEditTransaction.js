import {useEffect, useMemo, useState} from "react";
import axios from "axios";

// @mui material components
import Grid from "@mui/material/Grid";
import Autocomplete from "@mui/material/Autocomplete";
import Icon from "@mui/material/Icon";
import Card from "@mui/material/Card";
// import Divider from "@mui/material/Divider";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDEditor from "components/MDEditor";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDDatePicker from "components/MDDatePicker";
import FormField from "layouts/dashboards/home/transaction/new-transaction/components/FormField";

const SHOP_CATEGORIES = ["", "Clothing", "Electronics", "Furniture", "Others", "Groceries", "Souvenirs"];

function ViewAndEditTransaction({initialData, onSave, file}) {
  const [isEditMode, setIsEditMode] = useState(false);
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

  useEffect(() => {
    if (file) {
      setImagePath(file);
      fetchReceiptImage(file);
    }
  }, [file]);

  const fetchReceiptImage = async (imagePath) => {
    try {
      if (!imagePath) {
        throw new Error("Image path is not provided");
      }

      const response = await axios.get(`transactions/get-receipt-image`, {
        params: {fileName: imagePath},
        responseType: 'arraybuffer',
      });

      if (response.status !== 200) {
        throw new Error(`Unexpected response status: ${response.status}`);
      }

      const blob = new Blob([response.data], {type: 'image/jpeg'});
      const imageUrl = URL.createObjectURL(blob);
      setReceiptImage(imageUrl);

      // console.log("Image successfully fetched and converted to Base64 format");
    } catch (error) {
      // console.error("Failed to fetch receipt image:", error.message || error);
    }
  };

  const totalQuantity = useMemo(() => products.length, [products]);

  const totalPrice = useMemo(() => {
    return products.reduce((acc, product) =>
      acc + (Number(product.quantity) * Number(product.unit_price) || 0), 0
    );
  }, [products]);

  const handleShopChange = (field, value) => {
    setShop(prev => ({...prev, [field]: value}));
    if (errors[field]) {
      setErrors(prev => ({...prev, [field]: null}));
    }
  };

  const handleProductChange = (index, field, value) => {
    setProducts(prev => {
      const updated = [...prev];
      updated[index] = {...updated[index], [field]: value};
      return updated;
    });
    if (errors[`product_${index}_${field}`]) {
      setErrors(prev => ({...prev, [`product_${index}_${field}`]: null}));
    }
  };

  const addProduct = () => {
    setProducts(prev => [...prev, {name: "", quantity: 0, unit_price: 0}]);
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

  const renderProductList = () => (
    <MDBox>
      <MDBox p={2}>
        {products.map((product, index) => (
          <MDBox
            key={index}
            mb={index !== products.length - 1 ? 2 : 0}
            sx={{
              backgroundColor: ({functions: {rgba}, palette: {white}}) =>
                rgba(white.main, 0.8),
              boxShadow: ({boxShadows: {sm}}) => sm,
              borderRadius: "lg",
              transition: "transform 200ms ease-in-out",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: ({boxShadows: {md}}) => md,
              },
            }}
          >
            <MDBox
              p={2}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <MDBox display="flex" alignItems="center">
                <MDBox
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  width="3rem"
                  height="3rem"
                  borderRadius="lg"
                  overflow="hidden" // 添加此行确保图片不会溢出容器
                  sx={{
                    marginRight: 2,
                  }}
                >
                  <img
                    src={`http://localhost:8080/data/products/thumbs/thumb_${product._id}.png`}
                    alt={product.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                    // onError={(e) => {
                    //   // 图片加载失败时显示默认图片
                    //   e.target.src = "path/to/default-image.png";
                    // }}
                  />
                </MDBox>
                <MDBox>
                  <MDTypography variant="h6" fontWeight="medium">
                    {product.name}
                  </MDTypography>
                  <MDTypography variant="caption" color="text">
                    Quantity: {product.quantity}
                  </MDTypography>
                </MDBox>
              </MDBox>
              <MDBox textAlign="right">
                <MDTypography variant="h6" fontWeight="medium">
                  ${(product.quantity * product.unit_price).toFixed(2)}
                </MDTypography>
                <MDTypography variant="caption" color="text">
                  ${product.unit_price.toFixed(2)} each
                </MDTypography>
              </MDBox>
            </MDBox>
          </MDBox>
        ))}
      </MDBox>
    </MDBox>
  );

  return (
    <MDBox>

      <Grid container spacing={2}>
        <MDBox p={2}>
          <Grid container spacing={3}>
            {/* Left Column - Receipt Image */}
            <Grid item xs={12} md={4}>
              <Card>
                <MDBox p={3}>
                  <MDTypography variant="h6" fontWeight="medium" mb={2}>
                    Receipt Image
                  </MDTypography>
                  {receiptImage ? (
                    <img
                      src={receiptImage}
                      alt="Receipt Preview"
                      style={{
                        width: "100%",
                        borderRadius: "12px",
                        boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)"
                      }}
                    />
                  ) : (
                    <MDBox
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      height="300px"
                      borderRadius="lg"
                      sx={{
                        border: "1px dashed",
                        borderColor: "grey.300",
                        backgroundColor: ({functions: {rgba}, palette: {white}}) =>
                          rgba(white.main, 0.8),
                      }}
                    >
                      <MDTypography variant="body2" color="text">
                        No receipt image available
                      </MDTypography>
                    </MDBox>
                  )}
                </MDBox>
              </Card>
            </Grid>

            {/* Right Column - Transaction Details and Shop Information */}
            <Grid item xs={12} md={8}>
              <Card>
                <MDBox p={3}>
                  {/* Header with Time and Edit Button */}
                  <MDBox mb={3}>
                    <Grid container spacing={2} alignItems="center">
                      <Grid item xs={12} sm={6}>
                        <MDTypography variant="h6" fontWeight="medium">
                          Transaction Details
                        </MDTypography>
                        {isEditMode ? (
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
                        ) : (
                          <MDTypography variant="body2">
                            {transactionTime.toLocaleString()}
                          </MDTypography>
                        )}
                      </Grid>
                      <Grid item xs={12} sm={6} sx={{textAlign: 'right'}}>
                        <MDButton
                          variant="gradient"
                          color={isEditMode ? "info" : "warning"}
                          size="small"
                          onClick={() => setIsEditMode(!isEditMode)}
                        >
                          <Icon>{isEditMode ? "save" : "edit"}</Icon>&nbsp;
                          {isEditMode ? "Save Information" : "Edit Information"}
                        </MDButton>
                      </Grid>
                    </Grid>
                  </MDBox>

                  {/*<Divider/>*/}

                  {/* Shop Information */}
                  <MDBox my={3}>
                    <MDTypography variant="h6" fontWeight="medium" mb={2}>
                      Shop Information
                    </MDTypography>
                    {isEditMode ? (
                      <Grid container spacing={2}>
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
                          <Autocomplete
                            value={shop.category}
                            options={SHOP_CATEGORIES}
                            renderInput={(params) => (
                              <MDInput
                                {...params}
                                label="Category"
                                variant="standard"
                                error={!!errors.category}
                                helperText={errors.category}
                              />
                            )}
                            onChange={(e, value) => handleShopChange("category", value)}
                          />
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
                    ) : (
                      <MDBox
                        p={2}
                        borderRadius="lg"
                        sx={{
                          backgroundColor: ({functions: {rgba}, palette: {white}}) =>
                            rgba(white.main, 0.8),
                          boxShadow: ({boxShadows: {md}}) => md,
                        }}
                      >
                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={6}>
                            <MDTypography variant="body2">
                              <strong>Shop Name:</strong> {shop.name}
                            </MDTypography>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <MDTypography variant="body2">
                              <strong>Category:</strong> {shop.category}
                            </MDTypography>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <MDTypography variant="body2">
                              <strong>Address:</strong> {shop.address}
                            </MDTypography>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <MDTypography variant="body2">
                              <strong>Phone:</strong> {shop.phone_number}
                            </MDTypography>
                          </Grid>
                        </Grid>
                      </MDBox>
                    )}
                  </MDBox>
                </MDBox>
              </Card>
            </Grid>
          </Grid>
        </MDBox>
      </Grid>

{/*<Grid item>*/}

      <Grid item xs={16}>
        {/* Products Section */}
        <Card sx={{mt: 0.5}}>
          <MDBox p={3}>
            <MDBox mb={2} display="flex" justifyContent="space-between" alignItems="center">
              <MDTypography variant="h6" fontWeight="medium">
                Products
              </MDTypography>
              {isEditMode && (
                <MDButton
                  variant="gradient"
                  color="info"
                  size="small"
                  onClick={addProduct}
                >
                  <Icon>add</Icon>&nbsp;
                  Add Product
                </MDButton>
              )}
            </MDBox>

            {isEditMode ? (
              <Grid container spacing={3}>
                {products.map((product, index) => (
                  <Grid item xs={12} key={index}>
                    <MDBox
                      p={2}
                      sx={{
                        borderRadius: "lg",
                        backgroundColor: ({functions: {rgba}, palette: {white}}) =>
                          rgba(white.main, 0.8),
                        boxShadow: ({boxShadows: {sm}}) => sm,
                        transition: "transform 200ms ease-in-out",
                        "&:hover": {
                          transform: "translateY(-4px)",
                          boxShadow: ({boxShadows: {md}}) => md,
                        }
                      }}
                    >
                      <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12} sm={4}>
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
                        <Grid item xs={12} sm={3}>
                          <FormField
                            type="number"
                            label="Unit Price"
                            value={product.unit_price}
                            onChange={(e) => handleProductChange(index, "unit_price", e.target.value)}
                            error={errors[`product_${index}_unit_price`]}
                          />
                        </Grid>
                        {products.length > 1 && (
                          <Grid item xs={12} sm={3}>
                            <MDButton
                              variant="text"
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
                  </Grid>
                ))}
              </Grid>
            ) : (
              renderProductList()
            )}
          </MDBox>
        </Card>
        {/* Notes Section */}
        <Card sx={{mt: 3}}>
          <MDBox p={3}>
            <MDTypography variant="h6" fontWeight="medium" mb={2}>
              Notes
            </MDTypography>
            {isEditMode ? (
              <MDEditor value={notes} onChange={setNotes}/>
            ) : notes ? (
              <MDBox
                p={2}
                borderRadius="lg"
                sx={{
                  backgroundColor: ({functions: {rgba}, palette: {white}}) =>
                    rgba(white.main, 0.8),
                  boxShadow: ({boxShadows: {sm}}) => sm,
                }}
                dangerouslySetInnerHTML={{__html: notes}}
              />
            ) : (
              <MDTypography variant="body2" color="text">
                No Notes available
              </MDTypography>
            )}
          </MDBox>
        </Card>
        {/* Summary Section */}
        <Card sx={{mt: 3, background: "linear-gradient(135deg, rgba(33,150,243,1) 0%, rgba(3,169,244,1) 100%)"}}>
          <MDBox
            p={3}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <MDTypography variant="h6" fontWeight="medium" color="white">
              Summary
            </MDTypography>
            <MDBox>
              <MDTypography variant="body2" color="white" fontWeight="regular">
                Total Products: {totalQuantity}
              </MDTypography>
              <MDTypography variant="h5" color="white" fontWeight="bold">
                ${totalPrice.toFixed(2)}
              </MDTypography>
            </MDBox>
          </MDBox>
        </Card>
      </Grid>

    </MDBox>
  );
}

export default ViewAndEditTransaction;
