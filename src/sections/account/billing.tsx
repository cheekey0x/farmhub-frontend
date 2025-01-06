import {
  Grid,
  Stack,
  Button,
  useTheme,
  Container,
  Typography
} from "@mui/material";
import React from "react";
import useModal from "src/hooks/use-modal";
import { ModalType } from "src/types/modal";

function Billing() {
  const modal = useModal();
  const theme = useTheme();

  const handleInviteTeam = () => {
    modal.open(ModalType.PAYMENT_BILLING_HISTORY);
  };

  const handleChangePayment = () => {
    modal.open(ModalType.PAYMENT_METHOD);
  };

  return (
    <Container sx={{ p: "0 !important", my: 4 }}>
      <Stack my={2}>
        <Typography variant="body1">Manage your billing</Typography>
      </Stack>

      <Grid container spacing={2}>
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            gap: 1.5,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-end",
            my: 3
          }}
        >
          <Button
            sx={{ background: theme.palette.background.main, color: "white" }}
            onClick={handleInviteTeam}
          >
            <Typography variant="body2">Show Billing History</Typography>
          </Button>
          <Button
            sx={{ background: theme.palette.background.main, color: "white" }}
            onClick={handleChangePayment}
          >
            <Typography variant="body2">Change Payment</Typography>
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Billing;
