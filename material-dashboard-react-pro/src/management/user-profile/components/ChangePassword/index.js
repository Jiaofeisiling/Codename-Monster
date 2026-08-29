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

import { useState, useEffect } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDAlert from "components/MDAlert";

import AuthService from "services/auth-service";

function ChangePassword({ user, isDemo }) {
  const passwordRequirements = ["Min 8 characters", "Change it often"];

  const [info, setInfo] = useState({ newPassword: "", confirmPassword: "" });
  const [notification, setNotification] = useState({ value: false, color: "info", message: "" });

  useEffect(() => {
    if (notification.value === true) {
      let timer = setTimeout(() => {
        setNotification({ value: false, color: "info", message: "" });
      }, 5000);
    }
  }, [notification]);

  const [errors, setErrors] = useState({
    newPassError: false,
    confirmPassError: false,
  });

  const changeHandler = (e) => {
    setInfo({
      ...info,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    // validation
    if (isDemo) {
      setNotification({
        value: true,
        color: "secondary",
        message: "You can not update the password in demo version",
      });
      return null;
    } else {
      if (info.newPassword.trim().length < 8) {
        setErrors({ ...errors, newPassError: true });
        return;
      }

      if (info.confirmPassword.trim() !== info.newPassword.trim()) {
        setErrors({ ...errors, confirmPassError: true });
        return;
      }

      let userData;
      // set new user data for call
      // issue here in the get profile the password is not coming so can't verify it and the password needs to have the new password set to save it
      userData = {
        data: {
          type: "profile",
          attributes: {
            password: info.newPassword,
            password_new: info.newPassword,
            password_confirmation: info.confirmPassword,
            profile_image: user.profile_image ?? null,
          },
        },
      };

      // call api for update
      await AuthService.updateProfile(JSON.stringify(userData));

      setInfo({ newPassword: "", confirmPassword: "" });

      // reset errors
      setErrors({
        newPassError: false,
        confirmPassError: false,
      });

      setNotification({
        value: true,
        color: "info",
        message: "Your profile has been updatedn",
      });
    }
  };

  const renderPasswordRequirements = passwordRequirements.map((item, key) => {
    const itemKey = `element-${key}`;

    return (
      <MDBox key={itemKey} component="li" color="text" fontSize="1.25rem" lineHeight={1}>
        <MDTypography variant="button" color="text" fontWeight="regular" verticalAlign="middle">
          {item}
        </MDTypography>
      </MDBox>
    );
  });

  return (
    <>
      {notification.value === true && (
        <MDAlert color={notification.color}>
          <MDTypography variant="body2" color="white">
            {notification.message}
          </MDTypography>
        </MDAlert>
      )}
      <Card id="change-password">
        <MDBox p={3}>
          <MDTypography variant="h5">Change Password</MDTypography>
        </MDBox>
        <MDBox component="form" pb={3} px={3} onSubmit={submitHandler}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <MDInput
                fullWidth
                label="New Password"
                inputProps={{ type: "password", autoComplete: "" }}
                name="newPassword"
                value={info.newPassword}
                onChange={changeHandler}
                error={errors.newPassError}
              />
              {errors.newPassError && (
                <MDTypography variant="caption" color="error" fontWeight="light" pl={2}>
                  The new password should have at least 8 characters
                </MDTypography>
              )}
            </Grid>
            <Grid item xs={12}>
              <MDInput
                fullWidth
                label="Confirm New Password"
                inputProps={{ type: "password", autoComplete: "" }}
                name="confirmPassword"
                value={info.confirmPassword}
                onChange={changeHandler}
                error={errors.confirmPassError}
              />
              {errors.confirmPassError && (
                <MDTypography variant="caption" color="error" fontWeight="light" pl={2}>
                  The password confimation should match the new password
                </MDTypography>
              )}
            </Grid>
          </Grid>
          <MDBox mt={6} mb={1}>
            <MDTypography variant="h5">Password requirements</MDTypography>
          </MDBox>
          <MDBox mb={1}>
            <MDTypography variant="body2" color="text">
              Please follow this guide for a strong password
            </MDTypography>
          </MDBox>
          <MDBox
            display="flex"
            justifyContent="space-between"
            alignItems="flex-end"
            flexWrap="wrap"
          >
            <MDBox component="ul" m={0} pl={3.25} mb={{ xs: 8, sm: 0 }}>
              {renderPasswordRequirements}
            </MDBox>
            <MDBox ml="auto" display="flex" flexDirection="column">
              <MDButton variant="gradient" color="dark" size="small" type="submit">
                update password
              </MDButton>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </>
  );
}

export default ChangePassword;
