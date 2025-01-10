import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';

import { useBoolean } from 'src/hooks/use-boolean';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';
import CustomPopover, { usePopover } from 'src/components/custom-popover';

import { IUserItem } from 'src/types/user';
import { useTranslate } from 'src/locales';

// import UserQuickEditForm from './user-quick-edit-form';

// ----------------------------------------------------------------------

type Props = {
    selected: boolean;
    onEditRow: VoidFunction;
    row: IUserItem;
    onSelectRow: VoidFunction;
    onDeleteRow: VoidFunction;
};

export default function UserTableRow({
    row,
    selected,
    onEditRow,
    onSelectRow,
    onDeleteRow,
}: Props) {
    const { t } = useTranslate();
    const { name, avatarUrl, company, role, status, email, phoneNumber } = row;

    const confirm = useBoolean();

    const quickEdit = useBoolean();

    const popover = usePopover();

    return (
        <>
            <TableRow hover selected={selected}>
                <TableCell padding="checkbox">
                    <Checkbox checked={selected} onClick={onSelectRow} />
                </TableCell>

                <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
                    {/* <Avatar alt={name} src={avatarUrl} sx={{ mr: 2 }} /> */}
                    <Avatar alt={name} src="/assets/images/avatar/user-default.jpg" sx={{ mr: 2 }} />

                    <ListItemText
                        primary={name}
                        // secondary={email}
                        primaryTypographyProps={{ typography: 'caption' }}
                        secondaryTypographyProps={{
                            component: 'span',
                            color: 'text.disabled',
                        }}
                        sx={{ whiteSpace: "nowrap" }}
                    />
                </TableCell>

                <TableCell sx={{ whiteSpace: 'nowrap', fontSize: 12 }}>{company}</TableCell>
                <TableCell sx={{ whiteSpace: 'nowrap', fontSize: 12 }}>{phoneNumber}</TableCell>

                {/* <TableCell sx={{ whiteSpace: 'nowrap', fontSize: 12 }}>{company}</TableCell> */}

                <TableCell sx={{ whiteSpace: 'nowrap', fontSize: 12 }}>{email}</TableCell>

                <TableCell>
                    <Label
                        variant="soft"
                        color={
                            (status === 'active' && 'success') ||
                            (status === 'pending' && 'warning') ||
                            (status === 'banned' && 'error') ||
                            'default'
                        }
                    >
                        {t(status)}
                    </Label>
                </TableCell>
                <TableCell sx={{ whiteSpace: 'nowrap', fontSize: 12 }}>2024-01-10</TableCell>

                <TableCell align="right" sx={{ px: 1, whiteSpace: 'nowrap' }}>
                    <Tooltip title="Quick Edit" placement="top" arrow>
                        {/* <IconButton color={quickEdit.value ? 'inherit' : 'default'} onClick={quickEdit.onTrue}> */}
                        <IconButton color={quickEdit.value ? 'inherit' : 'default'}>
                            <Iconify icon="solar:pen-bold" />
                        </IconButton>
                    </Tooltip>

                    <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
                        <Iconify icon="eva:more-vertical-fill" />
                    </IconButton>
                </TableCell>
            </TableRow>

            {/* <UserQuickEditForm currentUser={row} open={quickEdit.value} onClose={quickEdit.onFalse} /> */}

            <CustomPopover
                open={popover.open}
                onClose={popover.onClose}
                arrow="right-top"
                sx={{ width: 140 }}
            >
                <MenuItem
                    // onClick={() => {
                    //     confirm.onTrue();
                    //     popover.onClose();
                    // }}
                    sx={{ color: 'error.main' }}
                >
                    <Iconify icon="solar:trash-bin-trash-bold" />
                    Delete
                </MenuItem>

                <MenuItem
                // onClick={() => {
                //     onEditRow();
                //     popover.onClose();
                // }}
                >
                    <Iconify icon="solar:pen-bold" />
                    Edit
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
