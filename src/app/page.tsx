"use client";

import { WagmiProvider } from "wagmi";
import { wagmiConfig } from "./wagmi/wagmiConfig";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConnectWallet } from "./components/ConnectWallet";
import { Content } from "./components/Content";

const queryClient = new QueryClient();

export default function Home() {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <Content />
      </QueryClientProvider>
    </WagmiProvider>
  );
}
