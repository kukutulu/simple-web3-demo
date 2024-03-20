import { tokenDataTableSelector, tokenDetailSelector } from "@/redux/selector";
import { Avatar, Box, Button, Grid, Paper, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useDispatch, useSelector } from "react-redux";
import { formatAddress } from "@/utils/format";
import { useRouter, usePathname } from "next/navigation";
import { useCallback, useEffect } from "react";
import { tokenDetailSlice } from "@/redux/slices/TokenDetail";

export function TokenDetail() {
  const tokenDetailInRedux = useSelector(tokenDetailSelector);
  const tableDataInRedux = useSelector(tokenDataTableSelector);
  const dispatch = useDispatch();
  const pathname = usePathname();

  const getTokenDetail = useCallback(() => {
    if (pathname) {
      const segments = pathname!.split("/");
      const tokenAddress = segments[segments.length - 1];
      tableDataInRedux.data.map((item: any) => {
        if (item.address === tokenAddress) {
          dispatch(tokenDetailSlice.actions.updateSuccess(item));
        }
      });
    }
  }, [dispatch, pathname, tableDataInRedux.data]);

  const router = useRouter();

  const backButtonClick = () => {
    router.push("/home");
  };

  const copyButtonClick = (tokenAddress: string) => {
    navigator.clipboard.writeText(tokenAddress);
    alert("Copied token address: " + tokenAddress);
  };

  useEffect(() => {
    getTokenDetail();
  }, [getTokenDetail]);

  return (
    <Paper
      sx={{
        padding: "30px",
        display: "flex",
        flex: 0.5,
        alignItems: "center",
      }}
    >
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
            <Typography variant="h5">{tokenDetailInRedux.data.name}</Typography>
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
              <Grid item lg={5} md={12}>
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
                    <Button
                      onClick={() =>
                        copyButtonClick(tokenDetailInRedux.data.address)
                      }
                    >
                      Copy
                    </Button>
                  </Box>
                  <Typography>
                    decimals: {tokenDetailInRedux.data.decimals}
                  </Typography>
                </Box>
              </Grid>
              <Grid item lg={7} md={12}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: "10px",
                  }}
                >
                  <Typography variant="h5">
                    Balance:&ensp;&ensp;
                    <b>{tokenDetailInRedux.data.balanceOf}&ensp;</b>
                    {tokenDetailInRedux.data.symbol.toLowerCase()}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
}
