import { ApexOptions } from "apexcharts";
import Stack from "@mui/material/Stack";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Card, { CardProps } from "@mui/material/Card";
import { fNumber } from "src/utils/format-number";
import Chart from "src/components/chart";
import { TRankingState } from "src/types/mock";
import { Grid } from "@mui/material";
// ...................................

interface Props extends CardProps {
  data: TRankingState;
}
// ...................................

type TChart = {
  colors?: string[];
  series: number[];
  options?: ApexOptions;
};

const _chartTemp: TChart = {
  colors: [],
  series: [5, 10, 4, 5, 3]
};

export default function RankingState({ data, sx, ...other }: Props) {
  // ...................................
  const theme = useTheme();
  // ...................................
  const { options } = _chartTemp;

  const series = data.data.map((item) => item.amount);
  const colors = [
    theme.palette.background.paper,
    theme.palette.background.main
  ];

  const chartOptions = {
    colors: colors.map((colr) => colr[0]),
    fill: {
      type: "gradient",
      gradient: {
        colorStops: [
          { offset: 0, color: colors[1], opacity: 1 },
          { offset: 100, color: colors[0], opacity: 1 }
        ]
      }
    },
    chart: {
      sparkline: {
        enabled: true
      }
    },
    plotOptions: {
      bar: {
        borderRadius: 2,
        horizontal: true,
        distributed: true,
        dataLabels: {
          position: "bottom"
        }
      }
    },
    dataLabels: {
      enabled: true,
      style: {
        colors: [theme.palette.text.black],
        fontWeight: "300"
      },
      formatter(val: any, opt: any) {
        return opt.w.globals.labels[opt.dataPointIndex];
      },
      textAnchor: "start",
      offsetX: 0,
      dropShadow: {
        enabled: false
      }
    },
    xaxis: {
      categories: data.data.map((item) => item.title)
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
        alignItems: "flex-start",
        p: 3,
        borderRadius: 1,
        width: "100%",
        height: "100%",
        ...sx
      }}
      {...other}
    >
      <Stack width="100%" height="100%" justifyContent="space-around" gap={2}>
        <Stack>
          <Typography variant="body1" fontWeight={900}>
            {data.name}
          </Typography>
        </Stack>
        <Stack
          direction="row"
          gap={2}
          alignItems="flex-start"
          justifyContent="space-between"
        >
          <Typography
            variant="body1"
            fontWeight={900}
            color={theme.palette.background.main}
          >
            {data.amount.toLocaleString()}
          </Typography>
          <Typography variant="caption">{data.amountTitle}</Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between" width="100%">
          <Typography variant="body2">{data.rankingKey}</Typography>
          <Typography variant="body2">{data.rankingValue}</Typography>
        </Stack>
        <Grid container pt={2}>
          <Grid item xs={10}>
            <Chart
              dir="ltr"
              type="bar"
              series={[{ data: series }]}
              // @ts-ignore
              options={chartOptions}
              width="100%"
              height={150}
            />
          </Grid>
          <Grid
            item
            display="flex"
            flexDirection="column"
            justifyContent="space-around"
            xs={2}
          >
            {series.map((item, index) => (
              <Typography variant="body2" textAlign="right" key={index}>
                {item.toLocaleString()}
              </Typography>
            ))}
          </Grid>
        </Grid>
      </Stack>
    </Card>
  );
}
