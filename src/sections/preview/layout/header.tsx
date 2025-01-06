import Link from "next/link";
import {
  Box,
  Stack,
  Button,
  Toolbar,
  useTheme,
  Container,
  IconButton,
  Typography,
  SwipeableDrawer
} from "@mui/material";
import Head from "next/head";
import dynamic from "next/dynamic";
import Image from "src/components/image";
import { useState, useEffect } from "react";
import { useResponsive } from "src/hooks/use-responsive";
import { Menu as MenuIcon } from "@mui/icons-material";
import { useRouter } from "next/router";
import { useSettingsContext } from "src/components/settings";
import { truncateAddress } from "src/utils/truncate";
import { usePersistStore } from "src/store/persist";
import { ModalType } from "src/types/modal";
import useModal from "src/hooks/use-modal";
import { useRootStore } from "src/store/root";
import SvgColor from "src/components/svg-color";
import Iconify from "src/components/iconify";
import { CSocialCategory } from "src/constant/project";

const Swap = dynamic(() => import("@dexhunterio/swaps"), {
  ssr: false
});

export const NAV = [
  { title: "Marketplace", link: "/marketplace", value: "marketplace" },
  { title: "Portfolio", link: "/portfolio", value: "portfolio" },
  { title: "Learn", link: "/learn", value: "learn" }
];

