import { AllowedNetwork } from "@/app/config/network-config";
import { formatAddress } from "@/app/utils/format";
import { Box, Button, Popover, Typography } from "@mui/material";
import { useEffect } from "react";
import { useAccount, useDisconnect } from "wagmi";
import React from "react";

interface HeaderProps {
  address?: `0x${string}`;
  chainId?: number;
}

export function Header({ address, chainId }: HeaderProps) {
  const { disconnect } = useDisconnect();
  const wagmiConnect = useAccount();

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  useEffect(() => {
    if (chainId) {
      if (AllowedNetwork.includes(chainId) === false) {
        setTimeout(() => {
          disconnect();
        }, 3000);
        alert("Not supported network. Disconnecting...");
      }
    }
  }, [chainId, disconnect]);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          width: "100vw",
          height: "100px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginRight: "30px",
            gap: "10px",
          }}
        >
          <Button variant="outlined">Change network</Button>
          <Button variant="contained" onClick={handleClick}>
            {formatAddress(address!)}
          </Button>
        </Box>
      </Box>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        sx={{
          width: "auto",
          height: "auto",
          marginTop: "20px",
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            gap: "20px",
            padding: "20px",
          }}
        >
          <Typography>{wagmiConnect.address}</Typography>
          <Button
            variant="contained"
            sx={{ width: "330px" }}
            color="error"
            onClick={() => disconnect()}
          >
            Disconnect
          </Button>
        </Box>
      </Popover>
    </>
  );
}
