import dynamic from "next/dynamic";
import Head from "next/head";

const NFTPreviewPage = dynamic(() => import("src/sections/preview/nft"), {
  ssr: false
});

export default function ProjectDetails() {
  return <NFTPreviewPage />;
}

ProjectDetails.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <>
      <Head>
        <title>NFT Preview | YieldLab</title>
      </Head>
      {page}
    </>
  );
};
