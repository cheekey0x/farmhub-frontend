import {
  Link,
  Stack,
  Button,
  Avatar,
  MenuItem,
  TableRow,
  Checkbox,
  useTheme,
  TableCell,
  IconButton,
  Typography,
  ListItemText
} from "@mui/material/";
import { useBoolean } from "src/hooks/use-boolean";
import { ConfirmDialog } from "src/components/custom-dialog";
import CustomPopover, { usePopover } from "src/components/custom-popover";
import Iconify from "src/components/iconify";
import { truncateAddress } from "src/utils/truncate";

// ----------------------------------------------------------------------

type Props = {
  row: any;
  selected: boolean;
  onViewRow: VoidFunction;
  onSelectRow: VoidFunction;
  onDeleteRow: VoidFunction;
};
export default function DelegatorTableRow({
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

  const stakeStatus = (() => {
    switch (row.stakeStatus) {
      case "Not Active":
        return "#D93F3F";
      case "Active":
        return "#81CD21";
      case "Pending":
        return "#EAD627";
      default:
        return "#EAD627";
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
          <Typography variant="body2">{row.startDate}</Typography>
        </TableCell>
        <TableCell>
          <Stack direction="row" alignItems="center">
            <Avatar
              variant="rounded"
              sx={{
                width: 40,
                height: 40,
                mr: 2,
                bgcolor: theme.palette.background.main
              }}
              alt={`${row.walletAddress}`}
            >{`${row.walletAddress.split("")[5]}${
              row.walletAddress.split("")[7]
            }`}</Avatar>
            <ListItemText
              primary={
                <Link
                  noWrap
                  color="inherit"
                  variant="body1"
                  onClick={onViewRow}
                  sx={{ cursor: "pointer" }}
                >
                  {truncateAddress(row.walletAddress)}
                </Link>
              }
            />
          </Stack>
        </TableCell>
        <TableCell>
          <Typography variant="body2">{row.adaHandle}</Typography>
        </TableCell>
        <TableCell>
          <Stack direction="row" spacing={2} alignItems="center">
            <Stack
              sx={{
                width: "6px",
                height: "6px",
                borderRadius: "3px",
                bgcolor: stakeStatus
              }}
            />
            <Typography variant="body2">{row.stakeStatus}</Typography>
          </Stack>
        </TableCell>
        <TableCell>
          <Typography variant="body2">
            ${truncateAddress(row.policyId, 3, 3)}
          </Typography>
        </TableCell>
        <TableCell>
          <Typography variant="body2">{row.ipRegion}</Typography>
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
            popover.onClose();
          }}
        >
          <Iconify icon="mdi:approve" />
          Permitted
        </MenuItem>
        <MenuItem
          onClick={() => {
            popover.onClose();
          }}
        >
          <Iconify icon="codicon:discard" />
          Banned
        </MenuItem>
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
