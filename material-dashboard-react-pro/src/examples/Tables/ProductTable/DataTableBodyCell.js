/**
=========================================================
* Material Dashboard 2 PRO React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-pro-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";

import {useState} from "react";
import MDInput from "../../../components/MDInput";
import MDButton from "../../../components/MDButton";

function DataTableBodyCell({ noBorder, align, children, isEditMode, toggleEditMode }) {
  const [value, setValue] = useState(children);
// 确保 value 是字符串
  // const displayValue = typeof value === 'string' ? value : JSON.stringify(value);
  // console.log('value:', value);
  // console.log('displayValue:', displayValue);
  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <MDBox
      component="td"
      textAlign={align}
      py={1.5}
      px={3}
      sx={({ palette: { light }, typography: { size }, borders: { borderWidth } }) => ({
        fontSize: size.sm,
        borderBottom: noBorder ? "none" : `${borderWidth[1]} solid ${light.main}`,
      })}
    >
      {isEditMode ? (
        <MDInput
          value={value.data}
          onChange={handleChange}
          fullWidth
        />
      ) : (
        <MDBox
          display="inline-block"
          width="max-content"
          color="text"
          sx={{ verticalAlign: "middle" }}
        >
          {children}
        </MDBox>
      )}
    </MDBox>
  );
}

// Setting default values for the props of DataTableBodyCell
DataTableBodyCell.defaultProps = {
  noBorder: false,
  align: "left",
};

// Typechecking props for the DataTableBodyCell
// Update propTypes to include new props
DataTableBodyCell.propTypes = {
  children: PropTypes.node.isRequired,
  noBorder: PropTypes.bool,
  align: PropTypes.oneOf(["left", "right", "center"]),
  isEditMode: PropTypes.bool.isRequired,
  value: PropTypes.any,
  onChange: PropTypes.func,
};

export default DataTableBodyCell;
