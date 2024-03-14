import { abi } from "@/app/ABI/abi";
import { useRPCProviderContext } from "@/app/context/rpc-provider-context";
import { Box, Paper, TableContainer } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Contract } from "ethers";
import { useCallback, useEffect, useState } from "react";
import { useAccount } from "wagmi";

const TableData = [
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

export function DataTable() {
  const { reader, setReader } = useRPCProviderContext();
  const [balanceOf, setBalanceOf] = useState<bigint>();
  const [decimals, setDecimals] = useState(0);
  const [name, setName] = useState<string>("");
  const [symbol, setSymbol] = useState<string>("");

  const account = useAccount();

  const tokenAddress = "dai.tokens.ethers.eth";

  // const _getBalance = useCallback(async () => {
  //   if (!reader) {
  //     setReader(account.chainId!);
  //   }
  //   if (reader) {
  //     const result = await reader.getBalance(`${account.address}`);
  //     setBalance(result);
  //   }
  // }, [reader, setReader, account.chainId, account.address]);

  const _getInfo = useCallback(async () => {
    if (!reader) {
      setReader(account.chainId!);
    } else {
      const contract = new Contract(tokenAddress, abi, reader);
      const _name = await contract.name();
      const _symbol = await contract.symbol();
      const _decimals = await contract.decimals();
      setName(_name);
      setDecimals(_decimals);
      setSymbol(_symbol);
    }
  }, [account.chainId, reader, setReader]);

  useEffect(() => {
    // _getBalance();
    _getInfo();
  }, [_getInfo]);

  console.log("🚀 ~ DataTable ~ name:", name);
  console.log("🚀 ~ DataTable ~ symbol:", symbol);
  console.log("🚀 ~ DataTable ~ decimals:", decimals);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <TableContainer
        component={Paper}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          maxWidth: "calc(100vw - 240px)",
        }}
      >
        <Table sx={{ minWidth: "450px" }}>
          <TableHead>
            <TableRow>
              <TableCell>Assets</TableCell>
              <TableCell align="right">Symbol</TableCell>
              <TableCell align="right">Decimal</TableCell>
              <TableCell align="right">Balance of</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {TableData.map((item) => (
              <TableRow
                key={item.icon}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {item.icon} {item.name}
                </TableCell>
                <TableCell align="right">{item.symbol}</TableCell>
                <TableCell align="right">{item.decimal}</TableCell>
                <TableCell align="right">{item.balanceOf}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
