import React from "react";
import { Box, Typography, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";

const ItemList = ({ items }) => {
  return (
    <Box mt={2}>
      <Typography variant="h6">Purchased Items</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Item</TableCell>
            <TableCell align="right">Quantity</TableCell>
            <TableCell align="right">Unit Price</TableCell>
            <TableCell align="right">Total Price</TableCell>
          </TableRow>
        </TableHead>
        {/*<TableBody>*/}
        {/*  {items.map((item, index) => (*/}
        {/*    <TableRow key={index}>*/}
        {/*      <TableCell>{item.name}</TableCell>*/}
        {/*      <TableCell align="right">{item.quantity}</TableCell>*/}
        {/*      <TableCell align="right">${item.unitPrice.toFixed(2)}</TableCell>*/}
        {/*      <TableCell align="right">${item.totalPrice.toFixed(2)}</TableCell>*/}
        {/*    </TableRow>*/}
        {/*  ))}*/}
        {/*</TableBody>*/}
      </Table>
    </Box>
  );
};

export default ItemList;
