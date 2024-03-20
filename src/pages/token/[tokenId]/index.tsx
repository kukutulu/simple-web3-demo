import { Meta } from "@/components/Meta";
import { TokenDetail } from "@/components/TokenDetail";
import AppLayout from "@/layouts/AppLayout";
import { Box } from "@mui/material";

function TokenDetailPage() {
  return (
    <AppLayout>
      <Meta title="Token" />
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <TokenDetail />
      </Box>
    </AppLayout>
  );
}

export default TokenDetailPage;
