import { Box } from "@mui/material";
import { ConnectWallet } from "../ConnectWallet";
import { useAccount } from "wagmi";
import { Connected } from "../Connected";
import EthersSignerProvider from "@/app/context/ethers-signer-context";
import { useEffect, useState } from "react";

export function Content() {
  const [isMounted, setIsMounted] = useState<boolean>(false);

  const wagmiConnect = useAccount();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <>
      {isMounted ? (
        <Box>
          {!wagmiConnect.isConnected && <ConnectWallet />}
          {wagmiConnect.isConnected && (
            <EthersSignerProvider>
              <Connected
                address={wagmiConnect.address}
                chainId={wagmiConnect.chainId}
              />
            </EthersSignerProvider>
          )}
        </Box>
      ) : (
        <></>
      )}
    </>
  );
}
