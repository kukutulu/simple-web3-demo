import { http, createConfig } from "wagmi";
import { mainnet, bsc, bscTestnet, fantom } from "wagmi/chains";
import { walletConnect } from "wagmi/connectors";

export const wagmiConfig = createConfig({
  chains: [mainnet, bsc, bscTestnet, fantom],
  connectors: [
    walletConnect({ projectId: "505f490de3842b110b964f72bcd7535e" }),
  ],
  transports: {
    [mainnet.id]: http(),
    [bsc.id]: http(),
    [bscTestnet.id]: http(),
    [fantom.id]: http(),
  },
});
