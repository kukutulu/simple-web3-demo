"use client";

import { TableDataType } from "@/global";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
} from "@mui/material";
import { useSelector } from "react-redux";
import { tokenDataTableSelector } from "@/redux/selector";
import { NoValue } from "../NoValue";

export function TokenDataTable() {
  const tableDataInStore: TableDataType = useSelector(tokenDataTableSelector);

  return (
    <Paper sx={{ margin: "80px" }}>
      <TableContainer>
        <Table sx={{ maxWidth: "650" }}>
          <TableHead>
            <TableRow>
              <TableCell>Assets</TableCell>
              <TableCell align="center">Symbol</TableCell>
              <TableCell align="center">Decimals</TableCell>
              <TableCell align="center">Balance</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableDataInStore.map((item) => (
              <TableRow
                key={item.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell
                  sx={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <Avatar alt={`${item.name}`} src={item.icon} />
                  {item.name}
                </TableCell>
                <TableCell align="center">{item.symbol}</TableCell>
                <TableCell align="center">
                  {parseInt(item.decimals!.toString())}
                </TableCell>
                <TableCell align="center">
                  {item.balanceOf === null ? (
                    <NoValue />
                  ) : (
                    parseInt(item.balanceOf!.toString())
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
