/**
  Sidebar routes for ExpenseTracker.
  Template demo pages from Material Dashboard 2 PRO React remain in the repo
  but are not linked here so this app is presented as an expense product, not a dashboard kit.
 */

import Home from "layouts/dashboards/home";
import ProfileOverview from "layouts/pages/profile/profile-overview";
import Settings from "layouts/pages/account/settings";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faNode } from "@fortawesome/free-brands-svg-icons";

import UserProfile from "./management/user-profile";
import RoleManagement from "./management/role-managament";
import CategoryManagement from "./management/category-management";
import TagManagement from "./management/tag-management";
import UserManagement from "./management/user-management";

import MDAvatar from "components/MDAvatar";
import Icon from "@mui/material/Icon";
import profilePicture from "assets/images/team-3.jpg";

const routes = [
  {
    type: "collapse",
    name: "Account",
    key: "user-name",
    icon: <MDAvatar src={profilePicture} alt="User" size="sm" />,
    collapse: [
      {
        name: "My Profile",
        key: "profile-overview",
        route: "/pages/profile/profile-overview",
        component: <ProfileOverview />,
      },
      {
        name: "Settings",
        key: "settings",
        route: "/pages/account/settings",
        component: <Settings />,
      },
      {
        name: "Logout",
        key: "logout",
      },
    ],
  },
  { type: "divider", key: "divider-0" },
  {
    type: "collapse",
    name: "Home",
    key: "home",
    icon: <Icon fontSize="medium">receipt_long</Icon>,
    noCollapse: true,
    route: "/dashboards/home",
    component: <Home />,
  },
  { type: "divider", key: "divider-1" },
  { type: "title", title: "Management", key: "crud-pages" },
  {
    type: "collapse",
    name: "Management",
    key: "react-nodejs",
    icon: <FontAwesomeIcon icon={faNode} size="sm" />,
    collapse: [
      {
        name: "User Profile",
        key: "user-profile",
        route: "/examples-api/user-profile",
        component: <UserProfile />,
      },
      {
        name: "User Management",
        key: "user-management",
        route: "/examples-api/user-management",
        component: <UserManagement />,
        type: "users",
      },
      {
        name: "Role Management",
        key: "role-management",
        route: "/examples-api/role-management",
        component: <RoleManagement />,
        type: "roles",
      },
      {
        name: "Category Management",
        key: "category-management",
        route: "/examples-api/category-management",
        component: <CategoryManagement />,
        type: "categories",
      },
      {
        name: "Tag Management",
        key: "tag-management",
        route: "/examples-api/tag-management",
        component: <TagManagement />,
        type: "tags",
      },
    ],
  },
];

export default routes;
