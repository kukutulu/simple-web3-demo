import { Box } from "@mui/material";
import { ConnectWallet } from "../ConnectWallet";
import { useAccount } from "wagmi";
import { Connected } from "../Connected";
import { useEffect, useState } from "react";
import RPCProviderProvider from "@/app/context/rpc-provider-context";
import { ConnectedV2 } from "../Connected_v2";

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
            <ConnectedV2 />
            // <RPCProviderProvider>
            //   {/* <Connected
            //     address={wagmiConnect.address}
            //     chainId={wagmiConnect.chainId}
            //   /> */}
            //   <ConnectedV2 />
            // </RPCProviderProvider>
          )}
        </Box>
      ) : (
        <></>
      )}
    </>
  );
}
