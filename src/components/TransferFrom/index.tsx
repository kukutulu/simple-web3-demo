import {
  Box,
  Button,
  FormHelperText,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { isAddress } from "ethers";
import { debounce } from "@/utils/format";
import { maxAllowAmount, transferFrom } from "@/hooks/use-wallet-action";
import { useRPCProviderContext } from "@/context/rpc-provider-context";
import { useAccount } from "wagmi";
import BigNumber from "bignumber.js";
import { useSelector } from "react-redux";
import { tokenDetailSelector } from "@/redux/selector";

export default function TransferFrom() {
  const [ownerAddress, setOwnerAddress] = useState<string>("");
  console.log("🚀 ~ TransferFrom ~ ownerAddress:", ownerAddress);
  const [receiptAddress, setReceiptAddress] = useState<string>("");
  console.log("🚀 ~ TransferFrom ~ receiptAddress:", receiptAddress);
  const [amount, setAmount] = useState<number | null>(null);
  const [isValidateOwner, setIsValidateOwner] = useState<boolean>(true);
  const [isValidateReceipt, setIsValidateReceipt] = useState<boolean>(true);
  const [isValidateAmount, setValidateAmount] = useState<boolean>(true);

  const router = useRouter();
  const pathname = usePathname();
  const account = useAccount();
  const { signer, reader } = useRPCProviderContext();
  const tokenDetailInRedux = useSelector(tokenDetailSelector);

  const validateAddress = (address: string, type: string) => {
    const validate = isAddress(address);
    if (type === "owner") {
      debounce(setIsValidateOwner(validate), 1000);
    } else {
      debounce(setIsValidateReceipt(validate), 1000);
    }
    if (ownerAddress !== receiptAddress) {
      console.log(123);

      setIsValidateReceipt(false);
    }
    if (address === "" && type === "owner") {
      setIsValidateOwner(true);
    }
    if (address === "" && type === "receipt") {
      setIsValidateReceipt(true);
    }
  };

  const validateAmount = (amount: string) => {
    // if validate
    setAmount(parseFloat(amount));
  };

  const setMaxAmount = async () => {
    if (account.isConnected && ownerAddress) {
      const maxAmount = await maxAllowAmount({
        pathname,
        reader,
        ownerAddress,
        spenderAddress: account.address,
      });
      const formattedMaxAmount = BigNumber(maxAmount.toString())
        .dividedBy(BigNumber(10).pow(tokenDetailInRedux.data.decimals))
        .toFixed();
      setAmount(parseFloat(formattedMaxAmount));
    }
  };

  return (
    <Paper sx={{ flex: 0.5 }}>
      <Box sx={{ display: "flex", flex: 1, alignItems: "flex-start" }}>
        <IconButton onClick={() => router.push("/home")}>
          <ArrowBackIcon />
        </IconButton>
        <Box
          sx={{
            flex: 1,
            marginLeft: "10px",
            marginRight: "50px",
            padding: "20px",
          }}
        >
          <Typography variant="h5" sx={{ marginBottom: "10px" }}>
            Transfer From
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            <Box
              sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <TextField
                error={!isValidateOwner}
                label="Owner"
                variant="outlined"
                sx={{ width: "100%" }}
                onChange={(e) => {
                  validateAddress(e.target.value, "owner");
                  setOwnerAddress(e.target.value);
                }}
              />
              <FormHelperText hidden={isValidateOwner} sx={{ color: "red" }}>
                Not valid address
              </FormHelperText>
            </Box>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <TextField
                error={!isValidateReceipt}
                label="Recipient"
                variant="outlined"
                sx={{ width: "100%" }}
                onChange={(e) => {
                  validateAddress(e.target.value, "receipt");
                  setReceiptAddress(e.target.value);
                }}
              />
              <FormHelperText hidden={isValidateReceipt} sx={{ color: "red" }}>
                Not valid address
              </FormHelperText>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                gap: "10px",
              }}
            >
              <TextField
                error={false}
                value={amount}
                type="number"
                placeholder="Amount"
                variant="outlined"
                sx={{ width: "100%" }}
                inputProps={{
                  inputMode: "numeric",
                  pattern: "^[0-9]*$",
                }}
                onChange={(e) => validateAmount(e.target.value)}
              />
              <Button onClick={() => setMaxAmount()}>Max</Button>
            </Box>
          </Box>
          <FormHelperText hidden={true} sx={{ color: "red" }}>
            Not valid amount
          </FormHelperText>
          <Button
            disabled={!isValidateReceipt || !isValidateAmount}
            sx={{ width: "100%", marginTop: "20px" }}
            variant="contained"
            onClick={() =>
              transferFrom({
                pathname,
                signer,
                senderAddress: account.address,
                receiptAddress,
                amount,
              })
            }
          >
            Transfer
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}
