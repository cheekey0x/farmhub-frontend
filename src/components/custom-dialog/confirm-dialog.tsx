import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";

import { ConfirmDialogProps } from "./types";
import { Box, Divider, Stack } from "@mui/material";
import Iconify from "../iconify";
import { useTheme } from "@mui/material";

// ----------------------------------------------------------------------

export default function ConfirmDialog({
  title,
  content,
  content2,
  icon,
  action,
  open,
  onClose,
  ...other
}: ConfirmDialogProps) {
  const theme = useTheme();
  return (
    <Dialog fullWidth maxWidth="xs" open={open} onClose={onClose} {...other}>
      {/* <Stack
        direction="row"
        justifyContent="flex-end"
        p={2}
      >
        <Iconify icon="solar:pen-bold" />
      </Stack> */}
      <DialogTitle
        sx={{
          py: 2,
          pr: 1.5,
          display: "flex",
          alignItems: "center",
          backgroundColor: "error.main",
          color: "#fff",
          fontSize: "14px !important",
          // padding: "12px !important",
          fontWeight: 600
        }}>
        {icon && icon}
        {title}
        <Stack
          justifyContent="center"
          sx={{
            ml: "auto"
          }}>
          <Iconify
            onClick={onClose}
            icon="material-symbols:close-small-outline-rounded"
            sx={{ width: 25, height: 25, color: theme.palette.text.white, cursor: "pointer" }}
          />
        </Stack>
      </DialogTitle>

      {content && (
        <DialogContent
          sx={{
            typography: "body2",
            padding: "18px !important",
            textAlign: "center",
            fontWeight: 500
          }}> {content} </DialogContent>
      )}
      {content2 && (
        <DialogContent sx={{ typography: "body2" }}> {content2} </DialogContent>
      )}

      <Divider variant="fullWidth" sx={{ mx: 1 }} />


      <DialogActions
        sx={{
          p: 2
        }}
      >
        {action}

        <Button variant="outlined" color="inherit" onClick={onClose}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}
