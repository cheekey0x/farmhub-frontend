import Chart, { useChart } from "src/components/chart";
import { useResponsive } from "src/hooks/use-responsive";

// ----------------------------------------------------------------------

type Props = {
  series: number[];
  labels?: string[];
};

export default function ChartDonut({ series, labels }: Props) {
  const chartOptions = useChart({
    labels: labels || ["Rental", "Property Taxes", "Other value"],
    stroke: {
      show: false
    },
    legend: {
      horizontalAlign: "center"
    },
    tooltip: {
      fillSeriesColor: false
    },
    plotOptions: {
      pie: {
        donut: {
          size: "65"
        },
        expandOnClick: true
      }
    },
    colors: ["#CCCCED", "#9881D6", "#6C47D4"]
  });

  const mdUp = useResponsive("up", "md");

  return (
    <Chart
      dir="ltr"
      type="donut"
      series={series}
      options={chartOptions}
      width={mdUp ? 400 : 340}
      height="auto"
    />
  );
}
