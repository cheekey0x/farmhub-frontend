import Head from "next/head";
import DashboardLayout from "src/layouts/admin";
import PlatformSettingPage from "src/sections/platform";

export default function Dashboard() {
  return <PlatformSettingPage />;
}

Dashboard.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <DashboardLayout>
      <Head>
        <title>Dashboard</title>
      </Head>
      {page}
    </DashboardLayout>
  );
};

// ----------------------------------------------------------------------
