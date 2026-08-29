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

// Sales dashboard components
import ProductCell from "layouts/dashboards/sales/components/ProductCell";
import RefundsCell from "layouts/dashboards/sales/components/RefundsCell";
import DefaultCell from "layouts/dashboards/sales/components/DefaultCell";

// Images
import nikeV22 from "assets/images/ecommerce/blue-shoe.jpeg";
import businessKit from "assets/images/ecommerce/black-mug.jpeg";
import blackChair from "assets/images/ecommerce/black-chair.jpeg";
import wirelessCharger from "assets/images/ecommerce/bang-sound.jpeg";
import tripKit from "assets/images/ecommerce/photo-tools.jpeg";

const dataTableData = {
  columns: [
    { Header: "Product", accessor: "products", width: "40%" },
    { Header: "Amount", accessor: "value" },
    { Header: "Category", accessor: "categories", align: "center" },
    { Header: "Change", accessor: "refunds", align: "center" },
  ],

  rows: [
    {
      products: <ProductCell image={nikeV22} name="Grocery Shopping" orders={15} />,
      value: <DefaultCell>$520.99</DefaultCell>,
      categories: <DefaultCell>Daily Necessities</DefaultCell>,
      refunds: <RefundsCell value={13} icon={{ color: "error", name: "keyboard_arrow_up" }} />,
    },
    {
      products: (
        <ProductCell image={businessKit} name="Lunch" orders={1} />
      ),
      value: <DefaultCell>$25.00</DefaultCell>,
      categories: <DefaultCell>Dining</DefaultCell>,
      refunds: <RefundsCell value={5} icon={{ color: "success", name: "keyboard_arrow_down" }} />,
    },
    {
      products: <ProductCell image={blackChair} name="Movie Ticket" orders={2} />,
      value: <DefaultCell>$80.00</DefaultCell>,
      categories: <DefaultCell>Entertainment</DefaultCell>,
      refunds: <RefundsCell value={20} icon={{ color: "error", name: "keyboard_arrow_up" }} />,
    },
    {
      products: <ProductCell image={wirelessCharger} name="Subway Recharge" orders={1} />,
      value: <DefaultCell>$100.00</DefaultCell>,
      categories: <DefaultCell>Transportation</DefaultCell>,
      refunds: <RefundsCell value={0} icon={{ color: "success", name: "keyboard_arrow_down" }} />,
    },
    {
      products: (
        <ProductCell image={tripKit} name="Supermarket" orders={5} />
      ),
      value: <DefaultCell>$205.00</DefaultCell>,
      categories: <DefaultCell>Communication</DefaultCell>,
      refunds: <RefundsCell value={0} icon={{ color: "secondary", name: "remove" }} />,
    },
  ],
};

export default dataTableData;
