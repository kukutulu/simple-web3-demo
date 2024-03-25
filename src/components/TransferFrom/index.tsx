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
import { maxAllowAmount } from "@/hooks/use-wallet-action";
import { useRPCProviderContext } from "@/context/rpc-provider-context";

export default function TransferFrom() {
  const [ownerAddress, setOwnerAddress] = useState<string>("");
  const [senderAddress, setSenderAddress] = useState<string>("");
  const [receiptAddress, setReceiptAddress] = useState<string>("");
  const [amount, setAmount] = useState<number | null>(null);
  const [isValidateAddress, setIsValidateAddress] = useState<boolean>(true);
  const [isValidateAmount, setValidateAmount] = useState<boolean>(true);

  const router = useRouter();
  const pathname = usePathname();
  const { signer } = useRPCProviderContext();

  const validateAddress = (address: string) => {
    const validate = isAddress(address);
    debounce(setIsValidateAddress(validate), 1000);
    if (senderAddress === receiptAddress) {
      setIsValidateAddress(false);
    }
  };

  const validateAmount = (amount: string) => {
    // if validate
    setAmount(parseFloat(amount));
  };

  const getMaxAmount = () => {
    const maxAmount = maxAllowAmount({
      pathname,
      signer,
      ownerAddress,
      spenderAddress: senderAddress,
    });
    console.log("🚀 ~ getMaxAmount ~ maxAmount:", maxAmount);
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
            <Box sx={{ width: "100%", display: "flex", alignItems: "center" }}>
              <TextField
                error={false}
                label="Owner"
                variant="outlined"
                sx={{ width: "100%" }}
                onChange={(e) => {
                  //   validateAddress(e.target.value);
                  setOwnerAddress(e.target.value);
                }}
              />
              <FormHelperText hidden={true} sx={{ color: "red" }}>
                Not valid address
              </FormHelperText>
            </Box>

            <Box sx={{ width: "100%", display: "flex", alignItems: "center" }}>
              <TextField
                error={false}
                label="Recipient"
                variant="outlined"
                sx={{ width: "100%" }}
                onChange={(e) => {
                  //   validateAddress(e.target.value);
                  setReceiptAddress(e.target.value);
                }}
              />
              <FormHelperText hidden={true} sx={{ color: "red" }}>
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
              <Button onClick={() => getMaxAmount()}>Max</Button>
            </Box>
          </Box>
          <FormHelperText hidden={true} sx={{ color: "red" }}>
            Not valid amount
          </FormHelperText>
          <Button
            disabled={isValidateAddress! || isValidateAmount}
            sx={{ width: "100%", marginTop: "20px" }}
            variant="contained"
            onClick={() => {}}
          >
            Transfer
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}
