"use client";

import { WagmiProvider } from "wagmi";
import { wagmiConfig } from "./wagmi/wagmiConfig";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Content } from "./components/Content";
import RPCProviderProvider from "./context/rpc-provider-context";

const queryClient = new QueryClient();

export default function Home() {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RPCProviderProvider>
          <Content />
        </RPCProviderProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
