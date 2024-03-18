import { Header } from "@/components/Header";
import { Container } from "@mui/material";
import { ReactNode } from "react";
import { WagmiProvider } from "wagmi";
import { wagmiConfig } from "@/wagmi/wagmiConfig";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import RPCProviderProvider from "@/context/rpc-provider-context";
import store from "@/redux/store";
import { Provider } from "react-redux";
import TokenAddressesProvider from "@/context/token-addresses-context";

const queryClient = new QueryClient();

const AppLayout = ({ children }: { children: ReactNode | undefined }) => {
  return (
    <>
      <WagmiProvider config={wagmiConfig}>
        <QueryClientProvider client={queryClient}>
          <RPCProviderProvider>
            <TokenAddressesProvider>
              <Provider store={store}>
                <Header />
                <Container>{children}</Container>
              </Provider>
            </TokenAddressesProvider>
          </RPCProviderProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </>
  );
};

export default AppLayout;
