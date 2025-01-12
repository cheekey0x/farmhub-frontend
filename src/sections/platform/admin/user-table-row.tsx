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
import Typography from '@mui/material/Typography'
import { Box } from '@mui/material';
import UserEditForm from './user-edit-form';

// import UserQuickEditForm from './user-quick-edit-form';

// ----------------------------------------------------------------------

type Props = {
    selected: boolean;
    onEditRow: VoidFunction;
    row: any;
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

                    {/* <ListItemText
                        primary={name}
                        // secondary={email}
                        primaryTypographyProps={{ typography: 'caption' }}
                        secondaryTypographyProps={{
                            component: 'span',
                            color: 'text.disabled',
                        }}
                        sx={{ whiteSpace: "nowrap" }}
                    /> */}
                    <Typography variant="tranctSpan" color="initial" sx={{ maxWidth: 120 }}>{name}</Typography>
                </TableCell>

                <TableCell>
                    <Typography variant="tranctSpan" color="initial" sx={{ maxWidth: 100 }}>{company}</Typography>
                </TableCell>

                <TableCell>
                    <Typography variant="tranctSpan" color="initial">{phoneNumber}</Typography>
                </TableCell>

                <TableCell>
                    <Typography variant="tranctSpan" color="initial" sx={{ maxWidth: 100 }}>{email}</Typography>
                </TableCell>

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
                {/* <TableCell sx={{ whiteSpace: 'nowrap', fontSize: 12 }}>2024-01-10</TableCell> */}
                <TableCell>
                    <Typography variant="tranctSpan" color="initial">2024-01-10</Typography>
                </TableCell>

                <TableCell align="right" sx={{ px: 1, whiteSpace: 'nowrap' }}>
                    <Tooltip title="Quick Edit" placement="top" arrow>
                        <IconButton color={quickEdit.value ? 'inherit' : 'default'} onClick={quickEdit.onTrue}>
                            {/* <IconButton color={quickEdit.value ? 'inherit' : 'default'}> */}
                            <Iconify icon="solar:pen-bold" />
                        </IconButton>
                    </Tooltip>

                    <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
                        <Iconify icon="eva:more-vertical-fill" />
                    </IconButton>
                </TableCell>
            </TableRow>

            <UserEditForm currentUser={row} open={quickEdit.value} onClose={quickEdit.onFalse} />

            <CustomPopover
                open={popover.open}
                onClose={popover.onClose}
                arrow="right-top"
                sx={{ width: 140 }}
            >
                <MenuItem
                // onClick={() => {
                //     onEditRow();
                //     popover.onClose();
                // }}
                >
                    <Iconify icon="material-symbols:unknown-document-rounded" />
                    {t('Detail Info')}
                </MenuItem>

                <MenuItem
                    onClick={() => {
                        confirm.onTrue();
                        popover.onClose();
                    }}
                    sx={{ color: 'error.main' }}
                >
                    <Iconify icon="solar:trash-bin-trash-bold" />
                    {t('Delete')}
                </MenuItem>
            </CustomPopover>

            <ConfirmDialog
                open={confirm.value}
                onClose={confirm.onFalse}
                icon={
                    // <Box
                    //     color="error"
                    //     sx={{
                    //         display: "inline-flex",
                    //         alignItems: "center",
                    //         justifyContent: "center"
                    //     }}>
                    // </Box>
                    <Iconify icon="solar:trash-bin-trash-bold" sx={{ color: "#fff", mr: 1 }} />
                }
                title={t('delete_confirmation')}
                content={`${t('Are you sure want to delete?')} ${t('This action cannot be undone.')}`}
                // content2={t('This action cannot be undone.')}
                action={
                    <Button variant="contained" color="error" onClick={onDeleteRow}>
                        {t('Delete')}
                    </Button>
                }
            />
        </>
    );
}
