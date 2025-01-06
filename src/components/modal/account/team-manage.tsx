"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Stack,
  Dialog,
  Button,
  Avatar,
  useTheme,
  TextField,
  Typography,
  IconButton,
  Select,
  MenuItem,
  Grid
} from "@mui/material";
import { useResponsive } from "src/hooks/use-responsive";
import { useRootStore } from "src/store/root";
import { ModalType } from "src/types/modal";
import useModal from "src/hooks/use-modal";
import { Close } from "@mui/icons-material";
import { projectUserApiType, projectUserApiService } from "src/utils/service";
import { TTeamMember } from "src/utils/service/api/project-user.type";
import { useParams } from "next/navigation";
import { useSnackbar } from "src/hooks/use-snackbar";
import { isEmail, truncateAddress } from "src/utils/truncate";
import { isValidAddress } from "src/utils/cardano/address";

export default function TeamMemberModal() {
  const [openModal, type] = useRootStore((store) => [
    store.modal.open,
    store.modal?.type
  ]);
  const params = useParams();
  const [receiver, setReceiver] = useState("");
  const [role, setRole] = useState(projectUserApiType.PROJECT_ROLE.ADMIN);
  const [inviteType, setInviteType] = useState(
    projectUserApiType.INVITATION_METHOD.WALLET
  );
  const [teamMembers, setTeamMembers] = useState<Array<TTeamMember>>([]);

  const theme = useTheme();
  const isOpen = openModal && type === ModalType.TEAM_MANAGE;
  const modal = useModal();
  const snackbar = useSnackbar();
  const smUp = useResponsive("up", 500);

  const handleCloseModal = () => {
    modal.close(ModalType.TEAM_MANAGE);
  };

  const handleInviteTeam = async () => {
    try {
      if (receiver === "") {
        snackbar.snackbarWarnning("Email, wallet is required");
        return;
      }
      const validWallet = isValidAddress(receiver);
      if (!(isEmail(receiver) || validWallet)) {
        snackbar.snackbarWarnning("Please type valid email, wallet");
        return;
      }
      const resInvite = await projectUserApiService.inviteUserToProject({
        receiver,
        role,
        projectId: params?.id as string
      });
      if (resInvite._id) {
        snackbar.snackbarSuccess("Invitation Success!");
        setReceiver("");
        handleCloseModal();
        return;
      }
      snackbar.snackbarWarnning("Invalid Email or Duplicate Invite");
    } catch (error) {
      snackbar.snackbarError("Invalid Email or Duplicate Invite");
    }
  };

  const onChangePath = async () => {
    try {
      if (isOpen && params.id && params?.id.length > 0) {
        const resTeam = await projectUserApiService.getTeamByProject(
          params.id as string
        );
        if (resTeam.length > 0) {
          setTeamMembers(resTeam);
        }
      }
    } catch {
      snackbar.snackbarError("Invitation Failed");
    }
  };

  useEffect(() => {
    onChangePath();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params, isOpen]);
  return (
    <Dialog open={isOpen} onClose={handleCloseModal}>
      <Box
        alignItems="center"
        width={smUp ? 400 : "calc(100vw - 50px)"}
        gap={{ sm: 4, xs: 2 }}
        px={4}
        py={6}
        bgcolor={theme.palette.background.neutral}
      >
        <IconButton
          sx={{ position: "absolute", top: 10, right: 10 }}
          onClick={() => {
            modal.close(ModalType.TEAM_MANAGE);
          }}
        >
          <Close fontSize="large" />
        </IconButton>
        <Stack
          justifyContent="center"
          alignItems="center"
          direction="row"
          gap={2}
        >
          <Typography variant="h5" fontWeight={800}>
            Manage Team Members
          </Typography>
        </Stack>
        <Stack gap={3} mt={3}>
          <Stack
            direction="column"
            justifyContent="center"
            gap={3}
            width="100%"
          >
            <Typography variant="body2" fontWeight={800}>
              Receiver
            </Typography>
            <Stack
              direction={smUp ? "row" : "column"}
              justifyContent="space-between"
              alignItems="center"
              spacing={1}
            >
              <Grid container spacing={2}>
                <Grid item xs={6} sm={4}>
                  <Select
                    labelId="role-select"
                    id="role-select"
                    size="small"
                    value={role}
                    onChange={(e) => setRole(e.target.value as any)}
                  >
                    {Object.keys(projectUserApiType.PROJECT_ROLE)
                      .filter((item) => item !== "OWNER")
                      .map((item, index) => (
                        <MenuItem value={item} key={index}>
                          {item}
                        </MenuItem>
                      ))}
                  </Select>
                </Grid>
                <Grid item xs={6} sm={4}>
                  <Select
                    labelId="role-select"
                    id="role-select"
                    size="small"
                    value={inviteType}
                    onChange={(e) => setInviteType(e.target.value as any)}
                  >
                    {Object.keys(projectUserApiType.INVITATION_METHOD).map(
                      (item, index) => (
                        <MenuItem value={item} key={index}>
                          {item}
                        </MenuItem>
                      )
                    )}
                  </Select>
                </Grid>
                <Grid item xs={12} sm={8}>
                  <TextField
                    size="small"
                    placeholder={
                      inviteType === projectUserApiType.INVITATION_METHOD.EMAIL
                        ? "Please enter email"
                        : "Please enter wallet"
                    }
                    value={receiver}
                    onChange={(e) => setReceiver(e.target.value)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Button
                    sx={{
                      background: theme.palette.background.main,
                      color: theme.palette.text.primary,
                      width: "100%"
                    }}
                    onClick={handleInviteTeam}
                  >
                    Invite
                  </Button>
                </Grid>
              </Grid>
            </Stack>
            <Typography variant="caption" fontWeight={800} textAlign="start">
              Members
            </Typography>
            <Stack sx={{ height: "30vh", overflowY: "auto", px: 3 }}>
              {teamMembers.map((item, key) => (
                <Stack
                  gap={2}
                  direction={smUp ? "row" : "column"}
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{
                    border: "1px solid #212b361a",
                    px: 2,
                    py: 2,
                    borderRadius: "3px"
                  }}
                  key={key}
                >
                  <Stack direction="row" alignItems="center" gap={3}>
                    <Avatar sx={{ width: "24px", height: "24px" }} />
                    <Stack>
                      <Typography variant="body2" fontWeight={800}>
                        {item?.name}
                      </Typography>
                      <Typography variant="body2" fontWeight={400}>
                        {item?.email
                          ? item.email
                          : truncateAddress(item?.wallet?.[0] ?? "")}
                      </Typography>
                    </Stack>
                  </Stack>
                  <Stack direction="row" alignItems="center">
                    <Typography variant="body2">{item.projectRole}</Typography>
                  </Stack>
                </Stack>
              ))}
            </Stack>
          </Stack>
        </Stack>
      </Box>
    </Dialog>
  );
}
