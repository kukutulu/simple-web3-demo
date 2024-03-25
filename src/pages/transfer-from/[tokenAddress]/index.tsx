import { Meta } from "@/components/Meta";
import TransferFrom from "@/components/TransferFrom";

import AppLayout from "@/layouts/AppLayout";
import { Box } from "@mui/material";

function TokenDetailPage() {
  return (
    <AppLayout>
      <Meta title="Transfer From" />
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <TransferFrom />
      </Box>
    </AppLayout>
  );
}

export default TokenDetailPage;
