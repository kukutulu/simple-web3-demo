import { Box, Typography } from "@mui/material";
import * as React from "react";
import { useConnect, useSwitchChain } from "wagmi";
import { WalletOptions } from "../WalletOptions";

export function ConnectWallet() {
  const { connectors, connect } = useConnect();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          height: "400px",
          width: "380px",
          display: "flex",
          flexDirection: "column",
          borderRadius: "15px",
          boxShadow:
            "0px 0px 6px 0px #d5d9d985 inset, 0px 3px 6px 0px #00000014",
        }}
      >
        <Box
          sx={{
            height: "70px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderTopLeftRadius: "15px",
            borderTopRightRadius: "15px",
            background: "#333A73",
          }}
        >
          <Typography sx={{ color: "#FFFFFF", fontSize: "25px" }}>
            Welcome to &quot;web3 demo&quot;
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            padding: "20px",
            gap: "20px",
          }}
        >
          <Typography>
            Greeting, please connect to your wallet to get more information
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItem: "center",
              justifyContent: "space-between",
              flexDirection: "column",
              width: "250px",
              height: "180px",
            }}
          >
            {connectors.map((connector, index) => (
              <WalletOptions
                key={index}
                connector={connector}
                onClick={() => connect({ connector })}
              />
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
