"use client";

import {
  Box,
  Grid,
  Link,
  Stack,
  Button,
  Select,
  MenuItem,
  useTheme,
  Container,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
  FormHelperText
} from "@mui/material";
import React, { useMemo, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import AddIcon from "@mui/icons-material/Add";
import { NewBrandSchema, NewBrandDefaultValues } from "src/types/yup.schema";
import FormProvider, {
  RHFSelect,
  RHFTextField
} from "src/components/hook-form";
import { usePersistStore } from "src/store/persist";
import { useSettingsContext } from "src/components/settings";
import { useSnackbar } from "src/hooks/use-snackbar";
import { Upload } from "src/components/upload";
import { MAX_UPLOAD_LOGOSIZE } from "src/constant/default";
import {
  getFileFromUrl,
  readFileAsBytes,
  uint8ArrayToBase64
} from "src/utils/file";
import {
  mediaApiService,
  projectApiService,
  projectBrandingCryptoApiService
} from "src/utils/service";
import { LoadingButton } from "@mui/lab";
import { ColorChangeHandler, SketchPicker } from "react-color";
import {
  IProject,
  TCreateProjectPayload
} from "src/utils/service/api/project.type";
import Iconify from "src/components/iconify";
import { truncateAddress } from "src/utils/truncate";
import { CSocialCategory } from "src/constant/project";
import { changeBrandingInfoForCryptoApi } from "./util";
import CardanoWallet from "src/utils/cardano/wallet";

const CBgList = [
  {
    title: "Avenir (Default)",
    value: "avenir"
  },
  {
    title: "Times New Roman",
    value: "times-new-roman"
  },
  {
    title: "Arial",
    value: "arial"
  }
];

type TFormColor =
  | "bgColor"
  | "tbColor"
  | "headerBgColor"
  | "hlColor"
  | "btColor"
  | "bsFontColor"
  | "titleFontColor"
  | "btFontColor"
  | "tableFontColor";

interface IColorPickerProps {
  value: string;
  onColorChange: (color: string) => void;
}

function ColorPicker({ value, onColorChange }: IColorPickerProps) {
  const [displayColorPicker, setDisplayColorPicker] = useState(false);

  const handleClick = () => {
    setDisplayColorPicker(!displayColorPicker);
  };

  const handleClose = () => {
    setDisplayColorPicker(false);
  };

  const handleChange: ColorChangeHandler = (color) => {
    onColorChange(
      `rgba(${color.rgb.r},${color.rgb.g},${color.rgb.b},${color.rgb.a})`
    );
  };

  return (
    <div
      style={{ display: "flex", alignContent: "center", paddingRight: "1rem" }}
    >
      <div
        onClick={handleClick}
        style={{
          padding: "2px",
          background: "#fff",
          borderRadius: "3px",
          boxShadow: "0 0 0 1px rgba(0,0,0,.1)",
          display: "inline-block",
          cursor: "pointer"
        }}
      >
        <div
          style={{
            width: "1.5rem",
            height: "1.5rem",
            borderRadius: "2px",
            background: value
          }}
        />
      </div>
      {displayColorPicker ? (
        <Stack style={{ position: "absolute", zIndex: 2, cursor: "pointer" }}>
          <Stack
            sx={{
              position: "fixed",
              top: "0px",
              right: "0px",
              bottom: "0px",
              left: "0px",
              cursor: "pointer"
            }}
            onClick={handleClose}
          />
          <SketchPicker color={value} onChange={handleChange} />
        </Stack>
      ) : null}
    </div>
  );
}

const defaultSocialLink = {
  type: "none",
  link: "",
  linkPlaceHolder: "https://"
};

function Branding() {
  const defaultValues = useMemo(() => NewBrandDefaultValues, []);
  const [projectPersistState, setPersistProject] = usePersistStore((store) => [
    store.app.newProject,
    store.actions.setNewProject
  ]);

  const [logoFile, setLogoFile] = useState<any[]>([]);
  const [logoError, setLogoError] = useState("");

  const [bgImgFile, setBgImgFile] = useState<any[]>([]);
  const [bgImgError, setBgImgError] = useState("");

  const [newSocialLink, setNewSocialLink] = useState(defaultSocialLink);
  const [socialLinks, setSocialLinks] = useState<
    Array<{ type: string; link: string }>
  >([]);
  const settings = useSettingsContext();
  const snackbar = useSnackbar();

  const methods = useForm({
    resolver: yupResolver(NewBrandSchema),
    defaultValues
  });

  const {
    // reset,
    handleSubmit,
    setValue,
    watch,
    formState: { isSubmitting }
  } = methods;

  const values = watch();

  const handleSocialLink = async (link: string) => {
    window.open(link, "_blank");
  };

  const handleColorChange = (colorName: TFormColor) => (color: string) => {
    setValue(colorName, color);
  };

  const handleBrandSubmit = handleSubmit(async (data, event) => {
    event?.preventDefault();
    try {
      if (logoFile.length === 0) {
        setLogoError("Please select logo");
        return;
      }
      if (!projectPersistState.cardanoSetting?.projectId) {
        snackbar.snackbarError("Cardano Project is not correctly set.");
        return;
      }
      const readerResult = await readFileAsBytes(logoFile[0]);
      const fileString = uint8ArrayToBase64(readerResult);
      const resUpload = await mediaApiService.uploadImage(fileString);

      if (bgImgFile.length !== 0) {
        const readerBgResult = await readFileAsBytes(bgImgFile[0]);
        const fileBgString = uint8ArrayToBase64(readerBgResult);
        const resBgUpload = await mediaApiService.uploadImage(fileBgString);
        setValue("bgImgUrl", resBgUpload.url);
      } else {
        // @ts-ignore
        setValue("bgImgUrl", null);
      }

      setValue("logoUrl", resUpload.url);
      setValue("socialLinks", socialLinks);

      await setPersistProject(data);
      const dataForCryptoApi = changeBrandingInfoForCryptoApi(data);
      const walletAuthResult = await CardanoWallet.getWalletAuth(
        "Update Project Branding"
      );

      if (!walletAuthResult.ok) {
        snackbar.snackbarError("Failed to sign with wallet");
        return;
      }

      const updateBrandingResult = await projectBrandingCryptoApiService.put(
        projectPersistState.cardanoSetting.projectId,
        dataForCryptoApi,
        walletAuthResult.data
      );

      if (!updateBrandingResult.ok) {
        snackbar.snackbarError("Failed to save project branding");
        return;
      }

      if (projectPersistState?._id && projectPersistState?._id !== "") {
        await projectApiService.updateProject({
          ...projectPersistState,
          ...data
        } as IProject);
      } else {
        const res = await projectApiService.createProject({
          ...projectPersistState,
          ...data
        } as TCreateProjectPayload);
        if (res._id) {
          await setPersistProject(res);
        }
      }
      snackbar.snackbarSuccess("Brand Setting saved");
    } catch (error) {
      console.error(error);
    }
  });

  const handleDropLogoFile = (acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file)
      })
    );
    setLogoError("");
    setLogoFile(newFiles);
  };
  const handleRemoveLogoFile = (inputFile: File | string | any) => {
    const filtered =
      (logoFile &&
        logoFile?.filter(
          (file) =>
            file.name !== inputFile.name ||
            file.preview !== inputFile.preview ||
            file.size !== inputFile.size ||
            file.type !== inputFile.type
        )) ||
      [];
    setLogoFile(filtered);
  };
  const handleRemoveLogoAllFiles = () => {
    setLogoFile([]);
  };

  const handleDropBgFile = (acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file)
      })
    );
    setBgImgError("");
    setBgImgFile(newFiles);
  };
  const handleRemoveBgFile = (inputFile: File | string | any) => {
    const filtered =
      (logoFile &&
        logoFile?.filter(
          (file) =>
            file.name !== inputFile.name ||
            file.preview !== inputFile.preview ||
            file.size !== inputFile.size ||
            file.type !== inputFile.type
        )) ||
      [];
    setBgImgFile(filtered);
  };
  const handleRemoveBgAllFiles = () => {
    setBgImgFile([]);
  };

  const initBrand = async () => {
    Object.keys(NewBrandDefaultValues).forEach((item) => {
      // @ts-ignore
      if (projectPersistState[item])
        // @ts-ignore
        setValue(item, projectPersistState[item]);
    });
    if (projectPersistState.logoUrl !== "") {
      const logoFileUrl = await getFileFromUrl(
        projectPersistState.logoUrl ?? "",
        projectPersistState.logoUrl ?? ""
      );
      const logoFilePreview = Object.assign(logoFileUrl, {
        preview: projectPersistState.logoUrl
      });
      setLogoFile([logoFilePreview]);
    }
    if (projectPersistState.bgImgUrl !== "") {
      const bgFileUrl = await getFileFromUrl(
        projectPersistState.bgImgUrl ?? "",
        projectPersistState.bgImgUrl ?? ""
      );
      const bgFile = Object.assign(bgFileUrl, {
        preview: projectPersistState.bgImgUrl
      });
      setBgImgFile([bgFile]);
    }
    if (
      projectPersistState?.socialLinks &&
      projectPersistState?.socialLinks?.length > 0
    ) {
      setSocialLinks(
        projectPersistState?.socialLinks?.map((item) => ({
          type: item.type,
          link: item.link
        }))
      );
    }
  };

  useEffect(() => {
    initBrand();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectPersistState]);

  const theme = useTheme();
  return (
    <Container sx={{ px: "0 !important" }}>
      <FormProvider methods={methods} onSubmit={handleBrandSubmit}>
        <Grid container spacing={2} mt={3} mb={5}>
          <Grid item xs={12}>
            <Stack gap={1}>
              <Typography variant="body2">Title</Typography>
              <RHFTextField
                name="title"
                size="small"
                placeholder="Please enter project title"
                fullWidth
              />
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack gap={1}>
              <Typography variant="body2">Description</Typography>
              <RHFTextField
                name="description"
                size="small"
                placeholder="Please enter project details or catchphrase"
                fullWidth
              />
            </Stack>
          </Grid>
          <Grid item xs={12} mt={2}>
            <Stack gap={2}>
              <Typography variant="body2">Logo</Typography>
              <Stack
                direction="column"
                gap={1}
                sx={{
                  borderRadius: ".5rem",
                  bgcolor:
                    settings.themeMode === "light" ? "#ffffff" : "#161d27",
                  p: 2,
                  boxShadow:
                    settings.themeMode === "light"
                      ? "0 0 2px 0 rgba(145, 158, 171, 0.2),0 12px 24px -4px rgba(145, 158, 171, 0.12)"
                      : "none"
                }}
              >
                <Upload
                  multiple
                  thumbnail
                  maxSize={MAX_UPLOAD_LOGOSIZE}
                  accept={{ "image/*": [] }}
                  onRemove={handleRemoveLogoFile}
                  onRemoveAll={handleRemoveLogoAllFiles}
                  files={logoFile}
                  error={!(logoError === "")}
                  onDrop={handleDropLogoFile}
                  helperText={
                    (!(logoError === "") || logoError) && (
                      <FormHelperText error={!!logoError} sx={{ px: 2 }}>
                        {logoError}
                      </FormHelperText>
                    )
                  }
                  sx={{
                    "& .uploadBox > div": {
                      display: "flex",
                      justifyContent: "center"
                    },
                    "& .uploadBox": {
                      p: 1
                    },
                    "& .uploadBox svg": {
                      width: 100
                    }
                  }}
                />
              </Stack>
            </Stack>
          </Grid>
          <Grid item xs={12} mt={2}>
            <Stack gap={2}>
              <Typography variant="body2">Background Image</Typography>
              <Stack
                direction="column"
                gap={1}
                sx={{
                  borderRadius: ".5rem",
                  bgcolor:
                    settings.themeMode === "light" ? "#ffffff" : "#161d27",
                  p: 2,
                  boxShadow:
                    settings.themeMode === "light"
                      ? "0 0 2px 0 rgba(145, 158, 171, 0.2),0 12px 24px -4px rgba(145, 158, 171, 0.12)"
                      : "none"
                }}
              >
                <Upload
                  multiple
                  thumbnail
                  maxSize={MAX_UPLOAD_LOGOSIZE}
                  accept={{ "image/*": [] }}
                  onRemove={handleRemoveBgFile}
                  onRemoveAll={handleRemoveBgAllFiles}
                  files={bgImgFile}
                  error={!(bgImgError === "")}
                  onDrop={handleDropBgFile}
                  helperText={
                    (!(bgImgError === "") || bgImgError) && (
                      <FormHelperText error={!!bgImgError} sx={{ px: 2 }}>
                        {bgImgError}
                      </FormHelperText>
                    )
                  }
                  sx={{
                    "& .uploadBox > div": {
                      display: "flex",
                      justifyContent: "center"
                    },
                    "& .uploadBox": {
                      p: 1
                    },
                    "& .uploadBox svg": {
                      width: 100
                    }
                  }}
                />
              </Stack>
            </Stack>
          </Grid>
          <Grid item xs={12} my={2}>
            <Stack gap={2}>
              <Typography variant="body2">Social Links</Typography>
              <Stack
                direction="column"
                gap={1}
                sx={{
                  borderRadius: ".5rem",
                  bgcolor:
                    settings.themeMode === "light" ? "#ffffff" : "#161d27",
                  p: 2,
                  boxShadow:
                    settings.themeMode === "light"
                      ? "0 0 2px 0 rgba(145, 158, 171, 0.2),0 12px 24px -4px rgba(145, 158, 171, 0.12)"
                      : "none"
                }}
              >
                <Grid container spacing={1}>
                  <Grid item xs={12} md={4}>
                    <Select
                      fullWidth
                      size="small"
                      MenuProps={{
                        sx: {
                          maxHeight: "25rem"
                        }
                      }}
                      value={newSocialLink.type}
                      onChange={(e) => {
                        const matchLinkType = CSocialCategory.filter(
                          (item) => item.name === e.target.value
                        )?.[0];
                        setNewSocialLink((prev) => ({
                          ...prev,
                          type: e.target.value,
                          linkPlaceHolder:
                            matchLinkType?.placeHolder ?? "https://..."
                        }));
                      }}
                    >
                      <MenuItem disabled value="none">
                        Please Select Category
                      </MenuItem>
                      {CSocialCategory.filter(
                        (categoryItem) =>
                          !socialLinks
                            .map((item) => item.type)
                            .includes(categoryItem.name)
                      ).map((item, key) => (
                        <MenuItem value={item.name} key={key}>
                          <Stack direction="row" alignItems="center" gap={2}>
                            <Iconify
                              width={20}
                              className="arrow"
                              icon={item.icon}
                            />
                            <Typography variant="body2">{item.name}</Typography>
                          </Stack>
                        </MenuItem>
                      ))}
                    </Select>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      fullWidth
                      size="small"
                      value={newSocialLink.link}
                      onChange={(e) =>
                        setNewSocialLink((prev) => ({
                          ...prev,
                          link: e.target.value
                        }))
                      }
                      placeholder={newSocialLink.linkPlaceHolder}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Stack
                      alignItems="center"
                      justifyContent="center"
                      height="100%"
                    >
                      <Button
                        variant="contained"
                        size="small"
                        disabled={
                          newSocialLink.link === "" ||
                          newSocialLink.type === "none"
                        }
                        sx={{
                          px: 3,
                          color: theme.palette.text.primary,
                          background: theme.palette.background.main,
                          "&:hover": {
                            background: theme.palette.background.main
                          }
                        }}
                        onClick={() => {
                          setSocialLinks((prev) => [
                            ...prev,
                            {
                              type: newSocialLink.type,
                              link: newSocialLink.link
                            }
                          ]);
                          setNewSocialLink(defaultSocialLink);
                        }}
                      >
                        <AddIcon />
                        Add New Social
                      </Button>
                    </Stack>
                  </Grid>
                </Grid>

                <Grid container spacing={3} px={5} mt={1}>
                  {socialLinks.map((socialItem, index) => (
                    <Grid item xs={12} md={3} key={index}>
                      <Stack direction="row" alignItems="center" gap={1}>
                        <Box
                          sx={{
                            position: "relative",
                            cursor: "pointer"
                          }}
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
                            sx={{
                              opacity: 1
                            }}
                          />
                        </Box>
                        <Link
                          component="button"
                          onClick={() => handleSocialLink(socialItem.link)}
                          sx={{
                            flexDirection: "row",
                            display: "flex",
                            overflow: "hidden"
                          }}
                        >
                          <Typography variant="body2">
                            {truncateAddress(socialItem.link, 15, 10)}
                          </Typography>
                        </Link>
                        <IconButton
                          onClick={() => {
                            setSocialLinks((prev) =>
                              prev.filter(
                                (item) => item.type !== socialItem.type
                              )
                            );
                          }}
                        >
                          <Iconify
                            icon="mdi:delete"
                            className="delete"
                            width={20}
                          />
                        </IconButton>
                      </Stack>
                    </Grid>
                  ))}
                </Grid>
              </Stack>
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack gap={1}>
              <Typography variant="body2">Background Color</Typography>
              <RHFTextField
                size="small"
                name="bgColor"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="end">
                      <ColorPicker
                        value={values.bgColor}
                        onColorChange={handleColorChange("bgColor")}
                      />
                    </InputAdornment>
                  )
                }}
              />
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack gap={1}>
              <Typography variant="body2">Table Background Color</Typography>

              <RHFTextField
                size="small"
                name="tbColor"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="end">
                      <ColorPicker
                        value={values.tbColor}
                        onColorChange={handleColorChange("tbColor")}
                      />
                    </InputAdornment>
                  )
                }}
              />
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack gap={1}>
              <Typography variant="body2">Header Background Color</Typography>

              <RHFTextField
                size="small"
                name="headerBgColor"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="end">
                      <ColorPicker
                        value={values.headerBgColor}
                        onColorChange={handleColorChange("headerBgColor")}
                      />
                    </InputAdornment>
                  )
                }}
              />
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack gap={1}>
              <Typography variant="body2">Hightlight Color</Typography>

              <RHFTextField
                size="small"
                name="hlColor"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="end">
                      <ColorPicker
                        value={values.hlColor}
                        onColorChange={handleColorChange("hlColor")}
                      />
                    </InputAdornment>
                  )
                }}
              />
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack gap={1}>
              <Typography variant="body2">Button Color</Typography>

              <RHFTextField
                size="small"
                name="btColor"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="end">
                      <ColorPicker
                        value={values.btColor}
                        onColorChange={handleColorChange("btColor")}
                      />
                    </InputAdornment>
                  )
                }}
              />
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack gap={1}>
              <Typography variant="body2">Font Type</Typography>
              <RHFSelect
                size="small"
                name="fontType"
                placeholder="Font Type"
                fullWidth
              >
                {CBgList.map((item, index) => (
                  <MenuItem value={item.value} key={index}>
                    <Typography variant="subtitle2">{item.title}</Typography>
                  </MenuItem>
                ))}
              </RHFSelect>
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack gap={1}>
              <Typography variant="body2">Base Font Color</Typography>

              <RHFTextField
                size="small"
                name="bsFontColor"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="end">
                      <ColorPicker
                        value={values.bsFontColor}
                        onColorChange={handleColorChange("bsFontColor")}
                      />
                    </InputAdornment>
                  )
                }}
              />
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack gap={1}>
              <Typography variant="body2">Title Font Color</Typography>

              <RHFTextField
                size="small"
                name="titleFontColor"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="end">
                      <ColorPicker
                        value={values.titleFontColor}
                        onColorChange={handleColorChange("titleFontColor")}
                      />
                    </InputAdornment>
                  )
                }}
              />
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack gap={1}>
              <Typography variant="body2">Button Font Color</Typography>

              <RHFTextField
                size="small"
                name="btFontColor"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="end">
                      <ColorPicker
                        value={values.btFontColor}
                        onColorChange={handleColorChange("btFontColor")}
                      />
                    </InputAdornment>
                  )
                }}
              />
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack gap={1}>
              <Typography variant="body2">Table Text Color</Typography>

              <RHFTextField
                size="small"
                name="tableFontColor"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="end">
                      <ColorPicker
                        value={values.tableFontColor}
                        onColorChange={handleColorChange("tableFontColor")}
                      />
                    </InputAdornment>
                  )
                }}
              />
            </Stack>
          </Grid>
          <Grid item xs={12} mt={2}>
            <Stack gap={2}>
              <Typography variant="body2">Dexhunter</Typography>
              <Stack
                direction="column"
                gap={1}
                sx={{
                  borderRadius: ".5rem",
                  bgcolor:
                    settings.themeMode === "light" ? "#ffffff" : "#161d27",
                  p: 2,
                  boxShadow:
                    settings.themeMode === "light"
                      ? "0 0 2px 0 rgba(145, 158, 171, 0.2),0 12px 24px -4px rgba(145, 158, 171, 0.12)"
                      : "none"
                }}
              >
                <Stack>
                  <Typography variant="caption">Partner Code</Typography>
                  <RHFTextField
                    name="dexHunter.code"
                    placeholder="Please enter partner code for Dexhunter"
                    size="small"
                  />
                </Stack>

                <Stack>
                  <Typography variant="caption">Partner Name</Typography>
                  <RHFTextField
                    name="dexHunter.name"
                    placeholder="Please enter partner name for Dexhunter"
                    size="small"
                  />
                </Stack>
              </Stack>
            </Stack>
          </Grid>
          <Grid item xs={12} md={12}>
            <Stack justifyContent="center" alignItems="center">
              <LoadingButton
                type="submit"
                variant="contained"
                size="medium"
                loading={isSubmitting}
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
              >
                Save Changes
              </LoadingButton>
            </Stack>
          </Grid>
        </Grid>
      </FormProvider>
    </Container>
  );
}

export default Branding;
