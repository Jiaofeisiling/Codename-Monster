import {useEffect, useState} from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Card from "@mui/material/Card";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 PRO React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// NewProduct page components
import UploadMedia from "./components/UploadMedia";
import TransactionInfo from "./components/TransactionInfo";
import FinalAdd from "./components/finalAdd";
import Loading from "./components/Loading"

function getSteps() {
  return ["1. Upload A Receipt", "2. AI Detection", "3. Edit & Confirm Information", "4. Finish :)"];
}

function getStepContent(stepIndex, handleImageUpload, handleFilesUploaded, uploadedFiles, handleResponseData, responseData) {
  switch (stepIndex) {
    case 0:
      return <UploadMedia onImageUpload={handleImageUpload} onFilesUploaded={handleFilesUploaded} />;
    case 1:
      return <Loading imagePath={uploadedFiles.length > 0 ? uploadedFiles[0] : null} onResponseData={handleResponseData}/>;
    case 2:
      return <TransactionInfo initialData={responseData} file={uploadedFiles[0]}/>;
    case 3:
      return <FinalAdd transactionData={responseData} file={uploadedFiles[0]}/>;
    default:
      return null;
  }
}

// const initialData = {
//   shop: {
//     name: 'WOOLWORTH',
//     address: '271 QUEEN STREET, AUCKLAND',
//     phone_number: '09 1403-5913',
//     category: "Groceries"
//   },
//   products: [
//     {name: 'NZ BEEF PREMIUM MINCE', quantity: 0.846, unit_price: 10.74},
//     {name: 'S/LORD TUNA SENSINS TOMATO BASIL 185G', quantity: 2.202, unit_price: 10.89},
//     {name: 'S/LORD TUNA SWEET CHILLI 185G', quantity: 1.162, unit_price: 1.3}
//   ],
//   total_quantity: 3,
//   total_price: 91.66,
//   transaction_time: "2025-01-04T12:00:00Z",
//   currency: "NZD"
// };

function NewProduct() {
  const [activeStep, setActiveStep] = useState(0);
  const [hasImage, setHasImage] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [responseData, setResponseData] = useState(null);
  const steps = getSteps();
  const isLastStep = activeStep === steps.length - 1;

  useEffect(() => {
    console.log("useEffect - Uploaded files updated:", uploadedFiles);
    console.log("useEffect - responseData updated:", responseData);
  }, [uploadedFiles, responseData]);

  const handleNext = () => setActiveStep(activeStep + 1);
  const handleBack = () => setActiveStep(activeStep - 1);

  const handleImageUpload = (hasImage) => {
    setHasImage(hasImage);
  };

  const handleFilesUploaded = (files) => {
    setUploadedFiles(files);
  };

  const handleResponseData = (data) => {
    setResponseData(data);  // 将 responseData 存储在父组件的 state 中
    console.log("Received response data:", data);
  };

  const customCompany = {
    href: "https://mayday5525.com",
    name: "MAYDAY 5525 TOUR"
  };

  const customLinks = [
    {href: "https://example.com/about", name: "About Us"},
    {href: "https://example.com/blog", name: "Blog"},
    {href: "https://example.com/contact", name: "Contact"},
  ];

  return (
    <DashboardLayout>
      <DashboardNavbar/>
      <MDBox mb={9}>
        <Grid container justifyContent="center">
          <Grid item xs={12} lg={8}>
            <MDBox mt={6} mb={8} textAlign="center">
              <MDBox mb={1}>
                <MDTypography variant="h3" fontWeight="bold">
                  Add New Transaction
                </MDTypography>
              </MDBox>
              <MDTypography variant="h5" fontWeight="regular" color="secondary">
                This information will describe more about the product.
              </MDTypography>
            </MDBox>
            <Card>
              <MDBox mt={-3} mb={3} mx={2}>
                <Stepper activeStep={activeStep} alternativeLabel>
                  {steps.map((label) => (
                    <Step key={label}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
              </MDBox>
              <MDBox p={2}>
                <MDBox>
                  {getStepContent(activeStep, handleImageUpload, handleFilesUploaded, uploadedFiles, handleResponseData, responseData )}
                  <MDBox mt={3} width="100%" display="flex" justifyContent="space-between">
                    {activeStep === 0 ? (
                      <MDBox/>
                    ) : (
                      <MDButton variant="gradient" color="light" onClick={handleBack}>
                        back
                      </MDButton>
                    )}
                    <MDButton
                      variant="gradient"
                      color="dark"
                      onClick={!isLastStep ? handleNext : undefined}
                      disabled={activeStep === 0 && !hasImage}
                    >
                      {isLastStep ? "send" : "next"}
                    </MDButton>

                  </MDBox>
                </MDBox>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>

      {/*<Footer company={customCompany} links={customLinks}/>*/}
    </DashboardLayout>
  );
}

export default NewProduct;
// TODO: 非图片类型返回GUI报错信息。