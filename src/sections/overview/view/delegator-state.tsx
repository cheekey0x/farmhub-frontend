import { useState, useCallback } from "react";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import CardHeader from "@mui/material/CardHeader";
import ButtonBase from "@mui/material/ButtonBase";
import Card, { CardProps } from "@mui/material/Card";
import Iconify from "src/components/iconify";
import Chart, { useChart } from "src/components/chart";
import CustomPopover, { usePopover } from "src/components/custom-popover";
import { useTheme } from "@mui/material/styles";
// ...................................

interface Props extends CardProps {
  data: any;
}
// ...................................

const _chartTemp: {
  colors?: any[];
  categories: any[];
  series: any[];
  options?: any;
} = {
  categories: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ],
  series: [
    {
      year: "All",
      data: [
        {
          name: "Profit",
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        },
        {
          name: "Sales",
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        }
      ]
    },
    {
      year: "Last 1 Year",

      data: [
        {
          name: "Profit",
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        },
        {
          name: "Sales",
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        }
      ]
    },
    {
      year: "Last 1 Month",
      data: [
        {
          name: "Profit",
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        },
        {
          name: "Sales",
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        }
      ]
    },
    {
      year: "Last 1 Week",
      data: [
        {
          name: "Profit",
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        },
        {
          name: "Sales",
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        }
      ]
    },
    {
      year: "Today",
      data: [
        {
          name: "Profit",
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        },
        {
          name: "Sales",
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        }
      ]
    }
  ]
};

export default function Performance({ data, ...other }: Props) {
  // ...................................

  const [seriesData, setSeriesData] = useState("All");
  const theme = useTheme();
  // ...................................
  const { categories, series, options } = _chartTemp;
  const popover = usePopover();

  const chartOptions = useChart({
    colors: [theme.palette.background.main, theme.palette.background.light],
    fill: {
      opacity: [1, 1],
      type: ["solid", "solid"]
    },
    chart: {
      stacked: true
    },
    legend: {
      show: false
    },
    xaxis: {
      categories
    },
    tooltip: {
      custom({ series: seriesChartData, seriesIndex, dataPointIndex, w }) {
        return `<div class="arrow_box">
          <span>${w.globals.labels[dataPointIndex]}: ${seriesChartData[seriesIndex][dataPointIndex]}</span>
          </div>`;
      }
    },
    ...options
  });
  // ...................................

  const handleChangeSeries = useCallback(
    (newValue: string) => {
      popover.onClose();
      setSeriesData(newValue);
    },
    [popover]
  );
  // ...................................

  return (
    <>
      <Card sx={{ borderRadius: 1, ...other.sx }} {...other}>
        <CardHeader
          title={data.title}
          subheader={data.subtitle}
          action={
            <ButtonBase
              onClick={popover.onOpen}
              sx={{
                pl: 1,
                py: 0.5,
                pr: 0.5,
                borderRadius: 0.5,
                typography: "subtitle2",
                bgcolor: "background.neutral"
              }}
            >
              {seriesData}

              <Iconify
                width={16}
                icon={
                  popover.open
                    ? "eva:arrow-ios-upward-fill"
                    : "eva:arrow-ios-downward-fill"
                }
                sx={{ ml: 0.5 }}
              />
            </ButtonBase>
          }
        />

        {series.map((item) => (
          <Box key={item.year} sx={{ mt: 3, mx: 3 }}>
            {item.year === seriesData && (
              <Chart
                dir="ltr"
                type="bar"
                series={item.data}
                options={chartOptions}
                width="100%"
                height={364}
              />
            )}
          </Box>
        ))}
      </Card>

      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        sx={{ width: 140 }}
      >
        {series.map((option, index) => (
          <MenuItem
            key={index}
            selected={option.year === seriesData}
            onClick={() => handleChangeSeries(option.year)}
          >
            {option.year}
          </MenuItem>
        ))}
      </CustomPopover>
    </>
  );
}
