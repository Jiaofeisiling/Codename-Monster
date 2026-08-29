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
import MDAvatar from "components/MDAvatar";
import { Tooltip, IconButton } from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import CrudService from "services/cruds-service";
import { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { AbilityContext } from "Can";
import { useAbility } from "@casl/react";
import { Can } from "Can";
import { subject } from "@casl/ability";

import getId from "services/helper-service";

function UserManagement() {
  let { state } = useLocation();
  const [isDemo, setIsDemo] = useState(false);
  const [user, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [notification, setNotification] = useState({
    value: false,
    text: "",
  });

  const navigate = useNavigate();
  const ability = useAbility(AbilityContext);

  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await CrudService.getUsers();
      setUsers(response.data);
      setRoles(response.included);
      setIsDemo(process.env.REACT_APP_IS_DEMO === "true");
    })();
  }, []);

  useEffect(() => {
    if (!state) return;
    setNotification({
      value: state.value,
      text: state.text,
    });
  }, [state]);

  useEffect(() => {
    setTableData(getRows(user));
  }, [user]);

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
    navigate("/user-management/new-user");
  };

  const clickEditHandler = (id) => {
    navigate(`/user-management/edit-user/${id}`);
  };

  const clickDeleteHandler = async (e, id) => {
    try {
      // eslint-disable-next-line no-restricted-globals
      if (!confirm("Are you sure you want to delete this user?")) {
        e.nativeEvent.stopImmediatePropagation();
      } else {
        await CrudService.deleteUser(id);
        // the delete does not send a response
        // so I need to get again the tags to set it and this way the table gets updated -> it goes to the useEffect with data dependecy
        const response = await CrudService.getUsers();
        setUsers(response.data);
        setNotification({
          value: true,
          text: "The user has been successfully deleted",
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
      let roleId = row.relationships.roles.data[0].id;
      let roleName = roles.find((role) => role.id == roleId);
      return {
        type: "users",
        id: row.id,
        image: row.attributes.profile_image,
        name: row.attributes.name,
        email: row.attributes.email,
        role: roleName.attributes.name,
        created_at: row.attributes.created_at,
      };
    });
    return updatedInfo;
  };

  const dataTableData = {
    columns: [
      {
        Header: "image",
        accessor: "image",
        width: "15%",
        disableSortBy: true,
        Cell: ({ cell: { value } }) => {
          return (
            <>
              <MDAvatar src={value} alt="profile-image" size="xl" shadow="sm" />
            </>
          );
        },
      },
      { Header: "name", accessor: "name", width: "15%" },
      { Header: "email", accessor: "email", width: "20%" },
      { Header: "role", accessor: "role", width: "15%" },
      { Header: "created at", accessor: "created_at", width: "15%" },
      {
        Header: "actions",
        disableSortBy: true,
        accessor: "",
        Cell: (info) => {
          return (
            <MDBox display="flex" alignItems="center">
              <Can I="delete" this={subject("users", info.cell.row.original)}>
                {isDemo ? (
                  getId(info.cell.row.original.id) !== 1 &&
                  getId(info.cell.row.original.id) !== 2 &&
                  getId(info.cell.row.original.id) !== 3 && (
                    <Tooltip
                      title="Delete User"
                      onClick={(e) => clickDeleteHandler(e, info.cell.row.original.id)}
                    >
                      <IconButton>
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  )
                ) : (
                  <Tooltip
                    title="Delete User"
                    onClick={(e) => clickDeleteHandler(e, info.cell.row.original.id)}
                  >
                    <IconButton>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                )}
              </Can>
              <Can I="edit" this={subject("users", info.cell.row.original)}>
                {isDemo ? (
                  info.cell.row.original.id !== "1" &&
                  info.cell.row.original.id !== "2" &&
                  info.cell.row.original.id !== "3" && (
                    <Tooltip
                      title="Edit User"
                      onClick={() => clickEditHandler(info.cell.row.original.id)}
                    >
                      <IconButton>
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                  )
                ) : (
                  <Tooltip
                    title="Edit User"
                    onClick={() => clickEditHandler(info.cell.row.original.id)}
                  >
                    <IconButton>
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                )}
              </Can>
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
                User Management
              </MDTypography>
              {ability.can("create", "users") && (
                <MDButton
                  variant="gradient"
                  color="dark"
                  size="small"
                  type="submit"
                  onClick={clickAddHandler}
                >
                  + Add User
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

export default UserManagement;
