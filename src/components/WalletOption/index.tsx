/* eslint-disable @next/next/no-img-element */
import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Connector } from "wagmi";

interface WalletOptionProps {
  connector: Connector;
  onClick: () => void;
}

export function WalletOption({ connector, onClick }: WalletOptionProps) {
  const [isConnect, setIsConnect] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const provider = await connector.getProvider();
      setIsConnect(!!provider);
    })();
  }, [connector]);

  return (
    <Box sx={{ display: "flex", height: "40px", width: "180px" }}>
      <Button
        variant="outlined"
        onClick={onClick}
        sx={{ flex: 1, gap: "10px" }}
      >
        <img src={`${connector.icon}`} alt="" />
        <Typography>{connector.name}</Typography>
      </Button>
    </Box>
  );
}
