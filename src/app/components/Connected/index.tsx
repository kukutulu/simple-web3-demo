import { formatAddress, formatBalance } from "@/app/utils/format";
import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDisconnect, useBalance, useSwitchChain } from "wagmi";
import { mockChain } from "../shared/mockData";
import { AllowedNetwork } from "@/app/config/network-config";
import { useEthersSignerContext } from "@/app/context/ethers-signer-context";

interface ConnectedProps {
  address?: `0x${string}`;
  chainId?: number;
}

type Chain = {
  chainId: number;
  chainName: string;
  currency: string;
};

export function Connected({ address, chainId }: ConnectedProps) {
  const [balance, setBalance] = useState<string>("");
  const [currentChain, setCurrentChain] = useState<Chain>();

  const signer = useEthersSignerContext();
  console.log(signer);

  const { chains, switchChain } = useSwitchChain();

  const { disconnect } = useDisconnect();

  const { data: balanceData } = useBalance({
    address: address,
  });

  useEffect(() => {
    if (chainId) {
      if (AllowedNetwork.includes(chainId) === false) {
        setTimeout(() => {
          disconnect();
        }, 3000);
        alert("Not supported network. Disconnecting...");
      }
    }
    const chain = mockChain.find((item) => item.chainId === chainId);
    setCurrentChain(chain);
    if (balanceData) setBalance(balanceData.formatted);
  }, [balanceData, chainId, disconnect]);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          height: "fit-content",
          width: "380px",
          borderRadius: "15px",
          boxShadow:
            "0px 0px 6px 0px #d5d9d985 inset, 0px 3px 6px 0px #00000014",
          padding: "20px",
          gap: "20px",
        }}
      >
        <Typography>Chain Id: {currentChain?.chainId}</Typography>
        <Typography>Chain: {currentChain?.chainName}</Typography>
        <Typography>Your address: {formatAddress(address!)}</Typography>
        <Typography>
          Your balance: {formatBalance(balance)} {currentChain?.currency}
        </Typography>
        <Box sx={{ height: "fit-content", gap: "5px" }}>
          {chains.map((chain) => (
            <Button
              key={chain.id}
              onClick={() => switchChain({ chainId: chain.id })}
            >
              {chain.name}
            </Button>
          ))}
        </Box>
        <Button variant="outlined" color="error" onClick={() => disconnect()}>
          Disconnect
        </Button>
      </Box>
    </Box>
  );
}
