"use client";

import Head from "next/head";
import LoadingLogo from "src/components/loading-screen/loading-logo";

// ----------------------------------------------------------------------

export default function Loading() {
  return (
    <>
      <Head>
        <title>Loading</title>
      </Head>
      <LoadingLogo />
    </>
  );
}
