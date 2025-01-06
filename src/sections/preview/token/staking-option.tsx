import React from "react";
import { Grid, Stack, Button, Typography } from "@mui/material";

const monthOptions = [
  { month: 1, boost: 1, apr: 0 },
  { month: 3, boost: 3, apr: 0 },
  { month: 6, boost: 6, apr: 0 },
  { month: 9, boost: 9, apr: 0 }
];

interface StakingOptionsProps {
  activeMonth: number;
  setActiveMonth: (month: number) => void;
  btFtColor: string;
  btBgColor: string;
  theme: any;
}

const StakingOptions: React.FC<StakingOptionsProps> = ({
  activeMonth,
  setActiveMonth,
  btFtColor,
  btBgColor,
  theme
}) => (
  <Grid container spacing={3}>
    {monthOptions.map((item, idx) => (
      <Grid item xs={12} key={idx}>
        <Button
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            borderRadius: 1,
            px: 2,
            py: 1,
            color: btFtColor,
            backgroundColor:
              activeMonth === item.month ? btBgColor : "transparent",
            ":hover": {
              backgroundColor:
                activeMonth === item.month ? btBgColor : "transparent"
            },
            border: `1px solid ${theme.palette.background.border}`
          }}
          fullWidth
          onClick={() => setActiveMonth(item.month)}
        >
          <Stack
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            px={1}
            width="100%"
          >
            <Stack>
              <Typography variant="body2" sx={{ textAlign: "center" }}>
                {item.month > 1
                  ? `${item.month} Months`
                  : `${item.month} Month`}
              </Typography>
              <Typography variant="body1">
                {item.month > 1 ? `${item.boost}X Boost` : `No Boost`}
              </Typography>
            </Stack>
            <Typography variant="body2">{item.apr.toFixed(2)}% APR</Typography>
          </Stack>
        </Button>
      </Grid>
    ))}
  </Grid>
);

export default StakingOptions;
