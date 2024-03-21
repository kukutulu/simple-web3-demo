import { WalletOption } from "@/components/WalletOption";
import { Box, Popover } from "@mui/material";
import React from "react";
import { useConnect } from "wagmi";

interface WalletOptionPopoverProps {
  open: boolean;
  anchorEl: HTMLButtonElement | null;
  onClose: () => void;
}

export function WalletOptionPopover({
  open,
  anchorEl,
  onClose,
}: WalletOptionPopoverProps) {
  const { connectors, connect } = useConnect();

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
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
            onClick={() => connect({ chainId: 97, connector })}
          />
        ))}
      </Box>
    </Popover>
  );
}
