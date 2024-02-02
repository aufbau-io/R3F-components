import React, { useState } from 'react';
import './style.css';
import ReactDOM from 'react-dom/client';
import ParrallaxImageSearch from './components/Scene.jsx';

function App() {
  return (
    <ParrallaxImageSearch />
  );
}

const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(<App />);