import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { JsonRpcSigner } from "ethers";
import { useEthersSigner } from "../hook/useClientToSigner";

const EthersSignerContext = createContext<JsonRpcSigner | undefined>(undefined);

interface Props {
  children: ReactNode;
}

export default function EthersSignerProvider({ children }: Props) {
  const [signer, setSigner] = useState<JsonRpcSigner | undefined>(undefined);

  const getSinger = useEthersSigner();

  useEffect(() => {
    async function fetch() {
      setSigner(await getSinger);
    }
    fetch();
  }, [getSinger, signer]);

  return (
    <EthersSignerContext.Provider value={signer}>
      {children}
    </EthersSignerContext.Provider>
  );
}

export function useEthersSignerContext() {
  return useContext(EthersSignerContext);
}
