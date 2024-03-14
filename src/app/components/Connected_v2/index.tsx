import { Box, Typography } from "@mui/material";
import { Header } from "./_components/header";
import { useAccount } from "wagmi";
import { DataTable } from "./_components/table";

export function ConnectedV2() {
  const wagmiConnect = useAccount();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "100px",
      }}
    >
      <Header address={wagmiConnect.address} chainId={wagmiConnect.chainId} />
      <DataTable />
    </Box>
  );
}
