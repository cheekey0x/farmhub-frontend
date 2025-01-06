import Head from "next/head";
import dynamic from "next/dynamic";

// import ContactPageSection from "src/sections/landing/contact";
const ContactPageSection = dynamic(() => import("src/sections/landing/contact"), {
  ssr: false
});

export default function ContactPage() {
  return (
    <>
      <Head>
        <title>Contact | YieldLab</title>
      </Head>
      <ContactPageSection />
    </>
  );
}

// ----------------------------------------------------------------------
