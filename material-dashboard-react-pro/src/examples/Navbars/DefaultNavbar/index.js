/* eslint-disable no-param-reassign */
/**
=========================================================
* Material Dashboard 2 PRO React TS - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-2-pro-react-ts
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState, useEffect, Fragment, useContext } from "react";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// react-router components
import { Link } from "react-router-dom";

// @mui material components
import Icon from "@mui/material/Icon";
import Popper from "@mui/material/Popper";
import Grow from "@mui/material/Grow";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import MuiLink from "@mui/material/Link";
import Container from "@mui/material/Container";

// Material Dashboard 2 PRO React TS components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// Material Dashboard 2 PRO React TS examples components
import DefaultNavbarDropdown from "examples/Navbars/DefaultNavbar/DefaultNavbarDropdown";
import DefaultNavbarMobile from "examples/Navbars/DefaultNavbar/DefaultNavbarMobile";
import DefaultNavbarLink from "examples/Navbars/DefaultNavbar/DefaultNavbarLink";

// Material Dashboard 2 PRO React TS Base Styles
import breakpoints from "assets/theme/base/breakpoints";

// Material Dashboard 2 PRO React context
import { useMaterialUIController, AuthContext } from "context";

function DefaultNavbar({ routes, brand, transparent, light, action }) {
  const authContext = useContext(AuthContext);

  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  const [dropdown, setDropdown] = useState("");
  const [dropdownEl, setDropdownEl] = useState("");
  const [dropdownName, setDropdownName] = useState("");
  const [nestedDropdown, setNestedDropdown] = useState("");
  const [nestedDropdownEl, setNestedDropdownEl] = useState("");
  const [nestedDropdownName, setNestedDropdownName] = useState("");
  const [arrowRef, setArrowRef] = useState(null);
  const [mobileNavbar, setMobileNavbar] = useState(false);
  const [mobileView, setMobileView] = useState(false);

  const openMobileNavbar = () => setMobileNavbar(!mobileNavbar);

  useEffect(() => {
    // A function that sets the display state for the DefaultNavbarMobile.
    function displayMobileNavbar() {
      if (window.innerWidth < breakpoints.values.lg) {
        setMobileView(true);
        setMobileNavbar(false);
      } else {
        setMobileView(false);
        setMobileNavbar(false);
      }
    }

    /** 
     The event listener that's calling the displayMobileNavbar function when 
     resizing the window.
    */
    window.addEventListener("resize", displayMobileNavbar);

    // Call the displayMobileNavbar function to set the state with the initial value.
    displayMobileNavbar();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", displayMobileNavbar);
  }, []);

  const renderNavbarItems = routes.map(({ name, icon, href, route, collapse }) => (
    <DefaultNavbarDropdown
      key={name}
      name={name}
      icon={icon}
      href={href}
      route={route}
      collapse={Boolean(collapse)}
      onMouseEnter={({ currentTarget }) => {
        if (collapse) {
          setDropdown(currentTarget);
          setDropdownEl(currentTarget);
          setDropdownName(name);
        }
      }}
      onMouseLeave={() => collapse && setDropdown(null)}
      light={light}
    />
  ));

  // Render the routes on the dropdown menu
  const renderRoutes = routes.map(({ name, collapse, columns, rowsPerColumn }) => {
    let template;

    // Render the dropdown menu that should be display as columns
    if (collapse && columns && name === dropdownName) {
      const calculateColumns = collapse.reduce((resultArray, item, index) => {
        const chunkIndex = Math.floor(index / rowsPerColumn);

        if (!resultArray[chunkIndex]) {
          resultArray[chunkIndex] = [];
        }

        resultArray[chunkIndex].push(item);

        return resultArray;
      }, []);

      template = (
        <Grid key={name} container spacing={3} py={1} px={1.5}>
          {calculateColumns.map((cols, key) => {
            const gridKey = `grid-${key}`;
            const dividerKey = `divider-${key}`;

            return (
              <Grid key={gridKey} item xs={12 / columns} sx={{ position: "relative" }}>
                {cols.map((col, index) => (
                  <Fragment key={col.name}>
                    <MDBox
                      width="100%"
                      display="flex"
                      alignItems="center"
                      py={1}
                      mt={index !== 0 ? 2 : 0}
                    >
                      <MDBox
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        width="1.5rem"
                        height="1.5rem"
                        borderRadius="md"
                        color="text"
                        mr={1}
                        fontSize="1rem"
                        lineHeight={1}
                      >
                        {col.icon}
                      </MDBox>
                      <MDTypography
                        display="block"
                        variant="button"
                        fontWeight="bold"
                        textTransform="capitalize"
                      >
                        {col.name}
                      </MDTypography>
                    </MDBox>
                    {col.collapse.map((item) => (
                      <MDTypography
                        key={item.name}
                        component={item.route ? Link : MuiLink}
                        to={item.route ? item.route : ""}
                        href={item.href ? item.href : (e) => e.preventDefault()}
                        target={item.href ? "_blank" : ""}
                        rel={item.href ? "noreferrer" : "noreferrer"}
                        minWidth="11.25rem"
                        display="block"
                        variant="button"
                        color="text"
                        textTransform="capitalize"
                        fontWeight="regular"
                        py={0.625}
                        px={2}
                        sx={({ palette: { grey, dark }, borders: { borderRadius } }) => ({
                          borderRadius: borderRadius.md,
                          cursor: "pointer",
                          transition: "all 300ms linear",

                          "&:hover": {
                            backgroundColor: grey[200],
                            color: dark.main,
                          },
                        })}
                      >
                        {item.name}
                      </MDTypography>
                    ))}
                  </Fragment>
                ))}
                {key !== 0 && (
                  <Divider
                    key={dividerKey}
                    orientation="vertical"
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: "-4px",
                      transform: "translateY(-45%)",
                      height: "90%",
                    }}
                  />
                )}
              </Grid>
            );
          })}
        </Grid>
      );

      // Render the dropdown menu that should be display as list items
    } else if (collapse && name === dropdownName) {
      template = collapse.map((item) => {
        const linkComponent = {
          component: MuiLink,
          href: item.href,
          target: "_blank",
          rel: "noreferrer",
        };

        const routeComponent = {
          component: Link,
          to: item.route,
        };

        return (
          <MDTypography
            key={item.name}
            {...(item.route ? routeComponent : linkComponent)}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            variant="button"
            textTransform="capitalize"
            minWidth={item.description ? "14rem" : "12rem"}
            color={item.description ? "dark" : "text"}
            fontWeight={item.description ? "bold" : "regular"}
            py={item.description ? 1 : 0.625}
            px={2}
            sx={({ palette: { grey, dark }, borders: { borderRadius } }) => ({
              borderRadius: borderRadius.md,
              cursor: "pointer",
              transition: "all 300ms linear",

              "&:hover": {
                backgroundColor: grey[200],
                color: dark.main,

                "& *": {
                  color: dark.main,
                },
              },
            })}
            onMouseEnter={({ currentTarget }) => {
              if (item.dropdown) {
                setNestedDropdown(currentTarget);
                setNestedDropdownEl(currentTarget);
                setNestedDropdownName(item.name);
              }
            }}
            onMouseLeave={() => {
              if (item.dropdown) {
                setNestedDropdown(null);
              }
            }}
          >
            {item.description ? (
              <MDBox display="flex" py={0.25} fontSize="1rem" color="text">
                {typeof item.icon === "string" ? (
                  <Icon color="inherit">{item.icon}</Icon>
                ) : (
                  <MDBox color="inherit">{item.icon}</MDBox>
                )}
                <MDBox pl={1} lineHeight={0}>
                  <MDTypography
                    variant="button"
                    display="block"
                    fontWeight="bold"
                    textTransform="capitalize"
                  >
                    {item.name}
                  </MDTypography>
                  <MDTypography variant="button" fontWeight="regular" color="text">
                    {item.description}
                  </MDTypography>
                </MDBox>
              </MDBox>
            ) : (
              <MDBox display="flex" alignItems="center" color="text">
                <Icon sx={{ mr: 1 }}>{item.icon}</Icon>
                {item.name}
              </MDBox>
            )}
            {item.collapse && (
              <Icon sx={{ fontWeight: "normal", verticalAlign: "middle", mr: -0.5 }}>
                keyboard_arrow_right
              </Icon>
            )}
          </MDTypography>
        );
      });
    }

    return template;
  });

  // Routes dropdown menu
  const dropdownMenu = (
    <Popper
      anchorEl={dropdown}
      popperRef={null}
      open={Boolean(dropdown)}
      placement="top-start"
      transition
      style={{ zIndex: 999 }}
      modifiers={[
        {
          name: "arrow",
          enabled: true,
          options: {
            element: arrowRef,
          },
        },
      ]}
      onMouseEnter={() => setDropdown(dropdownEl)}
      onMouseLeave={() => {
        if (!nestedDropdown) {
          setDropdown(null);
          setDropdownName("");
        }
      }}
    >
      {({ TransitionProps }) => (
        <Grow
          {...TransitionProps}
          sx={{
            transformOrigin: "left top",
            background: ({ palette: { white } }) => white.main,
          }}
        >
          <MDBox borderRadius="lg">
            <MDTypography variant="h1" color="white">
              <Icon ref={setArrowRef} sx={{ mt: -3 }}>
                arrow_drop_up
              </Icon>
            </MDTypography>
            <MDBox shadow="lg" borderRadius="lg" p={1.625} mt={1}>
              {renderRoutes}
            </MDBox>
          </MDBox>
        </Grow>
      )}
    </Popper>
  );

  // Render routes that are nested inside the dropdown menu routes
  const renderNestedRoutes = routes.map(({ collapse, columns }) =>
    collapse && !columns
      ? collapse.map(({ name: parentName, collapse: nestedCollapse }) => {
          let template;

          if (parentName === nestedDropdownName) {
            template =
              nestedCollapse &&
              nestedCollapse.map((item) => {
                const linkComponent = {
                  component: MuiLink,
                  href: item.href,
                  target: "_blank",
                  rel: "noreferrer",
                };

                const routeComponent = {
                  component: Link,
                  to: item.route,
                };

                return (
                  <MDTypography
                    key={item.name}
                    {...(item.route ? routeComponent : linkComponent)}
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    variant="button"
                    textTransform="capitalize"
                    minWidth={item.description ? "14rem" : "12rem"}
                    color={item.description ? "dark" : "text"}
                    fontWeight={item.description ? "bold" : "regular"}
                    py={item.description ? 1 : 0.625}
                    px={2}
                    sx={({ palette: { grey, dark }, borders: { borderRadius } }) => ({
                      borderRadius: borderRadius.md,
                      cursor: "pointer",
                      transition: "all 300ms linear",

                      "&:hover": {
                        backgroundColor: grey[200],
                        color: dark.main,

                        "& *": {
                          color: dark.main,
                        },
                      },
                    })}
                  >
                    {item.description ? (
                      <MDBox>
                        {item.name}
                        <MDTypography
                          display="block"
                          variant="button"
                          color="text"
                          fontWeight="regular"
                          sx={{ transition: "all 300ms linear" }}
                        >
                          {item.description}
                        </MDTypography>
                      </MDBox>
                    ) : (
                      item.name
                    )}
                    {item.collapse && (
                      <Icon
                        fontSize="small"
                        sx={{ fontWeight: "normal", verticalAlign: "middle", mr: -0.5 }}
                      >
                        keyboard_arrow_right
                      </Icon>
                    )}
                  </MDTypography>
                );
              });
          }

          return template;
        })
      : null
  );

  // Dropdown menu for the nested dropdowns
  const nestedDropdownMenu = (
    <Popper
      anchorEl={nestedDropdown}
      popperRef={null}
      open={Boolean(nestedDropdown)}
      placement="right-start"
      transition
      style={{ zIndex: 999 }}
      onMouseEnter={() => {
        setNestedDropdown(nestedDropdownEl);
      }}
      onMouseLeave={() => {
        setNestedDropdown(null);
        setNestedDropdownName("");
        setDropdown(null);
      }}
    >
      {({ TransitionProps }) => (
        <Grow
          {...TransitionProps}
          sx={{
            transformOrigin: "left top",
            background: ({ palette: { white } }) => white.main,
          }}
        >
          <MDBox ml={2.5} mt={-2.5} borderRadius="lg">
            <MDBox shadow="lg" borderRadius="lg" py={1.5} px={1} mt={2}>
              {renderNestedRoutes}
            </MDBox>
          </MDBox>
        </Grow>
      )}
    </Popper>
  );

  return (
    <Container>
      <MDBox
        py={1}
        px={{ xs: 4, sm: transparent ? 2 : 3, lg: transparent ? 0 : 2 }}
        my={3}
        mx={3}
        width="calc(100% - 48px)"
        borderRadius="lg"
        shadow={transparent ? "none" : "md"}
        color={light ? "white" : "dark"}
        position="absolute"
        left={0}
        zIndex={99}
        sx={({
          palette: { transparent: transparentColor, white, background },
          functions: { rgba },
        }) => ({
          backgroundColor: transparent
            ? transparentColor.main
            : rgba(darkMode ? background.sidenav : white.main, 0.8),
          backdropFilter: transparent ? "none" : `saturate(200%) blur(30px)`,
        })}
      >
        <MDBox display="flex" justifyContent="space-between" alignItems="center">
          <MDBox
            component={Link}
            to="/"
            py={transparent ? 1.5 : 0.75}
            lineHeight={1}
            pl={{ xs: 0, lg: 1 }}
          >
            <MDTypography variant="button" fontWeight="bold" color={"dark"}>
              {brand}
            </MDTypography>
          </MDBox>
          <MDBox color="inherit" display={{ xs: "none", lg: "flex" }} m={0} p={0}>
            {authContext.isAuthenticated && renderNavbarItems}
            {!authContext.isAuthenticated && (
              <MDBox color="inherit" display={{ xs: "none", lg: "flex" }} m={0} p={0}>
                <DefaultNavbarLink
                  icon="account_circle"
                  name="register"
                  route="/auth/register"
                  light={darkMode}
                />
                <DefaultNavbarLink icon="key" name="login" route="/auth/login" light={darkMode} />
              </MDBox>
            )}
          </MDBox>
          {action &&
            (action.type === "internal" ? (
              <MDBox display={{ xs: "none", lg: "inline-block" }}>
                <MDButton
                  component={Link}
                  to={action.route}
                  variant="gradient"
                  color={action.color ? action.color : "info"}
                  size="small"
                >
                  {action.label}
                </MDButton>
              </MDBox>
            ) : (
              <MDBox display={{ xs: "none", lg: "inline-block" }}>
                <MDButton
                  component="a"
                  href={action.route}
                  target="_blank"
                  rel="noreferrer"
                  variant="gradient"
                  color={action.color ? action.color : "info"}
                  size="small"
                  sx={{ mt: -0.3 }}
                >
                  {action.label}
                </MDButton>
              </MDBox>
            ))}
          <MDBox
            display={{ xs: "inline-block", lg: "none" }}
            lineHeight={0}
            py={1.5}
            pl={1.5}
            color={transparent ? "white" : "inherit"}
            sx={{ cursor: "pointer" }}
            onClick={openMobileNavbar}
          >
            <Icon fontSize="default">{mobileNavbar ? "close" : "menu"}</Icon>
          </MDBox>
        </MDBox>
        <MDBox
          bgColor={transparent ? "white" : "transparent"}
          shadow={transparent ? "lg" : "none"}
          borderRadius="md"
          px={transparent ? 2 : 0}
        >
          {mobileView && <DefaultNavbarMobile routes={routes} open={mobileNavbar} />}
        </MDBox>
      </MDBox>
      {dropdownMenu}
      {nestedDropdownMenu}
    </Container>
  );
}

