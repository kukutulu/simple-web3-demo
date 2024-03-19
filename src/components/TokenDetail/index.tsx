import { tokenDetailSelector } from "@/redux/selector";
import { Avatar, Box, Paper, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useSelector } from "react-redux";
import { formatAddress } from "@/utils/format";
import { useRouter } from "next/navigation";

export function TokenDetail() {
  const tokenDetail = useSelector(tokenDetailSelector);
  const router = useRouter();

  const backButtonClick = () => {
    router.push("/home");
  };

  return (
    <Paper
      sx={{
        padding: "30px",
        maxWidth: "400px",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "flex-start" }}>
        <IconButton onClick={() => backButtonClick()}>
          <ArrowBackIcon />
        </IconButton>
        <Box sx={{ flex: 1, marginLeft: "10px" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "10px",
            }}
          >
            <Avatar
              alt={`${tokenDetail.data.name}`}
              src={tokenDetail.data.icon}
            />
            <Typography>{tokenDetail.data.name}</Typography>
          </Box>
          <Typography>{formatAddress(tokenDetail.data.address)}</Typography>
          <Typography>{tokenDetail.data.symbol}</Typography>
          <Typography>{tokenDetail.data.decimals}</Typography>
          <Typography>{tokenDetail.data.balanceOf}</Typography>
        </Box>
      </Box>
    </Paper>
  );
}
