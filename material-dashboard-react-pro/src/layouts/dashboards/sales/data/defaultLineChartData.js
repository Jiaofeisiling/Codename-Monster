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

const defaultLineChartData = {
  labels: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月"],
  datasets: [
    {
      label: "必要支出",
      color: "info",
      data: [1500, 1800, 1600, 1900, 1700, 2000, 1800, 2100, 1900],
    },
    {
      label: "非必要支出",
      color: "dark",
      data: [500, 800, 600, 900, 700, 1000, 800, 1100, 900],
    },
  ],
};

export default defaultLineChartData;
