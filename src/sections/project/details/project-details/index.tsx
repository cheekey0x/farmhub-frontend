"use client";

import {
  Tab,
  Box,
  Stack,
  Button,
  useTheme,
  TextField,
  Typography,
  IconButton
} from "@mui/material";
import Tabs, { tabsClasses } from "@mui/material/Tabs";
import React, { useState, useEffect, useCallback } from "react";
import Iconify from "src/components/iconify";
import TokenState from "src/sections/overview/view/token-state";
import { CTokenState } from "src/constant/mock/overview";
import { usePersistStore } from "src/store/persist";
import { truncateAddress } from "src/utils/truncate";
import {
  projectApiService,
  projectCryptoApiService,
  projectBrandingCryptoApiService,
  projectWalletCryptoApiService
} from "src/utils/service";
import { IProject } from "src/utils/service/api/project.type";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { useSocketStore } from "src/store/socket";
import { useSnackbar } from "src/hooks/use-snackbar";
import dynamic from "next/dynamic";
import { SignedMessage } from "lucid-cardano";
import CardanoWallet from "src/utils/cardano/wallet";
import Branding from "./branding";
import Nfts from "./nft";
// import Tokens from "./token";
import "swiper/css";
import "swiper/css/pagination";
import useProjectBalance from "src/routes/hooks/use-project-balance";
import Address from "src/components/address";
import { useRouter } from "next/navigation";
import useBalance from "src/routes/hooks/use-balance";

const Tokens = dynamic(() => import("./token"), { ssr: false });

const TABS = [
  {
    value: "branding",
    label: "Branding"
  },
  {
    value: "token",
    label: "Tokens"
  },
  {
    value: "nft",
    label: "NFTs"
  }
  // {
  //   value: "sales",
  //   label: "Sales",
  // },
  // {
  //   value: "api",
  //   label: "API",
  // },
  // {
  //   value: "integrations",
  //   label: "Integrations",
  // },
  // {
  //   value: "rewards",
  //   label: "Rewards",
  // },
];

