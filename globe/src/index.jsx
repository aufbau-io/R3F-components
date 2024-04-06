import React, { useState } from 'react';
import './style.css';
import ReactDOM from 'react-dom/client';
import Globe from './components/Scene.jsx';

const BORDER_LINE_WIDTH = 1.5

export const COUNTRIES = {
  LONDON: [51.5074, -0.1278],
  TOKYO: [35.6895, 139.6917],
  MUMBAI: [19.0760, 72.8777],
  NEW_YORK: [40.7128, -74.0060],
  SYDNEY: [-33.8688, 151.2093],
  RIO_DE_JANEIRO: [-22.9068, -43.1729],
};

function App() {
  const [country, setCountry] = useState(COUNTRIES.NEW_YORK); // initial country
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