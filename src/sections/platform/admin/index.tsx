'use client';

import isEqual from 'lodash/isEqual';
import { useState, useCallback } from 'react';

import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import { alpha } from '@mui/material/styles';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import IconButton from '@mui/material/IconButton';
import TableContainer from '@mui/material/TableContainer';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { useBoolean } from 'src/hooks/use-boolean';

import { _roles, _userList, USER_STATUS_OPTIONS } from 'src/_mock';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import {
    useTable,
    emptyRows,
    TableNoData,
    getComparator,
    TableEmptyRows,
    TableHeadCustom,
    TableSelectedAction,
    TablePaginationCustom,
} from 'src/components/table';

import { IUserItem, IUserTableFilters, IUserTableFilterValue } from 'src/types/user';

import UserTableRow from './user-table-row';
import UserTableToolbar from './user-table-toolbar';
import UserTableFiltersResult from './user-table-filters-result';
import { useTranslate } from 'src/locales';
import { Stack, Typography } from '@mui/material';
import CardWrapper from 'src/components/card-wrapper';
import CardWrapperHeader from 'src/components/card-wrapper-header'
import { useTheme } from '@mui/material';
import { varHover } from 'src/components/animate';
import { m } from 'framer-motion';
import UserCreateForm from './user-create-form';




