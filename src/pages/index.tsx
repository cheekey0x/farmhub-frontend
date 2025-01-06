import dynamic from "next/dynamic";
import Head from "next/head";

const Landing = dynamic(() => import("src/sections/landing"), { ssr: false });

export default function LandingPage() {
  return (
    <>
      <Head>
        <title>飞鸟科技FarmHub智慧农业系统</title>
      </Head>
      <Landing />
    </>
  );
}
