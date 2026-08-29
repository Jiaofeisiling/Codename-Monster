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

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 PRO React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import MDButton from "components/MDButton";
import MDAvatar from "components/MDAvatar";
import MDAlert from "components/MDAlert";
import { Tooltip, IconButton } from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import CrudService from "services/cruds-service";
import HttpService from "services/http.service";
import { useNavigate } from "react-router-dom";
import { AbilityContext } from "Can";
import { useAbility } from "@casl/react";

function ItemManagement() {
  const [items, setItems] = useState([]);
  const ability = useAbility(AbilityContext);
  const [updated, setUpdated] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [notification, setNotification] = useState({
    value: false,
    text: "",
  });

  const navigate = useNavigate();

  const getCategory = async (item) => {
    try {
      return await HttpService.get(item.relationships.category.links.related);
    } catch (err) {
      // throw new Error(err);
      console.error(err);
      return null;
    }
  };

  const getTags = async (item) => {
    try {
      return await HttpService.get(item.relationships.tags.links.related);
    } catch (err) {
      // throw new error
      console.error(err);
      return null;
    }
  };

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
    navigate("/item-management/new-item");
  };

  const clickEditHandler = (id) => {
    navigate(`/item-management/edit-item/${id}`);
  };

  const clickDeleteHandler = async (e, id) => {
    try {
      // eslint-disable-next-line no-restricted-globals
      if (!confirm("Are you sure you want to delete this item?")) {
        e.nativeEvent.stopImmediatePropagation();
      } else {
        await CrudService.deleteItem(id);
        // the delete does not send a response
        // so I need to get again the tags to set it and this way the table gets updated -> it goes to the useEffect with data dependecy
        setUpdated((prevState) => !prevState);
        setNotification({
          value: true,
          text: "The item has been successfully deleted",
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

  useEffect(() => {
    (async () => {
      const response = await CrudService.getItems();
      const myData = response.data;

      const categories = await Promise.all(myData.map((item) => getCategory(item)));
      const tags = await Promise.all(myData.map((item) => getTags(item)));

      const toSetTags = [];
      for (let i = 0; i < tags.length; i++) {
        const element = tags[i].data.map((tag) => {
          return {
            key: `${i}-${tag.id}`,
            name: tag.attributes.name,
            color: tag.attributes.color,
          };
        });
        toSetTags.push(element);
      }

      let newItems = new Array();
      for (let i = 0; i < myData.length; i++) {
        // if null it means it throwed an error so should jump it
        if (categories[i] !== null && toSetTags[i] !== null) {
          const item = {
            id: myData[i].id,
            category: categories[i].data.attributes.name,
            image: myData[i].attributes.image,
            name: myData[i].attributes.name,
            created_at: myData[i].attributes.created_at,
            tags: toSetTags[i],
          };
          newItems.push(item);
        }
      }

      setItems(newItems);
      setTableData(newItems);
    })();
  }, [updated]);

  const dataTableData = {
    columns: [
      { Header: "name", accessor: "name", width: "15%" },
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
      { Header: "category", accessor: "category", width: "15%" },
      {
        Header: "tags",
        accessor: "tags",
        width: "20%",
        Cell: ({ cell: { value } }) => {
          return (
            <>
              {value.map((tag) => {
                return (
                  <MDBox
                    display="flex"
                    flexDirection="row"
                    flexWrap={true}
                    sx={{ backgroundColor: tag.color, borderRadius: 16 }}
                    px={2}
                    mt={0.5}
                    py={0.5}
                    key={tag.key}
                  >
                    <MDTypography variant="caption" color="white" width="100%" textAlign="center">
                      {tag.name}
                    </MDTypography>
                  </MDBox>
                );
              })}
            </>
          );
        },
      },
      { Header: "created at", accessor: "created_at", width: "15%" },
      {
        Header: "actions",
        disableSortBy: true,
        accessor: "",
        Cell: (info) => {
          return (
            <MDBox display="flex" alignItems="center">
              {ability.can("delete", "items") && (
                <Tooltip
                  title="Delete Item"
                  onClick={(e) => clickDeleteHandler(e, info.cell.row.original.id)}
                >
                  <IconButton>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              )}
              {ability.can("edit", "items") && (
                <Tooltip
                  title="Edit Item"
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
                Item Management
              </MDTypography>
              {ability.can("create", "items") && (
                <MDButton
                  variant="gradient"
                  color="dark"
                  size="small"
                  type="submit"
                  onClick={clickAddHandler}
                >
                  + Add Item
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

export default ItemManagement;
