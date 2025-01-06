import { Grid, Stack, Typography, ButtonBase, Box } from "@mui/material";
import { m } from "framer-motion";
import React, { useState } from "react";
import Image from "src/components/image";

const features = [
  {
    name: "Robust Hardware",
    logo: "/assets/images/landing/hammer.png",
    overview_logo: "/assets/images/landing/hammer.png",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Pariatur dolore nisi sint exercitationem."
  },
  {
    name: "Robust Hardware",
    logo: "/assets/images/landing/sandclock.png",
    overview_logo: "/assets/images/landing/sandclock.png",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Pariatur dolore nisi sint exercitationem."
  },
  {
    name: "Robust Hardware",
    logo: "/assets/images/landing/target.png",
    overview_logo: "/assets/images/landing/target.png",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Pariatur dolore nisi sint exercitationem."
  },
  {
    name: "Robust Hardware",
    logo: "/assets/images/landing/cog.png",
    overview_logo: "/assets/images/landing/cog.png",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Pariatur dolore nisi sint exercitationem."
  },
  {
    name: "Robust Hardware",
    logo: "/assets/images/landing/box.png",
    overview_logo: "/assets/images/landing/box.png",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Pariatur dolore nisi sint exercitationem."
  }
];

function Feature() {
  return (
    <Stack
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      my={8}
      p={5}
      px={6}
      // gap={2}
      // pb={30}
      sx={{
        backgroundColor: "#F3F0EB"
      }}
    >
      <Box sx={{
        mb: 2
      }}>
        <Box
          color="#236634"
          sx={{ backgroundColor: "#D3F0DB", borderRadius: "24px", padding: "4px 18px", display: "inline-block" }}
        >
          <Typography
            variant="body2"
            color="#236634"
          >
            Features of Farmhub
          </Typography>
        </Box>

      </Box>
      <Typography variant="h3" className="font-clash" letterSpacing={1.5} sx={{ fontWeight: 450 }}>
        What makes us STANDOUT from the crowd
      </Typography>
      <Typography variant="body1" className="font-clash" sx={{ mb: 4 }}>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Pariatur dolore nisi sint exercitationem.
      </Typography>
      <Stack
        flexDirection="row"
        justifyContent="between"
        alignItems="center"
        gap={8}
      >
        {features.map((feature) => (
          <Stack
            key={feature.logo}
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <Stack
              flexDirection="row"
              justifyContent="center"
              alignItems="center"
              p={1}
              sx={{ backgroundColor: "#fff", borderRadius: "8px" }}
            >
              <Image
                disabledEffect
                src={feature.logo}
                alt="staking"
                sx={{ width: "50px", height: "50px" }}
              />
            </Stack>
            <Typography variant="body1" className="font-clash" letterSpacing={2} py={1}>
              {feature.name}
            </Typography>
            <Typography variant="caption" textAlign="center">
              {feature.description}
            </Typography>
          </Stack>
        ))}

      </Stack>
      {/* <Grid container spacing={2} component={MotionViewport}>
        <Grid item xs={12} md={6} component={m.div} variants={varFade().inLeft}>
          <Stack
            justifyContent="center"
            alignItems="center"
            sx={{
              width: "100%",
              height: "100%"
            }}
          >
            <Image src={acitvePartner.logo} alt="staking" p={5} width={250} />
          </Stack>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          component={m.div}
          variants={varFade().inRight}
        >
          <Stack
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            p={5}
            sx={{
              background: "#9e9e9e17",
              borderRadius: 3,
              width: "100%"
            }}
          >
            <Stack
              spacing={3}
              flexDirection="column"
              justifyContent="flex-start"
              alignItems="center"
            >
              <Typography
                variant="h4"
                letterSpacing={2}
                textTransform="uppercase"
                className="font-clash"
                width="100%"
              >
                {acitvePartner.name}
              </Typography>
              <Stack spacing={2} height={200} sx={{ overflowY: "auto" }}>
                <Typography variant="body2" letterSpacing={1}>
                  {acitvePartner.description}
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </Grid>
      </Grid>

      <Grid container spacing={2} component={MotionViewport}>
        {CPartners.map((partnerItem) => (
          <Grid item xs={12} md={6} component={m.div} key={partnerItem.name}>
            <ButtonBase
              onClick={() => setActivePartner(partnerItem)}
              component={m.div}
              whileTap="tap"
              whileHover="hover"
              disableTouchRipple
              sx={{
                background: "#9e9e9e17",
                cursor: "pointer",
                borderRadius: 3,
                p: 5,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                border:
                  acitvePartner === partnerItem
                    ? "6px solid #4A4A4A"
                    : "6px solid #12181f75",
                width: "100%",
                height: "100%",
                transition: "border .6s",
                boxShadow:
                  "0px 5.64px 5.64px 0px #00000040, 0px 2.82px 10.01px 0px #00000040 inset",
                "&:hover": {
                  boxShadow:
                    "0px 2.82px 10.01px 0px 00000040 inset, 0px 5.64px 5.64px 0px #00000040",
                  border: "6px solid #4A4A4A",
                  background: "#9e9e9e17 !important"
                }
              }}
            >
              <Image
                disabledEffect
                src={partnerItem.overview_logo}
                alt="staking"
                sx={{ zIndex: -1 }}
              />
            </ButtonBase>
          </Grid>
        ))}
      </Grid> */}
    </Stack>
  );
}

export default Feature;
