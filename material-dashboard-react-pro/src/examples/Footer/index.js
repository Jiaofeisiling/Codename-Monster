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

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Link from "@mui/material/Link";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 PRO React base styles
import typography from "assets/theme/base/typography";

// Footer 组件，用于显示页脚内容
function Footer({ company, links }) {
  // 从 company 对象中解构出 href 和 name
  const { href, name } = company;
  // 从 typography 对象中解构出 size
  const { size } = typography;

  // 渲染链接列表的函数
  const renderLinks = () =>
    links.map((link) => (
      // 每个链接包裹在 MDBox 组件中
      <MDBox key={link.name} component="li" px={2} lineHeight={1}>
        {/* 使用 Link 组件创建链接 */}
        <Link href={link.href} target="_blank">
          {/* 使用 MDTypography 组件显示链接文本 */}
          <MDTypography variant="button" fontWeight="regular" color="text">
            {link.name}
          </MDTypography>
        </Link>
      </MDBox>
    ));

  return (
    // 外层 MDBox 容器，设置宽度、布局、对齐方式等样式
    <MDBox
      width="100%"
      display="flex"
      flexDirection={{ xs: "column", lg: "row" }}
      justifyContent="space-between"
      alignItems="center"
      px={1.5}
    >
      {/* 左侧内容区域，显示版权信息和公司链接 */}
      <MDBox
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexWrap="wrap"
        color="text"
        fontSize={size.sm}
        px={1.5}
      >
        &copy; {new Date().getFullYear()}, made with
        {/* 爱心图标 */}
        <MDBox fontSize={size.md} color="text" mb={-0.5} mx={0.25}>
          <Icon color="inherit" fontSize="inherit">
            favorite
          </Icon>
        </MDBox>
        by
        {/* 公司链接 */}
        <Link href={href} target="_blank">
          <MDTypography variant="button" fontWeight="medium">
            &nbsp;{name}&nbsp;
          </MDTypography>
        </Link>
        &amp;
        {/* UPDIVISION 链接 */}
        <Link href="https://updivision.com" target="_blank">
          <MDTypography variant="button" fontWeight="medium">
            &nbsp;UPDIVISION&nbsp;
          </MDTypography>
        </Link>
        for a better web.
      </MDBox>
      {/* 右侧链接列表区域 */}
      <MDBox
        component="ul"
        sx={({ breakpoints }) => ({
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
          listStyle: "none",
          mt: 3,
          mb: 0,
          p: 0,

          [breakpoints.up("lg")]: {
            mt: 0,
          },
        })}
      >
        {/* 调用 renderLinks 函数渲染链接 */}
        {renderLinks()}
      </MDBox>
    </MDBox>
  );
}

// 设置 Footer 组件的默认属性
Footer.defaultProps = {
  company: { href: "https://www.creative-tim.com/", name: "Creative Tim" },
  links: [
    { href: "https://www.creative-tim.com/", name: "Creative Tim" },
    { href: "https://www.updivision.com/", name: "UPDIVISION" },
    { href: "https://www.creative-tim.com/presentation", name: "About Us" },
    { href: "https://www.creative-tim.com/blog", name: "Blog" },
    { href: "https://www.creative-tim.com/license", name: "License" },
  ],
};

// 对 Footer 组件的属性进行类型检查
Footer.propTypes = {
  company: PropTypes.objectOf(PropTypes.string),
  links: PropTypes.arrayOf(PropTypes.object),
};

// 导出 Footer 组件
export default Footer;
