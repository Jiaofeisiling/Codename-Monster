import React, {useMemo, useState} from "react";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDDropzone from "components/MDDropzone";
import PropTypes from "prop-types";

function UploadMedia({ onImageUpload, onFilesUploaded }) {
  const [hasImage, setHasImage] = useState(false);

  const handleImageUpload = (files) => {
    // console.log("files af", files);
    // console.log(files.length > 0);
    if (files.length > 0) {
      setHasImage(true);
      // alert(setHasImage);
      onImageUpload(true);  // 通知父组件上传成功
      // alert(onImageUpload);
      // alert("handleImageUpload called");
    } else {
      setHasImage(false);
      onImageUpload(false);  // 通知父组件没有上传图片
    }
  };

  const handleFilesUploaded = (files) => {
    onImageUpload(files.length > 0); // 更新是否有图片的状态
    onFilesUploaded(files); // 返回上传的文件列表
  };


  return (
    <MDBox>
      <MDTypography variant="h5">Upload Receipt</MDTypography>
      <MDBox mt={3}>
        <MDBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
          <MDTypography component="label" variant="button" fontWeight="regular" color="text">
            Upload An Image Or Images
          </MDTypography>
        </MDBox>

        {useMemo(
          () => (
            <MDDropzone
              URL="/transactions/receipt-upload"
              options={{ addRemoveLinks: true }}
              onFileCountChange={(count) => console.log(`当前文件数量: ${count}`)}
              onFilesUploaded={(files) => {
                console.log("已上传的文件:", files);
                // alert("onFilesUploaded called");
                // console.log("files bf", files);
                handleImageUpload(files);  // 调用 handleImageUpload 处理上传文件的逻辑
                handleFilesUploaded(files);
              }}
            />
          ),
          []
        )}

        {/*<MDDropzone*/}
        {/*  URL="/transactions/receipt-upload"*/}
        {/*  options={{ addRemoveLinks: true }}*/}
        {/*  onFileCountChange={(count) => console.log(`当前文件数量: ${count}`)}*/}
        {/*  onFilesUploaded={(files) => {*/}
        {/*    console.log("已上传的文件:", files);*/}
        {/*    // alert("onFilesUploaded called");*/}
        {/*    // console.log("files bf", files);*/}
        {/*    handleImageUpload(files);  // 调用 handleImageUpload 处理上传文件的逻辑*/}
        {/*  }}*/}
        {/*/>*/}

      </MDBox>
    </MDBox>
  );
}

UploadMedia.propTypes = {
  onImageUpload: PropTypes.func.isRequired, // PropType 修正
};

export default UploadMedia;