function ProjectDetails() {
  const [currentTab, setCurrentTab] = useState("branding");
  const [projectPersistValue, setPageProject, walletAccount] = usePersistStore(
    (store) => [
      store.app.pageProject,
      store.actions.setPageProject,
      store.app.account,
      store.actions.setAccount
    ]
  );

  const { getAssetAmount } = useProjectBalance(
    projectPersistValue?.cardanoSetting?.projectId || ""
  );

  const [projectSocketReady, joinProjectId] = useSocketStore((store) => [
    store.projectSocketReady,
    store.actions.joinProjectId
  ]);
  const [nameEdit, setNameEdit] = useState(false);
  const theme = useTheme();
  const snackbar = useSnackbar();

  const handleChangeTab = useCallback(
    (event: React.SyntheticEvent, newValue: string) => {
      setCurrentTab(newValue);
    },
    []
  );

  const handleSaveProject = async () => {
    try {
      if (
        !projectPersistValue._id ||
        !projectPersistValue.cardanoSetting?.projectId
      ) {
        snackbar.snackbarError("Save Branding Info first.");
        return;
      }
      const walletAuthResult =
        await CardanoWallet.getWalletAuth("Save Project");

      if (!walletAuthResult.ok) {
        snackbar.snackbarError("Failed to sign with Wallet");
        return;
      }

      if (!projectPersistValue.name) {
        snackbar.snackbarError("Must set Project Name");
        return;
      }

      const updateProjectResult = await projectCryptoApiService.put(
        projectPersistValue.cardanoSetting.projectId,
        projectPersistValue.name,
        walletAuthResult.data
      );

      if (!updateProjectResult.ok) {
        snackbar.snackbarError(updateProjectResult.error);
        return;
      }

      const res = await projectApiService.updateProject({
        ...projectPersistValue
      } as IProject);
      if (res._id) {
        snackbar.snackbarSuccess("Saving project success");
        return;
      }
      snackbar.snackbarWarnning("Saving got some issues");
    } catch {
      snackbar.snackbarError("Saving got error");
    }
  };

  const handleConnectWallet = async () => {
    try {
      if (!CardanoWallet.getLucid()) {
        await CardanoWallet.connect(walletAccount.walletType);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleConnectWallet();
    // eslint-disable-next-line
  }, [projectPersistValue]);

  useEffect(() => {
    if (projectPersistValue?._id && projectSocketReady) {
      joinProjectId(projectPersistValue?._id);
    }
    // eslint-disable-next-line
  }, [projectPersistValue?._id, projectSocketReady]);

  return (
    <Stack>
      <Stack
        direction="column"
        justifyContent="stretch"
        alignItems="center"
        mt="32px"
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          width="100%"
          borderRadius={1}
          gap={3}
          sx={{
            flexDirection: { xs: "column", sm: "row" },
            backgroundColor: theme.palette.background.standard,
            px: "20px",
            py: "20px",
            boxShadow: "0px 0px 1px 0px rgba(0, 0, 0, 0.25)"
          }}
        >
          <Stack
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
            sx={{
              flexDirection: { xs: "column", sm: "row" }
            }}
            gap={3}
          >
            <Stack
              sx={{
                position: "relative",
                overflow: "hidden"
              }}
            >
              <Box
                component="img"
                width={100}
                height={100}
                src={
                  projectPersistValue?.logoUrl
                    ? projectPersistValue?.logoUrl
                    : "https://wmsyimages.nyc3.digitaloceanspaces.com/image/6596328a-6e1d-4e88-b37e-372018db7a18"
                }
                sx={{
                  opacity: "1",
                  borderRadius: ".5rem"
                }}
              />
            </Stack>
            <Stack
              direction="column"
              justifyContent=""
              alignItems="flex-start"
              gap={1}
            >
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                gap={1}
              >
                <Typography variant="subtitle1">Project Name: </Typography>
                <Stack
                  sx={{
                    position: "relative"
                  }}
                >
                  {nameEdit ? (
                    <TextField
                      size="small"
                      value={projectPersistValue?.name || ""}
                      onChange={(e) =>
                        setPageProject({
                          ...projectPersistValue,
                          name: e.target.value
                        })
                      }
                      placeholder="Project Name"
                      sx={{
                        pr: "2rem"
                      }}
                    />
                  ) : (
                    <Typography
                      sx={{ width: "100%", p: "8.5px 14px", minWidth: "10rem" }}
                    >
                      {truncateAddress(projectPersistValue?.name || "")}
                    </Typography>
                  )}
                  <IconButton
                    sx={{
                      position: "absolute",
                      right: 0,
                      top: 0
                    }}
                    onClick={() => setNameEdit((prev) => !prev)}
                  >
                    <Iconify
                      icon={
                        nameEdit ? "lets-icons:check-fill" : "akar-icons:edit"
                      }
                      width={24}
                    />
                  </IconButton>
                </Stack>
              </Stack>
              <Typography variant="subtitle1">Total Delegators: 0</Typography>
            </Stack>
            <Stack
              direction="column"
              alignItems="flex-start"
              position="relative"
              gap={1}
              sx={{
                p: 2,
                borderRadius: 1,
                border: `1px solid ${theme.palette.divider}`
              }}
              borderRadius={1}
            >
              <Typography variant="subtitle1">Project Wallet</Typography>
              <Address
                address={
                  projectPersistValue?.cardanoSetting?.projectWalletAddress ||
                  ""
                }
                variant="body2"
                color={theme.palette.background.main}
              />
              <Typography variant="body2">
                Balance: {getAssetAmount("lovelace", 6).toString()} Ada
              </Typography>
            </Stack>
          </Stack>

          <Stack justifyContent="flex-end" height="100%">
            <Button
              sx={{ background: theme.palette.background.main, color: "white" }}
              onClick={handleSaveProject}
            >
              <Typography variant="body2">Save Project</Typography>
            </Button>
          </Stack>
        </Stack>
        <Stack mt={2} width="100%">
          <Swiper
            slidesPerView={1}
            spaceBetween={10}
            pagination={{
              clickable: true
            }}
            breakpoints={{
              "@0.00": {
                slidesPerView: 1,
                spaceBetween: 10
              },
              "@0.75": {
                slidesPerView: 2,
                spaceBetween: 20
              },
              "@1.00": {
                slidesPerView: 3,
                spaceBetween: 40
              },
              "@1.50": {
                slidesPerView: 4,
                spaceBetween: 50
              }
            }}
            modules={[Pagination]}
            className="mySwiper"
          >
            {CTokenState.map((item, index) => (
              <SwiperSlide key={index}>
                <TokenState data={item} />
              </SwiperSlide>
            ))}
          </Swiper>
        </Stack>
        <Tabs
          value={currentTab}
          onChange={handleChangeTab}
          TabIndicatorProps={{
            style: {
              backgroundColor: theme.palette.background.main
            }
          }}
          sx={{
            width: 1,
            zIndex: 9,
            borderColor: theme.palette.background.main,
            mt: "32px",
            [`& .${tabsClasses.flexContainer}`]: {
              pr: { md: 3 },
              justifyContent: {
                sm: "center",
                md: "flex-start"
              }
            }
          }}
        >
          {TABS.map((tab) => (
            <Tab
              key={tab.value}
              value={tab.value}
              label={tab.label}
              sx={{ color: theme.palette.text.main }}
            />
          ))}
        </Tabs>
        {currentTab === "branding" && <Branding />}
        {currentTab === "nft" && <Nfts />}
        {currentTab === "token" && <Tokens />}
        {/* {currentTab === "sales" && <Tokens />}
        {currentTab === "api" && <Tokens />}
        {currentTab === "integrations" && <Tokens />}
        {currentTab === "rewards" && <Tokens />} */}
      </Stack>
    </Stack>
  );
}

export default ProjectDetails;
