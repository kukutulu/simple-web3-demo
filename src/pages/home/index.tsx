import { Meta } from "@/components/Meta";
import { TokenDataTable } from "@/components/TokenDataTable";
import AppLayout from "@/layouts/AppLayout";

function Home() {
  return (
    <AppLayout>
      <Meta title="Web3 Demo" />
      <TokenDataTable />
    </AppLayout>
  );
}

export default Home;
