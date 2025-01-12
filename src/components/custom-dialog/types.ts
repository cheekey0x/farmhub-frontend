import { DialogProps } from "@mui/material/Dialog";

// ----------------------------------------------------------------------

export type ConfirmDialogProps = Omit<DialogProps, "title" | "content"> & {
  title: React.ReactNode;
  content?: React.ReactNode;
  content2?: React.ReactNode;
  action: React.ReactNode;
  icon?: React.ReactNode;
  onClose: VoidFunction;
};
