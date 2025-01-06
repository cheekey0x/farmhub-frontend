import Head from "next/head";
import AppLayout from "src/layouts/admin";
import ProjectDetailsPage from "src/sections/project/details";

export default function ProjectDetails() {
  return <ProjectDetailsPage />;
}

ProjectDetails.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <AppLayout>
      <Head>
        <title>Project Details | YieldLab</title>
      </Head>
      {page}
    </AppLayout>
  );
};
