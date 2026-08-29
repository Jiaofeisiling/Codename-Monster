import {useState} from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import Icon from "@mui/material/Icon";
import Card from "@mui/material/Card";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDBadgeDot from "components/MDBadgeDot";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 PRO React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DefaultStatisticsCard from "examples/Cards/StatisticsCards/DefaultStatisticsCard";
import DefaultLineChart from "examples/Charts/LineCharts/DefaultLineChart";
import SalesTable from "examples/Tables/SalesTable";
import DataTable from "examples/Tables/DataTable";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
import DefaultDoughnutChart from "examples/Charts/DoughnutCharts/DefaultDoughnutChart";
import TimelineList from "examples/Timeline/TimelineList";
import TimelineItem from "examples/Timeline/TimelineItem";

// Data
import dataTableData from "layouts/dashboards/sales/data/dataTableData";


function Sales() {
  // DefaultStatisticsCard state for the dropdown value
  const [expensesDropdownValue, setExpensesDropdownValue] = useState("6 Feb - 7 Feb");
  const [transactionsDropdownValue, setTransactionsDropdownValue] = useState("6 Feb - 7 Feb");
  const [averageDropdownValue, setAverageDropdownValue] = useState("6 Feb - 7 Feb");

  // DefaultStatisticsCard state for the dropdown action
  const [expensesDropdown, setExpensesDropdown] = useState(null);
  const [transactionsDropdown, setTransactionsDropdown] = useState(null);
  const [averageDropdown, setAverageDropdown] = useState(null);

  // DefaultStatisticsCard handler for the dropdown action
  const openExpensesDropdown = ({currentTarget}) => setExpensesDropdown(currentTarget);
  const closeExpensesDropdown = ({currentTarget}) => {
    setExpensesDropdown(null);
    setExpensesDropdownValue(currentTarget.innerText || expensesDropdownValue);
  };
  const openTransactionsDropdown = ({currentTarget}) => setTransactionsDropdown(currentTarget);
  const closeTransactionsDropdown = ({currentTarget}) => {
    setTransactionsDropdown(null);
    setTransactionsDropdownValue(currentTarget.innerText || transactionsDropdownValue);
  };
  const openAverageDropdown = ({currentTarget}) => setAverageDropdown(currentTarget);
  const closeAverageDropdown = ({currentTarget}) => {
    setAverageDropdown(null);
    setAverageDropdownValue(currentTarget.innerText || averageDropdownValue);
  };

  // Dropdown menu template for the DefaultStatisticsCard
  const renderMenu = (state, close) => (
    <Menu
      anchorEl={state}
      transformOrigin={{vertical: "top", horizontal: "center"}}
      open={Boolean(state)}
      onClose={close}
      keepMounted
      disableAutoFocusItem
    >
      <MenuItem onClick={close}>Last 7 days</MenuItem>
      <MenuItem onClick={close}>Last week</MenuItem>
      <MenuItem onClick={close}>Last 30 days</MenuItem>
    </Menu>
  );

  // Monthly spending trends data
  const monthlySpendingData = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Groceries",
        color: "primary",
        data: [450, 420, 460, 430, 470, 440],
      },
      {
        label: "Dining",
        color: "info",
        data: [180, 195, 170, 185, 165, 175],
      },
      {
        label: "Entertainment",
        color: "warning",
        data: [120, 110, 130, 115, 125, 118],
      },
    ],
  };

  // Category spending data for SalesTable
  const categorySalesData = [
    {
      name: "Groceries",
      sales: 320,
      value: "NZD 320",
      bounce: "32%",
    },
    {
      name: "Dining",
      sales: 180,
      value: "NZD 180",
      bounce: "18%",
    },
    {
      name: "Entertainment",
      sales: 150,
      value: "NZD 150",
      bounce: "15%",
    },
    {
      name: "Takeaways",
      sales: 220,
      value: "NZD 220",
      bounce: "22%",
    },
    {
      name: "Other",
      sales: 130,
      value: "NZD 130",
      bounce: "13%",
    },
  ];

  // 支出分类数据
  const categoryData = {
    labels: ["食品", "交通", "娱乐", "医疗", "其他"],
    datasets: {
      label: "支出分布",
      data: [35, 11, 17, 7, 30],
      backgroundColors: ["info", "primary", "warning", "success", "secondary"],
    },
  };

  // Recent transactions data
  const transactionsData = {
    columns: [
      {Header: "Date", accessor: "date"},
      {Header: "Category", accessor: "category"},
      {Header: "Merchant", accessor: "merchant"},
      {Header: "Amount", accessor: "amount"},
      {Header: "Status", accessor: "status"},
    ],
    rows: [
      {
        date: "08 Nov 2024",
        category: "Groceries",
        merchant: "Countdown St Lukes",
        amount: "NZD 158.50",
        status: "Completed",
      },
      {
        date: "09 Nov 2024",
        category: "Dining",
        merchant: "Burger Fuel Mt Eden",
        amount: "NZD 45.00",
        status: "Completed",
      },
      {
        date: "13 Nov 2024",
        category: "Entertainment",
        merchant: "Event Cinemas Newmarket",
        amount: "NZD 38.00",
        status: "Completed",
      },
      {
        date: "14 Nov 2024",
        category: "Groceries",
        merchant: "New World Victoria Park",
        amount: "NZD 92.30",
        status: "Completed",
      },
      {
        date: "18 Nov 2024",
        category: "Takeaways",
        merchant: "Uber Eats - Nando's",
        amount: "NZD 52.80",
        status: "Completed",
      },
    ],
  };

  return (
    <DashboardLayout>
      <DashboardNavbar/>
      <MDBox py={1}>
        <MDBox >
          <Grid container spacing={3} mb={3}>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={1.5}>
                <ComplexStatisticsCard
                  color="success"
                  icon="health_and_safety"
                  title="Health Index"
                  count="78/100"
                  percentage={{
                    color: "success",
                    amount: "+5%",
                    label: "vs last month",
                  }}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={1.5}>
                <ComplexStatisticsCard
                  color="primary"
                  icon="eco"
                  title="Eco Score"
                  count="65/100"
                  percentage={{
                    color: "success",
                    amount: "+20%",
                    label: "vs last month",
                  }}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={1.5}>
                <ComplexStatisticsCard
                  color="warning"
                  icon="savings"
                  title="Budget Remaining"
                  count="NZD 1,000"
                  percentage={{
                    color: "secondary",
                    amount: "87.5%",
                    label: "budget execution",
                  }}
                />
              </MDBox>
            </Grid>
          </Grid>

        </MDBox>
        <MDBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <DefaultStatisticsCard
                title="Total Expenses"
                count="NZD 781.25"
                percentage={{
                  color: "success",
                  value: "-3%",
                  label: "vs last month",
                }}
                dropdown={{
                  action: openExpensesDropdown,
                  menu: renderMenu(expensesDropdown, closeExpensesDropdown),
                  value: expensesDropdownValue,
                }}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <DefaultStatisticsCard
                title="Transactions"
                count="26"
                percentage={{
                  color: "success",
                  value: "+3",
                  label: "vs last week",
                }}
                dropdown={{
                  action: openTransactionsDropdown,
                  menu: renderMenu(transactionsDropdown, closeTransactionsDropdown),
                  value: transactionsDropdownValue,
                }}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <DefaultStatisticsCard
                title="Average Transaction"
                count="NZD 30.05"
                percentage={{
                  color: "secondary",
                  value: "-NZD 5.30",
                  label: "vs last month",
                }}
                dropdown={{
                  action: openAverageDropdown,
                  menu: renderMenu(averageDropdown, closeAverageDropdown),
                  value: averageDropdownValue,
                }}
              />
            </Grid>
          </Grid>
        </MDBox>
        <MDBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={7}>
              <DefaultLineChart
                title="Monthly Spending Trends"
                description={
                  <MDBox display="flex" justifyContent="space-between">
                    <MDBox display="flex" ml={-1}>
                      <MDBadgeDot color="primary" size="sm" badgeContent="Groceries"/>
                      <MDBadgeDot color="info" size="sm" badgeContent="Dining"/>
                      <MDBadgeDot color="warning" size="sm" badgeContent="Entertainment"/>
                    </MDBox>
                    <MDBox mt={-4} mr={-1} position="absolute" right="1.5rem">
                      <Tooltip title="View spending analysis" placement="left" arrow>
                        <MDButton
                          variant="outlined"
                          color="secondary"
                          size="small"
                          circular
                          iconOnly
                        >
                          <Icon>priority_high</Icon>
                        </MDButton>
                      </Tooltip>
                    </MDBox>
                  </MDBox>
                }
                chart={monthlySpendingData}
              />
            </Grid>

            {/*AI建议时间轴*/}
            <Grid item xs={12} lg={5}>
              <MDBox mb={3}>
                <TimelineList title="Smart Suggestions">
                  <TimelineItem
                    color="success"
                    icon="trending_up"
                    title="Spending Optimization"
                    dateTime="Today"
                    description="Food expenses increased by 15% this month. Consider meal planning to reduce waste."
                  />
                  <TimelineItem
                    color="warning"
                    icon="local_grocery_store"
                    title="Shopping Reminder"
                    dateTime="3 hours ago"
                    description="Low stock of staple foods like rice and flour. Restocking recommended."
                  />
                  <TimelineItem
                    color="info"
                    icon="nature"
                    title="Eco-friendly Action"
                    dateTime="Yesterday"
                    description="Using reusable shopping bags can help reduce carbon emissions."
                  />
                </TimelineList>
              </MDBox>
            </Grid>

          </Grid>
        </MDBox>
        <Grid container mt={3} spacing={3}>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card>
              <MDBox pt={3} px={3}>
                <MDTypography variant="h6" fontWeight="medium">
                  Recent Transactions by categories
                </MDTypography>
              </MDBox>
              <MDBox py={1}>
                <DataTable
                  table={dataTableData}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  isSorted={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>






    </DashboardLayout>
  );
}

