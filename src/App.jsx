import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import City from './City';
import Restaurants from './restaurants';
import Cafe from './cafe';

function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<City />} />
        <Route path="/catagories/:countryCode" element={<Restaurants />} />
        <Route path="/cafe" element={<Cafe />} />
    </Routes>
  </Router>
  );
}

export default App;