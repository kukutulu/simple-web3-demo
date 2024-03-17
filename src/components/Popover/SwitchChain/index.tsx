import { Box, Button, Popover } from "@mui/material";
import { useAccount, useSwitchChain } from "wagmi";

interface SwitchChainPopoverProps {
  open: boolean;
  anchorEl: HTMLButtonElement | null;
  onClose: () => void;
}

export function SwitchChainPopover({
  open,
  anchorEl,
  onClose,
}: SwitchChainPopoverProps) {
  const { chains, switchChain } = useSwitchChain();
  const account = useAccount();

  const handleSwitchChain = (chainId: number) => {
    if (!account.isConnected) {
      return;
    }
    switchChain({ chainId });
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
        {chains.map((chain) => (
          <Button key={chain.id} onClick={() => handleSwitchChain(chain.id)}>
            {chain.name}
          </Button>
        ))}
      </Box>
    </Popover>
  );
}
