"use client";

import {
  Grid,
  Card,
  Stack,
  Button,
  Select,
  Divider,
  MenuItem,
  useTheme,
  TextField,
  Accordion,
  Typography,
  Autocomplete,
  InputAdornment,
  AccordionDetails,
  AccordionSummary
} from "@mui/material";
import dayjs from "dayjs";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { useState, useEffect } from "react";
import {
  CPtCadence,
  CRewardType,
  CVestingType,
  CAirdropInterval,
  CAnniversaryPeriod
} from "src/constant/project";
import { TCtConfig, TTokenWallet } from "src/utils/service/api/project.type";
import { useSnackbar } from "src/hooks/use-snackbar";

interface IProps {
  walletValue: TTokenWallet;
  setWalletValue: (walletValue: TTokenWallet) => void;
}

type TCtTokenConfig = TCtConfig & {
  expand: boolean;
  edit: boolean;
};

const defaultCtConfig: TCtTokenConfig = {
  expand: false,
  edit: false,
  veType: CVestingType[0],
  ptCadence: CPtCadence[0],
  ptPercent: "0",
  periodStart: dayjs().toString(),
  periodEnd: dayjs().add(30, "day").toString(),
  period: []
};

const TokenForm = (props: IProps) => {
  const theme = useTheme();
  const { walletValue, setWalletValue } = props;
  const [newConfig, setNewConfig] = useState<TCtTokenConfig>(defaultCtConfig);
  const snackbar = useSnackbar();

  const handleUpdate = async () => {
    if (
      newConfig.ptCadence === CPtCadence[1] &&
      (newConfig?.period?.length ?? 0) < 2
    ) {
      snackbar.snackbarWarnning("Please select the period at least 2");
      return;
    }
    if (
      newConfig.ptCadence === CPtCadence[1] &&
      (newConfig?.period?.length ?? 0) > 4
    ) {
      snackbar.snackbarWarnning("Please select the period at most 4");
      return;
    }
    if (
      Number(newConfig.ptPercent).valueOf() <= 0 ||
      Number(newConfig.ptPercent).valueOf() > 100
    ) {
      snackbar.snackbarWarnning(
        "Please enter the percentage between 0 and 100"
      );
      return;
    }
    setWalletValue({
      ...walletValue,
      ctConfig: {
        veType: newConfig.veType,
        ptCadence: newConfig.ptCadence,
        ptPercent: newConfig.ptPercent,
        periodEnd: newConfig.periodEnd,
        periodStart: newConfig.periodStart,
        period: newConfig.period,
        rewardType: newConfig.rewardType,
        airdropInterval: newConfig.airdropInterval
      }
    });

    snackbar.snackbarSuccess("Update successfully");
  };
  useEffect(() => {
    setNewConfig({
      ...walletValue.ctConfig,
      expand: false,
      edit: false
    });
    // eslint-disable-next-line
  }, [walletValue]);
  return (
    <Stack direction="column" sx={{ width: "100%", mt: 1 }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Stack direction="column" gap={2}>
          <Divider />
          <Stack gap={5}>
            <Stack gap={1}>
              <Typography variant="body2" fontWeight={500}>
                Contract Configuration
              </Typography>
              <Stack
                direction="column"
                gap={2}
                sx={{
                  p: 2,
                  borderRadius: 1,
                  border: `1px solid ${theme.palette.divider}`
                }}
              >
                <Card
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    borderRadius: 2,
                    height: "100%",
                    border: "1px solid #00000040"
                  }}
                >
                  <Accordion
                    expanded={newConfig.expand}
                    onChange={() =>
                      setNewConfig((prev) => ({
                        ...prev,
                        expand: !prev.expand
                      }))
                    }
                    sx={{
                      boxShadow: "none !important",
                      width: "100%",
                      "& .MuiAccordionSummary-expandIconWrapper": {
                        transform: "none"
                      }
                    }}
                  >
                    <AccordionSummary
                      aria-controls="nonCutodialbh-content"
                      id="nonCutodialbh-header"
                      expandIcon={
                        newConfig.expand ? <RemoveIcon /> : <AddIcon />
                      }
                    >
                      <Typography variant="body2">Add New</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Stack gap={2}>
                        <Stack gap={1}>
                          <Typography variant="body2">Vesting Type</Typography>
                          <Select
                            fullWidth
                            size="small"
                            value={newConfig?.veType?.name}
                            onChange={(e) =>
                              setNewConfig((prev) => ({
                                ...prev,
                                veType: CVestingType.filter(
                                  (veItem) => veItem.name === e.target.value
                                )[0]
                              }))
                            }
                          >
                            {CVestingType.map((veItem, index) => (
                              <MenuItem value={veItem.name} key={index}>
                                <Typography variant="body2">
                                  {veItem.name}
                                </Typography>
                              </MenuItem>
                            ))}
                          </Select>
                          <Typography
                            variant="caption"
                            color={theme.palette.background.main}
                          >
                            {newConfig?.veType?.description}
                          </Typography>
                        </Stack>
                        <Stack>
                          <Typography variant="body2">
                            Payout Cadence
                          </Typography>
                          <Select
                            fullWidth
                            size="small"
                            value={newConfig.ptCadence}
                            onChange={(e) =>
                              setNewConfig((prev) => ({
                                ...prev,
                                ptCadence: e.target.value
                              }))
                            }
                          >
                            {CPtCadence.map((ptItem, index) => (
                              <MenuItem value={ptItem} key={index}>
                                <Typography variant="body2">
                                  {ptItem}
                                </Typography>
                              </MenuItem>
                            ))}
                          </Select>
                        </Stack>
                        <Stack>
                          <Typography variant="body2">
                            Payout Percentage
                          </Typography>
                          <TextField
                            fullWidth
                            size="small"
                            placeholder="Please enter percentage"
                            value={newConfig.ptPercent}
                            onChange={(e) => {
                              const inputValue = e.target.value;
                              const reqTest = /^\d*\.?\d{0,2}$/;
                              if (
                                reqTest.test(inputValue) &&
                                inputValue !== ""
                              ) {
                                const updateValue =
                                  parseFloat(inputValue) >= 1
                                    ? inputValue.replace(/^0+/, "")
                                    : inputValue;
                                setNewConfig((prev) => ({
                                  ...prev,
                                  ptPercent: updateValue
                                }));
                              } else if (inputValue === "") {
                                setNewConfig((prev) => ({
                                  ...prev,
                                  ptPercent: "0"
                                }));
                              }
                            }}
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end">
                                  <Typography>%</Typography>
                                </InputAdornment>
                              )
                            }}
                          />
                        </Stack>
                        <Stack gap={2}>
                          <Typography variant="body2">Period</Typography>
                          {newConfig.ptCadence === CPtCadence[0] && (
                            <Grid container spacing={1}>
                              <Grid item xs={12} md={6}>
                                <DateTimePicker
                                  label="Start"
                                  sx={{ width: "100%" }}
                                  value={dayjs(newConfig.periodStart)}
                                  onChange={(newValue) =>
                                    setNewConfig((prev) => ({
                                      ...prev,
                                      periodStart: newValue?.toString() ?? ""
                                    }))
                                  }
                                />
                              </Grid>
                              <Grid item xs={12} md={6}>
                                <DateTimePicker
                                  label="End"
                                  sx={{ width: "100%" }}
                                  value={dayjs(newConfig.periodEnd)}
                                  onChange={(newValue) =>
                                    setNewConfig((prev) => ({
                                      ...prev,
                                      periodEnd: newValue?.toString() ?? ""
                                    }))
                                  }
                                />
                              </Grid>
                            </Grid>
                          )}
                          {newConfig.ptCadence === CPtCadence[1] && (
                            <Stack
                              direction="row"
                              gap={2}
                              justifyContent="space-evenly"
                              flexWrap="wrap"
                            >
                              <Autocomplete
                                multiple
                                fullWidth
                                id="period-cadence"
                                options={CAnniversaryPeriod}
                                getOptionLabel={(option) => option.title}
                                value={[...(newConfig?.period ?? [])]?.sort(
                                  (a, b) => a.value - b.value
                                )} // Create a shallow copy before sorting
                                onChange={(_e, value) =>
                                  setNewConfig((prev) => ({
                                    ...prev,
                                    period: value
                                  }))
                                }
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    size="small"
                                    variant="outlined"
                                    placeholder="Select Period"
                                  />
                                )}
                              />
                            </Stack>
                          )}
                        </Stack>
                        <Stack>
                          <Typography variant="body2">Reward Type</Typography>
                          <Select
                            fullWidth
                            size="small"
                            value={newConfig.rewardType}
                            onChange={(e) =>
                              setNewConfig((prev) => ({
                                ...prev,
                                rewardType: e.target.value
                              }))
                            }
                          >
                            {CRewardType.map((ptItem, index) => (
                              <MenuItem value={ptItem} key={index}>
                                <Typography variant="body2">
                                  {ptItem}
                                </Typography>
                              </MenuItem>
                            ))}
                          </Select>
                        </Stack>
                        {newConfig.rewardType === CRewardType[2] && (
                          <Stack gap={2}>
                            <Typography variant="body2">
                              Airdrop Interval
                            </Typography>
                            <Stack
                              direction="row"
                              gap={2}
                              justifyContent="space-evenly"
                              flexWrap="wrap"
                            >
                              <Select
                                fullWidth
                                size="small"
                                value={newConfig.airdropInterval?.value}
                                onChange={(e) => {
                                  const mathItem = CAirdropInterval.find(
                                    (item) =>
                                      item.value ===
                                      Number(e.target.value).valueOf()
                                  );
                                  setNewConfig((prev) => ({
                                    ...prev,
                                    airdropInterval: mathItem
                                  }));
                                }}
                              >
                                {CAirdropInterval.map((intervalItem, index) => (
                                  <MenuItem
                                    value={intervalItem.value}
                                    key={index}
                                  >
                                    <Typography variant="body2">
                                      {intervalItem.title}
                                    </Typography>
                                  </MenuItem>
                                ))}
                              </Select>
                            </Stack>
                          </Stack>
                        )}
                        <Stack>
                          <Grid container spacing={1}>
                            <Grid item xs={12} sm={6}>
                              <Stack
                                sx={{
                                  border: `1px solid ${theme.palette.text.main}`,
                                  borderRadius: 1.5,
                                  overflow: "hidden"
                                }}
                              >
                                <Button
                                  fullWidth
                                  size="small"
                                  sx={{
                                    color: theme.palette.text.primary,
                                    border: "1px",
                                    bgcolor: theme.palette.background.paper,
                                    borderColor: theme.palette.background.main,
                                    "&:hover": {
                                      borderColor:
                                        theme.palette.background.main,
                                      bgcolor: theme.palette.background.paper
                                    }
                                  }}
                                  onClick={() => setNewConfig(defaultCtConfig)}
                                >
                                  <Typography variant="body2">
                                    Cancel
                                  </Typography>
                                </Button>
                              </Stack>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <Stack
                                sx={{
                                  border: `1px solid ${theme.palette.text.main}`,
                                  borderRadius: 1.5,
                                  overflow: "hidden"
                                }}
                              >
                                <Button
                                  fullWidth
                                  size="small"
                                  sx={{
                                    color: theme.palette.text.primary,
                                    bgcolor: theme.palette.background.main,
                                    "&:hover": {
                                      bgcolor: theme.palette.background.main
                                    }
                                  }}
                                  onClick={handleUpdate}
                                >
                                  <Typography variant="body2">
                                    Update Config
                                  </Typography>
                                </Button>
                              </Stack>
                            </Grid>
                          </Grid>
                        </Stack>
                      </Stack>
                    </AccordionDetails>
                  </Accordion>
                </Card>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </LocalizationProvider>
    </Stack>
  );
};

export default TokenForm;
