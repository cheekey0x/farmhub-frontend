import { Box, Stack, Dialog, Button, Typography } from "@mui/material";
import { useResponsive } from "src/hooks/use-responsive";
import { useRootStore } from "src/store/root";
import { ModalType } from "src/types/modal";

import useModal from "src/hooks/use-modal";
import { TWalletItem } from "src/types/custom.crypto";
import CardanoWallet from "src/utils/cardano/wallet";
import { useSnackbar } from "src/hooks/use-snackbar";
import { usePersistStore } from "src/store/persist";
import { CWalletList } from "src/constant/wallet";
import { useSettingsContext } from "src/components/settings";

export default function PreiviewAccountModal() {
  const [openModal, type, accountWallet, setAccount] = useRootStore((store) => [
    store.modal.open,
    store.modal?.type,
    store.previewAccount,
    store.setPreviewAccount
  ]);
  const projectInfo = usePersistStore((store) => store.app.previewProject);

  const isOpen = openModal && type === ModalType.PREVIEW_ACCOUNT_WALLET;

  const settings = useSettingsContext();
  const snackbar = useSnackbar();
  const modal = useModal();
  const projectName = projectInfo?.name ?? "YieldLab";

  const smUp = useResponsive("up", 500);

  const handleConnectWallet = async (item: TWalletItem) => {
    try {
      const walletApi = await CardanoWallet.getWalletAPI(
        window?.cardano,
        item.type
      );
      if (!walletApi) {
        snackbar.snackbarWarnning(`You must have a ${item.title} wallet`);
        setTimeout(() => {
          window.open(item.link);
        }, 2000);
        return;
      }
      await CardanoWallet.connect(item.type);
      const address = await CardanoWallet.getLucid()?.wallet.address();
      if (!address) return;
      await setAccount({ ...accountWallet, address, walletType: item });
      snackbar.snackbarSuccess("Wallet connected successfully.");
    } catch (error) {
      console.log(error);
      snackbar.snackbarWarnning("Wallet connect failed.");
    }
    handleWalletModalClose();
  };

  const handleWalletModalClose = () => {
    modal.close(ModalType.PREVIEW_ACCOUNT_WALLET);
  };

  return (
    <Dialog open={isOpen} onClose={handleWalletModalClose}>
      <Stack
        alignItems="center"
        gap={{ sm: 4, xs: 2 }}
        px={2}
        py={4}
        width={smUp ? 350 : "calc(100vw - 50px)"}
        position="relative"
        textAlign="center"
        justifyContent="space-evenly"
      >
        <Stack
          justifyContent="center"
          alignItems="center"
          direction="row"
          gap={2}
        >
          <Box
            component="img"
            src={
              projectInfo?.logoUrl !== ""
                ? projectInfo?.logoUrl
                : "/logo/logo.svg"
            }
            sx={{ width: "40px", borderRadius: 0.5 }}
          />
          <Typography
            variant="h4"
            color={settings.themeMode === "light" ? "primary.dark" : "#f2f4f6"}
            fontWeight={900}
          >
            {projectName}
          </Typography>
        </Stack>
        <Stack
          justifyContent="center"
          alignItems="center"
          direction="column"
          gap={1}
        >
          <Typography
            variant="body1"
            color={settings.themeMode === "light" ? "primary.dark" : "#f2f4f6"}
            fontWeight={900}
          >
            Connect Wallet
          </Typography>
          <Typography
            variant="body2"
            color={settings.themeMode === "light" ? "primary.dark" : "#f2f4f6"}
            fontWeight={400}
          >
            Connect your wallet to access {projectName}
          </Typography>
        </Stack>
        <Stack
          justifyContent="center"
          alignItems="center"
          gap={1.5}
          width="100%"
          sx={{
            "& button": { p: 0, height: "100%" },
            "& a": { textDecoration: "none", color: "inherit", width: "100%" }
          }}
        >
          {CWalletList.map((item, index) => (
            <Button
              color="info"
              fullWidth
              onClick={() => handleConnectWallet(item)}
              key={index}
            >
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="center"
                gap={2}
                width="100%"
                border="1px solid #d9d9d9"
                borderRadius="10px"
                padding="15px 0px"
              >
                <Box
                  component="img"
                  src={item.icon}
                  width={20}
                  borderRadius={50}
                />
                <Typography
                  variant="body1"
                  fontWeight={300}
                  color={
                    settings.themeMode === "light" ? "primary.dark" : "#f2f4f6"
                  }
                  width="60%"
                >
                  Connect {item.title} Wallet
                </Typography>
              </Stack>
            </Button>
          ))}
        </Stack>
      </Stack>
    </Dialog>
  );
}
