import { Box, Button, Typography } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { useAccount, useDisconnect } from "wagmi";
import { formatAddress } from "@/utils/format";
import { getNetworkName } from "@/utils/get-network-name";
import { AllowedNetwork } from "@/config/network-config";
import { WalletOptionPopover } from "../Popover/WalletOption";
import { AccountConnectedPopover } from "../Popover/AccountConnected";
import { SwitchChainPopover } from "../Popover/SwitchChain";

export function Header() {
  const [accountAddress, setAccountAddress] = useState<`0x${string}`>();
  const [isMounted, setIsMounted] = useState(false);

  const account = useAccount();
  const { disconnect } = useDisconnect();

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const [anchorEl2, setAnchorEl2] = React.useState<HTMLButtonElement | null>(
    null
  );
  const [anchorEl3, setAnchorEl3] = React.useState<HTMLButtonElement | null>(
    null
  );

  const checkSupportedChain = useCallback(() => {
    if (account.isConnected) {
      if (AllowedNetwork.includes(account.chainId!) === false) {
        setTimeout(() => {
          disconnect();
        }, 3000);
        alert("Not supported network! Disconnecting...");
      }
      setAccountAddress(account.address);
      handleClose();
    }
  }, [account.address, account.chainId, account.isConnected, disconnect]);

  const handleConnectWalletClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    if (!account.isConnected) {
      setAnchorEl(event.currentTarget);
    } else {
      setAnchorEl2(event.currentTarget);
    }
  };

  const handleChangeNetworkClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setAnchorEl3(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setAnchorEl2(null);
    setAnchorEl3(null);
  };

  const open = Boolean(anchorEl);
  const open2 = Boolean(anchorEl2);
  const open3 = Boolean(anchorEl3);

  useEffect(() => {
    setIsMounted(true);
    if (account.isConnected) {
      checkSupportedChain();
    }
  }, [account.chainId, account.isConnected, checkSupportedChain]);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px 30px 10px",
          minHeight: "70px",
        }}
      >
        <Typography variant="h6">Web3 Demo</Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <Button variant="outlined" onClick={handleChangeNetworkClick}>
            {account.isConnected === true
              ? getNetworkName(account.chainId)
              : "CHANGE NETWORK"}
          </Button>
          <Button variant="contained" onClick={handleConnectWalletClick}>
            {account.isConnected === true
              ? formatAddress(accountAddress!)
              : "Connect Wallet"}
          </Button>
        </Box>
      </Box>
      <WalletOptionPopover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
      />
      <AccountConnectedPopover
        open={open2}
        anchorEl={anchorEl2}
        accountAddress={accountAddress!}
        onClose={handleClose}
      />
      <SwitchChainPopover
        open={open3}
        anchorEl={anchorEl3}
        onClose={handleClose}
      />
    </>
  );
}
