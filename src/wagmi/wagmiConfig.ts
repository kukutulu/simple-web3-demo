import { http, createConfig } from "wagmi";
import { bsc, bscTestnet, fantom } from "wagmi/chains";
import { walletConnect } from "wagmi/connectors";

export const wagmiConfig = createConfig({
  chains: [bsc, bscTestnet, fantom],
  connectors: [walletConnect({ projectId: "505f490de3842b110b964f72bcd7535e", showQrModal: false })],
  transports: {
    [bsc.id]: http(),
    [bscTestnet.id]: http(),
    [fantom.id]: http(),
  },
});
