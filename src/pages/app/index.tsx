import Head from "next/head";
import DashboardLayout from "src/layouts/admin";
import Dashboardpage from "src/sections/dashboard";

export default function Dashboard() {
  return <Dashboardpage />;
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
