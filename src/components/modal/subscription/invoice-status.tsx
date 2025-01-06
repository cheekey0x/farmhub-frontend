import {
  Box,
  Stack,
  Dialog,
  Button,
  Divider,
  useTheme,
  Typography,
  IconButton
} from "@mui/material";
import Image from "src/components/image";
import { useResponsive } from "src/hooks/use-responsive";
import { useRootStore } from "src/store/root";
import { ModalType } from "src/types/modal";
import useModal from "src/hooks/use-modal";
import { Close } from "@mui/icons-material";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";

export default function InvoiceStatus() {
  const [openModal, type] = useRootStore((store) => [
    store.modal.open,
    store.modal?.type
  ]);
  const theme = useTheme();
  const isOpen = openModal && type === ModalType.INVOICE_STATUS;
  const modal = useModal();
  const smUp = useResponsive("up", 500);

  const handleInvoiceModal = () => {
    modal.close(ModalType.INVOICE_STATUS);
  };

  return (
    <Dialog open={isOpen} onClose={handleInvoiceModal}>
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
            modal.close(ModalType.SUBSCRIPITON_START);
          }}
        >
          <Close fontSize="large" />
        </IconButton>
        <Stack
          justifyContent="space-between"
          alignItems="start"
          direction="row"
          gap={2}
        >
          <Typography variant="h6" fontWeight={800}>
            Invoice #0000
          </Typography>
          <Stack bgcolor="#D6F1B5" py={0.5} px={2} borderRadius={1}>
            <Typography color="#32C12F">Paid</Typography>
          </Stack>
        </Stack>
        <Stack gap={2} mt={2}>
          <Stack
            flexDirection="row"
            gap={2}
            justifyContent="start"
            alignItems="center"
            bgcolor="#D6F1B5"
            borderRadius={1}
            p={1.5}
          >
            <TaskAltIcon
              sx={{
                color: "#32C12F"
              }}
            />
            <Typography>Invoice paid on Month DD, YYYY</Typography>
          </Stack>
          <Stack
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Stack flexDirection="column">
              <Typography color="#ABABAB">Issued On</Typography>
              <Typography>Month DD, YYYY</Typography>
            </Stack>
            <Stack flexDirection="column">
              <Typography color="#ABABAB">Due On</Typography>
              <Typography>Month DD, YYYY</Typography>
            </Stack>
          </Stack>
          <Stack
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Stack flexDirection="column">
              <Typography color="#ABABAB">Billed By</Typography>
              <Typography>
                Yield Lab LLC <br />
                123 Street Name St
                <br />
                City, ST 01234
              </Typography>
            </Stack>
            <Stack flexDirection="column">
              <Typography color="#ABABAB">Billed To</Typography>
              <Typography>
                First Last <br />
                123 Street Name St <br />
                City, ST 01234
              </Typography>
            </Stack>
          </Stack>
          <Typography color="#ABABAB">Plan</Typography>
          <Stack
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Stack flexDirection="row">
              <Image
                src="assets/images/account/business.png"
                alt="subscription-2"
                width={25}
                height={25}
              />
              <Typography>Business</Typography>
            </Stack>
            <Stack>
              <Typography>$69 USD /year</Typography>
            </Stack>
          </Stack>
          <Divider />
          <Stack gap={2}>
            <Stack
              justifyContent="start"
              alignItems="start"
              direction="row"
              gap={2}
            >
              <Typography variant="subtitle1" fontWeight={800}>
                Invoice Details
              </Typography>
            </Stack>
            <Stack
              sx={{
                border: "1px solid #F5F5F5",
                p: 2
              }}
            >
              <Stack
                flexDirection="row"
                py={1}
                px={0.5}
                bgcolor="#D9D9D9"
                borderRadius={1}
                sx={{
                  width: "100%"
                }}
              >
                <Stack
                  sx={{
                    width: "40%"
                  }}
                >
                  <Typography>Description</Typography>
                </Stack>
                <Stack
                  sx={{
                    width: "10%"
                  }}
                >
                  <Typography>Amount</Typography>
                </Stack>
                <Stack sx={{ width: "10%" }}>
                  <Typography>Seats</Typography>
                </Stack>
                <Stack sx={{ width: "10%" }}>
                  <Typography>Total</Typography>
                </Stack>
              </Stack>
              <Stack />
            </Stack>
            <Stack flexDirection="row" alignItems="center" gap={2}>
              <Button
                sx={{
                  background: "#5957C5",
                  color: "white",
                  width: "100%",
                  py: 1
                }}
              >
                Print
              </Button>
              <Button
                sx={{
                  background: "#5957C5",
                  color: "white",
                  width: "100%",
                  py: 1,
                  gap: 2
                }}
              >
                <CloudDownloadIcon
                  sx={{
                    color: "white"
                  }}
                />
                Download
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Box>
    </Dialog>
  );
}
