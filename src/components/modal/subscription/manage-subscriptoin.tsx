import {
  Box,
  Grid,
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
import Image from "src/components/image";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

export default function ManageSubscription() {
  const [openModal, type] = useRootStore((store) => [
    store.modal.open,
    store.modal?.type
  ]);
  const theme = useTheme();
  const isOpen = openModal && type === ModalType.SUBSCRIPITON_MANAGE;
  const modal = useModal();
  const smUp = useResponsive("up", 500);

  const handleSubscriptionModal = () => {
    modal.close(ModalType.SUBSCRIPITON_MANAGE);
  };

  const handleSubscriptionPlan = () => {
    modal.open(ModalType.SUBSCRIPITON_PLAN);
  };

  return (
    <Dialog open={isOpen} onClose={handleSubscriptionModal}>
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
            modal.close(ModalType.SUBSCRIPITON_MANAGE);
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
            Manage Subscription
          </Typography>
        </Stack>
        <Stack gap={3} mt={3}>
          <Grid container spacing={2}>
            <Grid item xs={1.5}>
              <Image
                alt="project"
                width={40}
                height={40}
                style={{
                  borderRadius: ".5rem"
                }}
                src="https://wmsyimages.nyc3.digitaloceanspaces.com/image/6596328a-6e1d-4e88-b37e-372018db7a18"
              />
            </Grid>
            <Grid item xs={10.5}>
              <Stack
                direction={smUp ? "row" : "column"}
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="body1" fontWeight={500}>
                  Project Name
                </Typography>
                <Typography variant="body1" fontWeight={500}>
                  $0.00
                </Typography>
              </Stack>
              <Stack
                direction="row"
                justifyContent="flex-end"
                alignItems="center"
              >
                <Typography variant="body2" fontWeight={300}>
                  Next Billing Period MM/DD
                </Typography>
              </Stack>
            </Grid>
          </Grid>
          <Typography variant="body2" fontWeight={800}>
            Subscription Summary
          </Typography>
          <Stack
            direction="row"
            justifyContent="space-between"
            sx={{ borderBottom: "1px solid #EBEBEB" }}
            pb={2}
          >
            <Typography variant="body2" fontWeight={400}>
              Status
            </Typography>
            <Typography
              variant="body2"
              sx={{
                pl: 1,
                position: "relative",
                display: "flex",
                alignItems: "center",
                gap: 1
              }}
            >
              <Box
                component="span"
                sx={{
                  borderRadius: "100%",
                  width: 10,
                  height: 10,
                  bgcolor: "#81CD21"
                }}
              />
              Active
            </Typography>
          </Stack>
          <Stack
            direction="row"
            justifyContent="space-between"
            sx={{ borderBottom: "1px solid #EBEBEB" }}
            pb={2}
          >
            <Typography variant="body2" fontWeight={400}>
              Subscription Plan
            </Typography>
            <Typography
              variant="body2"
              fontWeight={400}
              sx={{
                display: "flex",
                alignItems: "center",
                color: theme.palette.text.main
              }}
            >
              Subscription Tier
              <KeyboardArrowRightIcon />
            </Typography>
          </Stack>
          <Stack
            direction="row"
            justifyContent="space-between"
            sx={{ borderBottom: "1px solid #EBEBEB" }}
            pb={2}
          >
            <Typography variant="body2" fontWeight={400}>
              Enrolled
            </Typography>
            <Typography variant="body2" fontWeight={400}>
              MM/DD/YYYY
            </Typography>
          </Stack>
          <Stack
            direction="row"
            justifyContent="space-between"
            sx={{ borderBottom: "1px solid #EBEBEB" }}
            pb={2}
          >
            <Typography variant="body2" fontWeight={400}>
              Cycle
            </Typography>
            <Typography
              variant="body2"
              fontWeight={400}
              sx={{
                display: "flex",
                alignItems: "center",
                color: theme.palette.text.main
              }}
            >
              Monthly
              <KeyboardArrowRightIcon />
            </Typography>
          </Stack>

          <Stack
            direction="row"
            justifyContent="space-between"
            sx={{ borderBottom: "1px solid #EBEBEB" }}
            pb={2}
          >
            <Typography variant="body2" fontWeight={400}>
              Payment Type
            </Typography>
            <Typography
              variant="body2"
              fontWeight={400}
              sx={{
                display: "flex",
                alignItems: "center",
                color: theme.palette.text.main
              }}
            >
              Card (Visa 1234)
              <KeyboardArrowRightIcon />
            </Typography>
          </Stack>
          <Stack
            direction="row"
            justifyContent="space-between"
            sx={{ borderBottom: "1px solid #EBEBEB" }}
            pb={2}
          >
            <Typography variant="body2" fontWeight={400}>
              Billing history
            </Typography>
            <KeyboardArrowRightIcon
              sx={{
                color: theme.palette.text.main
              }}
            />
          </Stack>
          <Button
            fullWidth
            size="large"
            sx={{
              bgcolor: theme.palette.background.main,
              color: theme.palette.text.primary,
              ":focus": {
                bgcolor: theme.palette.background.main,
                color: theme.palette.text.primary
              }
            }}
            onClick={handleSubscriptionPlan}
          >
            Pause or Cancel Plan
          </Button>
        </Stack>
      </Box>
    </Dialog>
  );
}
