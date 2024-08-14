import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";  // Ensure this import is present
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { format, parseISO } from 'date-fns';

const DataChart = () => {
  const [file2s, setFile2s] = useState(null);
  const [file5s, setFile5s] = useState(null);
  const [fileNames2s, setFileNames2s] = useState([]);
  const [fileNames5s, setFileNames5s] = useState([]);
  const [selectedFile2s, setSelectedFile2s] = useState("");
  const [selectedFile5s, setSelectedFile5s] = useState("");
  const [uniqueDates2s, setUniqueDates2s] = useState([]);
  const [uniqueDates5s, setUniqueDates5s] = useState([]);
  const [selectedDate2s, setSelectedDate2s] = useState("");
  const [selectedDate5s, setSelectedDate5s] = useState("");
  const [chartData, setChartData] = useState(null);

  // Fetch file names for 2s dataset
  useEffect(() => {
    axios
      .get("http://localhost:8000/charts/list-files?datasetType=2s")
      .then((response) => {
        setFileNames2s(response.data.files);
      })
      .catch((error) => console.error("Error fetching 2s files:", error));
  }, []);

  // Fetch file names for 5s dataset
  useEffect(() => {
    axios
      .get("http://localhost:8000/charts/list-files?datasetType=5s")
      .then((response) => {
        setFileNames5s(response.data.files);
      })
      .catch((error) => console.error("Error fetching 5s files:", error));
  }, []);

  const handleFileUpload = (file, datasetType) => {
    const formData = new FormData();
    formData.append('datasetType', datasetType);
    formData.append('filePath', file);  // Use 'file' instead of 'filePath'
  
    return axios.post('http://localhost:8000/charts/upload/', formData)
      .then(response => {
        console.log(`File uploaded for ${datasetType}:`, response.data);
        return response.data;
      })
      .catch(error => {
        console.error(`Error uploading ${datasetType} file:`, error);
        throw error;  // Ensure the error is propagated for Promise.all to catch
      });
  };
  
  const handleUpload = () => {
    const filename2s = file2s ? file2s.name : "";
    const filename5s = file5s ? file5s.name : "";
    const upload2s = filename2s ? handleFileUpload(filename2s, '2s') : Promise.resolve();
    const upload5s = filename5s ? handleFileUpload(filename5s, '5s') : Promise.resolve();
  
    Promise.all([upload2s, upload5s])
    .then((responses) => {
      // Check if both responses are successful
      const allSuccess = responses.every(response => response.success === true);
      if (allSuccess) {
        alert('File names sent successfully.');
      } else {
        alert('Error sending information for one or both files.');
      }
    })
    .catch(error => console.error('Error sending file names:', error));
};
  const handleFetchData = () => {
    if (!selectedFile2s || !selectedFile5s) {
      console.error("Please select files from both datasets.");
      return;
    }

    // Fetch unique dates based on selected files
    axios
      .get(`http://localhost:8000/charts/unique-dates`, {
        params: {
          file2s: selectedFile2s,
          file5s: selectedFile5s
        }
      })
      .then((response) => {
        setUniqueDates2s(response.data.unique_dates_2s);
        setUniqueDates5s(response.data.unique_dates_5s);
      })
      .catch((error) => console.error("Error fetching unique dates:", error));
  };

  const handleDateFetch = () => {
    // Logic to fetch chart data based on selected dates
    if (!selectedDate2s || !selectedDate5s) {
      console.error("Please select dates for both datasets.");
      return;
    }
    const formattedStartDatetime = format(parseISO(selectedDate2s), "yyyy-MM-dd'T'HH:mm:ss");
    const formattedEndDatetime = format(parseISO(selectedDate5s), "yyyy-MM-dd'T'HH:mm:ss");
    axios
      .get(`http://localhost:8000/charts/data-by-datetime`, {
        params: {
            start_datetime: formattedStartDatetime,
            end_datetime: formattedEndDatetime
        }
      })
      .then((response) => {
        setChartData(response.data);
      })
      .catch((error) => console.error("Error fetching chart data:", error));
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
      // Add similar datasets for Y, Z, ENMO if needed
    ],
  };

  return (
    <div className="container">
      <h1>Data Selection</h1>

      <div className="form-group">
  <label htmlFor="fileUpload2s">Select 2s Dataset File</label>
  <input
    type="file"
    id="fileUpload2s"
    className="form-control"
    onChange={(e) => setFile2s(e.target.files[0])}  // Capture file object
  />
</div>

<div className="form-group">
  <label htmlFor="fileUpload5s">Select 5s Dataset File</label>
  <input
    type="file"
    id="fileUpload5s"
    className="form-control"
    onChange={(e) => setFile5s(e.target.files[0])}  // Capture file object
  />
</div>

      <button className="btn btn-primary mt-2" onClick={handleUpload}>
        Upload Files
      </button>

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

      <button className="btn btn-primary mt-2" onClick={handleFetchData}>
        Fetch Dates
      </button>

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

      <button className="btn btn-primary mt-2" onClick={handleDateFetch}>
        Fetch Chart Data
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
