"use client";

import {
  Box,
  Grid,
  Stack,
  Button,
  Divider,
  Typography,
  LinearProgress,
  linearProgressClasses
} from "@mui/material";
import React from "react";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import IosShareIcon from "@mui/icons-material/IosShare";
import { alpha, styled, useTheme } from "@mui/material/styles";
import Image from "next/image";
import { usePersistStore } from "src/store/persist";
import { CSocialCategory } from "src/constant/project";
import Iconify from "src/components/iconify";
import PreviewLayout from "../layout";

const nftItemStyle = [
  {
    value: "0",
    label: "Total NFTs"
  },
  {
    value: "0",
    label: "Staked NFTs"
  },
  {
    value: "0",
    label: "Lifetime Earned"
  },
  {
    value: "0",
    label: "Perks"
  }
];

const nftItems = [
  { name: "NFT Name/Title", earned: 0, time_staked: 0 },
  { name: "NFT Name/Title", earned: 0, time_staked: 0 },
  { name: "NFT Name/Title", earned: 0, time_staked: 0 },
  { name: "NFT Name/Title", earned: 0, time_staked: 0 }
];

function NFTPreviewPage() {
  const theme = useTheme();
  const projectInfo = usePersistStore((store) => store.app.previewProject);

  const BorderLinearProgress = styled(LinearProgress)(({ theme: themes }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor:
        alpha(projectInfo?.hlColor ?? theme.palette.background.main, 0.5) ??
        theme.palette.background.lighter
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: projectInfo?.hlColor ?? theme.palette.background.main
    }
  }));

  const handleSocialLink = async (link: string) => {
    window.open(link, "_blank");
  };

  return (
    <PreviewLayout>
      <Stack
        direction="column"
        justifyContent="stretch"
        alignItems="center"
        my={5}
        gap={3}
      >
        <Grid container spacing={3} alignItems="stretch">
          <Grid item lg={4} md={12} xs={12}>
            <Stack
              direction="column"
              justifyContent="center"
              alignItems="center"
              gap={2}
              sx={{
                backgroundColor:
                  projectInfo?.tbColor ?? theme.palette.background.paper,
                px: 3,
                py: 3,
                height: "100%",
                borderRadius: 3,
                boxShadow: "0px 0px 1px 0px rgba(0, 0, 0, 0.25)"
              }}
            >
              <Stack
                direction="column"
                justifyContent="center"
                alignItems="center"
              >
                <Typography variant="body1" fontWeight={800}>
                  Balance
                </Typography>
                <Typography variant="body2">0.00</Typography>
              </Stack>
              <Typography variant="body2">
                $TOK Currently held on Staked Wallet
              </Typography>
              <Divider
                sx={{
                  width: "100%",
                  backgroundColor:
                    projectInfo?.bsFontColor ?? theme.palette.text.black
                }}
              />
              <Typography variant="body1" fontWeight={800}>
                Available for Claim
              </Typography>
              <Typography variant="body2">0.00</Typography>
              <Button
                sx={{
                  backgroundColor:
                    projectInfo?.btColor ?? theme.palette.text.main,
                  ":hover": {
                    background: projectInfo?.btColor ?? theme.palette.text.main
                  },
                  px: 7
                }}
              >
                <Typography variant="body2">Claim</Typography>
              </Button>
            </Stack>
          </Grid>

          <Grid item lg={4} md={12} xs={12}>
            <Stack
              gap={3}
              sx={{
                backgroundColor:
                  projectInfo?.tbColor ?? theme.palette.background.paper,
                px: 3,
                py: 3,
                borderRadius: 3,
                boxShadow: "0px 0px 1px 0px rgba(0, 0, 0, 0.25)",
                height: "100%"
              }}
            >
              <Stack gap={3}>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Typography variant="body1" fontWeight={800}>
                    Staking Pool Name
                  </Typography>
                  <Stack direction="row" gap={1.5}>
                    {projectInfo?.socialLinks?.map((socialItem, index) => (
                      <Stack
                        direction="row"
                        alignItems="center"
                        gap={1}
                        key={index}
                      >
                        <Box
                          sx={{
                            cursor: "pointer"
                          }}
                          onClick={() => handleSocialLink(socialItem.link)}
                        >
                          <Iconify
                            width={30}
                            className="original"
                            icon={
                              CSocialCategory.filter(
                                (categroyItem) =>
                                  categroyItem.name === socialItem.type
                              )[0].icon
                            }
                          />
                        </Box>
                      </Stack>
                    ))}
                  </Stack>
                </Stack>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography
                    sx={{
                      display: "flex",
                      gap: 1,
                      flexDirection: "row",
                      alignItem: "center",
                      justifyContent: "center"
                    }}
                  >
                    <ContentCopyIcon />
                    PL23YU4U4FN4UWEJ24…
                  </Typography>
                  <IosShareIcon />
                </Stack>
                <Stack gap={2}>
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Typography variant="body2" fontWeight={800}>
                      Saturation:
                    </Typography>
                    <Typography variant="body2">A 0M (0.00%) </Typography>
                  </Stack>
                  <BorderLinearProgress variant="determinate" value={50} />
                </Stack>
                <Stack gap={2}>
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Typography variant="body2" fontWeight={800}>
                      Pledge:
                    </Typography>
                    <Typography variant="body2">A 0</Typography>
                  </Stack>
                  <BorderLinearProgress variant="determinate" value={50} />
                </Stack>
              </Stack>
            </Stack>
          </Grid>

          <Grid item lg={4} md={12} xs={12}>
            <Stack
              gap={4}
              flexDirection="column"
              justifyContent="space-between"
              sx={{
                backgroundColor:
                  projectInfo?.tbColor ?? theme.palette.background.paper,
                px: 3,
                py: 3,
                borderRadius: 3,
                boxShadow: "0px 0px 1px 0px rgba(0, 0, 0, 0.25)",
                width: "100%",
                height: "100%"
              }}
            >
              <Typography variant="body1" fontWeight={800}>
                TOK Epoch
              </Typography>
              <BorderLinearProgress variant="determinate" value={50} />
              <Stack direction="column" gap={3}>
                <Typography variant="body1">Pending...</Typography>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography variant="body2">Locked TOK</Typography>
                  <Typography variant="body2" fontWeight={800}>
                    0.00
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          {nftItemStyle.map((item, idx) => (
            <Grid item lg={3} md={6} xs={12} key={idx}>
              <Stack
                direction="column"
                px={2}
                py={2}
                sx={{
                  backgroundColor:
                    projectInfo?.tbColor ?? theme.palette.background.paper,
                  px: 2,
                  py: 3,
                  borderRadius: 3,
                  boxShadow: "0px 0px 1px 0px rgba(0, 0, 0, 0.25)"
                }}
              >
                <Typography variant="body1" fontWeight={800}>
                  {item.label}
                </Typography>
                <Typography
                  variant="h5"
                  fontWeight={900}
                  textAlign="center"
                  px={2}
                  py={2}
                >
                  ${item.value}
                </Typography>
              </Stack>
            </Grid>
          ))}
        </Grid>
        <Grid container spacing={3}>
          {nftItems.map((item, idx) => (
            <Grid item lg={3} md={4} xs={12} key={idx}>
              <Stack
                px={1}
                py={1}
                gap={2}
                sx={{
                  backgroundColor:
                    projectInfo?.tbColor ?? theme.palette.background.paper,
                  px: 2,
                  py: 2,
                  borderRadius: 3,
                  boxShadow: "0px 0px 1px 0px rgba(0, 0, 0, 0.25)"
                }}
              >
                <Stack sx={{ backgroundColor: "#D3D2ED", borderRadius: 3 }}>
                  <Image
                    alt="image"
                    src="/assets/images/empty.jpg"
                    width={120}
                    height={120}
                    style={{
                      borderRadius: "13px",
                      width: "100%",
                      height: "100%"
                    }}
                  />
                </Stack>
                <Typography variant="body2" fontWeight={800}>
                  {item.name}
                </Typography>
                <Stack direction="column" gap={1.5}>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography variant="caption" fontWeight={800}>
                      Earned
                    </Typography>
                    <Typography variant="caption" fontWeight={600}>
                      {item.earned} TOK
                    </Typography>
                  </Stack>
                  <BorderLinearProgress variant="determinate" value={50} />
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography variant="caption" fontWeight={600}>
                      Time Staked
                    </Typography>
                    <Typography variant="caption" fontWeight={600}>
                      {item.time_staked} Days
                    </Typography>
                  </Stack>
                  <Button
                    fullWidth
                    sx={{
                      backgroundColor:
                        projectInfo?.btColor ?? theme.palette.text.main,
                      ":hover": {
                        background:
                          projectInfo?.btColor ?? theme.palette.text.main
                      }
                    }}
                  >
                    <Typography variant="body2">Deactive All</Typography>
                  </Button>
                </Stack>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Stack>
    </PreviewLayout>
  );
}

export default NFTPreviewPage;
