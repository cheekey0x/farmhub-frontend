
import {
  Grid,
  Stack,
  Button,
  Typography,
  Container
} from "@mui/material";
import Image from "src/components/image";
import { varTranHover } from "src/components/animate";
import { m } from "framer-motion";
import FormProvider, { RHFTextField } from "src/components/hook-form";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useSnackbar } from "src/hooks/use-snackbar";
import { supportApiService } from "src/utils/service";
import LandingFooter from "../footer";
import LandingHeader from "../header";


const subscribeSchema = Yup.object().shape({
  userEmail: Yup.string()
    .required("Email is required")
    .email("Email must be a valid email address"),
  firstName: Yup.string(),
  secondName: Yup.string(),
  phoneNumber: Yup.string(),
  message: Yup.string().required("Message is required")
});
const defaultValues = {
  userEmail: "",
  firstName: "",
  secondName: "",
  phoneNumber: "",
  message: ""
};


export default function ContactPage() {
  const snackbar = useSnackbar();
  const methods = useForm({
    resolver: yupResolver(subscribeSchema),
    defaultValues
  });

  const handleSubscribe = async () => {
    console.log("subscribe ");
  };

  const { handleSubmit } = methods;

  const onSubmit = handleSubmit(async (data, event) => {
    event?.preventDefault();
    try {
      await supportApiService.subscribeServer(data);
      snackbar.snackbarSuccess("Subscription has been received");
    } catch (error) {
      snackbar.snackbarError("Subscribe Error!");
      console.error(error);
    }
  });

  return (
    <div style={{ position: "relative", overflow: "hidden" }}>
      <LandingHeader />
      <Container maxWidth="lg" sx={{ marginTop: "10rem" }} >
        <Grid container spacing={20}>
          <Grid item xs={12} md={5}>
            <Stack justifyContent="center" alignItems="flex-start">
              <Stack spacing={3}>
                <Stack flexDirection="row" alignItems="center" spacing={2}>
                  <m.div
                    whileHover="hover"
                    variants={{
                      hover: { opacity: 0.8 }
                    }}
                    transition={varTranHover()}
                  >
                    <Image
                      alt="logo"
                      src="/assets/icon/logo_with_title.svg"
                      sx={{ width: { xs: 200, md: 300 } }}
                    />
                  </m.div>
                </Stack>
                <Stack>
                  <Typography
                    variant="h6"
                    letterSpacing={1}
                    className="font-clash"
                    fontWeight={300}
                  >
                    Yieldlab is a multi-chain, no-code web3 solution builder for
                    businesses. Our mission is to simplify the blockchain
                    development process, making it more accessible,
                    cost-effective, and always aiming at reducing your mean time
                    to utility.
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
          </Grid>
          <Grid item xs={12} md={7}>
            <FormProvider methods={methods} onSubmit={onSubmit}>
              <Stack
                justifyContent="center"
                alignItems="center"
                position="relative"
                spacing={4}
              >
                <Stack
                  sx={{
                    position: "absolute",
                    zIndex: "-1",
                    top: "20%",
                    left: "20%",
                    filter: "blur(50px)"
                  }}
                  className="blob-animation"
                >
                  <Image
                    alt="blob"
                    src="/assets/images/landing/ellipse-blob.png"
                    width={100}
                  />
                </Stack>
                <Stack spacing={8}>
                  <Stack justifyContent="center" alignItems="center">
                    <Typography
                      variant="h2"
                      sx={{
                        background:
                          "linear-gradient(90deg, #c2c2c2 0%, #9747FF 130%)",
                        "-webkit-background-clip": "text",
                        "-webkit-text-fill-color": "transparent"
                      }}
                    >
                      Get in touch
                    </Typography>
                    <Typography variant="h6">
                      {`Reach out, and let's mint new blocks of possibilitites together!`}
                    </Typography>
                  </Stack>
                  <Stack justifyContent="center">
                    <Grid
                      container
                      spacing={2}
                      sx={{
                        background: "#FFFFFF0A",
                        borderRadius: 2,
                        px: { xs: 2, sm: 7 },
                        py: { xs: 4, sm: 7 },
                        width: "100%",
                        mx: 0
                      }}
                    >
                      <Grid item xs={12} lg={7}>
                        <Stack spacing={3}>
                          <Stack gap={1}>
                            <Typography variant="h4">{`Let's Connect!`}</Typography>
                            <Typography variant="body2">
                              Please fill out the form below and we will connect
                              you to a member of sales team.
                            </Typography>
                          </Stack>
                          <Stack>
                            <Grid
                              container
                              spacing={2}
                              sx={{
                                "& input:-webkit-autofill": {
                                  WebkitBoxShadow: "0 0 0 1000px #191f27 inset"
                                },
                                "& input": {
                                  background: "#161d2730"
                                },
                                "& fieldset": {
                                  background: "#161d2730"
                                },
                                width: "100%"
                              }}
                            >
                              <Grid item xs={12} md={6}>
                                <RHFTextField
                                  name="firstName"
                                  placeholder="First Name"
                                />
                              </Grid>
                              <Grid item xs={12} md={6}>
                                <RHFTextField
                                  name="secondName"
                                  placeholder="Second Name"
                                />
                              </Grid>
                              <Grid item xs={12}>
                                <RHFTextField
                                  name="userEmail"
                                  placeholder="Email"
                                />
                              </Grid>
                              <Grid item xs={12}>
                                <RHFTextField
                                  name="phoneNumber"
                                  placeholder="Phone Number"
                                />
                              </Grid>
                              <Grid item xs={12}>
                                <RHFTextField
                                  name="message"
                                  placeholder="Message"
                                  minRows={3}
                                  multiline
                                />
                              </Grid>
                              <Grid item xs={12}>
                                <Button
                                  fullWidth
                                  type="submit"
                                  onClick={handleSubscribe}
                                  sx={{
                                    px: 3,
                                    lineHeight: "18.23px",
                                    background: "#731ae2b3",
                                    gap: 1,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center"
                                  }}
                                >
                                  <Typography
                                    color="white"
                                    variant="body1"
                                    className="font-clash"
                                    letterSpacing={1}
                                  >
                                    Send it!
                                  </Typography>
                                  <Image
                                    alt="rocket"
                                    src="/assets/images/landing/launch-rocket.png"
                                    width={20}
                                    sx={{ transform: "rotate(90deg)" }}
                                  />
                                </Button>
                              </Grid>
                            </Grid>
                          </Stack>
                        </Stack>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        lg={5}
                        justifyContent="center"
                        alignItems="center"
                        sx={{ display: { xs: "none", lg: "flex" } }}
                      >
                        <Image
                          alt="block"
                          src="/assets/images/landing/purple_blocks.png"
                          sx={{ width: { xs: 300, lg: 400 } }}
                        />
                      </Grid>
                    </Grid>
                  </Stack>
                </Stack>
              </Stack>
            </FormProvider>
          </Grid>
        </Grid>
      </Container>
      <LandingFooter />
    </div>
  );
}