import { useEffect, useRef, useState } from "react";

// prop-types 是一个用于属性类型检查的库
import PropTypes from "prop-types";
import Dropzone from "dropzone";
import "dropzone/dist/dropzone.css";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";

// Custom styles for the MDDropzone
import MDDropzoneRoot from "components/MDDropzone/MDDropzoneRoot";

// Material Dashboard 2 PRO React context
import { useMaterialUIController } from "context";

function MDDropzone({ URL, options, onFileCountChange, onFilesUploaded }) {
  // console.log("MDDropzone URL: ", URL);

  // 从上下文中获取控制器和暗黑模式状态
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  // 使用 useRef 创建一个引用，用于存储 Dropzone 实例
  const dropzoneRef = useRef();

  // 使用 useState 记录上传的文件个数
  const [fileCount, setFileCount] = useState(0);
  const [uploadedFiles, setUploadedFiles] = useState([]); // Track uploaded files

  // 使用 useEffect 处理 Dropzone 的初始化和销毁
  useEffect(() => {
    // Create Dropzone instance only once
    if (dropzoneRef.current) {
      const dz = new Dropzone(dropzoneRef.current, {
        ...options,
        url: URL,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
          ...(options?.headers || {}),
        },
        init() {
          this.on("addedfile", (file) => {
            console.log("addedfile called");
            setFileCount((prevCount) => {
              const newCount = prevCount + 1;
              setUploadedFiles((prevFiles) => [...prevFiles, file]); // 立即更新文件列表
              if (onFileCountChange) onFileCountChange(newCount);
              return newCount;
            });
          });

          this.on("removedfile", (file) => {
            console.log("removedfile called");
            console.log("文件被移除:", file.name);
            setFileCount((prevCount) => Math.max(prevCount - 1, 0));
            setUploadedFiles((prevFiles) => prevFiles.filter((f) => f !== file)); // Remove file from list
            if (onFileCountChange) onFileCountChange(fileCount - 1);
            // if (onFilesUploaded) onFilesUploaded(uploadedFiles); // Pass the whole list
          });

          this.on("success", (file, response) => {
            console.log("success called");
            // console.log('Upload successful:', response);
            if (onFilesUploaded) {
              const fileNames = response.files.map(f => f.newName);
              setUploadedFiles(fileNames); // 上传成功后更新文件列表
              onFilesUploaded(fileNames); // 通知父组件上传成功后的文件列表
            }
          });

          this.on("error", (file, errorMessage) => {
            this.removeFile(file);
            setFileCount((prevCount) => Math.max(prevCount - 1, 0));
            setUploadedFiles((prevFiles) => prevFiles.filter((f) => f !== file)); //Remove failed file
            if (onFileCountChange) onFileCountChange(fileCount - 1);
            if (onFilesUploaded) onFilesUploaded(uploadedFiles); // Pass the whole list
            console.error('Upload error:', errorMessage);
          });
        },
      });

      // Clean up: Destroy Dropzone on unmount
      return () => dz.destroy();
    }
  }, [URL, options, onFileCountChange, onFilesUploaded]);

  return (
    <MDDropzoneRoot
      component="form"
      ref={dropzoneRef}
      className="form-control dropzone"
      ownerState={{ darkMode }}
    >
      <MDBox className="fallback" bgColor="transparent">
        <MDBox component="input" name="file" type="file" />
      </MDBox>
    </MDDropzoneRoot>
  );
}

MDDropzone.propTypes = {
  URL: PropTypes.string.isRequired,
  options: PropTypes.objectOf(PropTypes.any).isRequired,
  onFileCountChange: PropTypes.func,
  onFilesUploaded: PropTypes.func,
};

export default MDDropzone;
