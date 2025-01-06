"use client";

import {
  Box,
  Card,
  Grid,
  Link,
  Stack,
  Radio,
  Button,
  Switch,
  Select,
  Divider,
  useTheme,
  MenuItem,
  Container,
  TextField,
  Accordion,
  IconButton,
  Typography,
  RadioGroup,
  FormControl,
  InputAdornment,
  AccordionSummary,
  AccordionDetails,
  FormControlLabel
} from "@mui/material";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import AddIcon from "@mui/icons-material/Add";
import { useState, useEffect, useCallback } from "react";
import Image from "src/components/image";
import { DefaultNewNFTWalletVaules } from "src/types/yup.schema";
import { truncateAddress } from "src/utils/truncate";
import { useSnackbar } from "src/hooks/use-snackbar";
import { usePersistStore } from "src/store/persist";
import { projectApiService } from "src/utils/service";
import {
  IProject,
  EDOAppType,
  TNFTWallet,
  TPartnerCollection,
  TCreateProjectPayload
} from "src/utils/service/api/project.type";
import { EDODeployStatus, convertStatusColor } from "src/constant/project";
import { LoadingButton } from "@mui/lab";
import Iconify from "src/components/iconify";
import { getRandomHash } from "src/utils/device-info";
import { useCopyToClipboard } from "src/hooks/use-copy-to-clipboard";
import { useSocketStore } from "src/store/socket";
import NFTForm from "./nft-form";

const CGateType = ["Gate1", "Gate2", "Gate3", "Gate4"];
const CFeatureType = ["Feature1", "Feature2", "Feature3", "Feature4"];

const NewCollectionDefault = {
  type: "Custodial",
  policyId: "",
  percent: "",
  tokenGate: {
    enable: false,
    type: "",
    feature: ""
  }
};