export default Sales;

/*
import {useState} from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import Icon from "@mui/material/Icon";
import Card from "@mui/material/Card";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDBadgeDot from "components/MDBadgeDot";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 PRO React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DefaultStatisticsCard from "examples/Cards/StatisticsCards/DefaultStatisticsCard";
import DefaultLineChart from "examples/Charts/LineCharts/DefaultLineChart";
import HorizontalBarChart from "examples/Charts/BarCharts/HorizontalBarChart";
import SalesTable from "examples/Tables/SalesTable";
import DataTable from "examples/Tables/DataTable";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
import VerticalBarChart from "examples/Charts/BarCharts/VerticalBarChart";
import DefaultDoughnutChart from "examples/Charts/DoughnutCharts/DefaultDoughnutChart";
import TimelineList from "examples/Timeline/TimelineList";
import TimelineItem from "examples/Timeline/TimelineItem";

// Sales dashboard components
import ChannelsChart from "layouts/dashboards/sales/components/ChannelsChart";

// Data
import defaultLineChartData from "layouts/dashboards/sales/data/defaultLineChartData";
import horizontalBarChartData from "layouts/dashboards/sales/data/horizontalBarChartData";
import salesTableData from "layouts/dashboards/sales/data/salesTableData";
import dataTableData from "layouts/dashboards/sales/data/dataTableData";


function Sales() {
  // DefaultStatisticsCard state for the dropdown value
  const [salesDropdownValue, setSalesDropdownValue] = useState("6 May - 7 May");
  const [customersDropdownValue, setCustomersDropdownValue] = useState("6 May - 7 May");
  const [revenueDropdownValue, setRevenueDropdownValue] = useState("6 May - 7 May");

  // DefaultStatisticsCard state for the dropdown action
  const [salesDropdown, setSalesDropdown] = useState(null);
  const [customersDropdown, setCustomersDropdown] = useState(null);
  const [revenueDropdown, setRevenueDropdown] = useState(null);

  // DefaultStatisticsCard handler for the dropdown action
  const openSalesDropdown = ({ currentTarget }) => setSalesDropdown(currentTarget);
  const closeSalesDropdown = ({ currentTarget }) => {
    setSalesDropdown(null);
    setSalesDropdownValue(currentTarget.innerText || salesDropdownValue);
  };
  const openCustomersDropdown = ({ currentTarget }) => setCustomersDropdown(currentTarget);
  const closeCustomersDropdown = ({ currentTarget }) => {
    setCustomersDropdown(null);
    setCustomersDropdownValue(currentTarget.innerText || salesDropdownValue);
  };
  const openRevenueDropdown = ({ currentTarget }) => setRevenueDropdown(currentTarget);
  const closeRevenueDropdown = ({ currentTarget }) => {
    setRevenueDropdown(null);
    setRevenueDropdownValue(currentTarget.innerText || salesDropdownValue);
  };

  // Dropdown menu template for the DefaultStatisticsCard
  const renderMenu = (state, close) => (
    <Menu
      anchorEl={state}
      transformOrigin={{ vertical: "top", horizontal: "center" }}
      open={Boolean(state)}
      onClose={close}
      keepMounted
      disableAutoFocusItem
    >
      <MenuItem onClick={close}>Last 7 days</MenuItem>
      <MenuItem onClick={close}>Last week</MenuItem>
      <MenuItem onClick={close}>Last 30 days</MenuItem>
    </Menu>
  );

  // 月度支出趋势数据
  const monthlySpendingData = {
    labels: ["一月", "二月", "三月", "四月", "五月", "六月"],
    datasets: [
      {
        label: "食品",
        color: "primary",
        data: [2500, 2300, 2600, 2400, 2800, 2500],
      },
      {
        label: "交通",
        color: "info",
        data: [800, 850, 750, 880, 740, 810],
      },
      {
        label: "娱乐",
        color: "warning",
        data: [1200, 1100, 1300, 1150, 1250, 1180],
      },
    ],
  };

  // 支出分类数据
  const categoryData = {
    labels: ["食品", "交通", "娱乐", "医疗", "其他"],
    datasets: {
      label: "支出分布",
      data: [35, 11, 17, 7, 30],
      backgroundColors: ["info", "primary", "warning", "success", "secondary"],
    },
  };

  // 最近交易数据
  const transactionsData = {
    columns: [
      { Header: "交易时间", accessor: "date", width: "20%" },
      { Header: "类别", accessor: "category", width: "20%" },
      { Header: "商家", accessor: "merchant", width: "20%" },
      { Header: "金额", accessor: "amount", width: "15%" },
      { Header: "状态", accessor: "status", width: "15%" },
    ],
    rows: [
      {
        date: "2024-02-08",
        category: "食品",
        merchant: "全家便利店",
        amount: "¥108.50",
        status: "已完成",
      },
      {
        date: "2024-02-07",
        category: "交通",
        merchant: "滴滴出行",
        amount: "¥45.00",
        status: "已完成",
      },
      // ... 更多交易记录
    ],
  };

  //

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <MDBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
              <DefaultStatisticsCard
                title="总支出"
                count="¥2,302"
                percentage={{
                  color: "success",
                  value: "-15%",
                  label: "较上月",
                }}
                dropdown={{
                  action: openSalesDropdown,
                  menu: renderMenu(salesDropdown, closeSalesDropdown),
                  value: salesDropdownValue,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <DefaultStatisticsCard
                title="交易笔数"
                count="32"
                percentage={{
                  color: "success",
                  value: "+2",
                  label: "较上月",
                }}
                dropdown={{
                  action: openCustomersDropdown,
                  menu: renderMenu(customersDropdown, closeCustomersDropdown),
                  value: customersDropdownValue,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <DefaultStatisticsCard
                title="平均支出"
                count="¥72"
                percentage={{
                  color: "secondary",
                  value: "-¥13",
                  label: "较上月",
                }}
                dropdown={{
                  action: openRevenueDropdown,
                  menu: renderMenu(revenueDropdown, closeRevenueDropdown),
                  value: revenueDropdownValue,
                }}
              />
            </Grid>
          </Grid>
        </MDBox>
        <MDBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} lg={4}>
              <ChannelsChart />
            </Grid>
            <Grid item xs={12} sm={6} lg={8}>
              <DefaultLineChart
                title="支出趋势"
                description={
                  <MDBox display="flex" justifyContent="space-between">
                    <MDBox display="flex" ml={-1}>
                      <MDBadgeDot color="info" size="sm" badgeContent="必要支出" />
                      <MDBadgeDot color="dark" size="sm" badgeContent="非必要支出" />
                    </MDBox>
                    <MDBox mt={-4} mr={-1} position="absolute" right="1.5rem">
                      <Tooltip title="See which ads perform better" placement="left" arrow>
                        <MDButton
                          variant="outlined"
                          color="secondary"
                          size="small"
                          circular
                          iconOnly
                        >
                          <Icon>priority_high</Icon>
                        </MDButton>
                      </Tooltip>
                    </MDBox>
                  </MDBox>
                }
                chart={defaultLineChartData}
              />
            </Grid>
          </Grid>
        </MDBox>
        <MDBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={8}>
              <HorizontalBarChart title="支出类别分布" chart={horizontalBarChartData} />
            </Grid>
            <Grid item xs={12} lg={4}>
              <SalesTable title="支出类别排行" rows={salesTableData} />
            </Grid>
          </Grid>
        </MDBox>

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card>
              <MDBox pt={3} px={3}>
                <MDTypography variant="h6" fontWeight="medium">
                  最近交易记录
                </MDTypography>
              </MDBox>
              <MDBox py={1}>
                <DataTable
                  table={dataTableData}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  isSorted={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>

      </MDBox>

    </DashboardLayout>
  );
}


export default Sales;


*/
