import { Header } from "@/components/Header";
import RPCProviderProvider, { useRPCProviderContext } from "@/context/rpc-provider-context";
import TokenAddressesProvider from "@/context/token-addresses-context";
import store from "@/redux/store";
import { wagmiConfig } from "@/wagmi/wagmiConfig";
import { Container } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useEffect } from "react";
import { Provider } from "react-redux";
import { WagmiProvider, useAccount } from "wagmi";

const queryClient = new QueryClient();

function CommonLayer({ children }: { children: ReactNode | undefined }) {
  const account = useAccount();
  const { setReader } = useRPCProviderContext();

  useEffect(() => {
    if (account.isConnected) {
      setReader(account.chainId!);
    } else setReader(97);
  }, [account.isConnected, account.chainId, setReader]);

  return <>{children}</>;
}

const AppLayout = ({ children }: { children: ReactNode | undefined }) => {
  return (
    <>
      <WagmiProvider config={wagmiConfig}>
        <QueryClientProvider client={queryClient}>
          <RPCProviderProvider>
            <TokenAddressesProvider>
              <Provider store={store}>
                <CommonLayer>
                  <Header />
                  <Container>{children}</Container>
                </CommonLayer>
              </Provider>
            </TokenAddressesProvider>
          </RPCProviderProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </>
  );
};

export default AppLayout;
