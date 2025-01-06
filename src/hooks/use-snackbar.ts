import { EAlert, ISnackbar, useRootStore } from "src/store/root";

export function useSnackbar() {
  const [snackbarStatus, setSnackbar] = useRootStore((store) => [
    store.snackbar,
    store.setSnackbar
  ]);

  const openSnackbar = ({ alertType, message }: Omit<ISnackbar, "open">) =>
    setSnackbar({ alertType, message, open: true });

  const snackbarError = (message?: string) =>
    openSnackbar({ alertType: EAlert.error, message });
  const snackbarWarnning = (message?: string) =>
    openSnackbar({ alertType: EAlert.warning, message });
  const snackbarInfo = (message?: string) =>
    openSnackbar({ alertType: EAlert.info, message });
  const snackbarSuccess = (message?: string) =>
    openSnackbar({ alertType: EAlert.success, message });
  const snackbarClose = () =>
    setSnackbar({ alertType: snackbarStatus.alertType, open: false });

  return {
    snackbarError,
    snackbarWarnning,
    snackbarInfo,
    snackbarSuccess,
    snackbarClose
  };
}
