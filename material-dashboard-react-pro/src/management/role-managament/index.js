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

// @mui material components
import Card from "@mui/material/Card";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAlert from "components/MDAlert";

// Material Dashboard 2 PRO React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import MDButton from "components/MDButton";
import { Tooltip, IconButton } from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import CrudService from "services/cruds-service";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AbilityContext, Can } from "Can";
import { useAbility } from "@casl/react";
import getId from "services/helper-service";

function RoleManagement() {
  let { state } = useLocation();

  const navigate = useNavigate();
  const ability = useAbility(AbilityContext);
  const [data, setData] = useState([]);
  const [isDemo, setIsDemo] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [notification, setNotification] = useState({
    value: false,
    text: "",
  });

  useEffect(() => {
    (async () => {
      const response = await CrudService.getRoles();
      setData(response.data);
      setIsDemo(process.env.REACT_APP_IS_DEMO === "true");
    })();
  }, []);

  useEffect(() => {
    setTableData(getRows(data));
  }, [data]);

  useEffect(() => {
    if (!state) return;
    setNotification({
      value: state.value,
      text: state.text,
    });
  }, [state]);

  useEffect(() => {
    if (notification.value === true) {
      let timer = setTimeout(() => {
        setNotification({
          value: false,
          text: "",
        });
      }, 5000);
    }
  }, [notification]);

  const clickAddHandler = () => {
    navigate("/role-management/new-role");
  };

  const clickEditHandler = (id) => {
    navigate(`/role-management/edit-role/${id}`);
  };

  const clickDeleteHandler = async (e, id) => {
    try {
      // eslint-disable-next-line no-restricted-globals
      if (!confirm("Are you sure you want to delete this role?")) {
        e.nativeEvent.stopImmediatePropagation();
      } else {
        await CrudService.deleteRole(id);
        // the delete does not send a response
        // so I need to get again the tags to set it and this way the table gets updated -> it goes to the useEffect with data dependecy
        const response = await CrudService.getRoles();
        setData(response.data);
        setNotification({
          value: true,
          text: "The role has been successfully deleted",
        });
      }
    } catch (err) {
      // it sends error is the category is associated with an item
      console.error(err);
      if (err.hasOwnProperty("errors")) {
        setNotification({
          value: true,
          text: err.errors[0].title,
        });
      }
      return null;
    }
  };

  const getRows = (info) => {
    let updatedInfo = info.map((row) => {
      return {
        id: row.id,
        name: row.attributes.name,
        created_at: row.attributes.created_at,
      };
    });
    return updatedInfo;
  };

  const dataTableData = {
    columns: [
      { Header: "name", accessor: "name", width: "35%" },
      { Header: "created at", accessor: "created_at", width: "35%" },
      {
        Header: "actions",
        disableSortBy: true,
        accessor: "",
        Cell: (info) => {
          return (
            <MDBox display="flex" alignItems="center">
              <Can I="delete" a="users">
                {isDemo ? (
                  getId(info.cell.row.original.id) !== 1 &&
                  getId(info.cell.row.original.id) !== 2 &&
                  getId(info.cell.row.original.id) !== 3 && (
                    <Tooltip
                      title="Delete Role"
                      onClick={(e) => clickDeleteHandler(e, info.cell.row.original.id)}
                    >
                      <IconButton>
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  )
                ) : (
                  <Tooltip
                    title="Delete Role"
                    onClick={(e) => clickDeleteHandler(e, info.cell.row.original.id)}
                  >
                    <IconButton>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                )}
              </Can>
              {ability.can("edit", "roles") && (
                <Tooltip
                  title="Edit Role"
                  onClick={() => clickEditHandler(info.cell.row.original.id)}
                >
                  <IconButton>
                    <EditIcon />
                  </IconButton>
                </Tooltip>
              )}
            </MDBox>
          );
        },
      },
      ,
    ],

    rows: tableData,
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      {notification.value && (
        <MDAlert color="info" my="20px">
          <MDTypography variant="body2" color="white">
            {notification.text}
          </MDTypography>
        </MDAlert>
      )}
      <MDBox pt={6} pb={3}>
        <MDBox mb={3}>
          <Card>
            <MDBox p={3} lineHeight={1} display="flex" justifyContent="space-between">
              <MDTypography variant="h5" fontWeight="medium">
                Role Management
              </MDTypography>
              {ability.can("create", "roles") && !isDemo && (
                <MDButton
                  variant="gradient"
                  color="dark"
                  size="small"
                  type="submit"
                  onClick={clickAddHandler}
                >
                  + Add Role
                </MDButton>
              )}
            </MDBox>
            <DataTable table={dataTableData} />
          </Card>
        </MDBox>
      </MDBox>
      {/*<Footer />*/}
    </DashboardLayout>
  );
}

export default RoleManagement;
