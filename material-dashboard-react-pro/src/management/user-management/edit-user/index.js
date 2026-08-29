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

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { InputLabel, Autocomplete } from "@mui/material";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDAvatar from "components/MDAvatar";

// Material Dashboard 2 PRO React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import FormField from "layouts/applications/wizard/components/FormField";
import { useNavigate, useParams } from "react-router-dom";

import CrudService from "services/cruds-service";

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [roles, setRoles] = useState([]);
  const [image, setImage] = useState("");
  const [fileState, setFileState] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
    role: "",
  });
  const [value, setValue] = useState({});

  const [error, setError] = useState({
    name: false,
    email: false,
    role: false,
    error: false,
    textError: "",
  });

  useEffect(() => {
    (async () => {
      try {
        const response = await CrudService.getRoles();
        setRoles(response.data);
      } catch (err) {
        console.error(err);
        return null;
      }
    })();
  }, []);

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const response = await CrudService.getUser(id);
        const getData = response.data;
        const roleData = await CrudService.getRole(getData.relationships.roles.data[0].id);
        const role = roleData.data
        setUser({
          id: getData.id,
          name: getData.attributes.name,
          email: getData.attributes.email,
          role: getData.relationships.roles.data[0].id,
        });
        setImage(getData.attributes.profile_image);
        setValue(role);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [id]);

  useEffect(() => {
    if (roles && roles.length > 0) {
      const role = roles.find((role) => role.id === user.role);
      setValue(role);
    }
  }, [roles]);

  const changeHandler = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const changeImageHandler = (e) => {
    const formData = new FormData();
    formData.append("attachment", e.target.files[0]);
    setFileState(formData);
    setImageUrl(URL.createObjectURL(e.target.files[0]));
    setImage(e.target.files[0]);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const mailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (user.name.trim().length === 0) {
      setError({
        email: false,
        role: false,
        name: true,
        textError: "The name cannot be empty",
      });
      return;
    }

    if (user.email.trim().length === 0 || !user.email.trim().match(mailFormat)) {
      setError({
        role: false,
        name: false,
        email: true,
        textError: "The email is not valid",
      });
      return;
    }

    if (value.id && value.id === "") {
      setError({
        name: false,
        email: false,
        role: false,
        password: false,
        confirm: false,
        textError: "Role is required",
      });
      return;
    }

    try {
      let { url } = fileState
        ? await CrudService.imageUpload(fileState, user.id.toString())
        : image;
      const newUser = {
        data: {
          id: user.id.toString(),
          type: "users",
          attributes: {
            name: user.name,
            email: user.email,
            profile_image: fileState ? `${process.env.REACT_APP_IMAGES}${url}` : image,
          },
          relationships: {
            roles: {
              data: [
                {
                  id: value.id ? value.id.toString() : user.role.toString(),
                  type: "roles",
                },
              ],
            },
          },
        },
      };

      try {
        const res = await CrudService.updateUser(newUser, newUser.data.id);
        navigate("/examples-api/user-management", {
          state: { value: true, text: "The user was sucesfully updated" },
        });
      } catch (err) {
        if (err.hasOwnProperty("errors")) {
          setError({ ...error, error: true, textError: err.errors[0].detail });
        }
        console.error(err);
      }
    } catch (err) {
      setError({ ...error, error: true, textError: err.message });
      return null;
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar breadcrumbTitle={user.name} />
      <MDBox mt={5} mb={9}>
        <Grid container justifyContent="center">
          <Grid item xs={12} lg={8}>
            <MDBox mt={6} mb={8} textAlign="center">
              <MDBox mb={1}>
                <MDTypography variant="h3" fontWeight="bold">
                  Add New User
                </MDTypography>
              </MDBox>
              <MDTypography variant="h5" fontWeight="regular" color="secondary">
                This information will describe more about the user.
              </MDTypography>
            </MDBox>
            <Card>
              <MDBox
                component="form"
                method="POST"
                onSubmit={submitHandler}
                encType="multipart/form-data"
              >
                <MDBox display="flex" flexDirection="column" px={3} my={4}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <FormField
                        label="Name"
                        placeholder="Alec"
                        name="name"
                        value={user.name}
                        onChange={changeHandler}
                        error={error.name}
                      />
                      {error.name && (
                        <MDTypography variant="caption" color="error" fontWeight="light">
                          {error.textError}
                        </MDTypography>
                      )}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormField
                        label="Email"
                        placeholder="example@email.com"
                        inputProps={{ type: "email" }}
                        name="email"
                        value={user.email}
                        onChange={changeHandler}
                        error={error.email}
                      />
                      {error.email && (
                        <MDTypography variant="caption" color="error" fontWeight="light">
                          {error.textError}
                        </MDTypography>
                      )}
                    </Grid>
                  </Grid>
                  <MDBox display="flex" flexDirection="column" fullWidth>
                    <MDBox display="flex" flexDirection="column" fullWidth marginTop="2rem">
                      <Autocomplete
                        defaultValue={null}
                        options={roles}
                        getOptionLabel={(option) =>
                          {
                            if (option.data) {
                              if (option.data.attributes) {
                                if (option.data.attributes.name) return option.data.attributes.name;
                              }
                            } else {
                              if (option.attributes) {
                                if (option.attributes.name) return option.attributes.name;
                              }
                            }
                            return "";
                          }
                        }
                        value={value ?? null}
                        onChange={(event, newValue) => {
                          setValue(newValue);
                        }}
                        renderInput={(params) => (
                          <FormField {...params} label="Role" InputLabelProps={{ shrink: true }} />
                        )}
                      />
                      {error.role && (
                        <MDTypography variant="caption" color="error" fontWeight="light" pl={4}>
                          {error.textError}
                        </MDTypography>
                      )}
                    </MDBox>
                    <MDBox
                      display="flex"
                      flexDirection="row"
                      alignItems="center"
                      justifyContent="space-between"
                      fullWidth
                    >
                      <MDBox mt={2} display="flex" flexDirection="column">
                        <InputLabel id="demo-simple-select-label">Profile Image</InputLabel>
                        <MDInput
                          fullWidth
                          type="file"
                          name="attachment"
                          onChange={changeImageHandler}
                          id="file-input"
                          accept="image/*"
                          sx={{ mt: "16px" }}
                        ></MDInput>
                      </MDBox>

                      {image && (
                        <MDBox ml={4} mt={2}>
                          <MDAvatar
                            src={imageUrl ?? image}
                            alt="profile-image"
                            size="xxl"
                            shadow="sm"
                          />
                        </MDBox>
                      )}
                    </MDBox>
                  </MDBox>
                  {error.error && (
                    <MDTypography variant="caption" color="error" fontWeight="light" pt={2}>
                      {error.textError}
                    </MDTypography>
                  )}
                  <MDBox ml="auto" mt={4} mb={2} display="flex" justifyContent="flex-end">
                    <MDBox mx={2}>
                      <MDButton
                        variant="gradient"
                        color="dark"
                        size="small"
                        px={2}
                        mx={2}
                        onClick={() =>
                          navigate("/examples-api/user-management", {
                            state: { value: false, text: "" },
                          })
                        }
                      >
                        Back
                      </MDButton>
                    </MDBox>
                    <MDButton variant="gradient" color="dark" size="small" type="submit">
                      Save
                    </MDButton>
                  </MDBox>
                </MDBox>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      {/*<Footer />*/}
    </DashboardLayout>
  );
};

export default EditUser;
