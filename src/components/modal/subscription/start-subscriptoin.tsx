import {
  Box,
  Link,
  Stack,
  Radio,
  Dialog,
  Button,
  Avatar,
  Divider,
  useTheme,
  TextField,
  Typography,
  IconButton
} from "@mui/material";
import Image from "src/components/image";
import { useResponsive } from "src/hooks/use-responsive";
import { useRootStore } from "src/store/root";
import { ModalType } from "src/types/modal";
import useModal from "src/hooks/use-modal";
import { Close } from "@mui/icons-material";
import EmailIcon from "@mui/icons-material/Email";
import {
  EPaymentType,
  ESubscriptionPayPeriod,
  CSubscriptionPlanDetails
} from "src/constant/project";
import { usePersistStore } from "src/store/persist";
import { truncateAddress } from "src/utils/truncate";
import { useState } from "react";
import Iconify from "src/components/iconify";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { useSnackbar } from "src/hooks/use-snackbar";
import { paymentApiService } from "src/utils/service";
import { LoadingButton } from "@mui/lab";

export default function StartSubscription() {
  const [acitvePeriod, setActivePeriod] = useState<ESubscriptionPayPeriod>(
    ESubscriptionPayPeriod.MONTHLY
  );
  const [acitvePaymentType, setActivePaymentType] = useState<EPaymentType>(
    EPaymentType.WALLET
  );
  const [discountCode, setDiscountCode] = useState("");
  const [openModal, type] = useRootStore((store) => [
    store.modal.open,
    store.modal?.type
  ]);
  const [loading, setLoading] = useState({
    subscribe: false
  });
  const theme = useTheme();
  const isOpen = openModal && type === ModalType.SUBSCRIPITON_START;
  const modal = useModal();
  const smUp = useResponsive("up", 500);
  const router = useRouter();
  const snackbar = useSnackbar();
  const userData = usePersistStore((store) => store.app.user);
  const subscribedData = useRootStore((store) => store.subscribe);
  const { query } = router;

  const handleOpenAddCardModal = () => {
    handleCloseSubscriptionModal();
    modal.open(ModalType.ADD_PAYMENT_CARD);
  };

  const handleCloseSubscriptionModal = () => {
    modal.close(ModalType.SUBSCRIPITON_START);
  };

  const handlePayment = async () => {
    try {
      setLoading((prev) => ({ ...prev, subscribe: true }));
      if (!query?.projectId) {
        snackbar.snackbarError("Project ID is required");
        handleCloseSubscriptionModal();
        return;
      }
      if (acitvePaymentType === EPaymentType.CARD) {
        const subscribePayload = {
          subscribeType: subscribedData.type,
          period: acitvePeriod,
          paymentType: acitvePaymentType,
          pmId: userData?.stripeCard?.pmId,
          discountCode,
          projectId: query.projectId as string
        };

        const subscribeRes =
          await paymentApiService.createSubscribeByProject(subscribePayload);
        console.log({ subscribeRes });
        snackbar.snackbarSuccess(
          `Subscription success with ${userData?.stripeCard?.brand} card`
        );
        handleCloseSubscriptionModal();
        router.push({
          query: {
            type: "list"
          }
        });
      }
    } catch (error) {
      console.error(error);
      snackbar.snackbarError("Subscription Failed");
    } finally {
      setLoading((prev) => ({ ...prev, subscribe: false }));
    }
  };

  return (
    <Dialog open={isOpen} onClose={handleCloseSubscriptionModal}>
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
        <Stack justifyContent="start" alignItems="start" direction="row" pb={2}>
          <Typography variant="h6" fontWeight={800}>
            Start Subscription
          </Typography>
        </Stack>
        <Stack gap={1} mt={2}>
          <Stack
            flexDirection="row"
            gap={2}
            justifyContent="space-between"
            alignItems="center"
          >
            <Stack
              flexDirection="row"
              gap={2}
              justifyContent="center"
              alignItems="center"
            >
              <Avatar
                sx={{
                  width: 25,
                  height: 25,
                  bgcolor: "#5957C5"
                }}
              />
              <Typography variant="body2">
                {userData?.name ?? truncateAddress(userData?.wallet?.[0] ?? "")}
              </Typography>
            </Stack>
            <Stack
              flexDirection="row"
              gap={2}
              justifyContent="center"
              alignItems="center"
            >
              <EmailIcon
                sx={{
                  color: "#5957C5"
                }}
              />
              <Typography variant="body2">
                {userData?.userEmail ?? ""}
              </Typography>
            </Stack>
          </Stack>
          <Stack
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Stack
              flexDirection="row"
              justifyContent="center"
              alignItems="center"
            >
              <Image
                src={`assets/images/account/${subscribedData.type ?? "hobbyist"}.png`}
                alt="subscription-2"
                height={25}
              />
              <Typography variant="body2" textTransform="capitalize">
                {subscribedData.type ?? "hobbyist"}
              </Typography>
            </Stack>
            <Stack>
              <Typography variant="body2">
                $
                {
                  CSubscriptionPlanDetails.find(
                    (item) => item.title === subscribedData.type
                  )?.[acitvePeriod]
                }{" "}
                /
                {acitvePeriod === ESubscriptionPayPeriod.MONTHLY
                  ? "month"
                  : "year"}
              </Typography>
            </Stack>
            <Stack flexDirection="row">
              {Object.values(ESubscriptionPayPeriod).map((item, index) => (
                <Button
                  key={index}
                  onClick={() => setActivePeriod(item)}
                  sx={{
                    bgcolor:
                      acitvePeriod === item
                        ? theme.palette.background.light
                        : "transparent"
                  }}
                >
                  <Typography variant="body2" textTransform="capitalize">
                    {item}
                  </Typography>
                </Button>
              ))}
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
              <Typography variant="body1" fontWeight={800}>
                Billing/Payment
              </Typography>
            </Stack>
            {userData?.stripeCard?.last4 && (
              <Button
                sx={{
                  boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.25)",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  p: 2,
                  bgcolor:
                    acitvePaymentType === EPaymentType.CARD
                      ? theme.palette.background.light
                      : "transparent"
                }}
                onClick={() => setActivePaymentType(EPaymentType.CARD)}
              >
                <Stack flexDirection="row" alignItems="center" gap={2}>
                  <Stack>
                    <Radio checked={acitvePaymentType === EPaymentType.CARD} />
                  </Stack>
                  <Stack
                    flexDirection="column"
                    justifyContent="start"
                    alignItems="center"
                  >
                    <Typography variant="body2">
                      **** **** **** {userData?.stripeCard?.last4}
                    </Typography>
                    <Stack direction="row" alignItems="center">
                      <Typography variant="body2">
                        {userData?.stripeCard?.brand} Card
                      </Typography>
                      <Link ml={3} onClick={handleOpenAddCardModal}>
                        Update
                      </Link>
                    </Stack>
                  </Stack>
                </Stack>
                <Iconify icon="mingcute:bank-card-fill" width={40} />
              </Button>
            )}

            <Button
              sx={{
                boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.25)",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                py: 2,
                bgcolor:
                  acitvePaymentType === EPaymentType.WALLET
                    ? theme.palette.background.light
                    : "transparent"
              }}
              onClick={() => setActivePaymentType(EPaymentType.WALLET)}
            >
              <Stack flexDirection="row" alignItems="center" gap={2}>
                <Stack>
                  <Radio checked={acitvePaymentType === EPaymentType.WALLET} />
                </Stack>
                <Stack
                  flexDirection="column"
                  justifyContent="start"
                  alignItems="center"
                >
                  <Typography variant="body2">
                    {truncateAddress(userData?.wallet?.[0] ?? "")}
                  </Typography>
                  <Stack direction="row" alignItems="center">
                    <Typography variant="body2">Wallet</Typography>
                  </Stack>
                </Stack>
              </Stack>
              <Iconify icon="mingcute:wallet-fill" width={40} />
            </Button>
            {!userData?.stripeCard?.last4 && (
              <Button
                sx={{
                  background: "#5957C5",
                  color: "white",
                  width: "100%",
                  py: 1
                }}
                onClick={handleOpenAddCardModal}
              >
                Add New Card
              </Button>
            )}
            <Divider />
            <Stack
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="body2">Discount Code</Typography>
              <Stack flexDirection="row" justifyContent="center" gap={2}>
                <TextField
                  placeholder="Please enter discount code"
                  variant="outlined"
                  size="small"
                  value={discountCode}
                  onChange={(e) => setDiscountCode(e.target.value)}
                />
                <Button
                  sx={{
                    background: "#5957C5",
                    color: "white",
                    py: 1
                  }}
                >
                  <Typography variant="body2">Apply</Typography>
                </Button>
              </Stack>
            </Stack>
            <Stack
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="body2">Business Plan</Typography>
              <Typography variant="body2">
                $
                {
                  CSubscriptionPlanDetails.find(
                    (item) => item.title === subscribedData.type
                  )?.[acitvePeriod]
                }
              </Typography>
            </Stack>
            <Stack
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="body2">Tax</Typography>
              <Typography variant="body2">$0.00</Typography>
            </Stack>
            <Stack
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="body2">Total</Typography>
              <Typography variant="body2">
                $
                {
                  CSubscriptionPlanDetails.find(
                    (item) => item.title === subscribedData.type
                  )?.[acitvePeriod]
                }
              </Typography>
            </Stack>
            <Typography variant="caption" maxWidth={270}>
              Next payment will be charged on{" "}
              <Typography variant="caption" color="#5957C5">
                {dayjs(new Date())
                  .add(
                    acitvePeriod === ESubscriptionPayPeriod.YEARLY ? 1 : 0,
                    "year"
                  )
                  .add(
                    acitvePeriod === ESubscriptionPayPeriod.MONTHLY ? 1 : 0,
                    "month"
                  )
                  .format("MM/DD/YYYY")}
              </Typography>{" "}
            </Typography>
            <LoadingButton
              fullWidth
              loading={loading?.subscribe}
              sx={{
                background: "#5957C5",
                color: "white",
                py: 1
              }}
              onClick={handlePayment}
            >
              Pay Now
            </LoadingButton>
          </Stack>
        </Stack>
      </Box>
    </Dialog>
  );
}
