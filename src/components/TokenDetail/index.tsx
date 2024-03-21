import { tokenDetailSelector } from "@/redux/selector";
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  FormHelperText,
  Grid,
  Modal,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
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
import { useTokenAddressesProviderContext } from "@/context/token-addresses-context";
import { Contract, isAddress, parseUnits } from "ethers";
import { debounce } from "@/utils/format";
import { bep20_abi } from "@/abi/BEP20";
import BigNumber from "bignumber.js";

export function TokenDetail() {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [isValidateAddress, setIsValidateAddress] = useState<boolean>(false);
  const [isValidateAmount, setValidateAmount] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [amount, setAmount] = useState<number>();
  const [receiptAddress, setReceiptAddress] = useState<string>("");
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  const { reader } = useRPCProviderContext();

  const tokenDetailInRedux = useSelector(tokenDetailSelector);
  const { tokenAddresses } = useTokenAddressesProviderContext();
  const { signer } = useRPCProviderContext();
  const account = useAccount();
  const dispatch = useDispatch();
  const pathname = usePathname();
  const router = useRouter();
  const segments = pathname!.split("/");
  const tokenAddress = segments[segments.length - 1];

  const getTokenDetail = useCallback(async () => {
    try {
      if (
        tokenAddresses === undefined ||
        !tokenAddresses.includes(tokenAddress)
      ) {
        router.push("/home");
      }
      dispatch(
        getTokenDetailAsync({
          tokenAddress: tokenAddress,
          accountAddress: account.address!,
          reader: reader!,
        })
      );
    } catch (error) {
      console.error(error);
    }
  }, [account.address, dispatch, reader, router, tokenAddress, tokenAddresses]);

  const backButtonClick = () => {
    router.push("/home");
  };

  const copyButtonClick = (tokenAddress: string) => {
    navigator.clipboard.writeText(tokenAddress);
    alert("Copied token address: " + tokenAddress);
  };

  const validateAddress = (e: any) => {
    setReceiptAddress(e.target.value);
    const validate = isAddress(e.target.value);
    if (e.target.value === account.address) {
      setIsValidateAddress(!validate);
    }
    debounce(setIsValidateAddress(!validate), 1000);
    if (e.target.value === "") {
      setIsValidateAddress(false);
    }
  };

  const handleChange = (e: any) => {
    e.preventDefault();
  };

  const validateAmount = (amount: any, balanceOf: any) => {
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
    const contract = new Contract(tokenAddress, bep20_abi, signer);
    if (amount) {
      const amountFormatted = BigNumber(amount)
        .dividedBy(
          BigNumber(10).pow(parseInt(tokenDetailInRedux.data.decimals))
        )
        .toFixed(3);
      const transferAmount = parseUnits(
        amountFormatted,
        parseInt(tokenDetailInRedux.data.decimals)
      );
      const transfer = await contract.transfer(receiptAddress, transferAmount);
      await transfer.wait();
    }
  };

  useEffect(() => {
    setIsMounted(true);
    getTokenDetail();
  }, [getTokenDetail]);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <Paper
        sx={{
          padding: "10px",
          display: "flex",
          flex: 0.5,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* {tokenDetailInRedux.status === "FAILED" && (
        <Box sx={{ display: "flex", flex: 1, alignItems: "flex-start" }}>
          <IconButton onClick={() => backButtonClick()}>
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
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography variant="h1" color="error" align="center">
                  SOMETHING WRONG
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      )} */}
        {tokenDetailInRedux.status === "PENDING" && (
          <Box sx={{ display: "flex", flex: 1, alignItems: "flex-start" }}>
            <IconButton onClick={() => backButtonClick()}>
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
                <CircularProgress />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "20px",
                  border: "2px solid #008DDA",
                  borderRadius: "20px",
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
                      <Box>
                        <Typography>
                          {formatAddress(tokenDetailInRedux.data.address)}
                        </Typography>
                        <IconButton
                          onClick={() =>
                            copyButtonClick(tokenDetailInRedux.data.address)
                          }
                        >
                          <ContentCopyIcon />
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
                        <b>0&ensp;</b>
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
                  }}
                >
                  <Typography>Send To:</Typography>
                </Grid>
                <Grid item xs={9} sx={{ marginBottom: "10px" }}>
                  <TextField
                    label="Public address"
                    variant="outlined"
                    sx={{ width: "100%" }}
                  />
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
                    label="Amount"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          {tokenDetailInRedux.data.symbol
                            ? tokenDetailInRedux.data.symbol.toLowerCase()
                            : ""}
                        </InputAdornment>
                      ),
                    }}
                  />
                  <Button>Max</Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
        )}
        {tokenDetailInRedux.status === "SUCCESS" && (
          <Box sx={{ display: "flex", flex: 1, alignItems: "flex-start" }}>
            <IconButton onClick={() => backButtonClick()}>
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
                <Avatar
                  sx={{ width: "60px", height: "60px" }}
                  alt={`${tokenDetailInRedux.data.name}`}
                  src={tokenDetailInRedux.data.icon}
                />
                <Typography variant="h5">
                  {tokenDetailInRedux.data.name}
                </Typography>
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
                  <Typography>Send To:</Typography>
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
                    error={isValidateAddress}
                    label="Public address"
                    variant="outlined"
                    sx={{ width: "100%" }}
                    onChange={(e) => validateAddress(e)}
                  />
                  <FormHelperText
                    hidden={!isValidateAddress}
                    sx={{ color: "red" }}
                  >
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
                    label="Amount"
                    type="number"
                    error={isValidateAmount}
                    onChange={(e) =>
                      validateAmount(
                        e.target.value,
                        tokenDetailInRedux.data.balanceOf
                      )
                    }
                    onPaste={handleChange}
                    inputProps={{
                      inputMode: "numeric",
                      pattern: "^[0-9]*$",
                      endAdornment: (
                        <InputAdornment position="end">
                          {tokenDetailInRedux.data.symbol.toLowerCase()}
                        </InputAdornment>
                      ),
                    }}
                  />
                  <Button onClick={() => {}}>Max</Button>
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
                  <FormHelperText
                    hidden={!isValidateAmount}
                    sx={{ color: "red" }}
                  >
                    Không đủ tiền đổ ga
                  </FormHelperText>
                </Grid>
              </Grid>
              <Button
                variant="contained"
                disabled={isValidateAmount || isValidateAddress}
                sx={{
                  width: "100%",
                  height: "40px",
                  marginY: "20px",
                  display: "flex",
                  alignItems: "center",
                }}
                onClick={() => handleOpen()}
              >
                <Typography>SEND</Typography>
              </Button>
            </Box>
          </Box>
        )}
      </Paper>
      <Modal open={openModal} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "450px",
            height: "200px",
            bgcolor: "background.paper",
            borderRadius: "20px",
            boxShadow: 24,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Avatar
            sx={{ width: "60px", height: "60px" }}
            alt={`${tokenDetailInRedux.data.name}`}
            src={tokenDetailInRedux.data.icon}
          />
          <Typography variant="h6">
            This action cannot be undone. Are you sure?
          </Typography>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
              marginRight: "20px",
            }}
          >
            <Button>Cancel</Button>
            <Button onClick={() => transferToAddress()}>Confirm</Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
