// @mui material components
import {useContext, useEffect} from "react";
import {AuthContext} from "context";

import Grid from "@mui/material/Grid";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";

// Material Dashboard 2 PRO React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

// Analytics dashboard components
import SalesByCountry from "layouts/dashboards/analytics/components/SalesByCountry";

// Data
import reportsBarChartData from "layouts/dashboards/analytics/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboards/analytics/data/reportsLineChartData";

// Images
import Calendar from "examples/Calendar";

function Analytics() {
  const {sales, tasks} = reportsLineChartData;

  const {setIsAuthenticated, getCurrentUser} = useContext(AuthContext);

  useEffect(() => {
    async function checkToken() {
      let user = await getCurrentUser();
      if (!user) {
        setIsAuthenticated(false);
        localStorage.removeItem("token");
      }
    }

    checkToken();
  }, []);

  const eventsData = (
    [
      {
        title: '-$21.79',
        start: '2024-12-05',
        end: '2024-12-05',
        className: 'info'
      },
      {
        title: '-$77.99',
        start: '2024-12-12',
        end: '2024-12-12',
        className: 'error'
      },
      {
        title: '-$7.70',
        start: '2024-12-17',
        end: '2024-12-17',
        className: 'success'
      },
      {
        title: '-$76.76',
        start: '2024-12-21',
        end: '2024-12-21',
        className: 'error'
      },
      {
        title: '-$87.38',
        start: '2024-12-23',
        end: '2024-12-23',
        className: 'error'
      },
      {
        title: '-$18.54',
        start: '2024-12-24',
        end: '2024-12-24',
        className: 'success'
      },
      {
        title: '-$77.41',
        start: '2024-12-29',
        end: '2024-12-29',
        className: 'error'
      },
      {
        title: '-$30.00',
        start: '2025-01-01',
        end: '2025-01-01',
        className: 'info'
      },
      {
        title: '-$88.79',
        start: '2025-01-02',
        end: '2025-01-02',
        className: 'error'
      },
      {
        title: '-$61.20',
        start: '2025-01-10',
        end: '2025-01-10',
        className: 'error'
      },
      {
        title: '-$80.23',
        start: '2025-01-13',
        end: '2025-01-13',
        className: 'error'
      },
      {
        title: '-$44.80',
        start: '2025-01-23',
        end: '2025-01-23',
        className: 'info'
      },
      {
        title: '-$14.77',
        start: '2025-01-28',
        end: '2025-01-28',
        className: 'success'
      }
    ]

  );

  return (
    <DashboardLayout>
      <DashboardNavbar/>
      <MDBox>
        <MDBox mt={3}>

          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={6}>

              <MDBox mb={3}>

                <Grid container mt={1} spacing={2}>
                  <Grid item xs={12} md={6}>
                    <MDBox mb={1}>
                      <ComplexStatisticsCard
                        color="info"
                        icon="receipt"
                        title="Transaction Count"
                        count={26}
                        percentage={{
                          color: "info",
                          amount: "+15%",
                          label: "this month",
                        }}
                      />
                    </MDBox>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <MDBox mb={1}>
                      <ComplexStatisticsCard
                        color="warning"
                        icon="account_balance_wallet"
                        title="Total Expense"
                        count="$781.25"
                        percentage={{
                          color: "warning",
                          amount: "+13%",
                          label: "this week",
                        }}
                      />
                    </MDBox>
                  </Grid>
                </Grid>

                <Grid container mt={3}>
                  <SalesByCountry/>
                </Grid>

              </MDBox>

            </Grid>

            <Grid item xs={12} md={6} lg={6}>
              <MDBox mb={3}>
                <Calendar
                  initialView="dayGridMonth"
                  initialDate="2024-12-01"
                  events={eventsData}
                  selectable
                  //editable
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>


        <MDBox mt={4}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsBarChart
                  color="info"
                  title="Daily Expenses"
                  description="Your Daily Expenses of This Week"
                  date="This Week"
                  chart={reportsBarChartData}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="success"
                  title="Know Your Daily Expenses"
                  description={
                    <>
                      (<strong>+15%</strong>) increase in today sales.TEST
                    </>
                  }
                  date="This Week"
                  chart={sales}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="dark"
                  title="completed tasks"
                  description="Last Campaign Performance"
                  date="just updated"
                  chart={tasks}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>

                {/*<MDBox mt={1.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox mb={1.5}>
                <ComplexStatisticsCard
                  color="dark"
                  icon="weekend"
                  title="Bookings"
                  count={281}
                  percentage={{
                    color: "success",
                    amount: "+55%",
                    label: "than lask week",
                  }}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox mb={1.5}>
                <ComplexStatisticsCard
                  icon="leaderboard"
                  title="Today's Users"
                  count="2,300"
                  percentage={{
                    color: "success",
                    amount: "+3%",
                    label: "than last month",
                  }}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox mb={1.5}>
                <ComplexStatisticsCard
                  color="success"
                  icon="store"
                  title="Revenue"
                  count="34k"
                  percentage={{
                    color: "success",
                    amount: "+1%",
                    label: "than yesterday",
                  }}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox mb={1.5}>
                <ComplexStatisticsCard
                  color="primary"
                  icon="person_add"
                  title="Followers"
                  count="+91"
                  percentage={{
                    color: "success",
                    amount: "",
                    label: "Just updated",
                  }}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>*/}

          {/*<MDBox mt={2}>*/}
          {/*  <Grid container spacing={3}>*/}
          {/*    <Grid item xs={12} md={6} lg={4}>*/}
          {/*      <MDBox mt={3}>*/}
          {/*        <BookingCard*/}
          {/*          image={booking1}*/}
          {/*          title="Cozy 5 Stars Apartment"*/}
          {/*          description='The place is close to Barceloneta Beach and bus stop just 2 min by walk and near to "Naviglio" where you can enjoy the main night life in Barcelona.'*/}
          {/*          price="$899/night"*/}
          {/*          location="Barcelona, Spain"*/}
          {/*          action={actionButtons}*/}
          {/*        />*/}
          {/*      </MDBox>*/}
          {/*    </Grid>*/}
          {/*    <Grid item xs={12} md={6} lg={4}>*/}
          {/*      <MDBox mt={3}>*/}
          {/*        <BookingCard*/}
          {/*          image={booking2}*/}
          {/*          title="Office Studio"*/}
          {/*          description='The place is close to Metro Station and bus stop just 2 min by walk and near to "Naviglio" where you can enjoy the night life in London, UK.'*/}
          {/*          price="$1.119/night"*/}
          {/*          location="London, UK"*/}
          {/*          action={actionButtons}*/}
          {/*        />*/}
          {/*      </MDBox>*/}
          {/*    </Grid>*/}
          {/*    <Grid item xs={12} md={6} lg={4}>*/}
          {/*      <MDBox mt={3}>*/}
          {/*        <BookingCard*/}
          {/*          image={booking3}*/}
          {/*          title="Beautiful Castle"*/}
          {/*          description='The place is close to Metro Station and bus stop just 2 min by walk and near to "Naviglio" where you can enjoy the main night life in Milan.'*/}
          {/*          price="$459/night"*/}
          {/*          location="Milan, Italy"*/}
          {/*          action={actionButtons}*/}
          {/*        />*/}
          {/*      </MDBox>*/}
          {/*    </Grid>*/}
          {/*  </Grid>*/}
          {/*</MDBox>*/}

        <MDBox p={1} mb={1}>
        </MDBox>

      </MDBox>
      {/*<Footer/>*/}
    </DashboardLayout>
  );
}

export default Analytics;
