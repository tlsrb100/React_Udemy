import React from "react";

import ChartBar from './ChartBar';
import './Chart.css';
const Chart = (props) => {
  const dataPointValues = props.dataPoints.map(el => el.value);
  const totalMaximum = Math.max(...dataPointValues);

  return (
    <div className="chart">
      {props.dataPoints.map((el) => {
        return (
          <ChartBar
            key={el.label}
            value={el.value}
            maxValue={totalMaximum}
            label={el.label}
          />
        )
      })}
    </div>
  );
};

export default Chart;