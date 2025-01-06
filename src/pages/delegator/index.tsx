import Head from "next/head";
import dynamic from "next/dynamic";
import DashboardLayout from "src/layouts/admin";

const DelegatorPage = dynamic(() => import("src/sections/delegator"), {
  ssr: false
});
// ----------------------------------------------------------------------

export default function Delegator() {
  return <DelegatorPage />;
}

Delegator.getLayout = function getLayout(
  page: React.ReactElement
): JSX.Element {
  return (
    <DashboardLayout>
      <Head>
        <title>Delegator | YieldLab</title>
      </Head>
      {page}
    </DashboardLayout>
  );
};
