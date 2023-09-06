import React, { useState } from 'react';
import './style.css';
import ReactDOM from 'react-dom/client';
import VFXBreakdown from './components/Scene.jsx';

function App() {
  return (
    <VFXBreakdown />
  );
}

const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(<App />);