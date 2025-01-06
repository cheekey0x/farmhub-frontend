import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Favicon and general icons */}
        <link rel="icon" href="/favicon/favcion.png" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favcion.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favcion.png"
        />
        {/* Apple Touch Icon */}
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="favicon/favcion.png"
        />

        {/* Metadata */}
        {/* General */}
        <meta
          name="description"
          content="Staking solutions for instant NFT & Coin utility so founders can get back to focusing on community."
        />
        <meta name="keywords" content="farm, farmland, farm management, " />
        <meta name="author" content="FarmHub" />
        {/* Open Graph Meta tags - covers Facebook Discord */}
        <meta property="og:title" content="FarmHub" />
        <meta
          property="og:description"
          content="Staking solutions for instant NFT & Coin utility so founders can get back to focusing on community."
        />
        <meta
          property="og:image"
          content="https://i.ibb.co/hZBzpgh/bars-over-letters.webp"
        />
        {/* <meta property="og:url" content="https://Yield.xyz" /> */}
        <meta property="og:type" content="website" />

        {/* Twitter Meta tags - self explainatory */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="FarmHub" />
        <meta
          name="twitter:description"
          content="Staking solutions for instant NFT & Coin utility so founders can get back to focusing on community."
        />
        <meta
          name="twitter:image"
          content="https://i.ibb.co/hZBzpgh/bars-over-letters.webp"
        />
        <meta name="twitter:site" content="@wmsy_estates" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body suppressHydrationWarning>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
