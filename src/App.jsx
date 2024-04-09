import './App.css';
import { useState, useEffect } from "react";
import * as Papa from 'papaparse';

function App() {

  const [data, setData] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState('New Zealand');


  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/data.csv');
      const responseText = await response.text();

      var file = Papa.parse(responseText, {
        header: true
      });
      setData(file.data);
    };

    fetchData();
  }, []);
  return (
    <div>
      <h1>Restaurant List</h1>
      <div className="mt-20">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-2 lg:grid-cols-3 lg:gap-6">
          {data?.map((e, index) => (
            <div key={index} className="border p-4">
              <h3>{e.City}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App;