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
import { useRouter } from "src/routes/hooks";
import { useBoolean } from "src/hooks/use-boolean";
import FormProvider, { RHFTextField } from "src/components/hook-form";
import { signIn } from "next-auth/react";
import { useSnackbar } from "src/hooks/use-snackbar";
import { useSettingsContext } from "src/components/settings";
import { RouterLink } from "src/routes/components";
import { paths } from "src/routes/paths";
import { authApiService } from "src/utils/service";
import { setAccessToken, setRefreshToken } from "src/utils/axios";
// ...................................

export default function SignIn() {
  // ...................................

  const router = useRouter();
  const password = useBoolean();
  const snackbar = useSnackbar();
  const settings = useSettingsContext();
  const theme = useTheme();
  // ...................................

  const LoginSchema = Yup.object().shape({
    userEmail: Yup.string()
      .required("Email is required")
      .email("Email must be a valid email address"),
    password: Yup.string().required("Password is required")
  });
  const defaultValues = {
    userEmail: "",
    password: ""
  };
  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues
  });
  const {
    handleSubmit,
    setError,
    formState: { isSubmitting }
  } = methods;

  const onSubmit = handleSubmit(async (data, event) => {
    event?.preventDefault();
    try {
      // const loginRes = await authApiService.logInWithEmail(data);
      // if (loginRes?.auth.accessToken) {
      //   setAccessToken(loginRes.auth.accessToken);
      //   setRefreshToken(loginRes.auth.refreshToken);
      //   await signIn("EmailCredentials", {
      //     redirect: false,
      //     userId: loginRes.user._id,
      //     name: loginRes.user.name,
      //     email: loginRes.user.userEmail,
      //     avatar: loginRes.user.avatar
      //   });
      //   snackbar.snackbarSuccess("Login success!");
      //   router.push("/app");
      // }
      const { userEmail, password } = data
      if (userEmail === "dalianjx@163.com" && password === "wn719772") {
        // console.log(data)
        snackbar.snackbarSuccess("Login success!");
        router.push("/app");
      } else {
        setError("password", { message: "Password is incorrect" });
        setError("userEmail", { message: "Email is incorrect" });
        snackbar.snackbarWarnning("Not registered or password is not correct.");
      }
    } catch (error) {
      setError("password", { message: "Password is incorrect" });
      setError("userEmail", { message: "Email is incorrect" });
      snackbar.snackbarWarnning("Not registered or password is not correct.");
      console.error(error);
    }
  });
  // ...................................
  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      p={4}
      overflow="auto"
      sx={{ height: "100%" }}
    >
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <Stack
          spacing={2}
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
            gap={1}
          >
            <Box component="img" src="/logo/logo.png" sx={{ width: "30px" }} />
            <Typography
              variant="h6"
              color={settings.themeMode === "light" ? "#236634" : "#f2f4f6"}
              fontWeight={700}
            >
              飞鸟科技FarmHub智慧农业系统
            </Typography>
          </Stack>
          <Stack
            justifyContent="center"
            direction="column"
            alignItems="center"
            gap={2}
          >
            <Typography
              variant="body1"
              color={settings.themeMode === "light" ? "#236634" : "#f2f4f6"}
              fontWeight={400}
            >
              Welcome Back
            </Typography>
            <Stack justifyContent="center" direction="column" alignItems="center">
              <Typography
                variant="body2"
                color={
                  settings.themeMode === "light" ? "#236634" : "#f2f4f6"
                }
                fontWeight={400}
              >
                Login in to your account below
              </Typography>
            </Stack>
          </Stack>
        </Stack>
        <Stack gap={5}>
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
            <RHFTextField
              name="userEmail"
              placeholder="Email Address"
              sx={{
                "& .MuiOutlinedInput-root": {
                  "fieldset": {
                    borderColor: "#85b090"
                  },
                  "&:hover fieldset": {
                    borderColor: "#236634"
                  }
                }
              }}
            />

            <RHFTextField
              name="password"
              placeholder="Password"
              type={password.value ? "text" : "password"}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "fieldset": {
                    borderColor: "#85b090"
                  },
                  "&:hover fieldset": {
                    borderColor: "#236634"
                  }
                }
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={password.onToggle} edge="end">
                      {password.value ? (
                        <VisibilityOff
                          fontSize="small"
                          sx={{ color: "#236634" }}
                        />
                      ) : (
                        <Visibility
                          fontSize="small"
                          sx={{ color: "#236634" }}
                        />
                      )}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          </Stack>

          <Stack direction="column" spacing={2}>
            <LoadingButton
              fullWidth
              type="submit"
              variant="contained"
              loading={isSubmitting}
              sx={{
                color: "white",
                background: "#236634",
                "&:hover": {
                  background: "#5aa36d"
                }
              }}
            >
              <Typography variant="body1" fontWeight={400}>
                Login
              </Typography>
            </LoadingButton>
          </Stack>
        </Stack>
      </FormProvider>
    </Stack>
  );
}
