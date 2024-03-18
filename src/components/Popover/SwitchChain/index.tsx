import { useRPCProviderContext } from "@/context/rpc-provider-context";
import { resetTable, updateTable } from "@/redux/action";
import { Box, Button, Popover } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useAccount, useSwitchChain } from "wagmi";
import { bep20_abi } from "@/abi/BEP20";
import { BigNumber } from "bignumber.js";
import { TableDataType } from "@/global";
import { useTokenAddressesProviderContext } from "@/context/token-addresses-context";
import { Contract } from "ethers";

interface SwitchChainPopoverProps {
  open: boolean;
  anchorEl: HTMLButtonElement | null;
  onClose: () => void;
}

export function SwitchChainPopover({
  open,
  anchorEl,
  onClose,
}: SwitchChainPopoverProps) {
  const { chains, switchChain } = useSwitchChain();
  const { reader, setReader } = useRPCProviderContext();
  const { tokenAddresses } = useTokenAddressesProviderContext();

  const account = useAccount();

  const [previousChainId, setPreviousChainId] = useState<number | undefined>(
    account.chainId
  );

  const dispatch = useDispatch();

  const _setTableData = useCallback(async () => {
    try {
      const _tempArr: TableDataType = [];
      if (reader) {
        for (let tokenAddress of tokenAddresses) {
          const contract = new Contract(tokenAddress, bep20_abi, reader);
          const result = await contract.balanceOf(account.address);
          const _name = await contract.name();
          const _symbol = await contract.symbol();
          const _decimals = await contract.decimals();
          _tempArr.push({
            icon: `/assets/${_symbol}.png`,
            name: _name,
            symbol: _symbol,
            decimals: _decimals,
            balanceOf: BigNumber(result.toString())
              .dividedBy(BigNumber(10).pow(_decimals))
              .toFixed(3),
          });
        }
        dispatch(updateTable([..._tempArr]));
        console.log(
          "🚀 ~ const_setTableData=useCallback ~ _tempArr:",
          _tempArr
        );
      }
    } catch (error) {
      console.log("🚀 ~ const_getInfo=useCallback ~ error:", error);
    }
  }, [account.address, dispatch, reader, tokenAddresses]);

  const handleSwitchChain = (chainId: number) => {
    if (!account.isConnected) {
      return;
    }
    switchChain({ chainId });
    setReader(chainId);
    onClose();
  };

  useEffect(() => {
    if (account.isConnected) {
      setReader(account.chainId!);
      if (account.chainId !== previousChainId) {
        _setTableData();
        setPreviousChainId(account.chainId);
      }
    }
    if (account.isDisconnected) {
      setReader(97);
      dispatch(resetTable());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account.chainId, account.isConnected, account.isDisconnected]);

  console.log(Number(reader?._network.chainId.toString()));

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      sx={{
        width: "auto",
        height: "auto",
        marginTop: "20px",
      }}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          gap: "20px",
          padding: "20px",
        }}
      >
        {chains.map((chain) => (
          <Button key={chain.id} onClick={() => handleSwitchChain(chain.id)}>
            {chain.name}
          </Button>
        ))}
      </Box>
    </Popover>
  );
}