function NFTStaking() {
  const [tokenEdit, setTokenEdit] = useState<boolean>(false);
  const [saveStatus, setSaveStatus] = useState(false);
  const [expanded, setExpanded] = useState({
    custodial: false,
    nonCustodial: false,
    partner: false
  });
  const [loading, setLoading] = useState({
    deploy: false
  });
  const [tokenWallets, setTokenWallets] = useState<{
    policyId: string;
    rewardTokenId: string;
    policyGate: {
      enable: boolean;
      type: string;
      feature: string;
    };
    custodial: TNFTWallet;
    nonCustodial: TNFTWallet;
    collections: TPartnerCollection[];
  }>({
    policyId: "",
    rewardTokenId: "",
    policyGate: {
      enable: false,
      type: "",
      feature: ""
    },
    custodial: DefaultNewNFTWalletVaules,
    nonCustodial: DefaultNewNFTWalletVaules,
    collections: []
  });
  const [deployProjectStatus, setDeployStatus] = useSocketStore((store) => [
    store.projectStatus,
    store.actions.setProjectStatus
  ]);
  const [newCollection, setNewCollection] =
    useState<TPartnerCollection>(NewCollectionDefault);
  const theme = useTheme();
  const snackbar = useSnackbar();
  const [projectPersistState, setProjectPersistState, setPreviewProject] =
    usePersistStore((store) => [
      store.app.pageProject,
      store.actions.setPageProject,
      store.actions.setPreviewProject
    ]);
  const currentDeployStatus = deployProjectStatus.find(
    (ps) =>
      ps?.projectId === projectPersistState?._id &&
      ps?.appType === EDOAppType.NFT
  );
  const { copy: copyToClipboard } = useCopyToClipboard();
  const onCopy = useCallback(
    (text: string) => {
      if (text) {
        snackbar.snackbarSuccess("Copied!");
        copyToClipboard(text);
      }
    },
    [copyToClipboard, snackbar]
  );

  const previewUrl = `https://${currentDeployStatus?.domain}`;

  const handlePreviewUrl = async () => {
    window.open(previewUrl, "_blank");
  };

  const handleAccordinChange = (panel: string) => () => {
    if (panel === "custodial") {
      setExpanded((prev) => ({ ...prev, custodial: !prev.custodial }));
    } else if (panel === "non-custodial") {
      setExpanded((prev) => ({ ...prev, nonCustodial: !prev.nonCustodial }));
    } else if (panel === "partner") {
      setExpanded((prev) => ({ ...prev, partner: !prev.partner }));
    }
  };

  const handleChangeTokenEdit = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTokenEdit(event.target.checked);
  };

  const handleAddNewCollection = () => {
    setNewCollection(NewCollectionDefault);
    setTokenWallets((prev) => ({
      ...prev,
      collections: [...prev.collections, newCollection]
    }));
  };

  const handleSaveChange = async () => {
    try {
      if (
        tokenEdit &&
        (!tokenWallets?.policyId || tokenWallets?.policyId === "")
      ) {
        snackbar.snackbarWarnning("Please enter policyId");
        return;
      }
      const tokenData = {
        enable: tokenEdit,
        policyId: tokenWallets.policyId,
        rewardTokenId: tokenEdit
          ? tokenWallets.rewardTokenId
          : tokenWallets.policyId,
        policyGate: {
          enable: tokenWallets.policyGate.enable,
          type: tokenWallets.policyGate.type,
          feature: tokenWallets.policyGate.feature
        },
        custodial: {
          ...tokenWallets.custodial
        },
        nonCustodial: {
          ...tokenWallets.nonCustodial
        },
        collections: tokenWallets.collections
      };
      await setProjectPersistState({ nft: tokenData });
      if (projectPersistState?._id && projectPersistState?._id !== "") {
        await projectApiService.updateProject({
          _id: projectPersistState._id,
          nft: tokenData
        } as IProject);
      } else {
        const res = await projectApiService.createProject({
          ...projectPersistState
        } as TCreateProjectPayload);
        if (res._id) {
          await setProjectPersistState(res);
        }
      }
      snackbar.snackbarSuccess("NFTSetting saved");
      setSaveStatus(true);
    } catch (error) {
      snackbar.snackbarError("NFTSetting save failed");
    }
  };

  const handlePreview = () => {
    setPreviewProject(projectPersistState);
    const projectId = projectPersistState._id ?? getRandomHash(24);
    window.open(`/project/preview/${projectId}/nft`, "_blank");
  };

  const initializeComponent = async () => {
    setTokenEdit(projectPersistState?.nft?.enable ?? false);
    setTokenWallets({
      policyId: projectPersistState?.nft?.policyId ?? "",
      rewardTokenId: projectPersistState?.nft?.rewardTokenId ?? "",
      policyGate: {
        enable: projectPersistState?.nft?.policyGate?.enable ?? false,
        type: projectPersistState?.nft?.policyGate?.type ?? "",
        feature: projectPersistState?.nft?.policyGate?.feature ?? ""
      },
      custodial: {
        enable: projectPersistState?.nft?.custodial.enable ?? false,
        ctConfig: projectPersistState?.nft?.custodial.ctConfig ?? {},
        traits: projectPersistState?.nft?.custodial.traits ?? []
      },
      nonCustodial: {
        enable: projectPersistState?.nft?.nonCustodial.enable ?? false,
        ctConfig: projectPersistState?.nft?.nonCustodial.ctConfig ?? {},
        traits: projectPersistState?.nft?.nonCustodial.traits ?? []
      },
      collections: projectPersistState?.nft?.collections ?? []
    });

    if (projectPersistState?._id) {
      const resStatuses = await projectApiService.getDeployedProjectStatus(
        projectPersistState?._id
      );
      resStatuses.forEach((status) => {
        setDeployStatus(status);
      });
    }
  };

  const handleDeploy = async () => {
    try {
      const projectId = projectPersistState._id;
      if (projectId) {
        setLoading((prev) => ({ ...prev, deploy: true }));
        const res = await projectApiService.deployProject(
          projectId,
          EDOAppType.NFT
        );
        setDeployStatus(res as any);
      }
      snackbar.snackbarSuccess("Deploying...");
    } catch {
      snackbar.snackbarError("Deploy failed");
    } finally {
      setLoading((prev) => ({ ...prev, deploy: false }));
    }
  };

  useEffect(() => {
    initializeComponent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container sx={{ px: "0 !important", my: 5 }}>
      {tokenEdit && (
        <Stack
          alignItems="center"
          mb={4}
          gap={2}
          sx={{
            flexDirection: {
              xs: "column",
              sm: "row"
            },
            justifyContent: {
              xs: "flex-start",
              sm: "space-between"
            }
          }}
        >
          <Stack
            spacing={2}
            sx={{
              flexDirection: {
                xs: "column",
                sm: "row"
              },
              justifyContent: {
                xs: "flex-start",
                sm: "space-between"
              }
            }}
          >
            {!!currentDeployStatus?.deployStatus && (
              <Stack direction="row" alignItems="center" spacing={1}>
                <Typography variant="body2">Deploy status:</Typography>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Stack
                    className={
                      [EDODeployStatus.DEPLOYED, EDODeployStatus.NONE].includes(
                        currentDeployStatus?.deployStatus ??
                          EDODeployStatus.DEPLOYED
                      )
                        ? ""
                        : "alarm-pending"
                    }
                    sx={{
                      width: ".5rem",
                      height: ".5rem",
                      borderRadius: "50%",
                      bgcolor: convertStatusColor(
                        currentDeployStatus?.deployStatus ??
                          EDODeployStatus.NONE
                      )
                    }}
                  />
                  <Typography
                    variant="caption"
                    color={convertStatusColor(
                      currentDeployStatus?.deployStatus ?? EDODeployStatus.NONE
                    )}
                  >
                    {currentDeployStatus?.deployStatus ?? EDODeployStatus.NONE}
                  </Typography>
                </Stack>
              </Stack>
            )}

            {currentDeployStatus?.deployStatus === EDODeployStatus.DEPLOYED && (
              <Stack direction="row" alignItems="center" spacing={1}>
                <Typography variant="body2">Deploy url:</Typography>
                <Link
                  component="button"
                  onClick={handlePreviewUrl}
                  sx={{
                    flexDirection: "row",
                    display: "flex",
                    overflow: "hidden"
                  }}
                >
                  <Typography variant="body2">
                    {truncateAddress(previewUrl, 15, 10)}
                  </Typography>
                </Link>
                <IconButton onClick={() => onCopy(previewUrl)}>
                  <Iconify
                    icon="eva:copy-fill"
                    color={theme.palette.primary.main}
                    width={24}
                  />
                </IconButton>
              </Stack>
            )}
          </Stack>
          <Stack direction="row" justifyContent="flex-start" gap={2}>
            <Button
              sx={{ background: theme.palette.background.main, color: "white" }}
              onClick={handlePreview}
            >
              <Typography variant="body2">Preview</Typography>
            </Button>
            <LoadingButton
              sx={{ background: theme.palette.background.main, color: "white" }}
              onClick={handleDeploy}
              loading={loading.deploy}
              disabled={!saveStatus}
            >
              <Typography variant="body2">Deploy</Typography>
            </LoadingButton>
          </Stack>
        </Stack>
      )}

      <Stack gap={3}>
        <Card
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            borderRadius: 2,
            py: 2,
            px: 2,
            height: "100%",
            border: "1px solid #00000040"
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            borderRadius={2}
            width="100%"
            py={0.5}
            px={1}
            sx={{ justifyContent: tokenEdit ? "space-between" : "flex-end" }}
          >
            {tokenEdit && <Typography variant="body1">NFT Staking</Typography>}
            <Stack
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center"
              }}
            >
              <Typography variant="body2">
                {!tokenEdit ? "Disable" : "Enable"}
              </Typography>
              <Switch
                checked={tokenEdit}
                onChange={handleChangeTokenEdit}
                name="gilad"
              />
            </Stack>
          </Stack>
          {tokenEdit && (
            <Stack gap={1} width="100%" height="100%" pt={3} px={1}>
              <Typography variant="body2" fontWeight={500}>
                Policy ID
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
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Please enter policy ID"
                  value={tokenWallets.policyId}
                  onChange={(e) =>
                    setTokenWallets({
                      ...tokenWallets,
                      policyId: e.target.value
                    })
                  }
                />
                <Grid container spacing={1}>
                  <Grid item xs={12} md={4}>
                    <Stack
                      direction="row"
                      justifyContent="flex-start"
                      alignItems="center"
                    >
                      <Typography variant="body2">
                        {tokenWallets.policyGate.enable ? "Disable" : "Enable"}{" "}
                        Token Gate
                      </Typography>
                      <Switch
                        checked={tokenWallets.policyGate.enable}
                        onChange={() =>
                          setTokenWallets({
                            ...tokenWallets,
                            policyGate: {
                              ...tokenWallets.policyGate,
                              enable: !tokenWallets.policyGate.enable
                            }
                          })
                        }
                        name="gilad"
                      />
                    </Stack>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    {tokenWallets.policyGate.enable && (
                      <Select
                        fullWidth
                        size="small"
                        value={tokenWallets.policyGate.type}
                        onChange={(e) =>
                          setTokenWallets({
                            ...tokenWallets,
                            policyGate: {
                              ...tokenWallets.policyGate,
                              type: e.target.value
                            }
                          })
                        }
                      >
                        <MenuItem value="" disabled>
                          <Typography variant="body2">
                            Please select type
                          </Typography>
                        </MenuItem>
                        {CGateType.map((item, index) => (
                          <MenuItem value={item} key={index}>
                            <Typography variant="body2">{item}</Typography>
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  </Grid>
                  <Grid item xs={12} md={4}>
                    {tokenWallets.policyGate.enable && (
                      <Select
                        fullWidth
                        size="small"
                        value={tokenWallets.policyGate.feature}
                        onChange={(e) =>
                          setTokenWallets({
                            ...tokenWallets,
                            policyGate: {
                              ...tokenWallets.policyGate,
                              feature: e.target.value
                            }
                          })
                        }
                      >
                        <MenuItem value="" disabled>
                          <Typography variant="body2">
                            Please select feature
                          </Typography>
                        </MenuItem>
                        {CFeatureType.map((item, index) => (
                          <MenuItem value={item} key={index}>
                            <Typography variant="body2">{item}</Typography>
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  </Grid>
                </Grid>
              </Stack>
            </Stack>
          )}
          {!tokenEdit && (
            <Stack
              direction="column"
              justifyContent="center"
              alignItems="center"
              width="100%"
              sx={{ py: 3 }}
            >
              <Image
                alt="token"
                src="/assets/images/app/app-nft.png"
                width={154}
                height={107}
                borderRadius={1}
                sx={{
                  cursor: "pointer",
                  filter: "drop-shadow(5px 5px 5px rgba(89, 87, 197, .4))"
                }}
              />
              <Typography
                variant="body1"
                mt={1}
                sx={{
                  color: theme.palette.text.main
                }}
              >
                NFT Staking is not currently enabled.
              </Typography>
            </Stack>
          )}
        </Card>
        {tokenEdit && (
          <Card
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              borderRadius: 2,
              p: 2,
              height: "100%",
              border: "1px solid #00000040"
            }}
          >
            <Accordion
              expanded={expanded.custodial}
              onChange={handleAccordinChange("custodial")}
              sx={{
                boxShadow: "none !important",
                width: "100%",
                "& .MuiAccordionSummary-expandIconWrapper": {
                  transform: "none !important"
                }
              }}
            >
              <AccordionSummary
                aria-controls="cutodialbh-content"
                id="cutodialbh-header"
                expandIcon={
                  <Stack
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center"
                    }}
                  >
                    <Typography variant="body2">
                      {!expanded.custodial ? "Disable" : "Enable"}
                    </Typography>
                    <Switch checked={expanded.custodial} name="gilad" />
                  </Stack>
                }
              >
                <Typography>Custodial</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <NFTForm
                  walletValue={{ ...tokenWallets.custodial }}
                  setWalletValue={(walletValue) =>
                    setTokenWallets((prev) => ({
                      ...prev,
                      custodial: walletValue
                    }))
                  }
                />
              </AccordionDetails>
            </Accordion>
          </Card>
        )}
        {tokenEdit && (
          <Card
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              borderRadius: 2,
              p: 2,
              height: "100%",
              border: "1px solid #00000040"
            }}
          >
            <Accordion
              expanded={expanded.nonCustodial}
              onChange={handleAccordinChange("non-custodial")}
              sx={{
                boxShadow: "none !important",
                width: "100%",
                "& .MuiAccordionSummary-expandIconWrapper": {
                  transform: "none !important"
                }
              }}
            >
              <AccordionSummary
                aria-controls="nonCutodialbh-content"
                id="nonCutodialbh-header"
                expandIcon={
                  <Stack
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center"
                    }}
                  >
                    <Typography variant="body2">
                      {!expanded.nonCustodial ? "Disable" : "Enable"}
                    </Typography>
                    <Switch checked={expanded.nonCustodial} name="gilad" />
                  </Stack>
                }
              >
                <Typography>Non-Custodial</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <NFTForm
                  walletValue={{ ...tokenWallets.nonCustodial }}
                  setWalletValue={(walletValue) =>
                    setTokenWallets((prev) => ({
                      ...prev,
                      nonCustodial: walletValue
                    }))
                  }
                />
              </AccordionDetails>
            </Accordion>
          </Card>
        )}
        {tokenEdit && (
          <Card
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              borderRadius: 2,
              p: 2,
              border: "1px solid #00000040"
            }}
          >
            <Accordion
              expanded={expanded.partner}
              onChange={handleAccordinChange("partner")}
              sx={{
                boxShadow: "none !important",
                "& .MuiAccordionSummary-expandIconWrapper": {
                  transform: "none"
                },
                width: "100%"
              }}
            >
              <AccordionSummary
                aria-controls="nonCutodialbh-content"
                id="nonCutodialbh-header"
                expandIcon={
                  <Stack
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center"
                    }}
                  >
                    <Typography variant="body2">
                      {!expanded.partner ? "Disable" : "Enable"}
                    </Typography>
                    <Switch checked={expanded.partner} name="gilad" />
                  </Stack>
                }
              >
                <Typography>Collections and Partners</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Stack direction="column" sx={{ width: "100%", mt: 1 }}>
                  <Divider />
                  <Stack>
                    <Grid container mt={2} spacing={1}>
                      <Grid item xs={12} md={4}>
                        <Stack
                          direction="row"
                          justifyContent="flex-start"
                          alignItems="center"
                          sx={{ height: "100%" }}
                          gap={1}
                        >
                          <FormControl>
                            <RadioGroup
                              aria-labelledby="demo-controlled-radio-buttons-group"
                              name="controlled-radio-buttons-group"
                              value={newCollection.type}
                              onChange={(e) =>
                                setNewCollection((prev) => ({
                                  ...prev,
                                  type: e.target.value
                                }))
                              }
                              sx={{
                                display: "flex",
                                flexDirection: "row",
                                gap: 1
                              }}
                            >
                              <FormControlLabel
                                value="Custodial"
                                control={<Radio />}
                                label="Custodial"
                              />
                              <FormControlLabel
                                value="NonCustodial"
                                control={<Radio />}
                                label="Non-Custodial"
                              />
                            </RadioGroup>
                          </FormControl>
                        </Stack>
                      </Grid>
                      <Grid item xs={12} md={5}>
                        <TextField
                          fullWidth
                          size="small"
                          placeholder="Please enter policy ID"
                          value={newCollection.policyId}
                          onChange={(e) =>
                            setNewCollection((prev) => ({
                              ...prev,
                              policyId: e.target.value
                            }))
                          }
                        />
                      </Grid>
                      <Grid item xs={12} md={3}>
                        <TextField
                          fullWidth
                          size="small"
                          placeholder="Please enter percentage"
                          value={newCollection.percent}
                          onChange={(e) => {
                            const inputValue = e.target.value;
                            const reqTest = /^\d*\.?\d{0,2}$/;
                            if (reqTest.test(inputValue) && inputValue !== "") {
                              const updateValue =
                                parseFloat(inputValue) >= 1
                                  ? inputValue.replace(/^0+/, "")
                                  : inputValue;
                              setNewCollection((prev) => ({
                                ...prev,
                                percent: updateValue
                              }));
                            } else if (inputValue === "") {
                              setNewCollection((prev) => ({
                                ...prev,
                                percent: "0"
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
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <Stack
                          direction="row"
                          justifyContent="flex-start"
                          alignItems="center"
                        >
                          <Typography variant="body2">
                            {newCollection.tokenGate.enable
                              ? "Disable"
                              : "Enable"}{" "}
                            Token Gate
                          </Typography>
                          <Switch
                            checked={newCollection.tokenGate.enable}
                            onChange={() =>
                              setNewCollection((prev) => ({
                                ...prev,
                                tokenGate: {
                                  ...prev.tokenGate,
                                  enable: !prev.tokenGate.enable
                                }
                              }))
                            }
                            name="gilad"
                          />
                        </Stack>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        {newCollection.tokenGate.enable && (
                          <Select
                            fullWidth
                            size="small"
                            value={newCollection.tokenGate.type}
                            onChange={(e) =>
                              setNewCollection((prev) => ({
                                ...prev,
                                tokenGate: {
                                  ...prev.tokenGate,
                                  type: e.target.value
                                }
                              }))
                            }
                          >
                            <MenuItem value="" disabled>
                              <Typography variant="body2">
                                Please select type
                              </Typography>
                            </MenuItem>
                            {CGateType.map((item, index) => (
                              <MenuItem value={item} key={index}>
                                <Typography variant="body2">{item}</Typography>
                              </MenuItem>
                            ))}
                          </Select>
                        )}
                      </Grid>
                      <Grid item xs={12} md={4}>
                        {newCollection.tokenGate.enable && (
                          <Select
                            fullWidth
                            size="small"
                            value={newCollection.tokenGate.feature}
                            onChange={(e) =>
                              setNewCollection((prev) => ({
                                ...prev,
                                tokenGate: {
                                  ...prev.tokenGate,
                                  feature: e.target.value
                                }
                              }))
                            }
                          >
                            <MenuItem value="" disabled>
                              <Typography variant="body2">
                                Please select feature
                              </Typography>
                            </MenuItem>
                            {CFeatureType.map((item, index) => (
                              <MenuItem value={item} key={index}>
                                <Typography variant="body2">{item}</Typography>
                              </MenuItem>
                            ))}
                          </Select>
                        )}
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Stack
                          sx={{
                            border: `1px solid ${theme.palette.text.main}`,
                            borderRadius: 1.5,
                            overflow: "hidden"
                          }}
                        >
                          <Button
                            variant="contained"
                            size="small"
                            disabled={
                              newCollection.policyId === "" ||
                              newCollection.percent === ""
                            }
                            sx={{
                              color: theme.palette.text.primary,
                              border: "1px",
                              bgcolor: theme.palette.background.paper,
                              borderColor: theme.palette.background.main,
                              "&:hover": {
                                borderColor: theme.palette.background.main,
                                bgcolor: theme.palette.background.paper
                              }
                            }}
                            onClick={() =>
                              setNewCollection(NewCollectionDefault)
                            }
                          >
                            Cancel
                          </Button>
                        </Stack>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Stack
                          sx={{
                            border: `1px solid ${theme.palette.text.main}`,
                            borderRadius: 1.5,
                            overflow: "hidden"
                          }}
                        >
                          <Button
                            variant="contained"
                            size="small"
                            disabled={
                              newCollection.policyId === "" ||
                              newCollection.percent === ""
                            }
                            sx={{
                              py: 1,
                              px: 5,
                              color: theme.palette.text.primary,
                              background: theme.palette.background.main,
                              "&:hover": {
                                background: theme.palette.background.main
                              }
                            }}
                            onClick={handleAddNewCollection}
                          >
                            <AddIcon />
                            Add New Policy
                          </Button>
                        </Stack>
                      </Grid>
                    </Grid>
                    <Stack sx={{ overflowX: "auto" }}>
                      <Stack minWidth={600}>
                        {tokenWallets.collections.length > 0 && (
                          <Grid container mt={3} spacing={1}>
                            <Grid item xs={2}>
                              <Typography variant="body2">Type</Typography>
                            </Grid>
                            <Grid item xs={2}>
                              <Typography variant="body2">Policy ID</Typography>
                            </Grid>
                            <Grid item xs={2}>
                              <Typography variant="body2">Gate Type</Typography>
                            </Grid>
                            <Grid item xs={2}>
                              <Typography variant="body2">
                                Gate Feature
                              </Typography>
                            </Grid>
                            <Grid item xs={2} height="100%">
                              <Typography variant="body2">
                                Percentage
                              </Typography>
                            </Grid>
                            <Grid item xs={2} />
                          </Grid>
                        )}
                        {tokenWallets.collections.length > 0 && <Divider />}
                        {tokenWallets.collections.map((item, index) => (
                          <Grid container spacing={1} key={index}>
                            <Grid
                              item
                              xs={2}
                              display="flex"
                              alignItems="center"
                            >
                              <Typography variant="caption" fontWeight={500}>
                                {item.type === "custodial"
                                  ? "Custodial"
                                  : "NonCustodial"}
                              </Typography>
                            </Grid>
                            <Grid
                              item
                              xs={2}
                              display="flex"
                              alignItems="center"
                            >
                              <Box
                                component="img"
                                src="/assets/icon/navbar/policy.svg"
                                mb={0.5}
                                width={15}
                                sx={{
                                  filter: theme.palette.background.filter
                                }}
                              />
                              <Typography variant="caption" fontWeight={500}>
                                {truncateAddress(item.policyId, 10, 6)}
                              </Typography>
                            </Grid>
                            <Grid
                              item
                              xs={2}
                              display="flex"
                              alignItems="center"
                            >
                              <Typography variant="caption" fontWeight={500}>
                                {item.tokenGate.type}
                              </Typography>
                            </Grid>
                            <Grid
                              item
                              xs={2}
                              display="flex"
                              alignItems="center"
                            >
                              <Typography variant="caption" fontWeight={500}>
                                {item.tokenGate.feature}
                              </Typography>
                            </Grid>
                            <Grid
                              item
                              xs={2}
                              display="flex"
                              alignItems="center"
                            >
                              <Typography variant="body2">
                                {item.percent} %
                              </Typography>
                            </Grid>
                            <Grid item xs={2}>
                              <IconButton
                                onClick={() =>
                                  setTokenWallets((prev) => ({
                                    ...prev,
                                    collections: prev.collections.filter(
                                      (collectionItem) =>
                                        collectionItem.policyId !==
                                        item.policyId
                                    )
                                  }))
                                }
                              >
                                <DeleteOutlineOutlinedIcon />
                              </IconButton>
                            </Grid>
                          </Grid>
                        ))}
                      </Stack>
                    </Stack>
                  </Stack>
                </Stack>
              </AccordionDetails>
            </Accordion>
          </Card>
        )}

        <Stack justifyContent="center" alignItems="center">
          <Button
            type="submit"
            variant="contained"
            size="medium"
            sx={{
              py: 1,
              px: 5,
              mt: 5,
              color: "white",
              background: theme.palette.background.main,
              "&:hover": {
                background: theme.palette.background.main
              }
            }}
            onClick={handleSaveChange}
          >
            <Typography pl={2}>Save Changes</Typography>
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
}

export default NFTStaking;
