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

const Data = [
  {
    icon: "A icon",
    name: "A coin",
    symbol: "A symbol",
    decimals: "A decimal",
    balanceOf: "A balance",
  },
  {
    icon: "B icon",
    name: "B coin",
    symbol: "B symbol",
    decimals: "B decimal",
    balanceOf: "B balance",
  },
  {
    icon: "C icon",
    name: "C coin",
    symbol: "C symbol",
    decimals: "C decimal",
    balanceOf: "C balance",
  },
  {
    icon: "D icon",
    name: "D coin",
    symbol: "D symbol",
    decimals: "D decimal",
    balanceOf: "D balance",
  },
];

export function TokenDataTable() {
  const [tableData, setTableData] = useState<typeof Data>(Data);
  const account = useAccount();
  const { reader, setReader } = useRPCProviderContext();
  //const [isMounted, setIsMounted] = useState(false);

  // useEffect(() => {
  //   setIsMounted(true);
  // }, []);

  // if (!isMounted) {
  //   return null;
  // }

  useEffect(() => {
    if (account.isConnected && AllowedNetwork.includes(account.chainId!)) {
      setReader(account.chainId!);
    }
    if (account.isDisconnected) {
      setReader(97);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account.chainId, account.isConnected]);

  console.log(reader);

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
                <TableCell>{item.decimals}</TableCell>
                <TableCell>{item.balanceOf}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
