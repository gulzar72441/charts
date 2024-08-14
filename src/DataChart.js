import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const DataChart = () => {
  const [fileNames2s, setFileNames2s] = useState([]);
  const [fileNames5s, setFileNames5s] = useState([]);
  const [selectedFile2s, setSelectedFile2s] = useState("");
  const [selectedFile5s, setSelectedFile5s] = useState("");
  const [uniqueDates2s, setUniqueDates2s] = useState([]);
  const [uniqueDates5s, setUniqueDates5s] = useState([]);
  const [selectedDate2s, setSelectedDate2s] = useState("");
  const [selectedDate5s, setSelectedDate5s] = useState("");
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    // Fetch unique dates for both datasets
    axios
      .get("http://127.0.0.1:8000/charts/unique-dates/")
      .then((response) => {
        setUniqueDates2s(response.data.unique_dates_2s);
        setUniqueDates5s(response.data.unique_dates_5s);
      })
      .catch((error) => console.error(error));

    // Fetch file names for 2s dataset
    axios
      .get("http://127.0.0.1:8000/charts/list-files?datasetType=2s")
      .then((response) => {
        setFileNames2s(response.data);
      })
      .catch((error) => console.error(error));

    // Fetch file names for 5s dataset
    axios
      .get("http://127.0.0.1:8000/charts/list-files?datasetType=5s")
      .then((response) => {
        setFileNames5s(response.data);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleFetchData = () => {
    // Replace this with your data-fetching logic if needed
  };

  const data = {
    labels: chartData?.dataset1?.map((data) => data.timestamp) || [],
    datasets: [
      {
        label: "Scratch",
        data: chartData?.dataset1?.map((data) => (data.scratch ? 1 : 0)) || [],
        borderColor: "rgba(255, 99, 132, 1)",
        fill: false,
        stepped: true,
      },
      {
        label: "X",
        data: chartData?.dataset1?.map((data) => data.x) || [],
        borderColor: "rgba(54, 162, 235, 1)",
        fill: false,
      },
      // Add similar datasets for Y, Z, ENMO
    ],
  };

  return (
    <div className="container">
      <h1>Data Selection</h1>

      <div className="form-group">
        <label htmlFor="fileSelect2s">Select 2s Dataset File</label>
        <select
          id="fileSelect2s"
          className="form-control"
          value={selectedFile2s}
          onChange={(e) => setSelectedFile2s(e.target.value)}
        >
          <option value="" disabled>
            Select a file...
          </option>
          {fileNames2s.map((file) => (
            <option key={file} value={file}>
              {file}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="fileSelect5s">Select 5s Dataset File</label>
        <select
          id="fileSelect5s"
          className="form-control"
          value={selectedFile5s}
          onChange={(e) => setSelectedFile5s(e.target.value)}
        >
          <option value="" disabled>
            Select a file...
          </option>
          {fileNames5s.map((file) => (
            <option key={file} value={file}>
              {file}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="dateSelect2s">Select Date for 2s Dataset</label>
        <select
          id="dateSelect2s"
          className="form-control"
          value={selectedDate2s}
          onChange={(e) => setSelectedDate2s(e.target.value)}
        >
          <option value="" disabled>
            Select a date...
          </option>
          {uniqueDates2s.map((date) => (
            <option key={date} value={date}>
              {date}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="dateSelect5s">Select Date for 5s Dataset</label>
        <select
          id="dateSelect5s"
          className="form-control"
          value={selectedDate5s}
          onChange={(e) => setSelectedDate5s(e.target.value)}
        >
          <option value="" disabled>
            Select a date...
          </option>
          {uniqueDates5s.map((date) => (
            <option key={date} value={date}>
              {date}
            </option>
          ))}
        </select>
      </div>

      <button className="btn btn-primary mt-2" onClick={handleFetchData}>
        Fetch Data
      </button>

      {chartData && (
        <div>
          <h2>Chart</h2>
          <Line data={data} />
        </div>
      )}
    </div>
  );
};

export default DataChart;
