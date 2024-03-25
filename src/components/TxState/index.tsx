import { tokenTransferSelector } from "@/redux/selector";
import { Box, Card, CircularProgress, Link, Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ProgressTimer from "../Progress";

export default function TxState() {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const tokenTransferInRedux = useSelector(tokenTransferSelector);

  const handleTimeout = useCallback(() => {
    if (
      tokenTransferInRedux.status === "SUCCESS" ||
      tokenTransferInRedux.status === "FAILED"
    ) {
      setIsVisible(true);
      const timeout = setTimeout(() => {
        setIsVisible(false);
      }, 8000);
      return () => clearTimeout(timeout);
    } else return;
  }, [tokenTransferInRedux.status]);

  useEffect(() => {
    handleTimeout();
  }, [handleTimeout]);

  return (
    <>
      {tokenTransferInRedux.status === "WAITING_CONFIRM" && (
        <Card sx={{ position: "fixed", bottom: 50, left: 40 }}>
          <Box
            sx={{
              width: "200px",
              height: "55px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
            }}
          >
            <CircularProgress size={20} />
            <Typography>Waiting for transaction</Typography>
          </Box>
        </Card>
      )}
      {tokenTransferInRedux.status === "SUCCESS" && isVisible && (
        <Card sx={{ position: "fixed", bottom: 50, left: 40 }}>
          <Box
            sx={{
              width: "200px",
              height: "55px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Typography>Transaction success</Typography>
            <Link
              target="_blank"
              rel="noopener"
              href={`https://testnet.bscscan.com/tx/${tokenTransferInRedux.data.hash}`}
            >
              Link to contract
            </Link>
            <ProgressTimer type="success" />
          </Box>
        </Card>
      )}
      {tokenTransferInRedux.status === "FAILED" && isVisible && (
        <Card sx={{ position: "fixed", bottom: 50, left: 40 }}>
          <Box
            sx={{
              width: "200px",
              height: "55px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Typography color="error">Transaction rejected</Typography>
            <ProgressTimer type="failed" />
          </Box>
        </Card>
      )}
    </>
  );
}
