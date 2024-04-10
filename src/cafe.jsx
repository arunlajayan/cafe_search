import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function Cafe() {
    const [data, setData] = useState(null)
    const location = useLocation();
    const { countryCode } = location.state || {};
    useEffect(() => {
        console.log(countryCode)
    },[])
    return (
        <div>
          <h2>Child Component</h2>
         
         
        </div>
      );
    
}
