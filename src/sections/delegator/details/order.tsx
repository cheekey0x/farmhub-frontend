import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import TableBody from "@mui/material/TableBody";
import CardHeader from "@mui/material/CardHeader";
import Card from "@mui/material/Card";
import TableContainer from "@mui/material/TableContainer";
import Iconify from "src/components/iconify";
import { TableHeadCustom } from "src/components/table";
import { Stack, TextField, InputAdornment } from "@mui/material";
import dynamic from "next/dynamic";
import { Search } from "@mui/icons-material";

const Scrollbar = dynamic(() => import("src/components/scrollbar"), {
  ssr: false
});

// ...................................
export type RowProps = {
  id: string;
  transaction: {
    first: string;
    second: string;
  };
  property: {
    city: string;
    address: string;
  };
  order: {
    status: number;
    date: string;
  };
  qty: number;
  status: string;
  price: string;
  trade: {
    price: string;
    ago: number;
  };
};

const tableLabels = [
  { id: "id", label: "Transation ID" },
  { id: "category", label: "Property Name" },
  { id: "order", label: "Order Placed" },
  { id: "qty", label: "Qty" },
  { id: "status", label: "Status" },
  { id: "price", label: "Price" },
  { id: "", label: "" }
];

type Props = {
  order: any;
};

// ...................................

export default function PropertyShareOrder({ order }: Props) {
  return (
    <Card>
      <Stack
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        pr={3}
      >
        <CardHeader title="Showing  # to # of # results" sx={{ mb: 3 }} />
        <TextField
          label="Search"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            )
          }}
        />
      </Stack>
      <TableContainer sx={{ overflow: "unset" }}>
        <Scrollbar>
          <Table sx={{ minWidth: 680 }}>
            <TableHeadCustom headLabel={tableLabels} />
            <TableBody>order table</TableBody>
          </Table>
        </Scrollbar>
      </TableContainer>

      <Divider sx={{ borderStyle: "dashed" }} />

      <Box sx={{ p: 2, textAlign: "right" }}>
        <Button
          size="small"
          color="inherit"
          endIcon={
            <Iconify
              icon="eva:arrow-ios-forward-fill"
              width={18}
              sx={{ ml: -1 }}
            />
          }
          sx={{ px: 2 }}
        >
          View All
        </Button>
      </Box>
    </Card>
  );
}
