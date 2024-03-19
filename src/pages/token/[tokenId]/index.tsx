import { Meta } from "@/components/Meta";
import { TokenDetail } from "@/components/TokenDetail";
import AppLayout from "@/layouts/AppLayout";

function TokenDetailPage() {
  return (
    <AppLayout>
      <Meta title="Token" />
      <TokenDetail />
    </AppLayout>
  );
}

export default TokenDetailPage;
