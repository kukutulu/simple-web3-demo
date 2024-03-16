import { Header } from "@/components/Header";
import { Container } from "@mui/material";
import { ReactNode } from "react";
import { WagmiProvider } from "wagmi";
import { wagmiConfig } from "@/wagmi/wagmiConfig";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import RPCProviderProvider from "@/context/rpc-provider-context";

const queryClient = new QueryClient();

const AppLayout = ({ children }: { children: ReactNode | undefined }) => {
  return (
    <>
      <WagmiProvider config={wagmiConfig}>
        <QueryClientProvider client={queryClient}>
          <RPCProviderProvider>
            <Header />
            <Container>{children}</Container>
          </RPCProviderProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </>
  );
};

export default AppLayout;
