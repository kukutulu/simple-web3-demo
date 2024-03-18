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
} from "@mui/material";
import { useSelector } from "react-redux";
import { tokenDataTableSelector } from "@/redux/selector";
import { NoValue } from "../NoValue";
import { useRouter } from "next/navigation";

export function TokenDataTable() {
  const tableDataInStore = useSelector(tokenDataTableSelector);
  const router = useRouter();
  console.log("🚀 ~ TokenDataTable ~ tableDataInStore:", tableDataInStore);

  const handleTableRowClick = (token: string) => {
    router.push(`/token/${token}`);
  };

  return (
    <>
      {tableDataInStore.status === "IDLE" && (
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
              <TableBody sx={{ cursor: "pointer" }}>
                {tableDataInStore.data.map((item: any) => (
                  <TableRow
                    key={item.name}
                    sx={{
                      "&:last-child td, &:last-child th": {
                        border: 0,
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
        </Paper>
      )}
      {tableDataInStore.status === "PENDING" && (
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
            </Table>
          </TableContainer>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            Loading
          </Box>
        </Paper>
      )}
      {tableDataInStore.status === "FAILED" && <Box>FAILED</Box>}
      {tableDataInStore.status === "SUCCESS" && (
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
                {tableDataInStore.data.map((item: any) => (
                  <TableRow
                    onClick={() => handleTableRowClick(item.name)}
                    key={item.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
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
        </Paper>
      )}
    </>
  );
}
