import { Box, Stack, Dialog, Button, Typography } from "@mui/material";
import { useResponsive } from "src/hooks/use-responsive";
import { useRootStore } from "src/store/root";
import { ModalType } from "src/types/modal";
import Image from "src/components/image";
import useModal from "src/hooks/use-modal";
import { ECardanoWalletType } from "src/types/custom.crypto";
import CardanoWallet from "src/utils/cardano/wallet";
import { useSnackbar } from "src/hooks/use-snackbar";
import { useSettingsContext } from "src/components/settings";
import { usePersistStore } from "src/store/persist";

type TWalletItem = {
  title: string;
  icon: string;
  type: ECardanoWalletType;
  link: string;
};

const CWalletList: TWalletItem[] = [
  {
    title: "Connect Nami Wallet",
    icon: "/assets/icon/wallet/nami.png",
    type: ECardanoWalletType.Nami,
    link: "https://chromewebstore.google.com/detail/nami/lpfcbjknijpeeillifnkikgncikgfhdo"
  },
  {
    title: "Connect Eternl Wallet",
    icon: "/assets/icon/wallet/eternl.png",
    type: ECardanoWalletType.Eternl,
    link: "https://chromewebstore.google.com/detail/eternl/kmhcihpebfmpgmihbkipmjlmmioameka"
  },
  {
    title: "Connect Vespr Wallet",
    icon: "/assets/icon/wallet/vespr.png",
    type: ECardanoWalletType.Vespr,
    link: "https://vespr.xyz/"
  }
];
export default function AddAccountWalletModal() {
  const [openModal, type] = useRootStore((store) => [
    store.modal.open,
    store.modal?.type
  ]);
  const setAccount = usePersistStore((store) => store.actions.setAccount);

  const snackbar = useSnackbar();
  const modal = useModal();

  const smUp = useResponsive("up", 500);
  const settings = useSettingsContext();

  const isOpen = openModal && type === ModalType.ADD_ACCOUNT_WALLET;

  const handleConnectWallet = async (item: TWalletItem) => {
    try {
      await CardanoWallet.connect(item.type);
      if (!window?.cardano) {
        snackbar.snackbarWarnning("You must have a Cardano Wallet Extension.");
        return;
      }
      const address = await CardanoWallet.getLucid()?.wallet.address();
      if (!address) return;
      setAccount({ wallet: { address, balance: 19835 } });
      snackbar.snackbarSuccess("Wallet connect successfully.");
    } catch (error) {
      console.error(error);
      snackbar.snackbarWarnning("You are not connected. Please try again..");
    }
    handleWalletModalClose();
  };

  const handleWalletModalClose = () => {
    modal.close(ModalType.ADD_ACCOUNT_WALLET);
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
          <Image
            alt="logo"
            src="/assets/icon/logo_with_title.svg"
            sx={{ width: 180 }}
          />
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
            Connect your wallet to access Your Project
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
                  {item.title}
                </Typography>
              </Stack>
            </Button>
          ))}
        </Stack>
      </Stack>
    </Dialog>
  );
}
