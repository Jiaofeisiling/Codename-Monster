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

import { useEffect, useState } from "react";

// @material-ui core components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDAlert from "components/MDAlert";

// Settings page components
import FormField from "layouts/pages/account/components/FormField";

import AuthService from "services/auth-service";

function BasicInfo({ user, isDemo }) {
  const [info, setInfo] = useState({ name: "", email: "" });
  const [notification, setNotification] = useState({ value: false, color: "info", message: "" });

  useEffect(() => {
    setInfo({
      name: user.name,
      email: user.email,
    });
  }, [user]);

  useEffect(() => {
    if (notification.value === true) {
      let timer = setTimeout(() => {
        setNotification({ value: false, color: "info", message: "" });
      }, 5000);
    }
  }, [notification]);

  const [errors, setErrors] = useState({
    nameError: false,
    emailError: false,
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
    const mailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (info.name.trim().length === 0) {
      setErrors({ ...errors, nameError: true });
      return;
    }

    if (info.email.trim().length === 0 || !info.email.trim().match(mailFormat)) {
      setErrors({ ...errors, emailError: true });
      return;
    }

    // set new user data for call
    let userData;
    if (isDemo) {
      userData = {
        data: {
          type: "profile",
          attributes: {
            name: info.name,
            profile_image: user.profile_image ?? null,
          },
        },
      };
    } else {
      userData = {
        data: {
          type: "profile",
          attributes: {
            name: info.name,
            email: info.email,
            profile_image: user.profile_image ?? null,
          },
        },
      };
    }

    // call api for update
    await AuthService.updateProfile(JSON.stringify(userData));

    // reset errors
    setErrors({
      nameError: false,
      emailError: false,
    });

    setNotification({
      value: true,
      color: isDemo ? "secondary" : "info",
      message: isDemo
        ? "You can not update the email in demo version"
        : "Your profile has been updated",
    });
  };

  return (
    <>
      <Card id="basic-info" sx={{ overflow: "visible" }}>
        <MDBox p={3}>
          <MDTypography variant="h5">Basic Info</MDTypography>
        </MDBox>
        <MDBox component="form" pb={3} px={3} method="POST" onSubmit={submitHandler}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <FormField
                label="First Name"
                placeholder="Alec"
                name="name"
                value={info.name}
                onChange={changeHandler}
                error={errors.nameError}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormField
                label="Email"
                placeholder="example@email.com"
                inputProps={{ type: "email" }}
                name="email"
                value={info.email}
                onChange={changeHandler}
                error={errors.emailError}
              />
            </Grid>
          </Grid>
          <MDBox ml="auto" mt={2} display="flex" justifyContent="flex-end">
            <MDButton variant="gradient" color="dark" size="small" type="submit">
              update
            </MDButton>
          </MDBox>
        </MDBox>
      </Card>
      {notification.value === true && (
        <MDAlert color={notification.color} mt="20px">
          <MDTypography variant="body2" color="white">
            {notification.message}
          </MDTypography>
        </MDAlert>
      )}
    </>
  );
}

export default BasicInfo;
