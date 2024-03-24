import { Box, Button, Popover } from "@mui/material";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
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
  const account = useAccount();
  const [previousChainId, setPreviousChainId] = useState<number>(
    account.chainId!
  );
  const router = useRouter();

  const onButtonSwitchChainClick = async (chainId: number) => {
    if (account.isConnected) {
      switchChain({ chainId });
    } else return;
  };

  const handleSwitchChain = useCallback(() => {
    if (previousChainId !== account.chainId) {
      setPreviousChainId(account.chainId!);
      router.push("/home");
    } else return;
  }, [account.chainId, previousChainId, router]);

  useEffect(() => {
    handleSwitchChain();
    setIsMounted(true);
  }, [handleSwitchChain]);

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
          <Button
            key={chain.id}
            onClick={() => onButtonSwitchChainClick(chain.id)}
          >
            {chain.name}
          </Button>
        ))}
      </Box>
    </Popover>
  );
}
