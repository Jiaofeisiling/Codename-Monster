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

import EditCategory from "./management/category-management/edit-category";
import NewCategory from "./management/category-management/new-category";
import EditItem from "./management/item-management/edit-item";
import NewItem from "./management/item-management/new-item";
import EditRole from "./management/role-managament/edit-role";
import NewRole from "./management/role-managament/new-role";
import EditTag from "./management/tag-management/edit-tag";
import NewTag from "./management/tag-management/new-tag";
import EditUser from "./management/user-management/edit-user";
import NewUser from "./management/user-management/new-user";
import NewTransaction from "./layouts/dashboards/home/transaction/new-transaction";

/** 
  All of the routes for the Material Dashboard 2 PRO React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that contains other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/

// Material Dashboard 2 PRO React layouts

const crudRoutes = [
  {
    key: "new-category",
    route: "/category-management/new-category",
    component: <NewCategory />,
    type: "cateogories",
  },
  {
    key: "new-transaction",
    route: "/transaction-management/new-transaction",
    component: <NewTransaction />,
    type: "transactions",
  },
  {
    key: "edit-category",
    route: "/category-management/edit-category/:id",
    component: <EditCategory />,
    type: "cateogories",
  },
  {
    key: "new-tag",
    route: "/tag-management/new-tag",
    component: <NewTag />,
    type: "tags",
  },
  {
    key: "edit-tag",
    route: "/tag-management/edit-tag/:id",
    component: <EditTag />,
    type: "tags",
  },
  {
    key: "new-role",
    route: "/role-management/new-role",
    component: <NewRole />,
    type: "roles",
  },
  {
    key: "edit-role",
    route: "/role-management/edit-role/:id",
    component: <EditRole />,
    type: "roles",
  },
  {
    key: "new-user",
    route: "/user-management/new-user",
    component: <NewUser />,
    type: "users",
  },
  {
    key: "edit-user",
    route: "/user-management/edit-user/:id",
    component: <EditUser />,
    type: "users",
  },
  {
    key: "new-item",
    route: "/item-management/new-item",
    component: <NewItem />,
    type: "items",
  },
  {
    key: "edit-item",
    route: "/item-management/edit-item/:id",
    component: <EditItem />,
    type: "items",
  },
];

export default crudRoutes;
