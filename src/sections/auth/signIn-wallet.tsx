"use client";

import { Box, Stack, Button, Typography } from "@mui/material";
import { signIn } from "next-auth/react";
import Image from "src/components/image";
import { ECardanoWalletType, TWalletItem } from "src/types/custom.crypto";
import CardanoWallet from "src/utils/cardano/wallet";
import { useSnackbar } from "src/hooks/use-snackbar";
import { useRouter } from "next/router";
import { useSettingsContext } from "src/components/settings";
import { authApiService, adminCryptoApiService } from "src/utils/service";
import { setAccessToken, setRefreshToken } from "src/utils/axios";
import { usePersistStore } from "src/store/persist";
import { CWalletList } from "src/constant/wallet";

// ...................................

export default function SignInWallet() {
  const router = useRouter();
  const snackbar = useSnackbar();

  const settings = useSettingsContext();
  const setAccount = usePersistStore((store) => store.actions.setAccount);

  const handleConnectWallet = async (item: TWalletItem) => {
    const connected = await CardanoWallet.connect(item.type);
    if (!connected.ok) {
      snackbar.snackbarError(connected.error);
      return;
    }

    setAccount({
      walletType: item.type,
      wallet: { address: connected.data, balance: 0 }
    });
    const signInResult = await adminCryptoApiService.signIn(connected.data);
    if (!signInResult.ok) {
      console.error(signInResult.error);
      snackbar.snackbarError("Sign In failed");
      return;
    }

    const loginRes = await authApiService.logInWithWallet({
      wallet: connected.data
    });
    if (loginRes.auth.accessToken) {
      setAccessToken(loginRes.auth.accessToken);
      setRefreshToken(loginRes.auth.refreshToken);
      const res = await signIn("WalletCredentials", {
        redirect: false,
        wallet: connected.data,
        walletType: item.type,
        avatar: loginRes.user.avatar,
        userId: loginRes.user._id
      });
      if (res?.status === 200) {
        snackbar.snackbarSuccess("Login Success");
      } else {
        snackbar.snackbarWarnning("Login Failed. Please try again..");
      }
    }
    router.push("/app");
  };

  return (
    <Stack
      alignItems="center"
      gap={{ sm: 4, xs: 2 }}
      px={2}
      py={4}
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
          Connect your wallet to access YieldLab
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
                variant="body2"
                fontWeight={300}
                color={
                  settings.themeMode === "light" ? "primary.dark" : "#f2f4f6"
                }
                width="65%"
              >
                Connect {item.title} Wallet
              </Typography>
            </Stack>
          </Button>
        ))}
      </Stack>
    </Stack>
  );
}
