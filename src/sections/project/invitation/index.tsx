"use client";

import { Stack, Button, useTheme, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "src/components/image/image";
import { useSettingsContext } from "src/components/settings";
import { useSnackbar } from "src/hooks/use-snackbar";
import { projectUserApiService } from "src/utils/service";
import { TProjectInvitationStatus } from "src/utils/service/api/project-user.type";
import { truncateAddress } from "src/utils/truncate";

// ----------------------------------------------------------------------

export default function ProjectInvitation() {
  const [inviteInfo, setInviteInfo] = useState<TProjectInvitationStatus>({
    projectName: "",
    totalDelegators: 78,
    senderName: ""
  });
  const theme = useTheme();
  const settings = useSettingsContext();
  const params = useParams();
  const router = useRouter();
  const snackbar = useSnackbar();

  const fetchInviteInfo = async () => {
    try {
      if (params?.id && params?.id.length > 0) {
        const resInviteInfo = await projectUserApiService.inviteInfoById(
          params.id as string
        );
        if (resInviteInfo.inviteId) {
          setInviteInfo(resInviteInfo);
          return;
        }
        router.push("/");
      }
    } catch (error) {
      console.error(error);
      // router.push("/");
    }
  };

  const handleAccept = async () => {
    try {
      await projectUserApiService.acceptInviteById(inviteInfo.inviteId ?? "");
      snackbar.snackbarSuccess("Accept invitations");
      router.push("/");
    } catch {
      router.push("/");
    }
  };

  const handleDecline = async () => {
    try {
      await projectUserApiService.declineInviteById(inviteInfo.inviteId ?? "");
      snackbar.snackbarSuccess("Decline invitations");
      router.push("/");
    } catch {
      router.push("/");
    }
  };

  useEffect(() => {
    fetchInviteInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  return (
    <Box
      sx={{
        px: 5,
        width: "100%",
        flexGrow: 1,
        minHeight: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative"
      }}
    >
      <Stack direction="column" gap={3}>
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          gap={2}
        >
          <Image
            alt="loading yieldlab logo"
            src="/logo/logo.svg"
            className="loading-logo"
            sx={{ height: "50px", width: "50px" }}
          />
          <Typography variant="h4">YieldLab</Typography>
        </Stack>
        <Stack mt={3} direction="row" justifyContent="center">
          <Stack
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
            width="100%"
            sx={{
              backgroundColor: theme.palette.background.standard,
              px: "10px",
              py: "18px",
              boxShadow: "0px 0px 1px 0px rgba(0, 0, 0, 0.25)"
            }}
            borderRadius={1}
            gap={3}
          >
            <Stack>
              <Image
                alt="policy-staking"
                src="https://wmsyimages.nyc3.digitaloceanspaces.com/image/6596328a-6e1d-4e88-b37e-372018db7a18"
                width={100}
                height={100}
                borderRadius={1}
                sx={{
                  cursor: "pointer"
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
                <Typography variant="body1" fontWeight={600}>
                  Project Name:
                </Typography>
                <Typography variant="body1">
                  {inviteInfo.projectName}
                </Typography>
              </Stack>
              <Typography variant="body1" fontWeight={600}>
                Total Delegators: 0
              </Typography>
            </Stack>
          </Stack>
        </Stack>
        <Stack direction="row" justifyContent="center" alignContent="center">
          <Typography
            variant="h6"
            color={settings.themeMode === "light" ? "primary.dark" : "#f2f4f6"}
            display="flex"
            alignItems="center"
          >
            {truncateAddress(inviteInfo?.senderName ?? "Admin")}
          </Typography>
          <Typography display="flex" alignItems="center">
            &nbsp;invited you as {inviteInfo.projectRole} to collaborate to
            Project
          </Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-evenly" gap={3}>
          <Button
            size="medium"
            sx={{
              bgcolor: theme.palette.background.main,
              color: theme.palette.text.primary,
              ":focus": {
                bgcolor: theme.palette.background.main,
                color: theme.palette.text.primary
              }
            }}
            onClick={handleAccept}
          >
            Accept invitation
          </Button>
          <Button
            size="medium"
            sx={{
              bgcolor: theme.palette.background.light,
              color: theme.palette.text.primary,
              ":focus": {
                bgcolor: theme.palette.background.light,
                color: theme.palette.text.primary
              },
              ":hover": {
                bgcolor: theme.palette.background.light,
                color: theme.palette.text.primary
              }
            }}
            onClick={handleDecline}
          >
            Decline
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
