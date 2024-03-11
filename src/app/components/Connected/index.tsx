import { formatAddress, formatBalance } from "@/app/utils/format";
import { Box, Button, Typography } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useDisconnect, useBalance, useChainId } from "wagmi";
import { mockChain } from "../shared/mockData";

interface ConnectedProps {
  address?: `0x${string}`;
}

export function Connected({ address }: ConnectedProps) {
  const [balance, setBalance] = useState<string>("");
  const [isMounted, setIsMounted] = useState<boolean>(false);

  const currentChainId = useChainId();

  const { disconnect } = useDisconnect();

  const { data: balanceData } = useBalance({
    address: address,
  });

  const currentChain = useMemo(() => {
    const currentChain = mockChain.find(
      (item) => item.chainId === currentChainId
    );
    return currentChain;
  }, [currentChainId]);

  useEffect(() => {
    if (balanceData) setBalance(balanceData.formatted);
  }, [balanceData]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  console.log("hello");

  return (
    <>
      {isMounted ? (
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
            <Typography>Chain: {currentChain?.chainName}</Typography>
            <Typography>Your address: {formatAddress(address!)}</Typography>
            <Typography>
              Your balance: {formatBalance(balance)} {currentChain?.currency}
            </Typography>
            <Button
              sx={{ border: "1px solid #1976d2" }}
              onClick={() => disconnect()}
            >
              Disconnect
            </Button>
          </Box>
        </Box>
      ) : (
        <></>
      )}
    </>
  );
}
