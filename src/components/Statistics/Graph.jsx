import React from "react";
import css from "./Statistics.module.scss";
import ReactApexChart from "react-apexcharts";

const Graph = () => {
  const series = [
    {
      name: "series1",
      data: [31, 40, 28, 51, 42, 109, 100],
    },
  ];

  const options = {
    chart: {
      height: 500,
      type: "area",
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      type: "datetime",
      categories: [
        "2018-09-19T00:00:00.000Z",
        "2018-09-19T01:30:00.000Z",
        "2018-09-19T02:30:00.000Z",
        "2018-09-19T03:30:00.000Z",
        "2018-09-19T04:30:00.000Z",
        "2018-09-19T05:30:00.000Z",
        "2018-09-19T06:30:00.000Z",
      ],
    },
    tooltip: {
      x: {
        format: "dd/MM/yy HH:mm",
      },
    },
  };

  return (
    <div className={css.graph}>
      <h3>Rush Hours</h3>

      {/* Graph  */}
      <div className={css.graphContainer}>
        <div id="chartStatistics" className={css.chartStatistics}>
          <ReactApexChart
            options={options}
            series={series}
            type="area"
            // height={500}
          />
        </div>
        <div id="html-dist"></div>
      </div>
    </div>
  );
};

export default Graph;
