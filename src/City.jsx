
import { useState, useEffect } from "react";
import * as Papa from 'papaparse';
import { useNavigate } from 'react-router-dom';
function City() {
    const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState('New Zealand');


  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/data/Country-Code.csv');
      const responseText = await response.text();

      var file = Papa.parse(responseText, {
        header: true
      });
      setData(file.data);
    };

    fetchData();
  }, []);
    const handleClick = (e) => {
      
        const value = e?.CountryCode
      console.log(value)
      navigate(`/new-page/${value}`);
  }
  return (
    <div className="mt-20">
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-2 lg:grid-cols-3 lg:gap-6">
      {data?.map((e, index) => (
        <div key={index} className="border p-4">
          <button onClick={() => handleClick(e)} className="focus:outline-none">
            <h3>{e.Country}</h3>
          </button>
        </div>
      ))}
    </div>
  </div>
  
  )
}

export default City;