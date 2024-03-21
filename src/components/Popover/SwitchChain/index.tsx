import { useRPCProviderContext } from "@/context/rpc-provider-context";
import { Box, Button, Popover } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
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
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const { chains, switchChain } = useSwitchChain();
  const { setReader } = useRPCProviderContext();
  const [previousChainId, setPreviousChainId] = useState<number>(97);
  const pathname = usePathname();
  const router = useRouter();

  const account = useAccount();

  const handleSwitchChain = async (chainId: number) => {
    if (account.isConnected) {
      setPreviousChainId(chainId);
      switchChain({ chainId });
      setReader(chainId);
    } else return;
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

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
