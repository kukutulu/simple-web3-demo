import { AllowedNetwork } from "@/config/network-config";
import { useRPCProviderContext } from "@/context/rpc-provider-context";
import { resetTable, updateTable } from "@/redux/action";
import { Box, Button, Popover } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
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
  const { reader, setReader } = useRPCProviderContext();
  const account = useAccount();

  const [previousChainId, setPreviousChainId] = useState<number | undefined>(
    account.chainId
  );

  const dispatch = useDispatch();

  const setDataTable = () => {
    dispatch(
      updateTable([
        {
          icon: "E icon",
          name: "E coin",
          symbol: "E symbol",
          decimals: "E decimal",
          balanceOf: "E balance",
        },
      ])
    );
  };

  const handleSwitchChain = (chainId: number) => {
    if (!account.isConnected) {
      return;
    }
    switchChain({ chainId });
    setDataTable();
    onClose();
  };

  useEffect(() => {
    if (account.isConnected) {
      setReader(account.chainId!);
      if (account.chainId !== previousChainId) {
        setDataTable();
        setPreviousChainId(account.chainId);
      }
    }
    if (account.isDisconnected) {
      setReader(97);
      dispatch(resetTable());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account.chainId, account.isConnected, account.isDisconnected]);

  console.log(Number(reader?._network.chainId.toString()));

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
