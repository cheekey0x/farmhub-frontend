import React from "react";
import { Grid, Button, Typography } from "@mui/material";

const percent = [25, 50, 75, 100];

interface PercentOptionsProps {
  activePercent: number;
  setActivePercent: (percent: number) => void;
  btFtColor: string;
  btBgColor: string;
  theme: any;
}

const PercentOptions: React.FC<PercentOptionsProps> = ({
  activePercent,
  setActivePercent,
  btFtColor,
  btBgColor,
  theme
}) => (
  <Grid container spacing={3}>
    {percent.map((item, idx) => (
      <Grid item xs={3} key={idx}>
        <Button
          fullWidth
          sx={{
            backgroundColor: activePercent === item ? btBgColor : "transparent",
            ":hover": {
              backgroundColor:
                activePercent === item ? btBgColor : "transparent"
            },
            color: btFtColor,
            border: `1px solid ${theme.palette.background.border}`,
            borderRadius: 1,
            px: 1,
            py: 1,
            textAlign: "center"
          }}
          onClick={() => setActivePercent(item)}
        >
          <Typography variant="body2">{item} %</Typography>
        </Button>
      </Grid>
    ))}
  </Grid>
);

export default PercentOptions;
