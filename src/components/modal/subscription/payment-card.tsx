import {
  Grid,
  Stack,
  Dialog,
  useTheme,
  Typography,
  IconButton,
  InputAdornment
} from "@mui/material";
import { useResponsive } from "src/hooks/use-responsive";
import { useRootStore } from "src/store/root";
import { ModalType } from "src/types/modal";
import useModal from "src/hooks/use-modal";
import {
  Close,
  CreditCard,
  Visibility,
  VisibilityOff
} from "@mui/icons-material";
import { useState, forwardRef } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FormProvider, { RHFTextField } from "src/components/hook-form";
import { useSnackbar } from "src/hooks/use-snackbar";
import { LoadingButton } from "@mui/lab";
import { IMaskInput } from "react-imask";
import { StripeAPIService } from "src/utils/service/api/stripe.api";
import { userApiService } from "src/utils/service";
import { usePersistStore } from "src/store/persist";

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

// eslint-disable-next-line react/display-name
const CardNumberMaskCustom = forwardRef<HTMLInputElement, CustomProps>(
  (props, ref) => {
    const { onChange, ...other } = props;
    return (
      <IMaskInput
        {...other}
        mask="#000 0000 0000 0000"
        definitions={{
          "#": /[1-9]/
        }}
        inputRef={ref}
        onAccept={(value: any) =>
          onChange({ target: { name: props.name, value } })
        }
        overwrite
      />
    );
  }
);

// eslint-disable-next-line react/display-name
const ExpireDateMaskCustom = forwardRef<HTMLInputElement, CustomProps>(
  (props, ref) => {
    const { onChange, ...other } = props;
    return (
      <IMaskInput
        {...other}
        mask="#0/00"
        definitions={{
          "#": /[0-9]/
        }}
        inputRef={ref}
        onAccept={(value: any) =>
          onChange({ target: { name: props.name, value } })
        }
        overwrite
      />
    );
  }
);

// eslint-disable-next-line react/display-name
const CVCMaskCustom = forwardRef<HTMLInputElement, CustomProps>(
  (props, ref) => {
    const { onChange, ...other } = props;
    return (
      <IMaskInput
        {...other}
        mask="#000"
        definitions={{
          "#": /[1-9]/
        }}
        inputRef={ref}
        onAccept={(value: any) =>
          onChange({ target: { name: props.name, value } })
        }
        overwrite
      />
    );
  }
);

