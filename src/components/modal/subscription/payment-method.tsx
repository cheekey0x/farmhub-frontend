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
import CheckIcon from "@mui/icons-material/Check";
import { useState } from "react";

const payment_method = [
  {
    name: "Visa •••• 1234",
    style: "visa",
    value: "0.0% + $0.00 fee | +0% for non- U.S cards"
  },
  {
    name: "Mastercard •••• 1234",
    style: "mastercard",
    value: "0.0% + $0.00 fee | +0% for non- U.S cards"
  },
  { name: "Wallet Name", style: "wallet", value: "Fees typically under $0.01" }
];

export default function PaymentMethod() {
  const [openModal, type] = useRootStore((store) => [
    store.modal.open,
    store.modal?.type
  ]);
  const theme = useTheme();
  const isOpen = openModal && type === ModalType.PAYMENT_METHOD;
  const modal = useModal();
  const smUp = useResponsive("up", 500);

  const handleSubscriptionPlanModal = () => {
    modal.close(ModalType.PAYMENT_METHOD);
  };
  const [selected, setSelected] = useState<string>("");

  return (
    <Dialog open={isOpen} onClose={handleSubscriptionPlanModal}>
      <Box
        alignItems="center"
        gap={{ sm: 4, xs: 2 }}
        width={smUp ? 500 : "calc(100vw - 50px)"}
        minHeight={585}
        px={4}
        py={6}
        bgcolor={theme.palette.background.neutral}
      >
        <IconButton
          sx={{ position: "absolute", top: 10, right: 10 }}
          onClick={() => {
            modal.close(ModalType.PAYMENT_METHOD);
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
            Payment Method
          </Typography>
        </Stack>
        <Stack gap={3} mt={3}>
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            gap={3}
          >
            {payment_method.map((item, idx) => (
              <Button
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  px: 2,
                  py: 2,
                  backgroundColor:
                    selected === item?.style
                      ? theme.palette.background.main
                      : theme.palette.background.light,
                  ":hover": { backgroundColor: theme.palette.background.main },
                  borderRadius: "3px"
                }}
                fullWidth
                key={idx}
                onClick={() => setSelected(item?.style)}
              >
                <Stack sx={{ display: "flex", flexDirection: "column" }}>
                  <Typography
                    variant="body1"
                    fontWeight={800}
                    sx={{
                      textAlign: "start"
                    }}
                  >
                    {item.name}
                  </Typography>
                  <Typography variant="body2" fontWeight={400}>
                    {item.value}
                  </Typography>
                </Stack>
                {selected === item?.style && (
                  <CheckIcon sx={{ color: "white" }} />
                )}
              </Button>
            ))}
            <Button
              sx={{
                border: `1px solid ${theme.palette.text.main}`,
                color: theme.palette.text.main,
                "&:hover": {
                  backgroundColor: "transparent"
                }
              }}
              fullWidth
              size="large"
            >
              Add New Payment Card
            </Button>

            <Button
              sx={{
                border: `1px solid ${theme.palette.text.main}`,
                color: theme.palette.text.main,
                "&:hover": {
                  backgroundColor: "transparent"
                }
              }}
              fullWidth
              size="large"
            >
              Update Payment Method
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Dialog>
  );
}