export default function PreviewHeader() {
  const [vTtitle, setTitle] = useState("Home");
  const [vOpen, setOpen] = useState<boolean>(false);
  const router = useRouter();
  const mdUp = useResponsive("up", "md");
  const theme = useTheme();
  const settings = useSettingsContext();
  const modal = useModal();

  const projectInfo = usePersistStore((store) => store.app.previewProject);

  const bsFtColor = projectInfo?.bsFontColor ?? theme.palette.background.border;
  const titleFtColor = projectInfo?.titleFontColor ?? theme.palette.text.black;
  const btFtColor =
    projectInfo?.btFontColor ?? theme.palette.background.neutral;
  const btBgColor = projectInfo?.btColor ?? theme.palette.background.main;
  const headerBgColor = projectInfo?.tbColor ?? theme.palette.background.main;

  const SwapButtonStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: 600,
    lineHeight: "18.23px",
    background: "url(/assets/icon/swap-btn.svg)",
    backgroundSize: "cover",
    backgroundPosition: "center",
    width: 150,
    border: "none",
    cursor: "pointer"
  };

  const TokenSwapButton = (
    <Swap
      orderTypes={["SWAP", "LIMIT"]}
      theme="dark"
      partnerCode={
        projectInfo?.dexHunter?.code ??
        "platypuscyberpunks61646472317178306872636a6d6a366d38656d396c6d363834366870396a6763616c30676a6338616d6871736c67736d613930306365346e6d393465377a666b6d61656d343673356c7a6e6a6835677a63326439616d7930673467653879756771787775323861da39a3ee5e6b4b0d3255bfef95601890afd80709"
      }
      partnerName={projectInfo?.dexHunter?.name ?? "PlatypusCyberpunks"}
      displayType="BUTTON"
      buttonText={`Swap ${projectInfo?.token?.name ?? "Token"}`}
      buttonStyle={{
        padding: "5px 20px",
        backgroundColor: btBgColor,
        color: btFtColor,
        borderRadius: "0.5rem"
      }}
      style={{
        ...SwapButtonStyle
      }}
    />
  );
  const [accountWallet, setAccount] = useRootStore((store) => [
    store.previewAccount,
    store.setPreviewAccount
  ]);

  const handleDisconnect = async () => {
    setAccount({ ...accountWallet, address: "" });
  };

  const handleSocialLink = async (link: string) => {
    window.open(link, "_blank");
  };

  const handleConnectWallet = async () => {
    modal.open(ModalType.PREVIEW_ACCOUNT_WALLET);
  };

  const toggleDrawer =
    (openToggle: boolean) =>
      (
        event: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>
      ) => {
        if (
          event &&
          event.type === "keydown" &&
          ((event as React.KeyboardEvent).key === "Tab" ||
            (event as React.KeyboardEvent).key === "Shift")
        ) {
          return;
        }
        setOpen(openToggle);
      };

  useEffect(() => {
    const matchRoute = NAV.filter(
      (nav) => router.asPath.indexOf(nav.link) > -1
    );
    if (matchRoute.length > 0) {
      setTitle(matchRoute[0].title);
    } else {
      setTitle("Home");
    }
  }, [router.asPath]);

  return (
    <Container
      sx={{
        display: "flex",
        borderBottom: `dashed 1px ${bsFtColor}`,
        padding: "0 !important"
      }}
    >
      <Head>
        <title>{`${projectInfo.name ?? "Home"} | Token`}</title>
        <meta name="description" content="YieldLab" />
      </Head>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ width: "100%", backgroundColor: headerBgColor }}
      >
        <Toolbar
          disableGutters
          sx={{
            gap: mdUp ? "50px" : "20px",
            alignItems: "center",
            minHeight: "auto",
            height: "auto",
            display: "flex",
            width: "100%"
          }}
        >
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              onClick={toggleDrawer(true)}
              color="inherit"
              sx={{ p: 0 }}
            >
              <MenuIcon
                fontSize="medium"
                sx={{
                  width: 40,
                  height: 30,
                  color: titleFtColor
                }}
              />
            </IconButton>
            <SwipeableDrawer
              disableSwipeToOpen
              anchor="left"
              open={vOpen && !mdUp}
              onClose={toggleDrawer(false)}
              onOpen={toggleDrawer(true)}
              sx={{
                "& .MuiDrawer-paper ": {
                  borderRadius: "0px 5px 5px 0px",
                  bgcolor: headerBgColor,
                  maxWidth: 250,
                  width: "100%",
                  height: "100%"
                }
              }}
            >
              <Stack width="100%" height="100%" alignItems="center">
                <Stack
                  width="100%"
                  alignItems="center"
                  height={100}
                  justifyContent="center"
                >
                  <Stack
                    direction="row"
                    gap={2}
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Box
                      component="img"
                      src={
                        projectInfo.logoUrl !== ""
                          ? projectInfo.logoUrl
                          : "/logo/logo.svg"
                      }
                      width={40}
                      borderRadius={1}
                    />
                    <Stack>
                      {settings.themeLayout !== "mini" && (
                        <Typography
                          variant="h4"
                          fontWeight={900}
                          sx={{
                            color: titleFtColor,
                            whiteSpace: "nowrap"
                          }}
                        >
                          {projectInfo.name ?? "YieldLab"}
                        </Typography>
                      )}
                    </Stack>
                  </Stack>
                  <Link href="/" onClick={toggleDrawer(false)} />
                </Stack>
                <Stack
                  direction="column"
                  gap={1.5}
                  alignContent="center"
                  width="100%"
                >
                  <Stack justifyContent="center" alignItems="center">
                    {!mdUp && TokenSwapButton}
                  </Stack>
                  {projectInfo?.socialLinks?.map((socialItem, index) => (
                    <Stack
                      direction="row"
                      alignItems="center"
                      gap={2}
                      sx={{
                        cursor: "pointer",
                        px: 4
                      }}
                      onClick={() => handleSocialLink(socialItem.link)}
                      key={index}
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
                      <Typography>{socialItem.link}</Typography>
                    </Stack>
                  ))}
                </Stack>
              </Stack>
            </SwipeableDrawer>
          </Box>

          <Stack
            minHeight={50}
            direction="row"
            spacing={2}
            justifyContent="center"
            alignItems="center"
            sx={{
              py: {
                xs: 2,
                sm: 3
              },
              px: {
                xs: 0,
                sm: 6
              }
            }}
          >
            <Stack
              direction="row"
              gap={2}
              justifyContent="center"
              alignItems="center"
            >
              <Box
                component="img"
                src={
                  projectInfo.logoUrl !== ""
                    ? projectInfo.logoUrl
                    : "/logo/logo.svg"
                }
                width={60}
                borderRadius={1}
              />
              <Stack sx={{ display: { xs: "none", sm: "flex" } }}>
                {settings.themeLayout !== "mini" && (
                  <Typography
                    variant="h4"
                    fontWeight={900}
                    sx={{
                      color: titleFtColor,
                      whiteSpace: "nowrap"
                    }}
                  >
                    {projectInfo.name ?? "YieldLab"}
                  </Typography>
                )}
              </Stack>
            </Stack>
          </Stack>
          <Box
            sx={{
              display: "flex",
              gap: "10px",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              pl: { xs: 0, sm: 10 },
              pr: { xs: 1, sm: 4 }
            }}
          >
            <Stack />
            <Stack
              px={3}
              py={1}
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              spacing={3}
              sx={{
                display: { xs: "none", md: "flex" },
                borderRadius: 1,
                border: `dotted 1px ${theme.palette.background.border}`,
                cursor: "pointer",
                color: titleFtColor
              }}
            >
              <Typography variant="body2" fontWeight={800}>
                Total Staked: 0/0
              </Typography>

              <Button
                sx={{
                  backgroundColor: btBgColor,
                  color: btFtColor,
                  ":hover": {
                    background: btBgColor
                  }
                }}
              >
                <Typography variant="body2">Leaderboard</Typography>
              </Button>
              <Stack direction="row" gap={1.5} alignContent="center">
                {projectInfo?.socialLinks?.map((socialItem, index) => (
                  <Stack
                    direction="row"
                    alignItems="center"
                    gap={0.5}
                    sx={{
                      cursor: "pointer"
                    }}
                    onClick={() => handleSocialLink(socialItem.link)}
                    key={index}
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
                  </Stack>
                ))}
              </Stack>
            </Stack>
            {accountWallet?.address && accountWallet?.address?.length > 0 ? (
              <Stack flexDirection="row" spacing={2}>
                <Stack justifyContent="center" alignItems="center">
                  {mdUp && TokenSwapButton}
                </Stack>
                <Stack
                  flexDirection="row"
                  spacing={0.5}
                  onClick={handleDisconnect}
                  sx={{
                    borderRadius: 1,
                    color: btFtColor,
                    cursor: "pointer",
                    overflow: "hidden"
                  }}
                >
                  <Stack
                    flexDirection="row"
                    spacing={0.5}
                    sx={{
                      backgroundColor: btBgColor,
                      alignItems: "center",
                      px: 1,
                      py: 0.5
                    }}
                  >
                    <Image
                      src={
                        accountWallet?.walletType?.icon ??
                        "/assets/icon/wallet/vespr.png"
                      }
                      alt="wallet"
                      height={20}
                    />
                    <Typography>
                      {truncateAddress(accountWallet.address ?? "")}
                    </Typography>
                  </Stack>
                  <Stack
                    flexDirection="row"
                    spacing={1}
                    sx={{
                      backgroundColor: btBgColor,
                      px: 1,
                      py: 0.5
                    }}
                  >
                    <SvgColor
                      src="/assets/images/app/socket-on.svg"
                      width={20}
                      color={btFtColor}
                    />
                  </Stack>
                </Stack>
              </Stack>
            ) : (
              <Stack flexDirection="row" spacing={2}>
                <Stack justifyContent="center" alignItems="center">
                  {mdUp && TokenSwapButton}
                </Stack>
                <Stack
                  flexDirection="row"
                  spacing={0.5}
                  onClick={handleConnectWallet}
                  sx={{
                    borderRadius: 1,
                    color: btFtColor,
                    cursor: "pointer",
                    overflow: "hidden"
                  }}
                >
                  <Button
                    sx={{
                      backgroundColor: btBgColor,
                      color: btFtColor,
                      borderRadius: 0,
                      ":hover": {
                        background: btBgColor
                      }
                    }}
                  >
                    <Typography variant="body2">Connect wallet</Typography>
                  </Button>
                  <Stack
                    flexDirection="row"
                    justifyContent="center"
                    alignItems="center"
                    spacing={1}
                    sx={{
                      backgroundColor: btBgColor,
                      px: 1,
                      py: 0.5
                    }}
                  >
                    <SvgColor
                      src="/assets/images/app/socket-off.svg"
                      width={20}
                      color={btFtColor}
                    />
                  </Stack>
                </Stack>
              </Stack>
            )}
          </Box>
        </Toolbar>
      </Stack>
    </Container>
  );
}
