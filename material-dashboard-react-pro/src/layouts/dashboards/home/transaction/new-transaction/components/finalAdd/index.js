import { useState, useEffect, useContext } from "react";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAlert from "components/MDAlert";

import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";

import { AuthContext } from "context";

const formatDate = (date) => {
  return date.toISOString().split("T")[0];
};

function UploadSuccess({ transactionData, file }) {
  const { getCurrentUser } = useContext(AuthContext);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [processedData, setProcessedData] = useState(null);

  useEffect(() => {
    const processTransactionData = (data, userId) => {
      const processedTransaction = { ...data };
      processedTransaction.user = userId;
      processedTransaction.createdAt = new Date().toISOString();
      processedTransaction.transaction_time =
        processedTransaction.transaction_time || formatDate(new Date());
      processedTransaction.image_path = file;
      processedTransaction.phone_number = processedTransaction.phone_number || "N/A";
      if (processedTransaction.shop) {
        processedTransaction.shop.address = processedTransaction.shop.address || "N/A";
      }
      processedTransaction.currency = processedTransaction.currency || "NZD";
      return processedTransaction;
    };

    const uploadTransaction = async () => {
      try {
        const userId = await getCurrentUser();
        if (!userId) {
          throw new Error("User not authenticated");
        }

        const enrichedData = processTransactionData(transactionData, userId);
        setProcessedData(enrichedData);

        const response = await fetch("/transactions/add_transaction", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(enrichedData),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        await response.json();
        setUploadSuccess(true);
      } catch (err) {
        console.error("Upload failed:", err);
        setError(err.message);
        setUploadSuccess(false);
      }
    };

    if (transactionData) {
      uploadTransaction();
    }
  }, [transactionData, file, getCurrentUser]);

  return (
    <MDBox>
      {uploadSuccess && (
        <Card>
          <MDBox
            variant="gradient"
            bgColor="success"
            borderRadius="lg"
            coloredShadow="success"
            mx={2}
            mt={-3}
            p={3}
            mb={1}
            textAlign="center"
          >
            <Icon fontSize="large" color="white">
              check_circle
            </Icon>
            <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
              交易记录添加成功！
            </MDTypography>
          </MDBox>
          <MDBox pt={4} pb={3} px={3}>
            <MDAlert color="success" dismissible>
              <MDTypography variant="body2" color="white">
                交易数据已成功上传并保存！
              </MDTypography>
            </MDAlert>
          </MDBox>
        </Card>
      )}

      {error && (
        <MDAlert color="error" dismissible>
          <MDTypography variant="body2" color="white">
            交易上传失败: {error}
          </MDTypography>
        </MDAlert>
      )}

      <MDTypography variant="h3" fontWeight="bold" mb={2}>
        交易详情
      </MDTypography>

      {processedData && (
        <MDBox mt={2}>
          <MDTypography variant="h6" color="dark">
            处理后的数据:
          </MDTypography>
          <MDBox p={2} bgcolor="grey.100" borderRadius="lg">
            <MDTypography variant="body2">
              商店: {processedData.shop?.name}
            </MDTypography>
            <MDTypography variant="body2">
              用户ID: {String(processedData.user)}
            </MDTypography>
            <MDTypography variant="body2">
              金额: {processedData.total_price} {processedData.currency}
            </MDTypography>
            <MDTypography variant="body2">
              创建时间: {new Date(processedData.createdAt).toLocaleString()}
            </MDTypography>
          </MDBox>
        </MDBox>
      )}
    </MDBox>
  );
}

export default UploadSuccess;