export default function UserListView() {
    const { t } = useTranslate();

    // ----------------------------------------------------------------------

    const STATUS_OPTIONS = [{ value: 'all', label: 'All' }, ...USER_STATUS_OPTIONS];

    const TABLE_HEAD = [
        { id: 'name', label: t('Name') },
        { id: 'company', label: t('Department'), width: 100 },
        { id: 'phoneNumber', label: t('Phone_Number'), width: 180 },
        { id: 'email', label: t('Email'), width: 120 },
        // { id: 'role', label: 'Role', width: 180 },
        { id: 'status', label: t('Status'), width: 100 },
        { id: 'created_at', label: t('Create_Time'), width: 100 },
        { id: '', label: t('Action'), width: 88 },
    ];

    const defaultFilters: IUserTableFilters = {
        name: '',
        role: [],
        status: 'all',
    };

    const fake_roles = [
        "Active",
        "Disable"
    ]

    // ----------------------------------------------------------------------

    const table = useTable();
    const theme = useTheme()
    const createAdmin = useBoolean();

    const settings = useSettingsContext();

    const router = useRouter();

    const confirm = useBoolean();

    const [tableData, setTableData] = useState(_userList);

    const [filters, setFilters] = useState(defaultFilters);

    const dataFiltered = applyFilter({
        inputData: tableData,
        comparator: getComparator(table.order, table.orderBy),
        filters,
    });

    const dataInPage = dataFiltered.slice(
        table.page * table.rowsPerPage,
        table.page * table.rowsPerPage + table.rowsPerPage
    );

    const denseHeight = table.dense ? 52 : 72;

    const canReset = !isEqual(defaultFilters, filters);

    const notFound = (!dataFiltered.length && canReset) || !dataFiltered.length;

    const handleFilters = useCallback(
        (name: string, value: IUserTableFilterValue) => {
            table.onResetPage();
            setFilters((prevState) => ({
                ...prevState,
                [name]: value,
            }));
        },
        [table]
    );

    const handleDeleteRow = useCallback(
        (id: string) => {
            const deleteRow = tableData.filter((row) => row.id !== id);
            setTableData(deleteRow);

            table.onUpdatePageDeleteRow(dataInPage.length);
        },
        [dataInPage.length, table, tableData]
    );

    const handleDeleteRows = useCallback(() => {
        const deleteRows = tableData.filter((row) => !table.selected.includes(row.id));
        setTableData(deleteRows);

        table.onUpdatePageDeleteRows({
            totalRows: tableData.length,
            totalRowsInPage: dataInPage.length,
            totalRowsFiltered: dataFiltered.length,
        });
    }, [dataFiltered.length, dataInPage.length, table, tableData]);

    const handleEditRow = useCallback(
        (id: string) => {
            router.push(paths.platform.admin);
        },
        [router]
    );

    const handleFilterStatus = useCallback(
        (event: React.SyntheticEvent, newValue: string) => {
            handleFilters('status', newValue);
        },
        [handleFilters]
    );

    const handleResetFilters = useCallback(() => {
        setFilters(defaultFilters);
    }, []);

    return (
        <>
            {/* <Container
                // maxWidth={settings.themeStretch ? false : 'lg'}
                sx={{ overflow: "auto" }}
            > */}

            <Stack overflow="auto">
                <CustomBreadcrumbs
                    links={[
                        { name: t('platform_Setting'), href: paths.dashboard.root },
                        { name: t('admin_setting'), href: paths.platform.admin },
                    ]}
                    sx={{
                        // mb: { xs: 2, md: 2 },
                        mt: { xs: 2, md: 1.5 }
                    }}
                />
                <CardWrapper>
                    <CardWrapperHeader title={t('admin_setting')}>
                        <Stack
                            flexDirection="row"
                            spacing={1}
                        >
                            <IconButton
                                component={m.button}
                                whileTap="tap"
                                whileHover="hover"
                                variants={varHover(1.05)}
                                sx={{
                                    borderRadius: "50%",
                                    backgroundColor: theme.palette.background.default,
                                    width: 20,
                                    height: 20,
                                    padding: 0.5,
                                    "&:hover": {
                                        backgroundColor: theme.palette.background.default,
                                    }
                                }}
                            >
                                <Iconify color="#000" icon="material-symbols:fullscreen" />
                            </IconButton>

                            <IconButton
                                component={m.button}
                                whileTap="tap"
                                whileHover="hover"
                                variants={varHover(1.05)}
                                sx={{
                                    borderRadius: "50%",
                                    backgroundColor: theme.palette.background.refresh,
                                    width: 20,
                                    height: 20,
                                    padding: 0.5,
                                    "&:hover": {
                                        backgroundColor: theme.palette.background.refresh,
                                    }
                                }}
                            >
                                <Iconify color="#fff" icon="material-symbols:refresh" />
                            </IconButton>
                        </Stack>
                    </CardWrapperHeader>

                    <Stack
                        overflow="auto"
                        sx={{ flexGrow: 1 }}>
                        {false && (
                            <Tabs
                                value={filters.status}
                                // onChange={handleFilterStatus}
                                sx={{
                                    px: 2.5,
                                    boxShadow: (theme) => `inset 0 -2px 0 0 ${alpha(theme.palette.grey[500], 0.08)}`,
                                }}
                            >
                                {STATUS_OPTIONS.map((tab) => (
                                    <Tab
                                        key={tab.value}
                                        iconPosition="end"
                                        value={tab.value}
                                        label={tab.label}
                                        icon={
                                            <Label
                                                variant={
                                                    ((tab.value === 'all' || tab.value === filters.status) && 'filled') || 'soft'
                                                }
                                                color={
                                                    (tab.value === 'active' && 'success') ||
                                                    (tab.value === 'pending' && 'warning') ||
                                                    (tab.value === 'banned' && 'error') ||
                                                    'default'
                                                }
                                            >
                                                {tab.value === 'all' && _userList.length}
                                                {tab.value === 'active' &&
                                                    _userList.filter((user) => user.status === 'active').length}

                                                {tab.value === 'pending' &&
                                                    _userList.filter((user) => user.status === 'pending').length}
                                                {tab.value === 'banned' &&
                                                    _userList.filter((user) => user.status === 'banned').length}
                                                {tab.value === 'rejected' &&
                                                    _userList.filter((user) => user.status === 'rejected').length}
                                            </Label>
                                        }
                                    />
                                ))}
                            </Tabs>

                        )}

                        <Stack
                            flexDirection="row"
                            justifyContent="space-between"
                            alignItems="center"
                            spacing={2}
                            sx={{
                                p: 2.5,
                                px: { xs: 2.5, md: 2.5 },
                            }}
                        >
                            <UserTableToolbar
                                filters={filters}
                                onFilters={handleFilters}
                                //
                                roleOptions={fake_roles}
                            />

                            <Stack
                                direction="row"
                                alignItems="center"
                            >

                                <Button
                                    onClick={createAdmin.onTrue}
                                    variant="contained"
                                    color='success'
                                >
                                    {t('Add_Admin')}
                                </Button>
                            </Stack>
                        </Stack>

                        {canReset && (
                            <UserTableFiltersResult
                                filters={filters}
                                onFilters={handleFilters}
                                //
                                onResetFilters={handleResetFilters}
                                //
                                results={dataFiltered.length}
                                sx={{ p: 2.5, pt: 0 }}
                            />
                        )}


                        <TableSelectedAction
                            // dense={table.dense}
                            numSelected={table.selected.length}
                            rowCount={tableData.length}
                            onSelectAllRows={(checked) =>
                                table.onSelectAllRows(
                                    checked,
                                    tableData.map((row) => row.id)
                                )
                            }
                            action={
                                <Tooltip title="Delete">
                                    <IconButton color="error" onClick={confirm.onTrue}>
                                        <Iconify icon="solar:trash-bin-trash-bold" />
                                    </IconButton>
                                </Tooltip>
                            }
                        />
                        <Scrollbar
                            sx={{
                                flexGrow: 1
                            }}
                        >
                            <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>



                                <Table stickyHeader size="small" sx={{ minWidth: 960 }}>
                                    <TableHeadCustom
                                        order={table.order}
                                        orderBy={table.orderBy}
                                        headLabel={TABLE_HEAD}
                                        rowCount={tableData.length}
                                        numSelected={table.selected.length}
                                        onSort={table.onSort}
                                        onSelectAllRows={(checked) =>
                                            table.onSelectAllRows(
                                                checked,
                                                tableData.map((row) => row.id)
                                            )
                                        }
                                    />

                                    <TableBody>
                                        {dataFiltered
                                            // .slice(
                                            //     table.page * table.rowsPerPage,
                                            //     table.page * table.rowsPerPage + table.rowsPerPage
                                            // )
                                            .map((row) => (
                                                <UserTableRow
                                                    key={row.id}
                                                    row={row}
                                                    selected={table.selected.includes(row.id)}
                                                    onSelectRow={() => table.onSelectRow(row.id)}
                                                    onDeleteRow={() => handleDeleteRow(row.id)}
                                                    onEditRow={() => handleEditRow(row.id)}
                                                />
                                            ))}

                                        <TableEmptyRows
                                            height={denseHeight}
                                            emptyRows={emptyRows(table.page, table.rowsPerPage, tableData.length)}
                                        />

                                        <TableNoData notFound={notFound} />
                                    </TableBody>
                                </Table>

                            </TableContainer>
                        </Scrollbar>

                        {/* <TablePaginationCustom
                            count={dataFiltered.length}
                            page={table.page}
                            rowsPerPage={table.rowsPerPage}
                            onPageChange={table.onChangePage}
                            onRowsPerPageChange={table.onChangeRowsPerPage}
                        
                        dense={table.dense}
                        onChangeDense={table.onChangeDense}
                        /> */}
                    </Stack>
                </CardWrapper>


            </Stack>
            {/* </Container> */}

            <UserCreateForm open={createAdmin.value} onClose={createAdmin.onFalse} />

            <ConfirmDialog
                open={confirm.value}
                onClose={confirm.onFalse}
                title={t('delete_confirmation')}
                content={`${t('Are you sure want to delete?')} ${t('This action cannot be undone.')}`}
                // content={
                //     <>
                //         Are you sure want to delete <strong> {table.selected.length} </strong> items?
                //     </>
                // }
                action={
                    <Button
                        variant="contained"
                        color="error"
                        onClick={() => {
                            handleDeleteRows();
                            confirm.onFalse();
                        }}
                    >
                        {t('Delete')}
                    </Button>
                }
            />
        </>
    );
}

// ----------------------------------------------------------------------

function applyFilter({
    inputData,
    comparator,
    filters,
}: {
    inputData: IUserItem[];
    comparator: (a: any, b: any) => number;
    filters: IUserTableFilters;
}) {
    const { name, status, role } = filters;

    const stabilizedThis = inputData.map((el, index) => [el, index] as const);

    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });

    inputData = stabilizedThis.map((el) => el[0]);

    if (name) {
        inputData = inputData.filter(
            (user) => user.name.toLowerCase().indexOf(name.toLowerCase()) !== -1
        );
    }

    if (status !== 'all') {
        inputData = inputData.filter((user) => user.status === status);
    }

    if (role.length) {
        inputData = inputData.filter((user) => role.includes(user.role));
    }

    return inputData;
}
