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
    name: "Administrator",
    role: "admin",
    description:
      "Admins can add/remove users and manage organization-level settings."
  },
  {
    name: "Account User",
    role: "user",
    description:
      "Account users can access and review restricted organization-level settings."
  }
];

export default function AccountType() {
  const [openModal, type] = useRootStore((store) => [
    store.modal.open,
    store.modal?.type
  ]);
  const isOpen = openModal && type === ModalType.ACCOUNT_TYPE;
  const modal = useModal();
  const smUp = useResponsive("up", 500);
  const handleSubscriptionPlanModal = () => {
    console.log("modalClose");
  };
  const [selected, setSelected] = useState<string>("admin");
  const theme = useTheme();

  return (
    <Dialog open={isOpen} onClose={handleSubscriptionPlanModal}>
      <Box
        alignItems="center"
        gap={{ sm: 4, xs: 2 }}
        width={smUp ? 500 : "calc(100vw - 50px)"}
        minHeight={600}
        px={4}
        py={6}
        bgcolor={theme.palette.background.neutral}
      >
        <IconButton
          sx={{ position: "absolute", top: 10, right: 10 }}
          onClick={() => {
            modal.close(ModalType.ACCOUNT_TYPE);
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
                    selected === item?.role
                      ? theme.palette.background.main
                      : "white",
                  ":hover": { backgroundColor: theme.palette.background.main },
                  borderRadius: "3px"
                }}
                fullWidth
                key={idx}
                onClick={() => setSelected(item?.role)}
              >
                <Stack sx={{ display: "flex", flexDirection: "column" }}>
                  <Typography
                    variant="body1"
                    fontWeight={800}
                    sx={{
                      color: selected === item?.role ? "white" : "black",
                      textAlign: "start"
                    }}
                  >
                    {item.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: selected === item?.role ? "white" : "black",
                      textAlign: "start"
                    }}
                    fontWeight={400}
                  >
                    {item.description}
                  </Typography>
                </Stack>
                {selected === item?.role && (
                  <CheckIcon sx={{ color: "white" }} />
                )}
              </Button>
            ))}
          </Stack>
        </Stack>
      </Box>
    </Dialog>
  );
}
