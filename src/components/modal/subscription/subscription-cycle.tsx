import {
  Box,
  Stack,
  Dialog,
  Button,
  useTheme,
  Typography,
  IconButton
} from "@mui/material";
import { useResponsive } from "src/hooks/use-responsive";
import { useRootStore } from "src/store/root";
import { ModalType } from "src/types/modal";
import useModal from "src/hooks/use-modal";
import { Close } from "@mui/icons-material";

export default function SubscriptionCycle() {
  const [openModal, type] = useRootStore((store) => [
    store.modal.open,
    store.modal?.type
  ]);
  const theme = useTheme();
  const isOpen = openModal && type === ModalType.SUBSCRIPITON_CYCLE;
  const modal = useModal();
  const smUp = useResponsive("up", 500);

  const handleSubscriptionPlanModal = () => {
    modal.close(ModalType.SUBSCRIPITON_CYCLE);
  };

  const handleAnnualPlan = () => {
    modal.open(ModalType.PAYMENT_METHOD);
  };

  return (
    <Dialog open={isOpen} onClose={handleSubscriptionPlanModal}>
      <Box
        alignItems="center"
        gap={{ sm: 4, xs: 2 }}
        width={smUp ? 500 : "calc(100vw - 50px)"}
        px={4}
        py={6}
        bgcolor={theme.palette.background.neutral}
      >
        <IconButton
          sx={{ position: "absolute", top: 10, right: 10 }}
          onClick={() => {
            modal.close(ModalType.SUBSCRIPITON_CYCLE);
          }}
        >
          <Close fontSize="large" />
        </IconButton>
        <Stack
          justifyContent="center"
          alignItems="center"
          direction="row"
          gap={2}
        >
          <Typography variant="h5" fontWeight={800}>
            Subscription Cycle
          </Typography>
        </Stack>
        <Stack gap={3} mt={3}>
          <Stack>
            <Stack
              sx={{
                bgcolor: theme.palette.background.main,
                borderTopLeftRadius: 3,
                borderTopRightRadius: 3
              }}
              direction="row"
              alignItems="center"
              justifyContent="center"
              gap={2}
              py={1}
            >
              <Box component="img" src="/logo/logo.svg" width={30} />
              <Typography variant="body1" fontWeight={800}>
                YieldLab
              </Typography>
            </Stack>
            <Stack
              direction="column"
              px="10px"
              py="10px"
              gap={1}
              sx={{ borderBottom: "1px solid #00000040", borderRadius: "5px" }}
            >
              <Typography variant="body2" sx={{ fontWeight: "800" }}>
                Switch Now. Save More.
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: "400" }}>
                Save % on the monthly cost of Yield Lab.
              </Typography>
              <Stack
                sx={{ width: "100%" }}
                direction="column"
                justifyContent="center"
                alignItems="center"
              >
                <Stack
                  direction="column"
                  justifyContent="center"
                  alignItems="center"
                  sx={{
                    border: "1px solid #00000040",
                    borderRadius: "3px",
                    minWidth: "200px"
                  }}
                >
                  <Typography
                    fontWeight={800}
                    variant="body1"
                    width="100%"
                    textAlign="center"
                    color="white"
                    sx={{
                      backgroundColor: theme.palette.background.main,
                      py: 1,
                      borderTopLeftRadius: 3,
                      borderTopRightRadius: 3
                    }}
                  >
                    Save %
                  </Typography>
                  <Stack
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    gap={1}
                  >
                    <Stack
                      direction="column"
                      justifyContent="center"
                      alignItems="center"
                      mt={1}
                    >
                      <Typography variant="body2">Billed Annually</Typography>
                      <Typography variant="body2">$0/Month</Typography>
                    </Stack>
                    <Stack
                      direction="column"
                      justifyContent="center"
                      alignItems="center"
                      mb={1}
                    >
                      <Typography variant="body2">$0 per year</Typography>
                      <Typography variant="body2">Annual Plan</Typography>
                    </Stack>
                  </Stack>
                </Stack>
              </Stack>
              <Typography variant="body2" sx={{ fontWeight: "400" }}>
                Charge to your (default payment type) Change
              </Typography>
              <Button
                fullWidth
                size="large"
                sx={{
                  backgroundColor: theme.palette.background.main,
                  color: theme.palette.text.primary
                }}
                onClick={handleAnnualPlan}
              >
                Switch to Annual Plan Now
              </Button>
              <Typography variant="body2" sx={{ mb: 2 }}>
                By tapping the button, I agree to the Terms and an automatic
                annual charge of $0 plus applicable tax until I cancel. Cancel
                in account prior to any renewal to avoid charges.
              </Typography>
            </Stack>
            <Stack
              sx={{
                mt: 2,
                borderBottom: "1px solid #00000040",
                borderRadius: "5px"
              }}
            >
              <Stack
                direction="row"
                justifyContent="space-between"
                sx={{
                  backgroundColor: theme.palette.background.main,
                  px: 1.5,
                  py: 1.5,
                  borderTopLeftRadius: 3,
                  borderTopRightRadius: 3
                }}
              >
                <Typography
                  variant="body2"
                  sx={{ color: "white" }}
                  fontWeight="800"
                >
                  Supscription Tier
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    color: theme.palette.background.main,
                    px: "3px",
                    py: "3px",
                    borderRadius: "50px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                  fontWeight="800"
                  bgcolor="white"
                >
                  Currently Subscribed
                </Typography>
              </Stack>
              <Stack sx={{ px: 1 }} mb={1}>
                <Typography variant="body2" mt={1}>
                  Billed Monthly
                </Typography>
                <Typography variant="body2">$0/Month</Typography>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Box>
    </Dialog>
  );
}
