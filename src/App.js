import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ScratchChart from './ScratchChart';
import DataChart from './DataChart';

function App() {
  // const [dataset1, setDataset1] = useState([]);
  // const [dataset2, setDataset2] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get('http://127.0.0.1:8000/charts/data-by-datetime/', {
  //         params: {
  //           start_datetime: '2023-02-19T00:14:29',
  //           end_datetime: '2023-02-19T22:00:00'
  //         }
  //       });
  //       // Assuming the API returns data in the same format as the sample you provided
  //       setDataset1(response.data.dataset1);
  //       setDataset2(response.data.dataset2);
  //       setLoading(false);
  //     } catch (error) {
  //       setError(error.message);
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, []);

  // if (loading) return <div>Loading...</div>;
  // if (error) return <div>Error: {error}</div>;

  return (
    <div className="App">
      {/* <h1>Scratch Movement Visualization</h1> */}
      <DataChart />
    </div>
  );
}

export default App;
