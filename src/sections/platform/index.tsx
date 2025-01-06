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

export default function PlatformSettingView() {
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
                Platform setting
            </Container>
        </>
    );
}
