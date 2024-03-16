import { WalletOption } from "@/components/WalletOption";
import { Box, Button, Popover, Typography } from "@mui/material";
import React from "react";
import { useConnect } from "wagmi";

export function WalletOptionPopover() {
  const { connectors, connect } = useConnect();

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

  return (
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
        {connectors.map((connector, index) => (
          <WalletOption
            key={index}
            connector={connector}
            onClick={() => connect({ connector })}
          />
        ))}
      </Box>
    </Popover>
  );
}
