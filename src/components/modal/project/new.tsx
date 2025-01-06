"use client";

import React, { useState } from "react";
import {
  Box,
  Stack,
  Dialog,
  Button,
  useTheme,
  TextField,
  Typography,
  IconButton
} from "@mui/material";
import { useResponsive } from "src/hooks/use-responsive";
import { useRootStore } from "src/store/root";
import { ModalType } from "src/types/modal";
import useModal from "src/hooks/use-modal";
import { Close } from "@mui/icons-material";
import { useRouter } from "next/router";
import { useSnackbar } from "src/hooks/use-snackbar";
import { authApiService, projectCryptoApiService } from "src/utils/service";
import { usePersistStore } from "src/store/persist";
import { signOut } from "next-auth/react";
import CardanoWallet from "src/utils/cardano/wallet";

export default function ProjectNewModal() {
  const [openModal, type] = useRootStore((store) => [
    store.modal.open,
    store.modal?.type
  ]);
  const isOpen = openModal && type === ModalType.PROJECT_NEW;

  const [newProject, setNewProject] = useState("");
  const [nameError, setNameError] = useState("");

  const router = useRouter();
  const modal = useModal();
  const snackbar = useSnackbar();
  const smUp = useResponsive("up", 500);
  const theme = useTheme();

  const [initPersistProject, setProjectValue, walletAccount] = usePersistStore(
    (store) => [
      store.actions.initNewProject,
      store.actions.setNewProject,
      store.app.account
    ]
  );

  const handleCloseProjectNew = () => {
    modal.close(ModalType.PROJECT_NEW);
    setNewProject("");
  };

  const handleChangeName = async (e: any) => {
    setNewProject(e.target.value);
    setNameError("");
  };

  const handleLogout = async () => {
    await signOut();
    await authApiService.logOut();
  };
  const submitNewProject = async () => {
    if (newProject === "") {
      setNameError("Name is required.");
      return;
    }
    if (newProject.length < 5 || newProject.length > 100) {
      setNameError("Name length should be between 5 and 100");
      return;
    }
    try {
      if (!CardanoWallet.getLucid()) {
        await CardanoWallet.connect(walletAccount.walletType);
      }
      const walletAuthResult =
        await CardanoWallet.getWalletAuth("Create New Project");
      if (!walletAuthResult.ok) {
        throw new Error("Signing failed");
      }
      await initPersistProject();
      await setProjectValue({ name: newProject });
      const projectCryptoRes = await projectCryptoApiService.init(
        newProject,
        walletAuthResult.data
      );
      if (!projectCryptoRes.ok || !projectCryptoRes.data.project._id) {
        snackbar.snackbarWarnning("Create project failed");
        return;
      }

      await setProjectValue({
        cardanoSetting: {
          projectId: projectCryptoRes.data.project._id,
          projectWalletAddress: projectCryptoRes.data.wallet.address
        }
      });

      handleCloseProjectNew();
      router.push("/project/new");
      setNewProject("");
    } catch (error: any) {
      if (error?.response?.status === 401) {
        snackbar.snackbarError("Please Login");
        await handleLogout();
        router.push("/login");
      } else {
        snackbar.snackbarError("Check your connection");
      }
    }
  };

  return (
    <Dialog open={isOpen} onClose={handleCloseProjectNew}>
      <Box
        alignItems="center"
        width={smUp ? 500 : "calc(100vw - 50px)"}
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
            Create New Project
          </Typography>
        </Stack>
        <Stack gap={3} mt={3}>
          <Stack
            direction="column"
            justifyContent="center"
            gap={3}
            width="100%"
          >
            <Stack gap={1}>
              <Typography variant="body2">Project Name</Typography>
              <Stack
                direction={smUp ? "row" : "column"}
                justifyContent="space-between"
                alignItems="stretch"
                gap={1}
              >
                <TextField
                  placeholder="Please enter project name"
                  InputLabelProps={{ shrink: true }}
                  sx={{ width: "100%" }}
                  value={newProject}
                  error={nameError !== ""}
                  helperText={nameError}
                  onChange={handleChangeName}
                />
              </Stack>
            </Stack>
            <Button
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                py: 2,
                px: 2,
                backgroundColor: theme.palette.background.main
              }}
              onClick={submitNewProject}
            >
              <Typography
                variant="body2"
                fontWeight={800}
                sx={{ color: "white" }}
              >
                Submit
              </Typography>
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Dialog>
  );
}
