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
        backgroundColor: "#F3F0EB",
        backgroundImage: "url('/assets/images/landing/contact-pattern-bg.png')",
        backgroundBlendMode: "overlay",
        backgroundSize: "cover",
        borderRadius: "24px"
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
            <Typography variant="body1" className="font-clash" letterSpacing={1.5} py={1}>
              {feature.name}
            </Typography>
            <Typography variant="caption" textAlign="center">
              {feature.description}
            </Typography>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
}

export default Feature;
