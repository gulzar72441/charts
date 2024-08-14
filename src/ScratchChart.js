import React from "react";
import { Line } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, TimeScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import "chartjs-adapter-date-fns";

// Register the necessary components
Chart.register(CategoryScale, LinearScale, TimeScale, PointElement, LineElement, Title, Tooltip, Legend);

const ScratchChart = ({ dataset1, dataset2 }) => {
  const data = {
    labels: dataset1.map(d => new Date(d.timestamp)),
    datasets: [
      {
        label: "Gyroscope X",
        data: dataset1.map(d => d.x),
        borderColor: "red",
        fill: false,
        stepped: true, // Enable stepped line
      },
      {
        label: "Gyroscope Y",
        data: dataset1.map(d => d.y),
        borderColor: "green",
        fill: false,
        stepped: true, // Enable stepped line
      },
      {
        label: "Gyroscope Z",
        data: dataset1.map(d => d.z),
        borderColor: "blue",
        fill: false,
        stepped: true, // Enable stepped line
      },
      {
        label: "Accelerometer X",
        data: dataset2.map(d => d.x),
        borderColor: "orange",
        fill: false,
        stepped: true, // Enable stepped line
      },
      {
        label: "Accelerometer Y",
        data: dataset2.map(d => d.y),
        borderColor: "purple",
        fill: false,
        stepped: true, // Enable stepped line
      },
      {
        label: "Accelerometer Z",
        data: dataset2.map(d => d.z),
        borderColor: "brown",
        fill: false,
        stepped: true, // Enable stepped line
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: "time",
        time: {
          unit: "minute",
        },
        title: {
          display: true,
          text: "Time",
        },
      },
      y: {
        title: {
          display: true,
          text: "Sensor Values",
        },
      },
    },
  };

  return <Line data={data} options={options} />;
};

// // export default ScratchChart;
// import React from 'react';
// // Adjust the import path based on where you placed the files
// import CanvasJSReact from '@canvasjs/react-charts';
// var CanvasJS = CanvasJSReact.CanvasJS;
// var CanvasJSChart = CanvasJSReact.CanvasJSChart;

// const ScratchChart = ({ dataset1, dataset2 }) => {
//   const processDataset = (dataset) => {
//     return dataset.map((item) => ({
//       x: new Date(item.timestamp),
//       yX: item.x,
//       yY: item.y,
//       yZ: item.z,
//     }));
//   };

//   const data1 = processDataset(dataset1);
//   const data2 = processDataset(dataset2);

//   const options = {
//     animationEnabled: true,
//     theme: "light2",
//     title: {
//       text: "Scratch Detection Over Time"
//     },
//     axisX: {
//       title: "Time",
//       valueFormatString: "HH:mm:ss"
//     },
//     axisY: {
//       title: "Values",
//       includeZero: false,
//     },
//     data: [
//       {
//         type: "line",
//         name: "Dataset 1 - X Axis",
//         showInLegend: true,
//         dataPoints: data1.map((point) => ({ x: point.x, y: point.yX })),
//       },
//       {
//         type: "line",
//         name: "Dataset 1 - Y Axis",
//         showInLegend: true,
//         dataPoints: data1.map((point) => ({ x: point.x, y: point.yY })),
//       },
//       {
//         type: "line",
//         name: "Dataset 1 - Z Axis",
//         showInLegend: true,
//         dataPoints: data1.map((point) => ({ x: point.x, y: point.yZ })),
//       },
//       {
//         type: "line",
//         name: "Dataset 2 - X Axis",
//         showInLegend: true,
//         dataPoints: data2.map((point) => ({ x: point.x, y: point.yX })),
//       },
//       {
//         type: "line",
//         name: "Dataset 2 - Y Axis",
//         showInLegend: true,
//         dataPoints: data2.map((point) => ({ x: point.x, y: point.yY })),
//       },
//       {
//         type: "line",
//         name: "Dataset 2 - Z Axis",
//         showInLegend: true,
//         dataPoints: data2.map((point) => ({ x: point.x, y: point.yZ })),
//       },
//     ],
//   };

//   return <CanvasJSChart options={options} />;
// };

 export default ScratchChart;
