import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import * as Papa from 'papaparse';

export default function Restaurants() {
  const [data, setData] = useState(null);
  const location = useLocation();
  const countryCode = Number(location.pathname.split('/').pop()); // Convert countryCode to number
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/data/restaurants.csv');
        const responseText = await response.text();

        var file = Papa.parse(responseText, {
          header: true
        });
        // Filter data by countryCode
        const filteredData = file.data.filter((x) => Number(x.CountryCode) === countryCode);
        setData(filteredData);
        console.log(filteredData); // Log filtered data
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [countryCode]); // Add countryCode to dependency array

  return (
    <div>
      <h1>Restaurants in Country Code: {countryCode}</h1>
      <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-2 lg:grid-cols-3 lg:gap-6">
        {data?.map((restaurant) => (
          <li key={restaurant.RestaurantID} className="border p-4">
            <h3>{restaurant.RestaurantName}</h3>

          </li>
        ))}
      </ul>
    </div>
  );
}
