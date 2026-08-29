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

import { useState, useEffect, useContext } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDButton from "components/MDButton";
import MDAlert from "components/MDAlert";
import MDInput from "components/MDInput";
import colors from "assets/theme/base/colors";

import AuthService from "services/auth-service";
import CrudService from "services/cruds-service";
import { AuthContext } from "context";

function Header({ user, isDemo }) {
  const authContext = useContext(AuthContext);
  const [image, setImage] = useState("");
  const [fileState, setFileState] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [notification, setNotification] = useState({ value: false, color: "info", message: "" });
  const [error, setError] = useState(null);
  const [role, setRole] = useState("");

  const [id, setId] = useState(null);

  useEffect(() => {
    if (!user) {
      return;
    }
    setImage(user.profile_image);
    setId(user.id);
    (async () => {
      try {
        const response = await authContext.getRole();
        setRole(response);
      } catch (err) {
        console.error(err);
        return null;
      }
    })();
  }, [user]);

  useEffect(() => {
    if (notification.value === true) {
      let timer = setTimeout(() => {
        setNotification({ value: false, color: "info", message: "" });
      }, 5000);
    }
  }, [notification]);

  const changeHandler = (e) => {
    const formData = new FormData();
    formData.append("attachment", e.target.files[0]);
    setFileState(formData);
    setImageUrl(URL.createObjectURL(e.target.files[0]));
    setImage(e.target.files[0]);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      if (isDemo) {
        setNotification({
          value: true,
          color: "secondary",
          message: "You can not update the profile image in demo version",
        });
        return null;
      }
      const { url } = await CrudService.imageUpload(fileState, id);
      let userData;
      // set new user data for call
      userData = {
        data: {
          type: "profile",
          attributes: {
            profile_image: `${process.env.REACT_APP_IMAGES}${url}`,
          },
        },
      };
      // call api for update
      try {
        await AuthService.updateProfile(JSON.stringify(userData));
        setNotification({
          value: true,
          color: "info",
          message: "Your profile has been updated",
        });
      } catch (err) {
        setError(err.errors[0].detail);
      }
    } catch (err) {
      setError(err.message);
      return null;
    }
    setError(null);
  };

  return (
    <>
      <Card id="profile">
        <MDBox p={2} component="form" onSubmit={submitHandler} encType="multipart/form-data">
          <Grid
            container
            spacing={3}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            marginTop="0"
            marginLeft="0"
            width="100%"
          >
            <Grid item position="relative" style={{ paddingLeft: "0", paddingTop: "0" }}>
              <MDAvatar src={imageUrl ?? image} alt="profile-image" size="xl" shadow="sm" />
            </Grid>
            <MDInput
              type="file"
              onChange={changeHandler}
              id="avatar"
              name="attachment"
              accept="image/*"
              sx={{ display: "none", cursor: "pointer" }}
            ></MDInput>
            <Grid item style={{ paddingTop: "0" }}>
              <MDBox height="100%" mt={0.5} lineHeight={1}>
                <MDTypography variant="h5" fontWeight="medium">
                  {user.name ?? "Alex Thompson"}
                </MDTypography>
                <MDTypography variant="button" color="text" fontWeight="medium">
                  {role}
                </MDTypography>
              </MDBox>
            </Grid>
            <MDBox sx={{ ml: "auto" }} display="flex" flexDirection="column">
              <MDBox display="flex" justifyContent="flex-end" flexDirection="row">
                <MDButton
                  variant="gradient"
                  color="info"
                  size="small"
                  component="label"
                  htmlFor="avatar"
                  sx={{ marginRight: "1rem" }}
                >
                  change
                </MDButton>
                <MDButton variant="gradient" color="dark" size="small" type="submit">
                  save
                </MDButton>
              </MDBox>
              {error && (
                <MDTypography variant="caption" color="error" fontWeight="light" pt={2}>
                  {error}
                </MDTypography>
              )}
            </MDBox>
          </Grid>
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

export default Header;
