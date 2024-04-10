import React, { useEffect, useState } from "react";
import { Link, useLocation,useNavigate  } from "react-router-dom";
import * as Papa from "papaparse";

export default function Restaurants() {
  const [data, setData] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const countryCode = Number(location.pathname.split("/").pop()); // Convert countryCode to number
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data/restaurants.csv");
        const responseText = await response.text();

        var file = Papa.parse(responseText, {
          header: true,
        });
        // Filter data by countryCode
        const filteredData = file.data.filter(
          (x) => Number(x.CountryCode) === countryCode
        );
        setData(filteredData);
        console.log(filteredData); // Log filtered data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [countryCode]);

  const handleClick = (e) => {
    console.log(e)
    navigate("/cafe", {
      state: {
        countryCode:e
      }
    });
  };
  return (
    <div>
      <h1>Restaurants in Country Code: {countryCode}</h1>
      <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-2 lg:grid-cols-3 lg:gap-6">
      {data?.map((restaurant) => (
        <div key={restaurant.RestaurantID} className="border p-4">
          <div className="flex justify-between">
            <h3>{restaurant.RestaurantName}</h3>
            <h2
              className={`flex ${
                restaurant.RatingText === "Excellent"
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
          {/* Link to navigate to the Cafe component with restaurant data */}
          <button  onClick={() => handleClick(restaurant)} >Go to Cafe</button>
        </div>
      ))}
      </ul>
    </div>
  );
}
