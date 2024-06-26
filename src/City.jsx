
import { useState, useEffect } from "react";
import * as Papa from 'papaparse';
import { useNavigate } from 'react-router-dom';
function City() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [city, setCity] = useState(null);
  const [isCountrySearchVisible, setIsCountrySearchVisible] = useState(true);
  // useEffect(() => {
  //   const handleScroll = () => {
  //     const countrySearchElement = document.getElementById('country-search');
  //     const citySearchElement = document.getElementById('city-search');
  //     console.log(countrySearchElement,citySearchElement)
  //     if (countrySearchElement && citySearchElement) {
  //       const countrySearchBottom = countrySearchElement.getBoundingClientRect().bottom;
  //       const citySearchTop = citySearchElement.getBoundingClientRect().top;
  //       setIsCountrySearchVisible(countrySearchBottom >= countrySearchBottom);
        
  //     }
  //   };

  //   window.addEventListener('scroll', handleScroll);
  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // }, []);
  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await fetch('/data/Country-Code.csv');
        const responseText = await response.text();

        var file = Papa.parse(responseText, {
          header: true
        });

        const cityResponse = await fetch('/data/City-Code.csv');
        const cityText = await cityResponse.text();
        var cityData = Papa.parse(cityText,
          {
            header: true
          });
        setData(file.data);
        setCity(cityData.data)
      }
      catch (e) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);
  const handleClick = (e) => {
    let value;
    if (e.CountryCode) {
       value = e?.CountryCode
   
    navigate(`/catagories/country/${value}`);
    } else if (e.CityCode) {
      value = e.CityCode
     
      navigate(`/catagories/city/${value}`);
    }
    
  }
  return (

    
    <div className="mt-20 ">
       <div id="country-search" >
        <h1 className="text-center text-4xl my-6 fixed top-0 left-0 w-full bg-white shadow-lg p-4">Country Search </h1>
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
      <div id="country-search">
      <h1 className="text-center text-4xl my-6">City Search </h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-2 lg:grid-cols-3 lg:gap-6">
        {city?.map((e, index) => (
          <div key={index} className="border p-4">
            <button onClick={() => handleClick(e)} className="focus:outline-none">
              <h3>{e.City}</h3>
            </button>
          </div>

        ))}
        </div>
        </div>
    </div>

  )
}

export default City;