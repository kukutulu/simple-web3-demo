import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { JsonRpcProvider, JsonRpcSigner } from "ethers";
import { useEthersSigner } from "../hook/useClientToSigner";
import { CHAINS } from "../config/network-config";

interface RPCProviderContextProps {
  rpc: string;
  signer: JsonRpcSigner | undefined;
  reader: JsonRpcProvider | undefined;
  setSigner: (web3: JsonRpcSigner | undefined) => void;
  setReader: (chainId: number) => Promise<void>;
}

const RPCProviderContext = createContext<RPCProviderContextProps>({
  rpc: "",
  signer: undefined,
  reader: undefined,
  setSigner: () => {},
  setReader: async () => {},
});

interface Props {
  children: ReactNode;
}

export default function RPCProviderProvider({ children }: Props) {
  const [rpc, setRpc] = useState<string>("");
  const [signer, setSigner] = useState<JsonRpcSigner | undefined>(undefined);
  const [reader, setReader] = useState<JsonRpcProvider | undefined>(undefined);

  const getSinger = useEthersSigner();

  async function _setReader(chainId: number) {
    const chain = CHAINS[chainId];
    const promises = chain.urls.map(async (rpc) => {
      const web3 = new JsonRpcProvider(rpc);
      await web3.getBlockNumber();
      return { web3, rpc };
    });
    const { web3, rpc } = await Promise.any(promises);
    setReader(web3);
    setRpc(rpc);
  }

  useEffect(() => {
    async function fetch() {
      setSigner(await getSinger);
    }
    fetch();
  }, [getSinger, signer]);

  return (
    <RPCProviderContext.Provider
      value={{ rpc, signer, reader, setSigner, setReader: _setReader }}
    >
      {children}
    </RPCProviderContext.Provider>
  );
}

export function useRPCProviderContext() {
  return useContext(RPCProviderContext);
}
