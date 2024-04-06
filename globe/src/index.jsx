import React, { useState } from 'react';
import './style.css';
import ReactDOM from 'react-dom/client';
import Globe from './components/Scene.jsx';

const BORDER_LINE_WIDTH = 1.5

export const COUNTRIES = {
  // NORTH_POLE: [90, 0],
  // SOUTH_POLE: [-90, 0],
  LONDON: [51.5074, -0.1278],
  VANCOUVER: [49.2827, -123.1207],
  // MONTREAL: [45.5017, -73.5673],
  // MOHALI: [30.7046, 76.7179],
  MUMBAI: [19.0760, 72.8777],
  // BANGALORE: [12.9716, 77.5946],
  LOS_ANGELES: [34.0522, -118.2437],
  TORONTO: [43.6532, -79.3832],
  // CHENNAI: [13.0827, 80.2707],
  SYDNEY: [-33.8688, 151.2093]
};

function App() {
  const [country, setCountry] = useState(COUNTRIES.LOS_ANGELES); // initial country
  const [showTorus, setShowTorus] = useState(true); // showing the torus initially

  // Function to compare if two countries are the same based on their coordinates
  const isCountrySelected = (countryCoords) => {
    return country[0] === countryCoords[0] && country[1] === countryCoords[1];
  };

  return (
    <>
      <Globe country={country} showTorus={showTorus} borderLineWidth={BORDER_LINE_WIDTH} />
      <div className="controls">
        {Object.entries(COUNTRIES).map(([key, value]) => (
          <button
            key={key}
            onClick={() => setCountry(value)}
            className={isCountrySelected(value) ? 'selected-country' : ''}
          >
            {`Go to ${key.replace("_", " ")}`}
          </button>
        ))}
      </div>
    </>
  );
}

const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(<App />);