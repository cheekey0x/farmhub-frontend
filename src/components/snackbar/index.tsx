import { Alert, Snackbar } from "@mui/material";
import * as React from "react";
import { useSnackbar } from "src/hooks/use-snackbar";
import { useRootStore } from "src/store/root";

export default function SnackbarContainer() {
  const snackbarState = useRootStore((store) => store.snackbar);
  const snackbarAction = useSnackbar();

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway" || reason === undefined) {
      return;
    }
    if (snackbarState.open) snackbarAction.snackbarClose();
  };

  const snackbarOpen = snackbarState.open;
  const snackbarAlertType = snackbarState.alertType;
  return (
    <Snackbar
      open={snackbarOpen}
      autoHideDuration={2000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      sx={{
        "&.MuiSnackbar-root": { top: "50px" }
      }}
    >
      <Alert
        severity={snackbarAlertType}
        sx={{
          width: "100%",
          "& .MuiAlert-message": {
            fontFamily: "KANIT"
          }
        }}
      >
        {snackbarState.message}
      </Alert>
    </Snackbar>
  );
}
