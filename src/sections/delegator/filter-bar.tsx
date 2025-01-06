import {
  Grid,
  Zoom,
  Stack,
  MenuItem,
  Checkbox,
  Collapse,
  useTheme,
  TextField,
  IconButton,
  InputLabel,
  Typography,
  FormControl,
  ListItemText,
  OutlinedInput,
  InputAdornment
} from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Iconify from "src/components/iconify";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import CustomPopover, { usePopover } from "src/components/custom-popover";
import { useState } from "react";

const USER_STATUS = ["Allow", "Pendding", "Banned"];
const USER_ROLE = ["OWNER", "MEMBER"];

type TFilter = {
  startDate: any;
  endDate: any;
  userBanned: string[];
  userRoleLevel: string[];
  search: string;
};

export default function FilterBar({
  table,
  filter,
  setFilter
}: {
  table: any;
  filter: TFilter;
  setFilter: (value: TFilter) => void;
}) {
  const [showFilter, setShowFilter] = useState(false);
  const theme = useTheme();

  const popover = usePopover();

  const minDate = dayjs("2000-01-01");
  const maxDate = dayjs();

  const handleFilterStartDate = (newValue: any | null) => {
    setFilter({ ...filter, startDate: newValue });
  };
  const handleFilterEndDate = (newValue: any | null) => {
    setFilter({ ...filter, endDate: newValue });
  };
  const handleFilterBanned = (event: SelectChangeEvent<any>) => {
    setFilter({ ...filter, userBanned: event.target.value });
    popover.onClose();
  };
  const handleFilterRole = (event: SelectChangeEvent<any>) => {
    setFilter({ ...filter, userRoleLevel: event.target.value });
    popover.onClose();
  };
  const handleFilterSearch = (event: React.ChangeEvent<any>) => {
    setFilter({ ...filter, search: event.target.value });
  };

  // ........................................

  return (
    <>
      <Grid spacing={2} p={2} container>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Grid
            item
            xs={12}
            sm={12}
            md={8}
            sx={{
              display: "flex",
              gap: 1.5,
              flexDirection: { xs: "column", sm: "row" }
            }}
          >
            <Stack direction="row" justifyContent="center" alignItems="center">
              <Typography variant="body1">Filters</Typography>
              <IconButton onClick={() => setShowFilter((prev) => !prev)}>
                {showFilter ? (
                  <Zoom in={showFilter}>
                    <RemoveCircleOutlineIcon />
                  </Zoom>
                ) : (
                  <Zoom in={!showFilter}>
                    <AddCircleOutlineIcon />
                  </Zoom>
                )}
              </IconButton>
            </Stack>
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={4}
            sx={{
              display: "flex",
              gap: 1.5,
              flexDirection: "row",
              alignItems: "center"
            }}
          >
            <TextField
              fullWidth
              placeholder="Wallet Address, Ada Handle"
              value={filter.search}
              onChange={handleFilterSearch}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Iconify
                      icon="eva:search-fill"
                      sx={{ color: "text.disabled" }}
                    />
                  </InputAdornment>
                )
              }}
              sx={{
                minWidth: 250
              }}
            />
            <IconButton onClick={popover.onOpen}>
              <Iconify icon="eva:more-vertical-fill" />
            </IconButton>
          </Grid>

          <Collapse
            in={showFilter}
            sx={{ width: "100%", px: "1rem", mt: ".5rem" }}
          >
            <Grid container display="flex" spacing={1.5}>
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                sx={{
                  display: "flex",
                  gap: 1.5,
                  flexDirection: { xs: "column", sm: "row" }
                }}
              >
                <DatePicker
                  label="Started At From"
                  minDate={minDate}
                  maxDate={filter.endDate}
                  onChange={handleFilterStartDate}
                  views={["year", "month", "day"]}
                  sx={{ width: "100%" }}
                />
                <DatePicker
                  label="Started At To"
                  minDate={filter.startDate}
                  maxDate={maxDate}
                  defaultValue={filter.endDate}
                  onChange={handleFilterEndDate}
                  views={["year", "month", "day"]}
                  sx={{ width: "100%" }}
                />
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                sx={{
                  display: "flex",
                  gap: 1.5,
                  flexDirection: { xs: "column", sm: "row" }
                }}
              >
                <FormControl sx={{ width: "100%" }}>
                  <InputLabel>Banned</InputLabel>
                  <Select
                    multiple
                    value={filter.userBanned}
                    onChange={handleFilterBanned}
                    input={<OutlinedInput label="Banned" />}
                    renderValue={(selected) => selected.join(", ")}
                  >
                    {USER_STATUS.map((temp) => (
                      <MenuItem key={temp} value={temp}>
                        <Checkbox
                          checked={filter.userBanned.indexOf(temp) > -1}
                          sx={{
                            color: `${theme.palette.background.main}!important`
                          }}
                        />
                        <ListItemText primary={temp} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl sx={{ width: "100%" }}>
                  <InputLabel>RoleLevel</InputLabel>
                  <Select
                    fullWidth
                    multiple
                    value={filter.userRoleLevel}
                    onChange={handleFilterRole}
                    input={<OutlinedInput label="RoleLevel" />}
                    renderValue={(selected) => selected.join(", ")}
                  >
                    {USER_ROLE.map((temp) => (
                      <MenuItem key={temp} value={temp}>
                        <Checkbox
                          checked={filter.userRoleLevel.indexOf(temp) > -1}
                          sx={{
                            color: `${theme.palette.background.main}!important`
                          }}
                        />
                        <ListItemText primary={temp} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Collapse>
        </LocalizationProvider>
      </Grid>
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
          <Iconify icon="solar:printer-minimalistic-bold" />
          Print
        </MenuItem>
        <MenuItem
          onClick={() => {
            popover.onClose();
          }}
        >
          <Iconify icon="solar:import-bold" />
          Import
        </MenuItem>
        <MenuItem
          onClick={() => {
            popover.onClose();
            // getUserData();
          }}
        >
          <Iconify icon="solar:export-bold" />
          Export
        </MenuItem>
      </CustomPopover>
    </>
  );
}
