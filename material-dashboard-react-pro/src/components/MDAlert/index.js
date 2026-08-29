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

/**
* 以下是对该 React 组件的中文使用文档：

# MDAlert 组件文档

## 概述
`MDAlert` 是一个可定制的警告/通知组件，支持多种颜色和可选的关闭功能。

## 安装依赖
```bash
npm install react @mui/material prop-types
```

## 属性 (Props)

### color
- 类型：`string`
- 默认值：`"info"`
- 可选值：`"primary"`, `"secondary"`, `"info"`, `"success"`, `"warning"`, `"error"`, `"light"`, `"dark"`
- 描述：设置警告框的颜色主题

### dismissible
- 类型：`boolean`
- 默认值：`false`
- 描述：是否允许用户关闭警告框

### children
- 类型：`node`
- 必填：是
- 描述：警告框内显示的内容

## 使用示例

### 基本用法
```jsx
import MDAlert from 'components/MDAlert';

function MyComponent() {
  return (
    <MDAlert color="success">
      这是一个成功提示！
    </MDAlert>
  );
}
```

### 可关闭的警告框
```jsx
import MDAlert from 'components/MDAlert';

function MyComponent() {
  return (
    <MDAlert color="warning" dismissible>
      这是一个可以关闭的警告！
    </MDAlert>
  );
}
```

## 功能特点
- 支持多种颜色主题
- 可选的关闭按钮
- 带有渐入渐出动画效果
- 可自定义内容

## 注意事项
- 确保提供 `children` 属性
- 颜色值必须是预定义的八种颜色之一
- 组件依赖于 Material-UI 的 `Fade` 组件实现动画效果

## 动画行为
- 组件默认有 300 毫秒的渐入动画
- 点击关闭按钮后有 400 毫秒的渐出动画

## 技术细节
- 使用 React Hooks 中的 `useState` 管理组件状态
- 使用 `prop-types` 进行属性类型检查
- 使用 Material-UI 的 `Fade` 组件实现过渡效果

## 错误处理
- 如果未提供 `children`，组件将抛出 PropTypes 验证错误
 **/

import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Fade from "@mui/material/Fade";
import MDBox from "components/MDBox";
import MDAlertRoot from "components/MDAlert/MDAlertRoot";
import MDAlertCloseIcon from "components/MDAlert/MDAlertCloseIcon";

function MDAlert({
                   color,
                   dismissible,
                   children,
                   autoClose = false,
                   autoCloseDelay = 5000,
                   onClose,
                   ...rest
                 }) {
  const [alertStatus, setAlertStatus] = useState("mount");

  const handleAlertStatus = () => {
    setAlertStatus("fadeOut");
    onClose && onClose();
  };

  useEffect(() => {
    let timer;
    if (autoClose && alertStatus === "mount") {
      timer = setTimeout(handleAlertStatus, autoCloseDelay);
    }
    return () => clearTimeout(timer);
  }, [autoClose, autoCloseDelay, alertStatus]);

  const alertTemplate = (mount = true) => (
    <Fade in={mount} timeout={300}>
      <MDAlertRoot ownerState={{ color }} {...rest}>
        <MDBox display="flex" alignItems="center" color="white">
          {children}
        </MDBox>
        {dismissible ? (
          <MDAlertCloseIcon onClick={mount ? handleAlertStatus : null}>&times;</MDAlertCloseIcon>
        ) : null}
      </MDAlertRoot>
    </Fade>
  );

  switch (true) {
    case alertStatus === "mount":
      return alertTemplate();
    case alertStatus === "fadeOut":
      setTimeout(() => setAlertStatus("unmount"), 400);
      return alertTemplate(false);
    default:
      return null;
  }
}

MDAlert.defaultProps = {
  color: "info",
  dismissible: false,
  autoClose: false,
  autoCloseDelay: 5000,
  onClose: null
};

MDAlert.propTypes = {
  color: PropTypes.oneOf([
    "primary", "secondary", "info", "success",
    "warning", "error", "light", "dark"
  ]),
  dismissible: PropTypes.bool,
  children: PropTypes.node.isRequired,
  autoClose: PropTypes.bool,
  autoCloseDelay: PropTypes.number,
  onClose: PropTypes.func
};

export default MDAlert;