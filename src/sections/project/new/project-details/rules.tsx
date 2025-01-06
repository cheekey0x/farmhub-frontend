import { Grid, MenuItem, Container, Typography } from "@mui/material";
import React, { useMemo } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { NewBrandSchema, NewBrandDefaultValues } from "src/types/yup.schema";
import FormProvider, {
  RHFSelect,
  RHFTextField
} from "src/components/hook-form";
import LoadingButton from "@mui/lab/LoadingButton";

const CBgList = [
  {
    title: "white",
    value: "#FFFFFF"
  },
  {
    title: "black",
    value: "#000000"
  },
  {
    title: "red",
    value: "#FF0000"
  }
];

function Rules() {
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
    <Container sx={{ px: "0 !important" }}>
      <FormProvider methods={methods} onSubmit={handleBrandSubmit}>
        <Grid container spacing={2} mt={3} mb={5}>
          <Grid item xs={12} md={6}>
            <RHFSelect name="bgColor" label="Form Selection" fullWidth>
              {CBgList.map((item, index) => (
                <MenuItem value={item.title} key={index}>
                  <Typography variant="subtitle2">{item.title}</Typography>
                </MenuItem>
              ))}
            </RHFSelect>
          </Grid>
          <Grid item xs={12} md={6}>
            <RHFSelect name="tbColor" label="Form Selection" fullWidth>
              {CBgList.map((item, index) => (
                <MenuItem value={item.title} key={index}>
                  <Typography variant="subtitle2">{item.title}</Typography>
                </MenuItem>
              ))}
            </RHFSelect>
          </Grid>
          <Grid item xs={12} md={6}>
            <RHFSelect name="hlColor" label="Form Selection" fullWidth>
              {CBgList.map((item, index) => (
                <MenuItem value={item.title} key={index}>
                  <Typography variant="subtitle2">{item.title}</Typography>
                </MenuItem>
              ))}
            </RHFSelect>
          </Grid>
          <Grid item xs={12} md={6}>
            <RHFTextField name="btColor" label="Form Input" fullWidth />
          </Grid>
          <Grid item xs={12} md={6}>
            <RHFTextField name="btColor" label="Form Input" fullWidth />
          </Grid>
          <Grid item xs={12} md={6}>
            <RHFTextField name="btColor" label="Form Input" fullWidth />
          </Grid>
          <Grid item xs={12} md={12}>
            <LoadingButton
              type="submit"
              variant="contained"
              size="medium"
              color="primary"
              fullWidth
              // loading={isSubmitting}
              sx={{ py: 1.5 }}
            >
              Save Changes
            </LoadingButton>
          </Grid>
        </Grid>
      </FormProvider>
    </Container>
  );
}

export default Rules;
