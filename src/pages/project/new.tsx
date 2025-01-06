import Head from "next/head";
import DashboardLayout from "src/layouts/admin";
import NewProjectPage from "src/sections/project/new";

export default function ProjectDetails() {
  return <NewProjectPage />;
}

ProjectDetails.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <DashboardLayout>
      <Head>
        <title>New Project | YieldLab</title>
      </Head>
      {page}
    </DashboardLayout>
  );
};
