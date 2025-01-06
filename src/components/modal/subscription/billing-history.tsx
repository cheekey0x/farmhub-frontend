import {
  Box,
  Stack,
  Dialog,
  useTheme,
  Typography,
  IconButton
} from "@mui/material";
import { useResponsive } from "src/hooks/use-responsive";
import { useRootStore } from "src/store/root";
import { ModalType } from "src/types/modal";
import useModal from "src/hooks/use-modal";
import { Close } from "@mui/icons-material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

export default function PaymentBillingHistory() {
  const [openModal, type] = useRootStore((store) => [
    store.modal.open,
    store.modal?.type
  ]);
  const isOpen = openModal && type === ModalType.PAYMENT_BILLING_HISTORY;
  const modal = useModal();
  const smUp = useResponsive("up", 500);
  const handleSubscriptionPlanModal = () => {
    console.log("modalClose");
  };
  const theme = useTheme();
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
            modal.close(ModalType.PAYMENT_BILLING_HISTORY);
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
            Billing History
          </Typography>
        </Stack>
        <Stack gap={3} mt={3}>
          <Stack direction="column" justifyContent="center" gap={3}>
            <Typography variant="body2" fontWeight={800} textAlign="start">
              Month YYYY
            </Typography>
            <Stack
              gap={2}
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{
                border: "1px solid #212b361a",
                px: 2,
                py: 2,
                borderRadius: "3px"
              }}
            >
              <Typography variant="body2" fontWeight={400}>
                Transaction Name/ID
              </Typography>
              <KeyboardArrowRightIcon />
            </Stack>
            <Stack
              gap={2}
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{
                border: "1px solid #212b361a",
                px: 2,
                py: 2,
                borderRadius: "3px"
              }}
            >
              <Typography variant="body2" fontWeight={400}>
                Transaction Name/ID
              </Typography>
              <KeyboardArrowRightIcon />
            </Stack>
            <Stack
              gap={2}
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{
                border: "1px solid #212b361a",
                px: 2,
                py: 2,
                borderRadius: "3px"
              }}
            >
              <Typography variant="body2" fontWeight={400}>
                Transaction Name/ID
              </Typography>
              <KeyboardArrowRightIcon />
            </Stack>
            <Stack
              gap={2}
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{
                border: "1px solid #212b361a",
                px: 2,
                py: 2,
                borderRadius: "3px"
              }}
            >
              <Typography variant="body2" fontWeight={400}>
                Transaction Name/ID
              </Typography>
              <KeyboardArrowRightIcon />
            </Stack>

            <Typography variant="body2" fontWeight={800} textAlign="start">
              Month YYYY
            </Typography>
            <Stack
              gap={2}
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{
                border: "1px solid #212b361a",
                px: 2,
                py: 2,
                borderRadius: "3px"
              }}
            >
              <Typography variant="body2" fontWeight={400}>
                Transaction Name/ID
              </Typography>
              <KeyboardArrowRightIcon />
            </Stack>
            <Stack
              gap={2}
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{
                border: "1px solid #212b361a",
                px: 2,
                py: 2,
                borderRadius: "3px"
              }}
            >
              <Typography variant="body2" fontWeight={400}>
                Transaction Name/ID
              </Typography>
              <KeyboardArrowRightIcon />
            </Stack>
            <Stack
              gap={2}
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{
                border: "1px solid #212b361a",
                px: 2,
                py: 2,
                borderRadius: "3px"
              }}
            >
              <Typography variant="body2" fontWeight={400}>
                Transaction Name/ID
              </Typography>
              <KeyboardArrowRightIcon />
            </Stack>
          </Stack>
        </Stack>
      </Box>
    </Dialog>
  );
}
