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
        console.log(filteredData)
        setData(filteredData);
        console.log(filteredData); // Log filtered data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [countryCode,hasTableBooking,hasOnlineDelivery,cuisineFilter]);

  const handleClick = (e) => {
    console.log(e)
    navigate("/cafe", {
      state: {
        countryCode: e
      }
    });
  };
  return (
    <div>
      <h1>Restaurants  Code: {place}</h1>
      <div className="flex mb-4">
        <label className="mr-2">
          <input type="checkbox" checked={hasTableBooking} onChange={() => setHasTableBooking(!hasTableBooking)} />
          <span className="ml-1">Has Table Booking</span>
        </label>
        <label className="mr-2">
          <input type="checkbox" checked={hasOnlineDelivery} onChange={() => setHasOnlineDelivery(!hasOnlineDelivery)} />
          <span className="ml-1">Has Online Delivery</span>
        </label>
        <label>
          <span className="mr-2">Cuisine:</span>
          <input type="text" value={cuisineFilter} onChange={e => setCuisineFilter(e.target.value)} className="border border-gray-300 px-2 py-1 rounded-md" />
        </label>
      </div>
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
