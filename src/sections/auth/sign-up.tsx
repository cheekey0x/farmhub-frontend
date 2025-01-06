"use client";

import * as Yup from "yup";
import {
  Box,
  Link,
  Stack,
  useTheme,
  IconButton,
  Typography,
  InputAdornment
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { paths } from "src/routes/paths";
import { useBoolean } from "src/hooks/use-boolean";
import { RouterLink } from "src/routes/components";
import FormProvider, { RHFTextField } from "src/components/hook-form";
import { useSnackbar } from "src/hooks/use-snackbar";
import { useSettingsContext } from "src/components/settings";
import { authApiService } from "src/utils/service";
import { useRouter } from "next/router";
// ...................................

export default function SignUp() {
  // ...................................
  const router = useRouter();
  const theme = useTheme();
  const password = useBoolean();
  const snackbar = useSnackbar();
  const settings = useSettingsContext();
  // ...................................
  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string().required("First name required"),
    secondName: Yup.string().required("Last name required"),
    email: Yup.string()
      .required("Email is required")
      .email("Email must be a valid email address"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .matches(/[a-z]/, "Password must contain at least 1 lower case letter")
      .matches(/[A-Z]/, "Password must contain at least 1 upper case letter")
      .matches(/[0-9]/, "Password must contain at least 1 number")
      .matches(
        /[\^$*.\]{}()?\-"!@#%&/,><':;|_~`]/,
        "Password must contain at least 1 special character"
      )
  });
  const defaultValues = {
    firstName: "",
    secondName: "",
    email: "",
    password: ""
  };
  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues
  });
  const {
    reset,
    handleSubmit,
    setError,
    formState: { isSubmitting }
  } = methods;
  // ...................................

  const onSubmit = handleSubmit(async (data, event) => {
    event?.preventDefault();
    try {
      const signUpRes = await authApiService.signUpWithEmail({
        name: `${data.firstName} ${data.secondName}`,
        userEmail: data.email,
        password: data.password
      });
      if (signUpRes.auth.accessToken) {
        snackbar.snackbarSuccess("Register success!");
        router.push("/login");
      }
    } catch (error) {
      if (error.error === "User already exists") {
        snackbar.snackbarWarnning("Email already registered");
        setError("email", {
          message: "Email already registered"
        });
      } else {
        snackbar.snackbarError("Please check your connection.");
        reset();
      }
    }
  });
  // ...................................

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Stack
        spacing={3}
        sx={{
          mb: 5,
          display: {
            sm: "flex",
            justifyContent: "center",
            alignItems: "center"
          }
        }}
      >
        <Stack
          justifyContent="center"
          alignItems="center"
          direction="row"
          gap={2}
        >
          <Box component="img" src="/logo/logo.svg" sx={{ width: "30px" }} />
          <Typography
            variant="h4"
            color={settings.themeMode === "light" ? "primary.dark" : "#f2f4f6"}
            fontWeight={900}
          >
            YieldLab
          </Typography>
        </Stack>
        <Stack
          justifyContent="center"
          direction="column"
          alignItems="center"
          gap={1}
        >
          <Typography
            variant="body1"
            color={settings.themeMode === "light" ? "primary.dark" : "#f2f4f6"}
            fontWeight={400}
          >
            Welcome Register
          </Typography>
        </Stack>
        <Stack
          gap={1.5}
          sx={{
            "& input:-webkit-autofill": {
              WebkitBoxShadow:
                settings.themeMode === "light"
                  ? ""
                  : "0 0 0 1000px #161d27bd inset"
            }
          }}
        >
          <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
            <RHFTextField
              name="firstName"
              placeholder="First name"
              sx={{
                "&:hover fieldset": {
                  borderColor: theme.palette.text.primary
                }
              }}
            />
            <RHFTextField name="secondName" placeholder="Last name" />
          </Stack>
          <RHFTextField name="email" placeholder="Email Address" />
          <RHFTextField
            name="password"
            placeholder="Password"
            type={password.value ? "text" : "password"}
            sx={{
              "& .MuiInputBase-root": {
                height: "auto"
              },
              "& input": {
                sm: {
                  padding: "15px 13px",
                  fontSize: "18px"
                },
                xs: {
                  padding: "15px 13px",
                  fontSize: "19px"
                }
              }
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={password.onToggle} edge="end">
                    {password.value ? (
                      <VisibilityOff
                        sx={{ color: theme.palette.background.main }}
                      />
                    ) : (
                      <Visibility
                        sx={{ color: theme.palette.background.main }}
                      />
                    )}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          <Stack spacing={2} sx={{ mb: 1, position: "relative" }}>
            <Stack direction="row" justifyContent="flex-end">
              <Typography variant="body2" fontWeight={400}>
                Already have an account?
              </Typography>
              <Link
                href={paths.login}
                component={RouterLink}
                variant="body2"
                fontWeight={400}
                sx={{
                  color: theme.palette.text.main
                }}
              >
                &nbsp; Sign in
              </Link>
            </Stack>
          </Stack>
        </Stack>
        <LoadingButton
          fullWidth
          size="medium"
          type="submit"
          variant="contained"
          loading={isSubmitting}
          sx={{
            color: theme.palette.text.primary,
            background: theme.palette.background.main,
            "&:hover": {
              background: theme.palette.background.main
            }
          }}
        >
          <Typography variant="body1" fontWeight={400}>
            Create account
          </Typography>
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
