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
import { useNavigate, useParams } from "react-router-dom";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 PRO React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import FormField from "layouts/applications/wizard/components/FormField";

import CrudService from "services/cruds-service";

const EditTag = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [color, setColor] = useState({ color: "#5e72e4" });
  const [name, setName] = useState({
    id: "",
    text: "",
    error: false,
    textError: "",
  });

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const res = await CrudService.getTag(id);
        setName({
          id: res.data.id,
          text: res.data.attributes.name,
        });
        setColor({ color: res.data.attributes.color });
      } catch (err) {
        console.error(err);
        return null;
      }
    })();
  }, [id]);

  const changeNameHandler = (e) => {
    setName({ ...name, text: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (name.text.trim().length < 1) {
      setName({ ...name, error: true, textError: "The tag name is required" });
      return;
    }

    const tag = {
      data: {
        type: "tags",
        id: name.id.toString(),
        attributes: {
          name: name.text,
          color: color.color,
        },
      },
    };

    try {
      await CrudService.updateTag(tag, tag.data.id);
      navigate("/examples-api/tag-management", {
        state: { value: true, text: "The tag was sucesfully created" },
      });
    } catch (err) {
      if (err.hasOwnProperty("errors")) {
        setName({ ...name, error: true, textError: err.errors[0].detail });
      }
      console.error(err);
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar breadcrumbTitle={name.text}/>
      <MDBox mt={5} mb={9}>
        <Grid container justifyContent="center">
          <Grid item xs={12} lg={8}>
            <MDBox mt={6} mb={8} textAlign="center">
              <MDBox mb={1}>
                <MDTypography variant="h3" fontWeight="bold">
                  Edit Tag
                </MDTypography>
              </MDBox>
              <MDTypography variant="h5" fontWeight="regular" color="secondary">
                This information will describe more about the tag.
              </MDTypography>
            </MDBox>
            <Card>
              <MDBox component="form" method="POST" onSubmit={submitHandler}>
                <MDBox display="flex" flexDirection="column" px={3} my={2}>
                  <MDBox p={1}>
                    <FormField
                      type="text"
                      label="Name"
                      name="name"
                      value={name.text}
                      onChange={changeNameHandler}
                      error={name.error}
                    />
                    {name.error && (
                      <MDTypography variant="caption" color="error" fontWeight="light">
                        {name.textError}
                      </MDTypography>
                    )}
                  </MDBox>
                  <MDBox mt={2}>
                    <FormField
                      type="color"
                      label="Color"
                      name="color"
                      value={color.color}
                        onChange={(e) =>
                          setColor({
                            color: e.target.value,
                          })
                        }
                    />
                  </MDBox>
                  <MDBox ml="auto" mt={4} mb={2} display="flex" justifyContent="flex-end">
                    <MDBox mx={2}>
                      <MDButton
                        variant="gradient"
                        color="dark"
                        size="small"
                        px={2}
                        mx={2}
                        onClick={() =>
                          navigate("/examples-api/tag-management", {
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

export default EditTag;