export default function AddPaymentCard() {
  const [openModal, type] = useRootStore((store) => [
    store.modal.open,
    store.modal?.type
  ]);
  const { setUser: setUserData } = usePersistStore((store) => ({
    setUser: store.actions.setUser
  }));
  const theme = useTheme();
  const isOpen = openModal && type === ModalType.ADD_PAYMENT_CARD;
  const modal = useModal();
  const smUp = useResponsive("up", 500);
  const snackbar = useSnackbar();
  const [showCvc, setShowCvc] = useState(false);

  const handleCloseAddCardModal = () => {
    modal.close(ModalType.ADD_PAYMENT_CARD);
  };

  // Config signup yup schema and useForm
  const AddCardSchema = Yup.object().shape({
    cardNumber: Yup.string().required("Card Number is required"),
    expireDate: Yup.string().required("Expire Date is required"),
    cvc: Yup.string()
      .required("CVC is required")
      .min(3, "CVC must be at least 3 numbers"),
    cardholder: Yup.string()
      .required("Cardholder is required")
      .min(2, "Cardholder must be at least 2 characters")
  });
  const defaultValues = {
    cardNumber: "",
    expireDate: "",
    cvc: "",
    cardholder: ""
  };
  const methods = useForm({
    resolver: yupResolver(AddCardSchema),
    defaultValues
  });

  const { reset, handleSubmit, setError } = methods;

  const handleAddNewCard = handleSubmit(async (data, event) => {
    event?.preventDefault();
    try {
      const paymentSettingRes =
        await new StripeAPIService().createPaymentMethod(
          process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!,
          {
            number: data.cardNumber.split(" ").join(""),
            cvc: data.cvc,
            exp_month: data.expireDate.split("/")[0],
            exp_year: data.expireDate.split("/")[1]
          }
        );
      const updateUser = await userApiService.updateUserInfo({
        stripeCard: {
          holder: data.cardholder,
          pmId: paymentSettingRes?.data?.id,
          brand: paymentSettingRes?.data?.card?.brand,
          exp_month: paymentSettingRes?.data?.card?.exp_month,
          exp_year: paymentSettingRes?.data?.card?.exp_year,
          last4: paymentSettingRes?.data?.card?.last4
        }
      });
      if (updateUser?._id) {
        setUserData(updateUser);
        snackbar.snackbarSuccess("Card added successfully");
      }
      handleCloseAddCardModal();
      reset();
    } catch (error) {
      console.error(error);
      if (error?.response?.data?.error?.param === "number") {
        setError("cardNumber", {
          message:
            error?.response?.data?.error?.message ?? "Invalid Card Number"
        });
      } else if (error?.response?.data?.error?.param?.includes("exp")) {
        setError("expireDate", {
          message:
            error?.response?.data?.error?.message ?? "Invalid Expire Date"
        });
      } else if (error?.response?.data?.error?.param?.indexOf("cvc") > -1) {
        setError("cvc", {
          message: error?.response?.data?.error?.message ?? "Invalid CVC"
        });
      }
      snackbar.snackbarError("Something went wrong");
    }
  });

  return (
    <Dialog open={isOpen} onClose={handleCloseAddCardModal}>
      <FormProvider methods={methods} onSubmit={handleAddNewCard}>
        <Stack
          alignItems="center"
          gap={{ sm: 4, xs: 2 }}
          width={smUp ? 500 : "calc(100vw - 50px)"}
          minHeight={585}
          px={4}
          py={6}
          bgcolor={theme.palette.background.neutral}
          sx={{
            display: "flex",
            flexDirection: "column"
          }}
        >
          <IconButton
            sx={{ position: "absolute", top: 10, right: 10 }}
            onClick={() => {
              modal.close(ModalType.ADD_PAYMENT_CARD);
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
              Add Card
            </Typography>
          </Stack>
          <Stack width="100%" justifyContent="space-between" flex={1}>
            <Stack gap={1} flex={1} justifyContent="space-evenly">
              <Stack>
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <Typography variant="body2">Card Number</Typography>
                    <RHFTextField
                      name="cardNumber"
                      placeholder="1234 1234 1234 1234"
                      fullWidth
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="start">
                            <CreditCard />
                          </InputAdornment>
                        ),
                        inputComponent: CardNumberMaskCustom as any
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2">Expiration Date</Typography>
                    <RHFTextField
                      name="expireDate"
                      placeholder="MM / YY"
                      fullWidth
                      type="text"
                      InputProps={{
                        inputComponent: ExpireDateMaskCustom as any
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2">CVV/CVC</Typography>
                    <RHFTextField
                      name="cvc"
                      placeholder="****"
                      type={showCvc ? "text" : "password"}
                      fullWidth
                      InputProps={{
                        inputComponent: CVCMaskCustom as any,
                        endAdornment: (
                          <InputAdornment position="start">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={() => setShowCvc((prev) => !prev)}
                              edge="end"
                            >
                              {showCvc ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        )
                      }}
                    />
                  </Grid>
                </Grid>
              </Stack>
              <Stack>
                <Typography variant="body2">Cardholder name</Typography>
                <RHFTextField
                  name="cardholder"
                  placeholder="Full name on card"
                  fullWidth
                  type="text"
                />
              </Stack>
            </Stack>
            <Stack>
              <LoadingButton
                size="small"
                type="submit"
                sx={{
                  px: 3,
                  color: "white",
                  background: theme.palette.background.main,
                  "&:hover": {
                    background: theme.palette.background.main
                  }
                }}
              >
                Add New Card
              </LoadingButton>
            </Stack>
          </Stack>
        </Stack>
      </FormProvider>
    </Dialog>
  );
}
