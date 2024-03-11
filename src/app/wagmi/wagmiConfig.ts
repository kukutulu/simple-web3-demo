import { http, createConfig } from "wagmi";
import { sepolia, mainnet, bsc, bscTestnet } from "wagmi/chains";
import { injected, walletConnect } from "wagmi/connectors";

// const projectId = process.env.WALLETCONNECT_PROJECT_ID;

export const wagmiConfig = createConfig({
  chains: [mainnet, bsc, sepolia, bscTestnet],
  connectors: [
    injected(),
    walletConnect({ projectId: "505f490de3842b110b964f72bcd7535e" }),
  ],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [bsc.id]: http(),
    [bscTestnet.id]: http(),
  },
});
