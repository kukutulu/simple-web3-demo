"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { useEffect, useState } from "react";

const Data = [
  {
    icon: "A icon",
    name: "A coin",
    symbol: "A symbol",
    decimal: "A decimal",
    balanceOf: "A balance",
  },
  {
    icon: "B icon",
    name: "B coin",
    symbol: "B symbol",
    decimal: "B decimal",
    balanceOf: "B balance",
  },
  {
    icon: "C icon",
    name: "C coin",
    symbol: "C symbol",
    decimal: "C decimal",
    balanceOf: "C balance",
  },
  {
    icon: "D icon",
    name: "D coin",
    symbol: "D symbol",
    decimal: "D decimal",
    balanceOf: "D balance",
  },
];

export function TokenDataTable() {
  const [tableData, setTableData] = useState<typeof Data>(Data);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Paper sx={{ margin: "80px" }}>
      <TableContainer>
        <Table sx={{ maxWidth: "650" }}>
          <TableHead>
            <TableRow>
              <TableCell>Assets</TableCell>
              <TableCell>Symbol</TableCell>
              <TableCell>Decimals</TableCell>
              <TableCell>Balance</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((item) => (
              <TableRow
                key={item.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.symbol}</TableCell>
                <TableCell>{item.decimal}</TableCell>
                <TableCell>{item.balanceOf}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
