import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";
import { useSettingsContext } from "src/components/settings";
import { Stack, Select, MenuItem, Typography } from "@mui/material";
import { useState } from "react";
import {
  CTokenState,
  CRankingData,
  CProjectTypes,
  CDelegatorsData
} from "../../constant/mock/overview";
import TokenState from "./view/token-state";
import RankingState from "./view/ranking-state";
import DelegatorState from "./view/delegator-state";
// ...................................

export default function Overview() {
  const [sortProject, setSortProject] = useState("all");
  // ...................................
  const settings = useSettingsContext();
  // ...................................

  const handleSortProject = async (e: any) => {
    setSortProject(e.target.value);
  };

  return (
    <Container maxWidth={settings.themeStretch ? false : "xl"}>
      <Grid container spacing={3} justifyContent="space-around">
        <Grid xs={12} mt={4}>
          <Stack flexDirection="column" gap={2}>
            <Stack
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography>
                Hi, Admin - Heres whats happening with your store today
              </Typography>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={sortProject}
                onChange={handleSortProject}
                sx={{
                  "& div.MuiSelect-select": {
                    padding: "8px 30px"
                  },
                  width: "180px",
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#E0E3E7"
                    },
                    "&:hover fieldset": {
                      borderColor: "#E0E3E7"
                    }
                  }
                }}
              >
                {CProjectTypes.map((item, index) => (
                  <MenuItem
                    value={item.value}
                    key={index}
                    sx={{
                      width: "100%"
                    }}
                  >
                    {item.title}
                  </MenuItem>
                ))}
              </Select>
            </Stack>
            {/* <Stack>
              <TextField
                fullWidth
                placeholder="Global Search"
                size="small"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Iconify
                        icon="eva:search-fill"
                        sx={{ color: "text.disabled" }}
                      />
                    </InputAdornment>
                  ),
                }}
                sx={{ minWidth: 250 }}
              />
            </Stack> */}
          </Stack>
        </Grid>
        {CTokenState.map((item, index) => (
          <Grid xs={12} sm={6} md={4} lg={2.4} key={index}>
            <TokenState data={item} />
          </Grid>
        ))}

        {CRankingData.map((item, index) => (
          <Grid xs={12} sm={6} md={4} lg={2.4} key={index}>
            <RankingState data={item} />
          </Grid>
        ))}
        {CDelegatorsData.map((item, index) => (
          <Grid xs={12} lg={6} key={index}>
            <DelegatorState data={item} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
