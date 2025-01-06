import {
  Box,
  Grid,
  Stack,
  Dialog,
  Button,
  Avatar,
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

export default function AccountManage() {
  const [openModal, type] = useRootStore((store) => [
    store.modal.open,
    store.modal?.type
  ]);
  const isOpen = openModal && type === ModalType.ACCOUNT_MANAGE;
  const modal = useModal();
  const smUp = useResponsive("up", 500);
  const theme = useTheme();

  const handleSubscriptionModal = () => {
    modal.close(ModalType.ACCOUNT_MANAGE);
  };

  const handleDeleteMember = () => {
    modal.open(ModalType.ACCOUNT_TYPE);
  };

  return (
    <Dialog open={isOpen} onClose={handleSubscriptionModal} maxWidth="lg">
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
            modal.close(ModalType.ACCOUNT_MANAGE);
          }}
        >
          <Close fontSize="large" />
        </IconButton>
        <Stack gap={4} mt={3}>
          <Stack gap={2} direction="row" alignItems="center" sx={{ py: 2 }}>
            <Avatar sx={{ width: "24px", height: "24px" }} />
            <Typography variant="body1" fontWeight={400}>
              AdminName@email.com
            </Typography>
          </Stack>
          <Grid container spacing={2}>
            <Grid item xs={1.5}>
              <Image
                alt="project"
                width={40}
                height={40}
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
          <Stack
            direction="row"
            justifyContent="space-between"
            sx={{ borderBottom: "1px solid #EBEBEB" }}
            pb={2}
          >
            <Typography variant="body1" fontWeight={400}>
              Account Type
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
              Administrator
              <KeyboardArrowRightIcon />
            </Typography>
          </Stack>
          <Stack
            direction="row"
            justifyContent="space-between"
            sx={{ borderBottom: "1px solid #EBEBEB" }}
            pb={2}
          >
            <Typography variant="body1" fontWeight={400}>
              Date Added
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
            <Typography variant="body1" fontWeight={400}>
              Last Active
            </Typography>
            <Typography variant="body2" fontWeight={400}>
              MM/DD/YYYY
            </Typography>
          </Stack>
          <Button
            fullWidth
            size="large"
            sx={{
              bgcolor: theme.palette.background.main,
              color: theme.palette.text.primary,
              mt: 13,
              ":focus": {
                bgcolor: theme.palette.background.main,
                color: theme.palette.text.primary
              }
            }}
            onClick={handleDeleteMember}
          >
            Delete Team Member
          </Button>
        </Stack>
      </Box>
    </Dialog>
  );
}
