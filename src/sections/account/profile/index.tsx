import {
  Box,
  Grid,
  Link,
  Stack,
  Avatar,
  Select,
  Button,
  MenuItem,
  useTheme,
  Container,
  TextField,
  Typography
} from "@mui/material";
import React, { useRef, useState, useEffect } from "react";
import { userApiService, mediaApiService } from "src/utils/service";
import { truncateAddress } from "src/utils/truncate";
import { useSnackbar } from "src/hooks/use-snackbar";
import FormProvider, { RHFTextField } from "src/components/hook-form";
import {
  UserAccountSchema,
  DefaultUserAccountValue
} from "src/types/yup.schema";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CSocialCategory } from "src/constant/project";
import Iconify from "src/components/iconify";
import useModal from "src/hooks/use-modal";
import { ModalType } from "src/types/modal";
import { usePersistStore } from "src/store/persist";
import { LoadingButton } from "@mui/lab";
import { IUser } from "src/utils/service/api/auth.type";
import { readFileAsBytes, uint8ArrayToBase64 } from "src/utils/file";
import { signIn } from "next-auth/react";
import { useSettingsContext } from "src/components/settings";

const defaultSocialLink = {
  type: "none",
  link: "",
  linkPlaceHolder: "https://"
};

function ProfileTab() {
  const theme = useTheme();
  const snackbar = useSnackbar();
  const fileUploadRef = useRef<HTMLInputElement>(null);
  const modal = useModal();
  const [edit, setEdit] = useState(false);
  const [wallet, setWallet] = useState("");

  const [newSocialLink, setNewSocialLink] = useState(defaultSocialLink);
  const [socialLinks, setSocialLinks] = useState<
    Array<{ type: string; link: string }>
  >([]);

  const settings = useSettingsContext();

  const [persistAccount, setUserData] = usePersistStore((store) => [
    store.app.account,
    store.actions.setUser
  ]);

  const handleSocialLink = async (link: string) => {
    window.open(link, "_blank");
  };

  const handleOpenWallet = async () => {
    modal.open(ModalType.ADD_ACCOUNT_WALLET);
  };

  const methods = useForm({
    resolver: yupResolver(UserAccountSchema),
    defaultValues: DefaultUserAccountValue
  });
  const {
    handleSubmit,
    setValue,
    getValues,
    formState: { isSubmitting }
  } = methods;
  const formValues = getValues();

  const handleChangeAvatar = async () => {
    if (fileUploadRef?.current) fileUploadRef.current.click();
  };

  const handleFileChange = async (e: any) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    // Check if file size exceeds 4MB
    if (file.size > 4 * 1024 * 1024) {
      snackbar.snackbarWarnning(
        "File size exceeds 4MB limit. Please try again select"
      );
      return; // Handle the error or prevent further processing
    }
    if (!file.type.startsWith("image")) {
      snackbar.snackbarWarnning("Please select a valide image");
      return;
    }
    const readerResult = await readFileAsBytes(file);
    const fileString = uint8ArrayToBase64(readerResult);
    const resUpload = await mediaApiService.uploadImage(fileString);
    setValue("avatar", resUpload.url);
    const resUser = await userApiService.updateUserInfo({
      avatar: resUpload.url
    });
    setUserData(resUser);
    await updateUserSession(resUser);
  };

  const onSubmit = handleSubmit(async (data, event) => {
    event?.preventDefault();
    try {
      if (edit) {
        setValue("wallet", [wallet]);
        setValue("socialLinks", socialLinks);
        setEdit(false);
        const resUser = await userApiService.updateUserInfo(data as IUser);
        await updateUserSession(resUser);
        setUserData(resUser);
      } else {
        setEdit(true);
      }
    } catch (error) {
      console.error(error);
    }
  });

  const updateUserSession = async (userData: IUser) => {
    if (userData.name !== "")
      await signIn("EmailCredentials", {
        redirect: false,
        userId: userData._id,
        name: userData.name,
        email: userData.userEmail,
        avatar: userData.avatar
      });
    else
      await signIn("WalletCredentials", {
        redirect: false,
        wallet,
        avatar: userData.avatar,
        userId: userData._id
      });
  };

  const fetchUserData = async () => {
    try {
      const userData = await userApiService.getUserInfo();
      if (userData.avatar) {
        setValue("avatar", userData.avatar);
      }
      if (userData.userEmail) {
        setValue("userEmail", userData.userEmail);
      }
      if (userData.avatar) {
        setValue("avatar", userData.avatar);
      }
      if (userData.name) {
        setValue("name", userData.name);
      }
      if (userData.phoneNumber) {
        setValue("phoneNumber", userData.phoneNumber);
      }
      if (userData.socialLinks) {
        setValue("socialLinks", userData.socialLinks);
        setSocialLinks(userData.socialLinks);
      }
      if (userData.wallet && userData.wallet.length > 0) {
        setValue("wallet", userData.wallet);
        setWallet(userData.wallet[0]);
      }
      setUserData(userData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (
      persistAccount?.wallet?.address &&
      persistAccount?.wallet.address !== ""
    ) {
      setWallet(persistAccount?.wallet.address);
    }
  }, [persistAccount?.wallet]);

  useEffect(() => {
    fetchUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container sx={{ p: "0 !important", my: 4 }}>
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <Grid
          container
          spacing={2}
          sx={{
            "& input:-webkit-autofill": {
              WebkitBoxShadow:
                settings.themeMode === "light"
                  ? ""
                  : "0 0 0 1000px #161d27bd inset"
            }
          }}
        >
          <Grid item xs={12}>
            <Stack
              py={2}
              direction="row"
              justifyContent="start"
              alignItems="center"
              spacing={1}
            >
              <Avatar
                sx={{
                  width: 36,
                  height: 36,
                  border: (themeAvatar) =>
                    `solid 2px ${themeAvatar.palette.background.default}`
                }}
                src={getValues().avatar}
              />
              <Typography>
                {formValues.name ?? truncateAddress(wallet ?? "")}
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="caption">Email:</Typography>
          </Grid>
          <Grid item xs={10}>
            <Grid container spacing={1}>
              <Grid item xs={12} md={9}>
                <RHFTextField size="small" name="userEmail" disabled={!edit} />
              </Grid>
              <Grid item xs={12} md={3}>
                <Stack
                  alignItems="center"
                  justifyContent="center"
                  width="100%"
                  height="100%"
                >
                  <Button
                    variant="contained"
                    size="small"
                    fullWidth
                    disabled={!edit}
                    sx={{
                      px: 3,
                      color: "white",
                      background: theme.palette.background.main,
                      "&:hover": {
                        background: theme.palette.background.main
                      }
                    }}
                  >
                    Verify Email
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="caption">Wallet:</Typography>
          </Grid>
          <Grid item xs={10}>
            <Grid container spacing={1}>
              <Grid item xs={12} md={9}>
                <TextField
                  fullWidth
                  size="small"
                  disabled={!edit}
                  value={wallet}
                  onChange={(e) => setWallet(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <Stack
                  alignItems="center"
                  justifyContent="center"
                  width="100%"
                  height="100%"
                >
                  <Button
                    variant="contained"
                    size="small"
                    fullWidth
                    sx={{
                      px: 3,
                      color: "white",
                      background: theme.palette.background.main,
                      "&:hover": {
                        background: theme.palette.background.main
                      }
                    }}
                    disabled={!edit}
                    onClick={handleOpenWallet}
                  >
                    Add Wallet
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="caption">Name:</Typography>
          </Grid>
          <Grid item xs={10}>
            <RHFTextField size="small" name="name" disabled={!edit} />
          </Grid>
          <Grid item xs={2}>
            <Typography variant="caption">Phone Number:</Typography>
          </Grid>
          <Grid item xs={10}>
            <RHFTextField size="small" name="phoneNumber" disabled={!edit} />
          </Grid>
          <Grid item xs={2}>
            <Typography variant="caption">Social Links:</Typography>
          </Grid>
          <Grid item xs={10}>
            <Grid container spacing={1}>
              {edit && (
                <Grid item xs={12} md={5}>
                  <Select
                    fullWidth
                    size="small"
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
                    MenuProps={{
                      sx: {
                        maxHeight: "25rem"
                      }
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
                          <Typography variant="caption">{item.name}</Typography>
                        </Stack>
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
              )}
              {edit && (
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
              )}
              {edit && (
                <Grid item xs={12} md={3}>
                  <Stack
                    alignItems="center"
                    justifyContent="center"
                    width="100%"
                    height="100%"
                  >
                    <Button
                      fullWidth
                      variant="contained"
                      size="small"
                      sx={{
                        px: 3,
                        color: theme.palette.text.primary,
                        background: theme.palette.background.main,
                        "&:hover": {
                          background: theme.palette.background.main
                        }
                      }}
                      disabled={
                        newSocialLink.link === "" ||
                        newSocialLink.type === "none"
                      }
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
                      Add New Social
                    </Button>
                  </Stack>
                </Grid>
              )}
              {socialLinks.map((socialItem, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <Stack direction="row" alignItems="center" gap={1}>
                    <Box
                      sx={{
                        position: "relative",
                        cursor: "pointer",
                        transition: (boxTheme) =>
                          boxTheme.transitions.create(["opacity"], {
                            duration: boxTheme.transitions.duration.shorter
                          }),
                        "&:hover .original": {
                          opacity: 0.1
                        },
                        "&:hover .delete": {
                          opacity: 1
                        }
                      }}
                      onClick={() => {
                        setSocialLinks((prev) =>
                          prev.filter((item) => item.type !== socialItem.type)
                        );
                      }}
                    >
                      <Iconify
                        width={30}
                        icon={
                          CSocialCategory.filter(
                            (categroyItem) =>
                              categroyItem.name === socialItem.type
                          )[0].icon
                        }
                        className="original"
                        sx={{
                          opacity: 1
                        }}
                      />
                      <Iconify
                        icon="mdi:delete"
                        width={30}
                        className="delete"
                        sx={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          opacity: 0
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
                      <Typography variant="caption">
                        {truncateAddress(socialItem.link, 15, 10)}
                      </Typography>
                    </Link>
                  </Stack>
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid item xs={12} />
          <Grid item xs={12}>
            <Grid container display="flex" justifyContent="center" spacing={2}>
              <Grid item xs={12} md={3}>
                <Button
                  variant="contained"
                  size="small"
                  fullWidth
                  sx={{
                    px: 3,
                    color: theme.palette.text.primary,
                    border: `1px solid ${theme.palette.background.main}`,
                    background: theme.palette.background.paper,
                    "&:hover": {
                      border: `1px solid ${theme.palette.background.main}`,
                      background: theme.palette.background.paper
                    }
                  }}
                  onClick={handleChangeAvatar}
                >
                  <input
                    type="file"
                    ref={fileUploadRef}
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                  />
                  Change Avatar
                </Button>
              </Grid>
              <Grid item xs={12} md={3}>
                <LoadingButton
                  fullWidth
                  type="submit"
                  variant="contained"
                  size="small"
                  loading={isSubmitting}
                  sx={{
                    px: 3,
                    color: "white",
                    background: theme.palette.background.main,
                    "&:hover": {
                      background: theme.palette.background.main
                    }
                  }}
                >
                  {edit ? "Update" : "Edit"}
                </LoadingButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </FormProvider>
    </Container>
  );
}

export default ProfileTab;
