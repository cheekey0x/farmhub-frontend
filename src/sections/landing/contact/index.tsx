import { Box, Container, Grid, Stack, TextField, Typography } from "@mui/material";
import React, { useMemo } from "react";
import { useForm } from "react-hook-form";
import { m } from "framer-motion";
import Image from "src/components/image";
import { varFade, MotionViewport } from "src/components/animate";
import FormProvider, {
  RHFSelect,
  RHFTextField
} from "src/components/hook-form";
import { NewBrandSchema, NewBrandDefaultValues } from "src/types/yup.schema";
import { yupResolver } from "@hookform/resolvers/yup";
import LoadingButton from "@mui/lab/LoadingButton";

function Contact() {
  const defaultValues = useMemo(() => NewBrandDefaultValues, []);
  const methods = useForm({
    resolver: yupResolver(NewBrandSchema),
    defaultValues
  });
  const {
    // reset,
    handleSubmit
  } = methods;

  const handleBrandSubmit = handleSubmit(async (data, event) => {
    event?.preventDefault();
    try {
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <Box sx={{
      backgroundImage: "url('/assets/images/landing/contactbg.png')",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      borderRadius: "24px",
      p: 6,
      // mt: 6
    }}>
      <Typography variant="caption" color="#F8C32C">Lets Co-operate Together</Typography>
      <Typography variant="h6" color="white" sx={{ mt: 1 }}>Contact Us Today</Typography>
      <Typography variant="caption" color="white">We will contact you within 24hrs via email thank you for contacting</Typography>
      <Container sx={{ px: "0 !important" }}>
        <FormProvider methods={methods} onSubmit={handleBrandSubmit}>
          <Grid container spacing={2} mt={3} mb={5}>
            <Grid item xs={12} md={6} sx={{ color: "#ffff" }}>
              <TextField
                // variant="filled"
                fullWidth
                required
                id="outlined-required1"
                label="Name"
                defaultValue=""
                InputProps={{
                  sx:
                  {
                    borderRadius: "24px", color: "#fff",
                    backgroundColor: "#62916E",
                    borderColor: "#fff"
                  },
                }}
                InputLabelProps={{
                  style: { color: '#fff' },
                }}
              />
            </Grid>

            <Grid item xs={12} md={6} sx={{ color: "#ffff" }}>
              <TextField
                // variant="filled"
                fullWidth
                required
                id="outlined-required1"
                label="Email"
                defaultValue=""
                InputProps={{
                  sx:
                  {
                    borderRadius: "24px", color: "#fff",
                    backgroundColor: "#62916E",
                    borderColor: "#fff"
                  },
                }}
                InputLabelProps={{
                  style: { color: '#fff' },
                }}
              />
            </Grid>
            <Grid item xs={12} md={6} sx={{ color: "#ffff" }}>
              <TextField
                // variant="filled"
                fullWidth
                // required
                id="outlined-required1"
                label="Phone"
                defaultValue=""
                InputProps={{
                  sx:
                  {
                    borderRadius: "24px", color: "#fff",
                    backgroundColor: "#62916E",
                    borderColor: "#fff"
                  },
                }}
                InputLabelProps={{
                  style: { color: '#fff' },
                }}
              />
            </Grid>
            <Grid item xs={12} md={6} sx={{ color: "#ffff" }}>
              <TextField
                // variant="filled"
                fullWidth
                // required
                id="outlined-required1"
                label="Address"
                defaultValue=""
                InputProps={{
                  sx:
                  {
                    borderRadius: "24px", color: "#fff",
                    backgroundColor: "#62916E",
                    borderColor: "#fff"
                  },
                }}
                InputLabelProps={{
                  style: { color: '#fff' },
                }}
              />
            </Grid>
            <Grid item xs={12} md={12} sx={{ color: "#ffff" }}>
              <TextField
                // variant="filled"
                fullWidth
                required
                multiline
                rows={4}
                id="outlined-required1"
                label="Message"
                defaultValue=""
                InputProps={{
                  sx:
                  {
                    borderRadius: "24px", color: "#fff",
                    backgroundColor: "#62916E",
                    borderColor: "#fff"
                  },
                }}
                InputLabelProps={{
                  style: { color: '#fff' },
                }}
              />
            </Grid>
          </Grid>
          <Grid item xs={12} md={12}>
            <LoadingButton
              type="submit"
              variant="contained"
              size="medium"
              // color="success"
              sx={{ backgroundColor: "#fff", fontSize: "12px", color: "#000", fontWeight: "400", borderRadius: "24px" }}
            // fullWidth
            // loading={isSubmitting}
            // sx={{ py: 1.5 }}
            >
              Send Message
            </LoadingButton>
          </Grid>
        </FormProvider>
      </Container>
    </Box>
  );
}

export default Contact;
