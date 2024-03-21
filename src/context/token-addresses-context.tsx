import { ReactNode, createContext, useContext, useMemo } from "react";
import { useAccount } from "wagmi";
import { TokenAddresses } from "../config/network-config";

interface TokenAddressesContextProps {
  tokenAddresses: string[];
}

const TokenAddressesProviderContext = createContext<TokenAddressesContextProps>(
  {
    tokenAddresses: [""],
  }
);

interface Props {
  children: ReactNode;
}

export default function TokenAddressesProvider({ children }: Props) {
  const account = useAccount();

  const tokenAddresses = useMemo(() => {
    if (account.isConnected) return TokenAddresses[account.chainId!];
    else return TokenAddresses[97];
  }, [account.chainId, account.isConnected]);

  return (
    <TokenAddressesProviderContext.Provider value={{ tokenAddresses }}>
      {children}
    </TokenAddressesProviderContext.Provider>
  );
}

export function useTokenAddressesProviderContext() {
  return useContext(TokenAddressesProviderContext);
}
