"use client";

import { AllowedNetwork } from "@/config/network-config";
import { useRPCProviderContext } from "@/context/rpc-provider-context";
import { TableDataType } from "@/global";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { BigNumber } from "bignumber.js";
import { useSelector } from "react-redux";
import { tokenDataTableSelector } from "@/redux/selector";
import { NoValue } from "../NoValue";

export function TokenDataTable() {
  const tableDataInStore: TableDataType = useSelector(tokenDataTableSelector);
  console.log("🚀 ~ TokenDataTable ~ tableDataInStore:", tableDataInStore);

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
                <TableCell>{item.name}</TableCell>
                <TableCell align="center">{item.symbol}</TableCell>
                <TableCell align="center">{item.decimals}</TableCell>
                <TableCell align="center">
                  {item.balanceOf === null ? <NoValue /> : item.balanceOf}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
