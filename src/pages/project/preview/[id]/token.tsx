import dynamic from "next/dynamic";
import Head from "next/head";

const TokenPreviewPage = dynamic(() => import("src/sections/preview/token"), {
  ssr: false
});

export default function ProjectDetails() {
  return <TokenPreviewPage />;
}

ProjectDetails.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <>
      <Head>
        <title>Token Preview | YieldLab</title>
      </Head>
      {page}
    </>
  );
};
