import {
  Grid,
  Stack,
  Button,
  useTheme,
  TextField,
  Typography
} from "@mui/material";
import React, { useState } from "react";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import useModal from "src/hooks/use-modal";
import { ModalType } from "src/types/modal";
import { useRootStore } from "src/store/root";
import { usePersistStore } from "src/store/persist";
import Image from "src/components/image";
import PreviewLayout from "../layout";
import StakingOptions from "./staking-option";
import PercentOptions from "./percent-option";
import WalletButton from "./wallet-button";

const monthOptions = [{ month: 1 }, { month: 3 }, { month: 6 }, { month: 9 }];
const percent = [25, 50, 75, 100];

function TokenPreviewPage() {
  const [activeMonth, setActiveMonth] = useState(1);
  const [activePercent, setActivePercent] = useState(25);
  const [expand, setExpand] = useState<boolean>(false);
  const theme = useTheme();
  const modal = useModal();
  const walletStatus = useRootStore((store) => store.previewAccount);
  const projectInfo = usePersistStore((store) => store.app.previewProject);

  const handleConnectWallet = async () => {
    if (!walletStatus.address) {
      modal.open(ModalType.PREVIEW_ACCOUNT_WALLET);
    }
  };

  const tbBgColor = projectInfo.tbColor ?? theme.palette.background.paper;
  const tbFtColor = projectInfo?.tableFontColor ?? theme.palette.text.black;
  const btFtColor =
    projectInfo?.btFontColor ?? theme.palette.background.neutral;
  const btBgColor = projectInfo?.btColor ?? theme.palette.background.main;
  const bsFtColor = projectInfo.bsFontColor ?? "#c2c2c2";

  return (
    <PreviewLayout>
      <Stack
        direction="column"
        justifyContent="stretch"
        alignItems="center"
        my={5}
        gap={3}
      >
        <Grid container spacing={5}>
          <Grid item xs={12} md={7}>
            <Stack
              flexDirection="column"
              px={3}
              py={3}
              gap={3}
              sx={{
                background: tbBgColor,
                borderRadius: 3,
                width: "100%"
              }}
            >
              <Stack direction="column" gap={1}>
                <Typography variant="h5" color={tbFtColor}>
                  Staking
                </Typography>
                <Typography variant="body2">
                  Stake your Tokens and earn $TOK
                </Typography>
              </Stack>
              <Typography variant="h6" color={tbFtColor}>
                Select your Option
              </Typography>
              <StakingOptions
                activeMonth={activeMonth}
                setActiveMonth={setActiveMonth}
                btFtColor={btFtColor}
                btBgColor={btBgColor}
                theme={theme}
              />
              <Stack direction="column" mt={3}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography variant="body1" color={tbFtColor}>
                    TOK Value
                  </Typography>
                  <Typography variant="body2" color={tbFtColor}>
                    Balance: 0.00
                  </Typography>
                </Stack>
                <TextField
                  autoFocus
                  fullWidth
                  placeholder="0.0"
                  size="small"
                  InputLabelProps={{ shrink: true }}
                  sx={{
                    color: `${tbFtColor} !important`,
                    borderColor: `${tbFtColor} !important`,
                    "& input": {
                      color: `${tbFtColor} !important`
                    },
                    "& fieldset": {
                      borderColor: `${tbFtColor} !important`
                    }
                  }}
                  InputProps={{
                    endAdornment: (
                      <Button
                        sx={{
                          backgroundColor: btBgColor,
                          ":hover": {
                            backgroundColor: btBgColor
                          },
                          color: btFtColor,
                          border: `1px solid ${theme.palette.background.border}`,
                          borderRadius: 1,
                          textAlign: "center",
                          padding: 0
                        }}
                      >
                        <Typography variant="body2">Max</Typography>
                      </Button>
                    )
                  }}
                />
              </Stack>
              <PercentOptions
                activePercent={activePercent}
                setActivePercent={setActivePercent}
                btFtColor={btFtColor}
                btBgColor={btBgColor}
                theme={theme}
              />
              <Stack
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
              >
                <WalletButton
                  handleConnectWallet={handleConnectWallet}
                  walletStatus={walletStatus}
                  btFtColor={btFtColor}
                  btBgColor={btBgColor}
                />
              </Stack>
              <Stack direction="row" gap={1} px={3}>
                <InfoOutlinedIcon />
                <Typography variant="body2" textAlign="center">
                  Your rewards will only be available once the stake period is
                  over. TOK may be unstaked anytime, but you will forfeit all
                  your accrued rewards.
                </Typography>
              </Stack>
            </Stack>
          </Grid>
          <Grid item xs={12} md={5}>
            <Stack
              gap={5}
              sx={{
                flexDirection: "column",
                width: "100%",
                height: "100%"
              }}
            >
              <Stack
                direction="column"
                px={3}
                py={3}
                gap={1}
                sx={{
                  background: tbBgColor,
                  borderRadius: 3,
                  width: "100%"
                }}
              >
                <Stack direction="column">
                  <Typography variant="h5" textAlign="center" color={tbFtColor}>
                    Total Active Staked
                  </Typography>
                  <Typography
                    variant="caption"
                    textAlign="center"
                    color={tbFtColor}
                  >
                    0.00 $TOK
                  </Typography>
                </Stack>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  sx={{
                    borderBottom: `1px solid ${bsFtColor}`,
                    py: 2
                  }}
                >
                  <Typography variant="body2">Daily ADA Rewards</Typography>
                  <Typography variant="body2">0.00 ADA</Typography>
                </Stack>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  sx={{
                    borderBottom: `1px solid ${bsFtColor}`,
                    py: 2
                  }}
                >
                  <Typography variant="body2">
                    Staked Circulating Supply
                  </Typography>
                  <Typography variant="body2">0.00%</Typography>
                </Stack>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  sx={{ py: 2 }}
                >
                  <Typography variant="body2">Unique Stakers</Typography>
                  <Typography variant="body2">0</Typography>
                </Stack>
              </Stack>
              <Stack
                direction="column"
                px={3}
                py={3}
                gap={1}
                sx={{
                  background: tbBgColor,
                  borderRadius: 3
                }}
              >
                <Stack
                  sx={{
                    borderBottom: `1px solid ${bsFtColor}`
                  }}
                  gap={3}
                >
                  <Typography variant="h5" color={tbFtColor}>
                    Your Position
                  </Typography>
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    py={2}
                  >
                    <Typography variant="body2">
                      Total Rewards Accrued
                    </Typography>
                    <Typography variant="body2">0.00 ADA</Typography>
                  </Stack>
                </Stack>
                <Stack direction="column" gap={3}>
                  <Stack direction="row">
                    <Grid item xs={6}>
                      <Stack
                        direction="row"
                        px={3}
                        py={3}
                        justifyContent="center"
                        alignItems="center"
                        gap={2}
                      >
                        <Image
                          src="/assets/images/app/position.svg"
                          alt="position"
                        />
                        <Stack direction="column" justifyContent="flex-start">
                          <Typography variant="body2">0.00%</Typography>
                          <Typography variant="body2">0.00 ADA</Typography>
                        </Stack>
                      </Stack>
                    </Grid>
                    <Grid item xs={6}>
                      <Stack
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        sx={{ px: 3, py: 3 }}
                        gap={3}
                      >
                        <Stack direction="column" justifyContent="flex-start">
                          <Typography variant="body2">0.00 $TOK</Typography>
                          <Typography variant="body2">
                            9 Months • 9X Boost
                          </Typography>
                          <Button
                            sx={{
                              backgroundColor:
                                projectInfo?.btColor ??
                                theme.palette.background.main,
                              ":hover": {
                                background:
                                  projectInfo?.btColor ??
                                  theme.palette.background.main
                              },
                              color:
                                projectInfo?.btFontColor ??
                                theme.palette.background.neutral
                            }}
                            onClick={() => setExpand(!expand)}
                          >
                            <Typography variant="body2">
                              {expand ? "Collapse" : "Expand"}
                            </Typography>
                          </Button>
                        </Stack>
                      </Stack>
                    </Grid>
                  </Stack>
                  {expand && (
                    <Stack gap={2} direction="column">
                      <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                        sx={{ borderBottom: `1px solid ${bsFtColor}`, py: 2 }}
                      >
                        <Typography variant="body2">TOK Staked</Typography>
                        <Typography variant="body2">0.00 ADA</Typography>
                      </Stack>
                      <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                        sx={{ borderBottom: `1px solid ${bsFtColor}`, py: 2 }}
                      >
                        <Typography variant="body2">Rewards %</Typography>
                        <Typography variant="body2">0.00%</Typography>
                      </Stack>
                      <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                        sx={{ borderBottom: `1px solid ${bsFtColor}`, py: 2 }}
                      >
                        <Typography variant="body2">Locking Period</Typography>
                        <Typography variant="body2">9 Months</Typography>
                      </Stack>
                      <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                        sx={{ borderBottom: `1px solid ${bsFtColor}`, py: 2 }}
                      >
                        <Typography variant="body2">Rewards Unlocks</Typography>
                        <Stack direction="column">
                          <Typography variant="body2">
                            YYYY-MM-DD 00:00 GMT
                          </Typography>
                          <Typography variant="body2">
                            # Months # Days
                          </Typography>
                        </Stack>
                      </Stack>
                      <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                        sx={{ borderBottom: `1px solid ${bsFtColor}`, py: 2 }}
                      >
                        <Typography variant="body2">Boosted</Typography>
                        <Typography variant="body2" sx={{ color: "primary" }}>
                          9X
                        </Typography>
                      </Stack>
                      <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                        sx={{ borderBottom: `1px solid ${bsFtColor}`, py: 2 }}
                      >
                        <Typography variant="body2">Rewards Accrued</Typography>
                        <Typography variant="body2">0.00 ADA</Typography>
                      </Stack>
                      <Button
                        fullWidth
                        sx={{
                          backgroundColor:
                            projectInfo?.btColor ??
                            theme.palette.background.main,
                          ":hover": {
                            background:
                              projectInfo?.btColor ??
                              theme.palette.background.main
                          },
                          color:
                            projectInfo?.btFontColor ??
                            theme.palette.background.neutral,
                          py: 1.5
                        }}
                      >
                        Withdraw
                      </Button>
                      <Stack direction="row" gap={1}>
                        <InfoOutlinedIcon />
                        <Typography variant="body2">
                          TOK may be unstaked anytime, but you will forfeit all
                          your accrued rewards
                        </Typography>
                      </Stack>
                    </Stack>
                  )}
                </Stack>
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </Stack>
    </PreviewLayout>
  );
}

export default TokenPreviewPage;
