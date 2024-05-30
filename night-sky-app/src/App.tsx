import React from 'react';
import './App.css';
import Skies from './views/skies';
import { Routes, Route } from "react-router-dom";
import SkyConstellations from './views/constelations';
import ConstellationStars from './views/stars';
import SkyForm from './views/sky-form';
import ConstellationForm from './views/constellation-form';
import StarForm from './views/star-form';

function App() {

  return (
  <Routes>
    <Route path="/" element={<Skies />}/>
    <Route path='/skies/new' element={<SkyForm />}/>
    <Route path="/skies/update/:skyId" element={<SkyForm />}/>
    <Route path="/skies/:skyId/constellations" element={<SkyConstellations />}/>
    <Route path="/skies/:skyId/constellations/new" element={<ConstellationForm />}/>
    <Route path="/skies/:skyId/constellations/update/:constellationId" element={<ConstellationForm />}/>
    <Route path="/skies/:skyId/constellations/:constellationId/stars" element={<ConstellationStars />}/>
    <Route path="/skies/:skyId/constellations/:constellationId/stars/new" element={<StarForm />}/>
    <Route path="/skies/:skyId/constellations/:constellationId/stars/update/:starId" element={<StarForm />}/>
  </Routes>
  )
}

export default App;
