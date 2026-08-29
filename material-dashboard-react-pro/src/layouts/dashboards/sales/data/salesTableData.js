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

// Category icons
import FoodIcon from "assets/images/icons/flags/US.png"; // 暂用国旗图标代替
import TransportIcon from "assets/images/icons/flags/DE.png";
import EntertainmentIcon from "assets/images/icons/flags/GB.png";
import DailyIcon from "assets/images/icons/flags/BR.png";
import CommunicationIcon from "assets/images/icons/flags/AU.png";

const salesTableData = [
  {
    country: [FoodIcon, "餐饮"],
    sales: 850,
    bounce: "35.2%",
  },
  {
    country: [TransportIcon, "交通"],
    sales: "650",
    bounce: "27.1%",
  },
  {
    country: [EntertainmentIcon, "娱乐"],
    sales: "480",
    bounce: "20%",
  },
  { 
    country: [DailyIcon, "日常用品"], 
    sales: 320, 
    bounce: "13.3%" 
  },
  { 
    country: [CommunicationIcon, "通讯"], 
    sales: 100, 
    bounce: "4.4%" 
  },
];

export default salesTableData;
