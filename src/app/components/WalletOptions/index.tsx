import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Connector } from "wagmi";

interface WalletOptionsProps {
  connector: Connector;
  onClick: () => void;
}

export function WalletOptions({ connector, onClick }: WalletOptionsProps) {
  const [isConnect, setIsConnect] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const provider = await connector.getProvider();
      setIsConnect(!!provider);
    })();
  }, [connector]);

  return (
    <Box sx={{ display: "flex" }}>
      <Button
        sx={{
          flex: 1,
          border: "1px solid #1976d2",
        }}
        onClick={onClick}
      >
        {connector.name}
      </Button>
    </Box>
  );
}
