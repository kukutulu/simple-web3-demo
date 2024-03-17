import { Box, Button, Popover, Typography } from "@mui/material";
import { useDisconnect } from "wagmi";

interface AccountConnectedPopoverProps {
  open: boolean;
  anchorEl: HTMLButtonElement | null;
  accountAddress: `0x${string}`;
  onClose: () => void;
}

export function AccountConnectedPopover({
  open,
  anchorEl,
  accountAddress,
  onClose,
}: AccountConnectedPopoverProps) {
  const { disconnect } = useDisconnect();

  const handleDisconnect = () => {
    disconnect();
    onClose();
  };

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
        <Typography>{accountAddress}</Typography>
        <Button
          variant="contained"
          color="error"
          sx={{ flex: 1 }}
          onClick={() => handleDisconnect()}
        >
          Disconnect
        </Button>
      </Box>
    </Popover>
  );
}
