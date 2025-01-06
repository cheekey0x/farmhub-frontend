import Head from "next/head";
import DashboardLayout from "src/layouts/admin";
import AccountPage from "src/sections/account";
// ----------------------------------------------------------------------

export default function Account() {
  return <AccountPage />;
}

Account.getLayout = function getLayout(page: React.ReactElement): JSX.Element {
  return (
    <DashboardLayout>
      <Head>
        <title>Account | YieldLab</title>
      </Head>
      {page}
    </DashboardLayout>
  );
};
