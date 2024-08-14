import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import ScratchChart from './ScratchChart';
import DataChart from './DataChart';


function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
      fetch('/data.json')
          .then(response => response.json())
          .then(data => setData(data))
          .catch(error => console.error('Error fetching JSON:', error));
  }, []);
  if (!data) return <div>Loading...</div>;

  return (
    <div className="App">
      <link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
  integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN"
  crossorigin="anonymous"
/>
         <div class="container">
      <h1>Scratch Movement Monitoring</h1>
   <div class="row">
    <div class="col-lg-10">
      {/* <ScratchChart dataset1={data.dataset1} dataset2={data.dataset2} /> */}
      <DataChart></DataChart>
      </div>
    </div>
      </div>
      <script src="https://cdn.jsdelivr.net/npm/react/umd/react.production.min.js" crossorigin></script>

<script
  src="https://cdn.jsdelivr.net/npm/react-dom/umd/react-dom.production.min.js"
  crossorigin></script>

<script
  src="https://cdn.jsdelivr.net/npm/react-bootstrap@next/dist/react-bootstrap.min.js"
  crossorigin></script>

    </div>
    
  );
}

export default App;
