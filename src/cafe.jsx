import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Restaurants from './restaurants';

export default function Cafe() {
  const [data, setData] = useState(null)
  const location = useLocation();
  const { countryCode } = location.state || {};
  useEffect(() => {
    console.log(countryCode)
  }, [])
  return (
    <div>
      <div className="h-full pb-80">
        <div className="m-auto grid max-w-full px-12 py-12 lg:max-w-6xl lg:grid-cols-2 lg:gap-4">
          <div className="">
           
            <div className="my-4">
              <h1 className="text-4xl underline font-mono">{(countryCode.RestaurantName).toUpperCase()}</h1>
            </div>
            <img
              src={
                'https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80'
              }
              width={740}
              height={360}
              className="max-h-[420px] min-w-full max-w-full rounded-lg border-2 sepia lg:max-w-[470px] "
              alt={'Coffee Store Image'}
            />
          </div>
          <div>
            <h4 className='text-2xl'>{countryCode.Address}</h4>
            <h4 className='text-xl'>we  only accept{countryCode.Currency}</h4>
            <h4>{ }</h4>

          </div>
        </div>
      </div>


    </div>
  );

}
