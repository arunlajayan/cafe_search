import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import City from './City';
import Restaurants from './restaurants';

function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<City />} />
      <Route path="/new-page/:countryCode" element={<Restaurants />} />
    </Routes>
  </Router>
  );
}

export default App;