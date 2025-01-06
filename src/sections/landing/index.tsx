"use client";

import { Stack, Button, Container, Typography, Box } from "@mui/material";
import useSmoothScrollTo from "src/hooks/use-smoothScrollTo";
import { useSettingsContext } from "src/components/settings";
import { useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { m } from "framer-motion";
import { varFade, MotionContainer } from "src/components/animate";
import Typed from "typed.js";
import LandingFooter from "./footer";
import LandingHeader from "./header";
import Intro from "./intro";
import UseCase from "./use-case";
import Feature from "./feature";
import Contact from "./contact";
import { useTranslate } from 'src/locales';

export default function Landing() {
  const { t } = useTranslate();
  const settings = useSettingsContext();
  const router = useRouter();

  const featureBind = useSmoothScrollTo("#feature");
  const useCaseBind = useSmoothScrollTo("#use-case");
  const contactBind = useSmoothScrollTo("#contact");
  const introBind = useSmoothScrollTo("#intro");
  const typedTextRef = useRef(null);

  const landingHeaderPlayer = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (settings.themeMode === "dark") {
      settings.onUpdate("themeMode", "light");
    }
  }, [settings]);

  useEffect(() => {
    if (landingHeaderPlayer?.current) {
      landingHeaderPlayer.current.playbackRate = 0.5;
    }
  }, [landingHeaderPlayer]);

  useEffect(() => {
    const options = {
      strings: [
        "The paramount doctrine of the economic and technological euphoria of recent decades has been that everything depends on innovation."
      ],
      startDelay: 300,
      typeSpeed: 50,
      backSpeed: 30,
      backDelay: 100,
      loop: true,
      cursorChar: "|"
    };

    const typed = new Typed(typedTextRef.current, options);
    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <div style={{ position: "relative", overflow: "hidden" }}>
      <LandingHeader />
      {/* landing main section */}
      <Stack
        sx={{
          position: "absolute",
          zIndex: -10,
          // filter: "blur(5rem)",
          width: "100vw",
          height: "100vh",
          overflow: "hidden",
          "& video": {
            // transform: "rotate(90deg)",
            width: { xs: "200%", md: "100%" },
            height: "200%",
            objectFit: "cover",
            // opacity: 0.8,
            // filter: "blur(5rem)"
          }
        }}
      >
        <video autoPlay muted loop controls={false}>
          <source src="/assets/video/landing-video.mp4" type="video/mp4" />
        </video>
      </Stack>
      <Container maxWidth="lg">
        <section >
          <Stack
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "center",
              height: "100vh"
            }}
          >
            <Stack flexDirection="column" justifyContent="center" gap={5}>
              <Stack
                flexDirection="column"
                justifyContent="center"
                gap={3}
                component={MotionContainer}
              >
                <Typography
                  variant="h2"
                  className="font-clash"
                  component={m.div}
                  variants={varFade().inLeft}
                  sx={{
                    lineHeight: 1.2,
                    letterSpacing: 1.5,
                    color: "white"
                  }}
                >
                  Every Crop Counts <br />
                  Every Farmer Matters <br />
                </Typography>
                <Typography variant="h6" maxWidth={400} sx={{ "& .typed-cursor": { color: "white" } }}>
                  <span ref={typedTextRef} style={{ color: "white" }} />
                </Typography>
              </Stack>
              <Stack>
                <Button
                  sx={{
                    py: 0.7,
                    px: 4,
                    fontWeight: "600",
                    lineHeight: "18.23px",
                    background:
                      // "linear-gradient(90deg, #1A61ED 0%, #9747FF 100%)",
                      "linear-gradient(90deg,rgb(26, 125, 62) 0%,rgb(61, 153, 93) 100%)",
                    width: 200
                  }}
                // onClick={() => router.push("/login")}
                >
                  <Stack className="alarm-green" mr={2} />
                  <Typography
                    className="font-clash"
                    variant="body1"
                    color="white"
                    letterSpacing={1}
                    fontWeight={700}
                  >
                    {/* {t('app')} */}
                    Get Started
                  </Typography>
                </Button>
              </Stack>
            </Stack>
          </Stack>
        </section>

        {/* Intro section */}
        <section {...introBind}>
        </section>
        <Intro />
        {/* Use-case section */}
        <section {...useCaseBind}>
        </section>
        <UseCase />
      </Container>

      {/* Feature section */}
      <section {...featureBind}>
      </section>
      <Feature />

      {/* Contact section */}
      <Container maxWidth="lg">
        <section {...contactBind}>
        </section>
        <Contact />
      </Container>

      {/* Footer section */}
      <LandingFooter />

      <Stack
        sx={{
          position: "absolute",
          bottom: 0,
          overflow: "hidden",
          width: "100vw",
          height: "90vh",
          zIndex: -4
        }}
      >
        <Stack
          sx={{
            position: "absolute",
            bottom: 0,
            zIndex: -5,
            transform: {
              xs: "rotate(45deg) translate(-22vh, 178vw)",
              sm: "rotate(45deg) translate(-45vh, 63vw)",
              lg: "rotate(45deg) translate(-60vh, 35vw)"
            }
          }}
        >
          <Stack
            sx={{
              position: "absolute",
              zIndex: -10,
              bottom: 0,
              filter: "blur(5rem)",
              width: "100vw",
              height: "100vh",
              overflow: "hidden",
              "& video": {
                transform: "rotate(90deg)",
                objectFit: "cover",
                opacity: 0.8,
                filter: "blur(5rem)",
                zIndex: -4
              }
            }}
          >
            <Stack>
              <video autoPlay muted loop controls={false}>
                <source
                  src="/assets/video/landing-header.webm"
                  type="video/mp4"
                />
              </video>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </div>
  );
}
