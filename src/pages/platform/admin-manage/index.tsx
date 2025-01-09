import Head from "next/head";
import DashboardLayout from "src/layouts/admin";
import AdminSettingPage from "src/sections/platform/admin";

export default function Dashboard() {
    return <AdminSettingPage />;
}

Dashboard.getLayout = function getLayout(page: React.ReactElement) {
    return (
        <DashboardLayout>
            <Head>
                <title>Admin Setting</title>
            </Head>
            {page}
        </DashboardLayout>
    );
};
