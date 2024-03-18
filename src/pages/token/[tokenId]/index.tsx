import { Meta } from "@/components/Meta";
import AppLayout from "@/layouts/AppLayout";
import { Box, Typography } from "@mui/material";

function Token() {
  return (
    <AppLayout>
      <Meta title="Token" />
      <Box>
        <Typography>Token ID</Typography>
      </Box>
    </AppLayout>
  );
}

export default Token;
