"use client";

import {
  Card,
  Table,
  Stack,
  Button,
  Tooltip,
  useTheme,
  Container,
  TableBody,
  IconButton,
  Typography,
  TableContainer
} from "@mui/material";
import { useBoolean } from "src/hooks/use-boolean";
import Iconify from "src/components/iconify";
import { ConfirmDialog } from "src/components/custom-dialog";
import {
  useTable,
  TableSkeleton,
  TableHeadCustom,
  TableSelectedAction,
  TablePaginationCustom
} from "src/components/table";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
//-----------------------------------------------------------------------------
import dayjs from "dayjs";
import DelegatorTableRow from "./delegator-table-row";
import FilterBar from "./filter-bar";
// import { makeData } from "src/constant/mock/delegators";
//-----------------------------------------------------------------------------
const Scrollbar = dynamic(() => import("src/components/scrollbar"), {
  ssr: false
});

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "startDate", label: "Start Date", order: "startDate" },
  { id: "walletAddress", label: "Wallet Address", order: "walletAddress" },
  { id: "adaHandle", label: "Ada Handle", order: "" },
  { id: "status", label: "Stake Status", order: "" },
  { id: "policyId", label: "Policy IDs", order: "policyId" },
  { id: "region", label: "IP Region", order: "region" },
  { id: "", width: 50 }
];
// ...................................

export default function DelegatorView() {
  const usersLoading = false;

  // ...................................

  const table = useTable();
  const confirm = useBoolean();
  const router = useRouter();
  const theme = useTheme();

  // ...................................
  const [tableData, setTableData] = useState<any[]>([]);
  const [tableLength, setTableLength] = useState<number>(0);
  const [filter, setFilter] = useState<TFilter>({
    startDate: dayjs("2000-01-01"),
    endDate: dayjs(),
    userBanned: [],
    userRoleLevel: [],
    search: ""
  });

  type TFilter = {
    startDate: any;
    endDate: any;
    userBanned: string[];
    userRoleLevel: string[];
    search: string;
  };

  const initializeUserList = useCallback(async () => {
    try {
      // const tempTableData = makeData(table.rowsPerPage);
      // setTableData(tempTableData);
      setTableLength(0);
      setTableData([]);
    } catch (error) {
      console.error(error);
    }
    // eslint-disable-next-line
  }, [table.page, table.rowsPerPage, table.order, table.orderBy, filter]);

  const handleViewRow = useCallback(
    (id: string) => {
      // router.push(`/user/${id}`);
      console.log(id);
    },
    // eslint-disable-next-line
    [router]
  );

  const handleDeleteRows = useCallback(() => {
    const deleteRows = tableData.filter(
      (row) => !table.selected.includes(row._id)
    );
    setTableData(deleteRows);
  }, [table, tableData]);

  // ...................................

  useEffect(() => {
    initializeUserList();
  }, [
    table.page,
    table.rowsPerPage,
    table.order,
    table.orderBy,
    filter,
    initializeUserList
  ]);

  // ...................................
  return (
    <>
      <Container maxWidth="xl">
        <Stack py={4}>
          <Typography fontWeight={900}>Delegators</Typography>
        </Stack>
        <Card>
          <FilterBar table={table} filter={filter} setFilter={setFilter} />
          <TableContainer sx={{ position: "relative", overflow: "unset" }}>
            <TableSelectedAction
              numSelected={table.selected.length}
              rowCount={tableData.length}
              onSelectAllRows={(checked) =>
                table.onSelectAllRows(
                  checked,
                  tableData.map((row) => row._id)
                )
              }
              action={
                <Tooltip title="Delete">
                  <IconButton
                    sx={{ color: theme.palette.text.main }}
                    onClick={confirm.onTrue}
                  >
                    <Iconify icon="solar:trash-bin-trash-bold" />
                  </IconButton>
                </Tooltip>
              }
            />
            <Scrollbar>
              <Table>
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
                      tableData.map((row) => row.policyId)
                    )
                  }
                  sx={{
                    height: 58,
                    background: "#fff"
                  }}
                />
                <TableBody>
                  {usersLoading ? (
                    [...Array(table.rowsPerPage)].map((i, index) => (
                      <TableSkeleton key={index} sx={{ height: 60 }} />
                    ))
                  ) : (
                    <>
                      {tableData.map((rows, index) => (
                        <DelegatorTableRow
                          key={index}
                          row={rows}
                          selected={table.selected.includes(rows.policyId)}
                          onSelectRow={() => table.onSelectRow(rows.policyId)}
                          onDeleteRow={() => handleDeleteRows()}
                          onViewRow={() => handleViewRow(rows._id)}
                        />
                      ))}
                    </>
                  )}
                </TableBody>
              </Table>
            </Scrollbar>
          </TableContainer>
          <TablePaginationCustom
            count={tableLength}
            page={table.page}
            rowsPerPage={table.rowsPerPage}
            onPageChange={table.onChangePage}
            onRowsPerPageChange={table.onChangeRowsPerPage}
          />
        </Card>
      </Container>
      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Delete"
        content={
          <>
            Are you sure want to delete{" "}
            <strong> {table.selected.length} </strong> items?
          </>
        }
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              handleDeleteRows();
              confirm.onFalse();
            }}
          >
            Delete
          </Button>
        }
      />
    </>
  );
}