// Declaring default props for DefaultNavbar
DefaultNavbar.defaultProps = {
  brand: "ExpenseTracker",
  transparent: false,
  light: true,
  action: false,
};

// Typechecking props for the DefaultNavbar
DefaultNavbar.propTypes = {
  brand: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
  transparent: PropTypes.bool,
  light: PropTypes.bool,
  action: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.shape({
      type: PropTypes.oneOf(["external", "internal"]).isRequired,
      route: PropTypes.string.isRequired,
      color: PropTypes.oneOf([
        "primary",
        "secondary",
        "info",
        "success",
        "warning",
        "error",
        "dark",
        "light",
        "default",
        "white",
      ]),
      label: PropTypes.string.isRequired,
    }),
  ]),
};

export default DefaultNavbar;
/**
 *### DefaultNavbar 组件使用说明
 *
 * `DefaultNavbar` 是一个基于 Material Dashboard 2 PRO React TS 的导航栏组件，适用于构建响应式、可定制的导航栏。以下是该组件的使用说明：
 *
 * #### 1. 引入组件
 * 首先，确保你已经安装了 `Material Dashboard 2 PRO React TS` 的相关依赖，并在你的项目中引入 `DefaultNavbar` 组件：
 *
 * ```javascript
 * import DefaultNavbar from "examples/Navbars/DefaultNavbar";
 * ```
 *
 * #### 2. 基本用法
 * `DefaultNavbar` 组件接受以下几个主要属性：
 *
 * - **`brand`**: 导航栏的品牌名称或 Logo，默认为 `"ExpenseTracker test"`。
 * - **`routes`**: 导航栏的路由配置，是一个包含路由信息的数组，每个路由对象可以包含 `name`、`icon`、`href`、`route` 和 `collapse` 等属性。
 * - **`transparent`**: 是否使用透明背景，默认为 `false`。
 * - **`light`**: 是否使用浅色主题，默认为 `false`。
 * - **`action`**: 导航栏右侧的操作按钮配置，可以是一个对象或 `false`（表示不显示操作按钮）。
 *
 * ```javascript
 * const routes = [
 *   {
 *     name: "Dashboard",
 *     icon: "dashboard",
 *     route: "/dashboard",
 *   },
 *   {
 *     name: "Profile",
 *     icon: "person",
 *     route: "/profile",
 *   },
 *   {
 *     name: "Settings",
 *     icon: "settings",
 *     collapse: [
 *       {
 *         name: "General",
 *         route: "/settings/general",
 *       },
 *       {
 *         name: "Security",
 *         route: "/settings/security",
 *       },
 *     ],
 *   },
 * ];
 *
 * <DefaultNavbar
 *   brand="MyApp"
 *   routes={routes}
 *   transparent={true}
 *   light={true}
 *   action={{
 *     type: "internal",
 *     route: "/dashboard",
 *     color: "primary",
 *     label: "Go to Dashboard",
 *   }}
 * />;
 * ```
 *
 * #### 3. 路由配置
 * `routes` 属性是一个数组，每个路由对象可以包含以下属性：
 *
 * - **`name`**: 路由名称，显示在导航栏中。
 * - **`icon`**: 路由图标，可以是字符串（Material Icons）或 React 组件。
 * - **`href`**: 外部链接地址（可选）。
 * - **`route`**: 内部路由地址（可选）。
 * - **`collapse`**: 子路由配置，用于创建下拉菜单（可选）。
 *
 * #### 4. 响应式设计
 * `DefaultNavbar` 组件会自动根据屏幕宽度调整布局。在小屏幕设备上，导航栏会折叠成一个汉堡菜单，点击后展开。
 *
 * #### 5. 自定义样式
 * 你可以通过 `transparent` 和 `light` 属性来控制导航栏的背景和文字颜色。此外，还可以通过 `action` 属性添加自定义的操作按钮。
 *
 * #### 6. 示例代码
 * 以下是一个完整的示例代码，展示了如何使用 `DefaultNavbar` 组件：
 *
 * ```javascript
 * import React from "react";
 * import DefaultNavbar from "examples/Navbars/DefaultNavbar";
 *
 * const routes = [
 *   {
 *     name: "Dashboard",
 *     icon: "dashboard",
 *     route: "/dashboard",
 *   },
 *   {
 *     name: "Profile",
 *     icon: "person",
 *     route: "/profile",
 *   },
 *   {
 *     name: "Settings",
 *     icon: "settings",
 *     collapse: [
 *       {
 *         name: "General",
 *         route: "/settings/general",
 *       },
 *       {
 *         name: "Security",
 *         route: "/settings/security",
 *       },
 *     ],
 *   },
 * ];
 *
 * function App() {
 *   return (
 *     <DefaultNavbar
 *       brand="MyApp"
 *       routes={routes}
 *       transparent={true}
 *       light={true}
 *       action={{
 *         type: "internal",
 *         route: "/dashboard",
 *         color: "primary",
 *         label: "Go to Dashboard",
 *       }}
 *     />
 *   );
 * }
 *
 * export default App;
 * ```
 *
 * #### 7. 注意事项
 * - 确保 `routes` 属性中的每个路由对象都包含 `name` 和 `route` 或 `href` 属性。
 * - 如果使用 `collapse` 属性来创建下拉菜单，确保每个子路由对象也包含 `name` 和 `route` 或 `href` 属性。
 *
 * 通过以上说明，你应该能够顺利使用 `DefaultNavbar` 组件来构建你的应用导航栏。
 **/
