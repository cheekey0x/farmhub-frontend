import Head from "next/head";
import DashboardLayout from "src/layouts/admin";
import ProjectPage from "src/sections/project";
// ----------------------------------------------------------------------

export default function Project() {
  return <ProjectPage />;
}

Project.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <DashboardLayout>
      <Head>
        <title>Project | YieldLab</title>
      </Head>
      {page}
    </DashboardLayout>
  );
};
