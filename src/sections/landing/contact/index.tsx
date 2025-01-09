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
import { useTheme } from "@mui/material";

function Contact() {
  const defaultValues = useMemo(() => NewBrandDefaultValues, []);
  const theme = useTheme();
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

  const commonProps = {
    fullWidth: true,
    defaultValue: "",
    InputProps: {
      sx: {
        borderRadius: "24px",
        color: "#fff",
        backgroundColor: "#257055",
        borderColor: "#fff",
        "&:hover": {
          borderColor: "#fff !important",
        }
      },
    },
    InputLabelProps: {
      style: { color: '#fff' },
    },
  };

  return (
    <Box sx={{
      backgroundColor: theme.palette.background.main,
      backgroundImage: "url('/assets/images/landing/pattern-bg.png')",
      backgroundBlendMode: "overlay",
      backgroundSize: "cover",
      borderRadius: "18px",
      p: 6,
      // mt: 6
    }}>
      <Typography variant="caption" color="#fbc50b">Lets Co-operate Together</Typography>
      <Typography variant="h6" color="white" sx={{ mt: 1 }}>Contact Us Today</Typography>
      <Typography variant="caption" color="white">We will contact you within 24hrs via email thank you for contacting</Typography>
      <Container sx={{ px: "0 !important" }}>
        <FormProvider methods={methods} onSubmit={handleBrandSubmit}>
          <Grid container spacing={2} mt={3} mb={5}>
            <Grid item xs={12} md={6} sx={{ color: "#ffff" }}>
              <TextField
                id="outlined-required"
                required
                label="Name"
                size="small"
                {...commonProps}
              />
            </Grid>

            <Grid item xs={12} md={6} sx={{ color: "#ffff" }}>
              <TextField
                required
                id="outlined-required1"
                label="Email"
                size="small"
                {...commonProps}
              />
            </Grid>
            <Grid item xs={12} md={6} sx={{ color: "#ffff" }}>
              <TextField
                id="outlined-required1"
                label="Phone"
                size="small"
                {...commonProps}
              />
            </Grid>
            <Grid item xs={12} md={6} sx={{ color: "#ffff" }}>
              <TextField
                id="outlined-required1"
                label="Address"
                size="small"
                {...commonProps}
              />
            </Grid>
            <Grid item xs={12} md={12} sx={{ color: "#ffff" }}>
              <TextField
                id="outlined-required1"
                label="Message"
                size="small"
                {...commonProps}
                required
                multiline
                rows={4}
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
