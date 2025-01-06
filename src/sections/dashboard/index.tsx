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
export default function Dashboard() {
    const usersLoading = false;
    // ...................................
    return (
        <>
            <Container maxWidth="xl">
                Dashboard
            </Container>
        </>
    );
}
