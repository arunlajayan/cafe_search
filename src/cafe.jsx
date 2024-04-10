import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";
import { IoCloseCircle } from "react-icons/io5";
import { IoCloseCircleOutline } from "react-icons/io5";

import { FaMapMarkerAlt } from 'react-icons/fa';
export default function Cafe() {
  const [data, setData] = useState(null)
  const location = useLocation();
  const { countryCode } = location.state || {};
  const handleButtonClick = () => {
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${countryCode.latitude},${countryCode.longitude}`;
    window.open(googleMapsUrl, '_blank');
  };
  return (
    <div>
      <div className="h-full pb-80">
        <div className="m-auto grid max-w-full px-12 py-12 lg:max-w-6xl lg:grid-cols-2 lg:gap-4">

          <div className="my-4">
            <h1 className="text-4xl underline font-mono">{(countryCode.RestaurantName).toUpperCase()}</h1>


            <div className='border p-2 border-gray-200 text-stone-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700'>
              <h4 className='text-xl'>{countryCode.Address}</h4>
              <h4 className='text-sm '>We only accept {countryCode.Currency}</h4>
              <h4>Aggregate Rating: {countryCode.AggregateRating}</h4>
              <h4>Average Cost for Two: {countryCode.AverageCostForTwo}</h4>
              <h4>City Code: {countryCode.CityCode}</h4>
              <h4>Country Code: {countryCode.CountryCode}</h4>
              <h4>Cuisines: {countryCode.Cuisines}</h4>
              
              <h4>Locality: {countryCode.Locality}</h4>
              <h4>Locality Verbose: {countryCode.LocalityVerbose}</h4>
              <h4>Price Range: {countryCode.PriceRange}</h4>
              <h4>Rating Color: {countryCode.RatingColor}</h4>
              <h4>Rating Text: {countryCode.RatingText}</h4>
              <h4>Restaurant ID: {countryCode.RestaurantID}</h4>
              <h4>Restaurant Name: {countryCode.RestaurantName}</h4>
              
              <h4>Votes: {countryCode.Votes}</h4>
              <div className="flex flex-col gap-2">
      <h4 className="flex items-center">
        Has Online Delivery: { countryCode.HasOnlineDelivery === "Yes" ? <IoCheckmarkDoneCircleSharp className="text-green-500" /> : <IoCloseCircle className="text-red-500" />}
      </h4>
      <h4 className="flex items-center">
        Has Table Booking: { countryCode.HasTableBooking === "Yes" ? <IoCheckmarkDoneCircleSharp className="text-green-500" /> : <IoCloseCircle className="text-red-500" />}
      </h4>
      <h4 className="flex items-center">
        Is Delivering Now: { countryCode.IDeliveringNow === "Yes" ? <IoCheckmarkDoneCircleSharp className="text-green-500" /> : <IoCloseCircle className="text-red-500" />}
      </h4>
      <h4 className="flex items-center">
        Switch to Order Menu: { countryCode.SwitchToOrderMenu === "Yes" ? <IoCheckmarkDoneCircleSharp className="text-green-500" /> : <IoCloseCircle className="text-red-500" />}
      </h4>
    </div>
              <button onClick={handleButtonClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              <FaMapMarkerAlt className="mr-2" /> View
      </button>
            </div>

          </div>
        </div>
      </div>
   

    </div>
  );

}
