import React from 'react'
import { Chart } from "react-google-charts";

export const data = [
    ["Category", "Revenue Share"],
    ["Beverages", 12],
    ["Appetizers", 22],
    ["Pastas", 30],
    ["Pizzas", 28],
    ["Other", 8],
  ];
  
  export const options = {
    title: "Revenue Share",
    is3D: true,
  };

const PieChart = () => {
  return (
    <Chart
      chartType="PieChart"
      data={data}
      options={options}
      width={"100%"}
      height={"400px"}
    />
  )
}

export default PieChart