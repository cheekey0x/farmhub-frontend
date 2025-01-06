import {
  Stack,
  Button,
  MenuItem,
  TableRow,
  Checkbox,
  useTheme,
  TableCell,
  IconButton,
  Typography
} from "@mui/material/";
import { useBoolean } from "src/hooks/use-boolean";
import { ConfirmDialog } from "src/components/custom-dialog";
import CustomPopover, { usePopover } from "src/components/custom-popover";
import Iconify from "src/components/iconify";

// ----------------------------------------------------------------------

type Props = {
  row: any;
  selected: boolean;
  onViewRow: VoidFunction;
  onSelectRow: VoidFunction;
  onDeleteRow: VoidFunction;
};
export default function InvoiceTableRow({
  row,
  selected,
  onSelectRow,
  onDeleteRow,
  onViewRow
}: Props) {
  // ...................................
  const confirm = useBoolean();
  const popover = usePopover();
  const theme = useTheme();

  const invoiceStatus = (() => {
    switch (row.status) {
      case "Failed":
        return (
          <Stack
            sx={{
              backgroundColor: "#F1B5B5",
              borderRadius: 0.5,
              px: 1,
              py: 0.5
            }}
            alignItems="center"
          >
            <Typography variant="caption" sx={{ color: "#C14A2F" }}>
              Failed
            </Typography>
          </Stack>
        );
      case "Paid":
        return (
          <Stack
            sx={{
              backgroundColor: "#D6F1B5",
              borderRadius: 0.5,
              px: 1,
              py: 0.5
            }}
            alignItems="center"
          >
            <Typography variant="caption" sx={{ color: "#32C12F" }}>
              Paid
            </Typography>
          </Stack>
        );
      case "Pending":
        return (
          <Stack
            sx={{
              backgroundColor: "#F1D5B5",
              borderRadius: 0.5,
              px: 1,
              py: 0.5
            }}
            alignItems="center"
          >
            <Typography variant="caption" sx={{ color: "#C17E2F" }}>
              Pending
            </Typography>
          </Stack>
        );
      default:
        return (
          <Stack
            sx={{
              backgroundColor: "#D6F1B5",
              borderRadius: 0.5,
              px: 1,
              py: 0.5
            }}
            alignItems="center"
          >
            <Typography variant="caption" sx={{ color: "#32C12F" }}>
              Paid
            </Typography>
          </Stack>
        );
    }
  })();

  return (
    <>
      <TableRow selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox
            checked={selected}
            onClick={onSelectRow}
            sx={{
              color: `${theme.palette.background.main}!important`
            }}
          />
        </TableCell>
        <TableCell>
          <Typography variant="body2">Invoice #{row.id}</Typography>
        </TableCell>
        <TableCell>
          <Typography variant="body2">${row.amount}</Typography>
        </TableCell>
        <TableCell>
          <Typography variant="body2">{row.billingDate}</Typography>
        </TableCell>
        <TableCell>
          <Typography variant="body2">{row.plan}</Typography>
        </TableCell>
        <TableCell>
          <Typography variant="body2">{invoiceStatus}</Typography>
        </TableCell>
        <TableCell>
          <IconButton onClick={popover.onOpen}>
            <Iconify icon="bi:cloud-download" />
          </IconButton>
        </TableCell>
        <TableCell align="right">
          <IconButton onClick={popover.onOpen}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>
      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="right-top"
        sx={{ width: 140 }}
      >
        <MenuItem
          onClick={() => {
            confirm.onTrue();
            popover.onClose();
          }}
          sx={{ color: "error.main" }}
        >
          <Iconify icon="solar:trash-bin-trash-bold" />
          Delete
        </MenuItem>
      </CustomPopover>
      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Delete"
        content="Are you sure want to delete?"
        action={
          <Button variant="contained" color="error" onClick={onDeleteRow}>
            Delete
          </Button>
        }
      />
    </>
  );
}
