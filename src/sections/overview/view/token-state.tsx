import { ApexOptions } from "apexcharts";
import Stack from "@mui/material/Stack";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Card, { CardProps } from "@mui/material/Card";
import { fNumber } from "src/utils/format-number";
import { TTokenState } from "src/types/mock";
import InfoIcon from "@mui/icons-material/InfoOutlined";
import { Tooltip, IconButton } from "@mui/material";
import Chart from "src/components/chart";
// ...................................

interface Props extends CardProps {
  data: TTokenState;
}
// ...................................

type TChart = {
  colors?: string[];
  series: number[];
  options?: ApexOptions;
};

const _chartTemp: TChart = {
  colors: [],
  series: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
};

export default function TokenState({ data, sx, ...other }: Props) {
  // ...................................
  const theme = useTheme();
  // ...................................
  const { series, options } = _chartTemp;

  const colors = [theme.palette.primary.light, theme.palette.background.main];

  const chartOptions = {
    colors: colors.map((colr) => colr[1]),
    fill: {
      type: "gradient",
      gradient: {
        colorStops: [
          { offset: 0, color: colors[1], opacity: 1 },
          { offset: 100, color: colors[1], opacity: 1 }
        ]
      }
    },
    stroke: {
      width: 2
    },
    chart: {
      sparkline: {
        enabled: true
      }
    },
    plotOptions: {
      bar: {
        columnWidth: "10%",
        borderRadius: 0
      }
    },
    tooltip: {
      x: { show: false },
      y: {
        formatter: (value: number) => fNumber(value),
        title: {
          formatter: () => ""
        }
      },
      marker: { show: false }
    },
    ...options
  };
  // ...................................

  return (
    <Card
      sx={{
        display: "flex",
        alignItems: "center",
        p: 3,
        borderRadius: 1,
        width: "100%",
        height: "100%",
        ...sx
      }}
      {...other}
    >
      <Stack width="100%" height="100%" justifyContent="space-around">
        <Stack
          direction="row"
          alignItems="flex-start"
          justifyContent="space-between"
          spacing={1}
        >
          <Typography variant="body2" textAlign="center" fontWeight={900}>
            {data.name}
          </Typography>
          <Tooltip title="ADA token">
            <IconButton sx={{ p: 0 }}>
              <InfoIcon
                fontSize="small"
                sx={{
                  color: theme.palette.text.black
                }}
              />
            </IconButton>
          </Tooltip>
        </Stack>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="flex-end"
          pt={2}
          gap={2}
        >
          <Typography variant="body1" whiteSpace="nowrap" p={0}>
            {data.amount}
          </Typography>
          <Chart
            dir="ltr"
            type="line"
            series={[{ data: series }]}
            options={chartOptions}
            width={100}
            height={36}
            sx={{ pt: 2 }}
          />
        </Stack>
      </Stack>
    </Card>
  );
}
