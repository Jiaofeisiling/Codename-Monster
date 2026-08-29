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

// react-router components
import { useLocation, Link } from "react-router-dom";

// prop-types 是一个用于类型检查的库
import PropTypes from "prop-types";

// @material-ui core components
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDBadge from "components/MDBadge";

// Material Dashboard 2 PRO React examples
import Breadcrumbs from "examples/Breadcrumbs";
import NotificationItem from "examples/Items/NotificationItem";

// Custom styles for DashboardNavbar
import {
  navbar,
  navbarContainer,
  navbarRow,
  navbarIconButton,
  navbarDesktopMenu,
  navbarMobileMenu,
} from "examples/Navbars/DashboardNavbar/styles";

// Material Dashboard 2 PRO React context
import {
  useMaterialUIController,
  setTransparentNavbar,
  setMiniSidenav,
  setOpenConfigurator,
} from "context";

function DashboardNavbar({ absolute, light, isMini, breadcrumbTitle = null }) {
  const [navbarType, setNavbarType] = useState();
  const [controller, dispatch] = useMaterialUIController();
  const { miniSidenav, transparentNavbar, fixedNavbar, openConfigurator, darkMode } = controller;
  const [openUserMenu, setOpenUserMenu] = useState(null);
  const [openNotificationMenu, setOpenNotificationMenu] = useState(null);
  const route = useLocation().pathname.split("/").slice(1);

  useEffect(() => {
    // 设置导航栏类型
    if (fixedNavbar) {
      setNavbarType("sticky"); // 如果 fixedNavbar 为 true，设置为 sticky 类型
    } else {
      setNavbarType("static"); // 否则设置为 static 类型
    }

    // 设置导航栏透明状态的函数
    function handleTransparentNavbar() {
      setTransparentNavbar(dispatch, (fixedNavbar && window.scrollY === 0) || !fixedNavbar);
    }

    /**
     添加滚动事件监听器，当滚动窗口时调用 handleTransparentNavbar 函数
    */
    window.addEventListener("scroll", handleTransparentNavbar);

    // 调用 handleTransparentNavbar 函数以设置初始状态
    handleTransparentNavbar();

    // 在组件卸载时移除事件监听器
    return () => window.removeEventListener("scroll", handleTransparentNavbar);
  }, [dispatch, fixedNavbar]);

  const handleMiniSidenav = () => setMiniSidenav(dispatch, !miniSidenav); // 切换侧边栏的迷你状态
  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator); // 打开或关闭配置器
  const handleOpenUserMenu = (event) => setOpenUserMenu(event.currentTarget); // 打开用户菜单
  const handleOpenNotificationMenu = (event) => setOpenNotificationMenu(event.currentTarget); // 打开通知菜单
  const handleCloseUserMenu = () => setOpenUserMenu(null); // 关闭用户菜单
  const handleCloseNotificationMenu = () => setOpenNotificationMenu(null); // 关闭通知菜单

  // 渲染通知菜单
  const notificationRenderMenu = () => (
    <Menu
      anchorEl={openNotificationMenu}
      anchorReference={null}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={Boolean(openNotificationMenu)}
      onClose={handleCloseNotificationMenu}
      sx={{ mt: 2 }}
    >
      <NotificationItem icon={<Icon>email</Icon>} title="Check new messages" />
      <NotificationItem icon={<Icon>podcasts</Icon>} title="Manage Podcast sessions" />
      <NotificationItem icon={<Icon>shopping_cart</Icon>} title="Payment successfully completed" />
    </Menu>
  );

  const userRenderMenu = () => (
    <Menu
      anchorEl={openUserMenu}
      anchorReference={null}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={Boolean(openUserMenu)}
      onClose={handleCloseUserMenu}
      sx={{ mt: 2 }}
    >
      <NotificationItem icon={<Icon>apple</Icon>} title="Apple" />
      <NotificationItem icon={<Icon>beenhere</Icon>} title="ashin" />
    </Menu>
  );

  // 导航栏图标的样式
  const iconsStyle = ({ palette: { dark, white, text }, functions: { rgba } }) => ({
    color: () => {
      let colorValue = light || darkMode ? white.main : dark.main;

      if (transparentNavbar && !light) {
        colorValue = darkMode ? rgba(text.main, 0.6) : text.main;
      }

      return colorValue;
    },
  });

  return (
    <AppBar
      position={absolute ? "absolute" : navbarType} // 设置导航栏的位置
      color="inherit" // 继承父组件的颜色
      sx={(theme) => navbar(theme, { transparentNavbar, absolute, light, darkMode })} // 应用自定义样式
    >
      <Toolbar sx={(theme) => navbarContainer(theme)}> {/* 工具栏容器 */}

        <MDBox color="inherit" mb={{ xs: 1, md: 0 }} sx={(theme) => navbarRow(theme, { isMini })}>
          {/* 面包屑导航 */}
          <Breadcrumbs icon="home" title={breadcrumbTitle ?? route[route.length - 1]} route={route} light={light} />
          {/* 桌面菜单按钮，点击切换侧边栏的迷你状态 */}
          <IconButton sx={navbarDesktopMenu} onClick={handleMiniSidenav} size="small" disableRipple>
            <Icon fontSize="medium" sx={iconsStyle}>
              {miniSidenav ? "menu_open" : "menu"}
            </Icon>
          </IconButton>
        </MDBox>

        {isMini ? null : ( // 如果 isMini 为 true，则不渲染以下内容
          <MDBox sx={(theme) => navbarRow(theme, { isMini })}>

            {/*<MDBox>*/}
            {/*  /!* 搜索输入框 *!/*/}
            {/*  <MDInput label="搜索" />*/}
            {/*</MDBox>*/}

            <MDBox>
            </MDBox>

            <MDBox color={light ? "white" : "inherit"}>

              {/* 用户登录链接 */}
              {/*<Link to="/authentication/sign-in/basic">*/}
              {/*  <IconButton sx={navbarIconButton} size="small" disableRipple>*/}
              {/*    <Icon sx={iconsStyle}>account_circle</Icon>*/}
              {/*  </IconButton>*/}
              {/*</Link>*/}

              {/* 移动端菜单按钮，点击切换侧边栏的迷你状态 */}
              <IconButton
                size="small"
                disableRipple
                color="inherit"
                sx={navbarMobileMenu}
                onClick={handleMiniSidenav}
              >
                <Icon sx={iconsStyle} fontSize="medium">
                  {miniSidenav ? "menu_open" : "menu"}
                </Icon>
              </IconButton>

              {/* user按钮，点击打开user菜单 */}
              <IconButton
                size="small"
                disableRipple
                color="inherit"
                sx={navbarIconButton}
                aria-controls="user-menu"
                aria-haspopup="true"
                variant="contained"
                onClick={handleOpenUserMenu}
              >
                {/*<MDBadge badgeContent={9} color="error" size="xs" circular>*/}
                <MDBadge size="xs" circular>
                  <Icon sx={iconsStyle}>account_circle</Icon>
                </MDBadge>
                {/*<IconButton sx={navbarIconButton} size="small" disableRipple>*/}
                {/*  <Icon sx={iconsStyle}>account_circle</Icon>*/}
                {/*</IconButton>*/}
              </IconButton>
              {userRenderMenu()} {/* 渲染通知菜单 */}

              {/* 设置按钮，点击打开或关闭配置器 */}
              <IconButton
                size="small"
                disableRipple
                color="inherit"
                sx={navbarIconButton}
                onClick={handleConfiguratorOpen}
              >
                <Icon sx={iconsStyle}>settings</Icon>
              </IconButton>

              {/* 通知按钮，点击打开通知菜单 */}
              <IconButton
                size="small"
                disableRipple
                color="inherit"
                sx={navbarIconButton}
                aria-controls="notification-menu"
                aria-haspopup="true"
                variant="contained"
                onClick={handleOpenNotificationMenu}
              >
                <MDBadge badgeContent={9} color="error" size="xs" circular>
                  <Icon sx={iconsStyle}>notifications</Icon>
                </MDBadge>
              </IconButton>
              {notificationRenderMenu()} {/* 渲染通知菜单 */}

            </MDBox>
          </MDBox>
        )}
      </Toolbar>
    </AppBar>
  );
}

// 设置 DashboardNavbar 的默认属性值
DashboardNavbar.defaultProps = {
  absolute: false,
  light: false,
  isMini: false,
};

// 对 DashboardNavbar 的属性进行类型检查
DashboardNavbar.propTypes = {
  absolute: PropTypes.bool,
  light: PropTypes.bool,
  isMini: PropTypes.bool,
};

export default DashboardNavbar;
