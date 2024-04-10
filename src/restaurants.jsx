import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import * as Papa from "papaparse";

export default function Restaurants() {
  const [data, setData] = useState(null);
  // const location = useLocation();
  const navigate = useNavigate();
  const { place, countryCode } = useParams();
  const [hasTableBooking, setHasTableBooking] = useState(false);
  const [hasOnlineDelivery, setHasOnlineDelivery] = useState(false);
  const [cuisineFilter, setCuisineFilter] = useState('');
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data/restaurants.csv");
        const responseText = await response.text();

        var file = Papa.parse(responseText, {
          header: true,
        });
        
        const filteredData = file.data.filter(
          (x) => place == "country" ? Number(x.CountryCode) == countryCode : Number(x.CityCode) == countryCode
        ).filter(restaurant => (!hasTableBooking || restaurant.HasTableBooking === 'Yes'))
          .filter(restaurant => (!hasOnlineDelivery || restaurant.HasOnlineDelivery === 'Yes'))
          .filter(restaurant => (!cuisineFilter || restaurant.Cuisines.includes(cuisineFilter)))
          .sort((a, b) => parseFloat(b.AggregateRating) - parseFloat(a.AggregateRating));
       
        setData(filteredData);
        console.log(filteredData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [countryCode,hasTableBooking,hasOnlineDelivery,cuisineFilter]);

  const handleClick = (e) => {
    
    navigate("/cafe", {
      state: {
        countryCode: e
      }
    });
  };
  return (
    <div>
      
   
      <h3 className="mb-4 font-semibold text-gray-900 dark:text-black">Filter</h3>
      <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
    <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
        <div className="flex items-center ps-3">
        <input type="checkbox" checked={hasOnlineDelivery} onChange={() => setHasOnlineDelivery(!hasOnlineDelivery)}  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
            <label for="vue-checkbox-list" className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Has Online Delivery</label>
        </div>
        </li>
        <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
          <div className="flex items-center ps-3">
          <input type="checkbox"  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" checked={hasTableBooking} onChange={() => setHasTableBooking(!hasTableBooking)} />
           <label for="vue-checkbox-list" className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Has Table Booking</label>
          </div>
        </li>
        <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
          <div className="flex items-center ps-3">
          <label>
          <span className="mr-2">Cuisine:</span>
          <input type="text" value={cuisineFilter} onChange={e => setCuisineFilter(e.target.value)} className="border border-gray-300 px-2 text-black py-1 rounded-md" />
        </label>
          </div>
          </li>
      </ul>
      
     
      <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-2 lg:grid-cols-3 lg:gap-6">
        {data?.map((restaurant) => (
          <div key={restaurant.RestaurantID} className="border p-4">
            <div className="flex justify-between">
              <h3>{restaurant.RestaurantName}</h3>
              <h2
                className={`flex ${restaurant.RatingText === "Excellent"
                    ? "text-green-700"
                    : restaurant.RatingText === "Very Good"
                      ? "text-green-500"
                      : restaurant.RatingText === "Good"
                        ? "text-yellow-500"
                        : "text-red-500"
                  } justify-between`}
              >
                {restaurant.AggregateRating} ({restaurant.Votes})
              </h2>
            </div>
            <h4>{restaurant.Address}</h4>

            <button className={"bg-orange-900 text-white w-full px-6 py-3 rounded-md"} onClick={() => handleClick(restaurant)} >Go to Cafe</button>
          </div>
        ))}
      </ul>
    </div>
  );
}
