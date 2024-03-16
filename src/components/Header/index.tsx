import { Box, Button, Popover, Typography } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { useAccount, useConnect, useDisconnect, useSwitchChain } from "wagmi";
import { WalletOption } from "../WalletOption";
import { formatAddress } from "@/utils/format";
import { getNetworkName } from "@/utils/get-network-name";
import { AllowedNetwork } from "@/config/network-config";

export function Header() {
  const [accountAddress, setAccountAddress] = useState<`0x${string}`>();
  // const [isMounted, setIsMounted] = useState(false);

  // wagmi hooks
  const { connectors, connect } = useConnect();
  const account = useAccount();
  const { disconnect } = useDisconnect();
  const { chains, switchChain } = useSwitchChain();

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

  const handleSwitchChain = (chainId: number) => {
    if (!account.isConnected) {
      return;
    }
    switchChain({ chainId });
    handleClose();
  };

  const handleDisconnect = () => {
    disconnect();
    handleClose();
  };
  const open = Boolean(anchorEl);
  const open2 = Boolean(anchorEl2);
  const open3 = Boolean(anchorEl3);

  useEffect(() => {
    if (account.isConnected) {
      checkSupportedChain();
    }
  }, [account.isConnected, checkSupportedChain]);

  // if (!isMounted) {
  //   return null;
  // }

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px 30px 10px",
          background: "#F7EEDD",
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
      <Popover
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
              onClick={() => connect({ chainId: 56, connector })}
            />
          ))}
        </Box>
      </Popover>
      <Popover
        open={open2}
        anchorEl={anchorEl2}
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
      <Popover
        open={open3}
        anchorEl={anchorEl3}
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
          {chains.map((chain) => (
            <Button key={chain.id} onClick={() => handleSwitchChain(chain.id)}>
              {chain.name}
            </Button>
          ))}
        </Box>
      </Popover>
    </>
  );
}
