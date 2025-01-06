import {
  Box,
  Grid,
  Stack,
  Dialog,
  useTheme,
  Typography,
  IconButton
} from "@mui/material";
import { useRootStore } from "src/store/root";
import { ModalType } from "src/types/modal";
import useModal from "src/hooks/use-modal";
import { Close } from "@mui/icons-material";
import UpgradePlan from "./upgrade-plan";
import SubscriptionContinue from "./cancel-plan";

export default function SubscriptionPlan() {
  const [openModal, type] = useRootStore((store) => [
    store.modal.open,
    store.modal?.type
  ]);
  const isOpen = openModal && type === ModalType.SUBSCRIPITON_PLAN;
  const modal = useModal();
  const handleSubscriptionPlanModal = () => {
    modal.close(ModalType.SUBSCRIPITON_PLAN);
  };
  const theme = useTheme();
  return (
    <Dialog
      open={isOpen}
      onClose={handleSubscriptionPlanModal}
      maxWidth="md"
      fullWidth
    >
      <Box
        alignItems="center"
        gap={{ sm: 4, xs: 2 }}
        minHeight={571}
        px={4}
        py={6}
        bgcolor={theme.palette.background.neutral}
      >
        <IconButton
          sx={{ position: "absolute", top: 10, right: 10 }}
          onClick={() => {
            modal.close(ModalType.SUBSCRIPITON_PLAN);
          }}
        >
          <Close fontSize="large" />
        </IconButton>
        <Stack
          justifyContent="center"
          alignItems="center"
          direction="row"
          width="100%"
          gap={2}
        >
          <Typography variant="h5" fontWeight={800} mb={2}>
            Subscription Plans
          </Typography>
        </Stack>
        <Grid container spacing={2} alignContent="stretch" flexWrap="wrap">
          <Grid
            item
            lg={4}
            md={4}
            sm={4}
            xs={12}
            sx={{ borderRadius: "12px" }}
            alignContent="stretch"
          >
            <SubscriptionContinue />
          </Grid>
          <Grid item lg={4} md={4} sm={4} xs={12} alignContent="stretch">
            <UpgradePlan />
          </Grid>
          <Grid item lg={4} md={4} sm={4} xs={12} alignContent="stretch">
            <UpgradePlan />
          </Grid>
        </Grid>
      </Box>
    </Dialog>
  );
}
