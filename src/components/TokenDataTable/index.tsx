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
import { tokenDetailSlice } from "@/redux/slices/TokenDetail";
import { ColumnItemType, TableDataType } from "@/global";
import { useCallback, useEffect, useState } from "react";

export function TokenDataTable() {
  const tableDataInRedux = useSelector(tokenDataTableSelector);
  const [tableData, setTableData] = useState<TableDataType>([]);
  const router = useRouter();
  const dispatch = useDispatch();

  const filterReduxTableData = useCallback(() => {
    const encounteredNames: { [name: string]: boolean } = {};
    const _tempArr: TableDataType = [];
    tableDataInRedux.data.forEach((token: any) => {
      if (!encounteredNames[token.name]) {
        encounteredNames[token.name] = true;
        _tempArr.push(token);
      }
    });
    setTableData([..._tempArr]);
  }, [tableDataInRedux.data]);

  const handleTableRowClick = (
    tokenAddress: string,
    tokenDetail: ColumnItemType
  ) => {
    dispatch(tokenDetailSlice.actions.updateSuccess(tokenDetail));
    router.push(`/token/${tokenAddress}`);
  };

  useEffect(() => {
    filterReduxTableData();
  }, [filterReduxTableData]);

  return (
    <>
      <Paper sx={{ margin: "80px" }}>
        {tableDataInRedux.status === "IDLE" && (
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
                {tableData.map((item: any) => (
                  <TableRow
                    onClick={() =>
                      handleTableRowClick(item.address.toLowerCase(), item)
                    }
                    key={item.name}
                    sx={{
                      "&:last-child td, &:last-child th": {
                        border: 0,
                      },
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
        {tableDataInRedux.status === "FAILED" && <Box>FAILED</Box>}
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
                      handleTableRowClick(item.address.toLowerCase(), item)
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
