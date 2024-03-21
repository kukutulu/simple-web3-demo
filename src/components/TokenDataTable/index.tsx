"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Box,
  CircularProgress,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { tokenDataTableSelector } from "@/redux/selector";
import { NoValue } from "../NoValue";
import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";
import { useRPCProviderContext } from "@/context/rpc-provider-context";
import { useTokenAddressesProviderContext } from "@/context/token-addresses-context";
import { useAccount } from "wagmi";
import { getDataTableAsync } from "@/redux/slices/TokenDataTable";

export function TokenDataTable() {
  const tableDataInRedux = useSelector(tokenDataTableSelector);
  const router = useRouter();

  const { reader } = useRPCProviderContext();
  const { tokenAddresses } = useTokenAddressesProviderContext();

  const account = useAccount();
  const dispatch = useDispatch();

  const _setTableData = useCallback(() => {
    try {
      dispatch(
        getDataTableAsync({
          tokenAddresses: tokenAddresses,
          accountAddress: account.address!,
          reader: reader!,
        })
      );
    } catch (error) {
      console.error(error);
    }
  }, [account.address, dispatch, reader, tokenAddresses]);

  const handleTableRowClick = (tokenAddress: string) => {
    router.push(`/token/${tokenAddress}`);
  };

  useEffect(() => {
    _setTableData();
  }, [_setTableData]);

  return (
    <>
      <Paper sx={{ margin: "80px" }}>
        {tableDataInRedux.status === "PENDING" && (
          <>
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
              </Table>
            </TableContainer>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "300px",
              }}
            >
              <CircularProgress />
            </Box>
          </>
        )}
        {tableDataInRedux.status === "FAILED" && (
          <>
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
              </Table>
            </TableContainer>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "300px",
              }}
            >
              NO DATA
            </Box>
          </>
        )}
        {tableDataInRedux.status === "SUCCESS" && (
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
              <TableBody sx={{ cursor: "pointer" }}>
                {tableDataInRedux.data.map((item: any) => (
                  <TableRow
                    onClick={() =>
                      handleTableRowClick(item.address.toLowerCase())
                    }
                    key={item.name}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                      "& .MuiTableRow-root:hover": {
                        backgroundColor: "#ACE2E1",
                      },
                    }}
                  >
                    <TableCell
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
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
        )}
      </Paper>
    </>
  );
}
