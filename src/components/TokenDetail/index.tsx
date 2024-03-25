import { tokenDetailSelector, tokenTransferSelector } from "@/redux/selector";
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  FormHelperText,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useDispatch, useSelector } from "react-redux";
import { formatAddress } from "@/utils/format";
import { useRouter, usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { getTokenDetailAsync } from "@/redux/slices/TokenDetail";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useRPCProviderContext } from "@/context/rpc-provider-context";
import { useAccount } from "wagmi";
import { isAddress } from "ethers";
import { debounce } from "@/utils/format";
import { tokenTransferAsync } from "@/redux/slices/TokenTransfer";
import { approve } from "@/hooks/use-wallet-action";

export function TokenDetail() {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [isValidateAddress, setIsValidateAddress] = useState<boolean>(true);
  const [isValidateAmount, setValidateAmount] = useState<boolean>(false);
  const [amount, setAmount] = useState<number | null>(null);
  const [receiptAddress, setReceiptAddress] = useState<string>("");
  const { reader, signer } = useRPCProviderContext();
  const tokenDetailInRedux = useSelector(tokenDetailSelector);
  const tokenTransferInRedux = useSelector(tokenTransferSelector);
  const account = useAccount();
  const dispatch = useDispatch();
  const pathname = usePathname();
  const router = useRouter();

  const getTokenDetail = useCallback(async () => {
    try {
      if (pathname) {
        const segments = pathname!.split("/");
        const tokenAddress = segments[segments.length - 1];
        if (reader) {
          dispatch(
            getTokenDetailAsync({
              tokenAddress: tokenAddress,
              accountAddress: account.address!,
              reader: reader,
            })
          );
        }
      }
    } catch (error) {
      console.error(error);
    }
  }, [account.address, dispatch, pathname, reader]);

  const copyButtonClick = (tokenAddress: string) => {
    navigator.clipboard.writeText(tokenAddress);
    alert("Copied token address: " + tokenAddress);
  };

  const validateAddress = (address: string) => {
    setReceiptAddress(address);

    const validate = isAddress(address);
    debounce(setIsValidateAddress(validate), 1000);
    if (address === account.address) {
      setIsValidateAddress(false);
    }
  };

  const validateAmount = (amount: string, balanceOf: string) => {
    if (parseFloat(amount) >= parseFloat(balanceOf) || parseInt(amount) < 0) {
      setValidateAmount(true);
    }
    if (
      amount === "" ||
      (parseFloat(amount) > 0 && parseFloat(amount) < parseFloat(balanceOf))
    ) {
      setValidateAmount(false);
      setAmount(parseFloat(amount));
    }
  };

  const transferToAddress = async () => {
    try {
      if (!amount) {
        return;
      }
      if (pathname) {
        const segments = pathname!.split("/");
        const tokenAddress = segments[segments.length - 1];
        if (signer) {
          dispatch(
            tokenTransferAsync({
              tokenAddress: tokenAddress,
              signer: signer,
              amount: amount,
              decimals: tokenDetailInRedux.data.decimals,
              receiptAddress: receiptAddress,
              symbol: tokenDetailInRedux.data.symbol,
            })
          );
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (
      tokenTransferInRedux.status === "SUCCESS" ||
      tokenTransferInRedux.status === "IDLE"
    ) {
      getTokenDetail();
    }
    setIsMounted(true);
  }, [getTokenDetail, tokenTransferInRedux.status]);

  if (!isMounted) {
    return null;
  }

  return (
    <Paper
      sx={{
        padding: "10px",
        display: "flex",
        flex: 0.5,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box sx={{ display: "flex", flex: 1, alignItems: "flex-start" }}>
        <IconButton onClick={() => router.push("/home")}>
          <ArrowBackIcon />
        </IconButton>
        <Box sx={{ flex: 1, marginLeft: "10px", marginRight: "50px" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              gap: "10px",
              marginBottom: "20px",
            }}
          >
            {tokenDetailInRedux.status === "PENDING" ? (
              <CircularProgress />
            ) : (
              <>
                <Avatar
                  sx={{ width: "60px", height: "60px" }}
                  alt={`${tokenDetailInRedux.data.name}`}
                  src={tokenDetailInRedux.data.icon}
                />
                <Typography variant="h5">
                  {tokenDetailInRedux.data.name}
                </Typography>
              </>
            )}
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "20px",
              border: "2px solid #008DDA",
              borderRadius: "20px",
              marginBottom: "20px",
            }}
          >
            <Grid container>
              <Grid item lg={6} md={12}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "center",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography>
                      {formatAddress(tokenDetailInRedux.data.address)}
                    </Typography>
                    <IconButton
                      onClick={() =>
                        copyButtonClick(tokenDetailInRedux.data.address)
                      }
                    >
                      <ContentCopyIcon color="primary" />
                    </IconButton>
                  </Box>
                  <Typography>
                    decimals: {tokenDetailInRedux.data.decimals}
                  </Typography>
                </Box>
              </Grid>
              <Grid item lg={6} md={12}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "15px",
                    flexDirection: "column",
                  }}
                >
                  <Typography variant="h5">Balance:&ensp;&ensp;</Typography>
                  <Typography variant="h5">
                    <b>
                      {parseFloat(tokenDetailInRedux.data.balanceOf)}
                      &ensp;
                    </b>
                    {tokenDetailInRedux.data.symbol}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
          <Grid container>
            <Grid
              item
              xs={3}
              sx={{
                display: "flex",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <Typography>Address:</Typography>
            </Grid>
            <Grid
              item
              xs={9}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "20px",
              }}
            >
              <TextField
                error={!isValidateAddress}
                placeholder="Public address"
                variant="outlined"
                sx={{ width: "100%" }}
                onChange={(e) => validateAddress(e.target.value)}
              />
              <FormHelperText hidden={isValidateAddress} sx={{ color: "red" }}>
                Not valid address
              </FormHelperText>
            </Grid>
            <Grid
              item
              xs={3}
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Typography>Amount:</Typography>
            </Grid>
            <Grid
              item
              xs={9}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <TextField
                value={amount}
                placeholder="Amount"
                type="number"
                error={isValidateAmount}
                onChange={(e) =>
                  validateAmount(
                    e.target.value,
                    tokenDetailInRedux.data.balanceOf
                  )
                }
                inputProps={{
                  inputMode: "numeric",
                  pattern: "^[0-9]*$",
                }}
              />
              <Button
                onClick={() =>
                  setAmount(parseFloat(tokenDetailInRedux.data.balanceOf))
                }
              >
                Max
              </Button>
            </Grid>
            <Grid item xs={3}></Grid>
            <Grid
              item
              xs={9}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <FormHelperText hidden={!isValidateAmount} sx={{ color: "red" }}>
                Not valid amount
              </FormHelperText>
            </Grid>
          </Grid>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              width: "100%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                gap: "15px",
              }}
            >
              <Button
                variant="contained"
                disabled={isValidateAmount || !isValidateAddress}
                sx={{
                  width: "100%",
                  height: "40px",
                  marginY: "20px",
                  display: "flex",
                }}
                onClick={() => transferToAddress()}
              >
                <Typography>SEND</Typography>
              </Button>
              <Button
                variant="outlined"
                disabled={isValidateAmount || !isValidateAddress}
                sx={{
                  width: "100%",
                  height: "40px",
                  marginY: "20px",
                  display: "flex",
                }}
                onClick={() =>
                  approve({
                    pathname,
                    signer,
                    amount,
                    receiptAddress,
                    decimals: tokenDetailInRedux.data.decimals,
                  })
                }
              >
                <Typography>Approve</Typography>
              </Button>
            </Box>
            <Typography color="#DDDDDD">or</Typography>
            <Button
              variant="contained"
              sx={{
                width: "100%",
                height: "40px",
                marginY: "20px",
                display: "flex",
              }}
              onClick={() => router.push(`/transfer-from`)}
            >
              <Typography>Transfer from</Typography>
            </Button>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
}
