import { bep20_abi } from "@/abi/BEP20";
import { useRPCProviderContext } from "@/context/rpc-provider-context";
import { useTokenAddressesProviderContext } from "@/context/token-addresses-context";
import { TableDataType } from "@/global";
import { Box, Button, Popover } from "@mui/material";
import { BigNumber } from "bignumber.js";
import { Contract } from "ethers";
import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAccount, useSwitchChain } from "wagmi";
import { tokenDataTableSlice } from "../../../redux/slices/TokenDataTable";

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
  const dispatch = useDispatch();

  const _setTableData = useCallback(async () => {
    try {
      const _tempArr: TableDataType = [];
      if (reader) {
        dispatch(tokenDataTableSlice.actions.updatePending([]));
        for (let tokenAddress of tokenAddresses) {
          const contract = new Contract(tokenAddress, bep20_abi, reader);
          const result = await contract.balanceOf(account.address);
          const _name = await contract.name();
          const _symbol = await contract.symbol();
          const _decimals = await contract.decimals();
          _tempArr.push({
            icon: `/assets/${_symbol}.png`,
            address: tokenAddress,
            name: _name,
            symbol: _symbol,
            decimals: _decimals.toString(),
            balanceOf: BigNumber(result.toString())
              .dividedBy(BigNumber(10).pow(_decimals))
              .toFixed(3),
          });
        }
        dispatch(tokenDataTableSlice.actions.updateSuccess([..._tempArr]));
      }
    } catch (error) {
      dispatch(tokenDataTableSlice.actions.reset([]));
    }
  }, [account.address, dispatch, reader, tokenAddresses]);

  const handleSwitchChain = (chainId: number) => {
    if (account.isConnected) {
      switchChain({ chainId });
      setReader(chainId);
      onClose();
    } else return;
  };

  useEffect(() => {
    if (account.isConnected) {
      _setTableData();
    }
    if (account.isDisconnected) dispatch(tokenDataTableSlice.actions.reset([]));
  }, [account, _setTableData, dispatch]);

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
