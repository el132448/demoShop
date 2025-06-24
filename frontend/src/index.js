import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // It helps you find potential problems early by intentionally activating extra checks and warnings.
  <React.StrictMode>
    <App />
  </React.StrictMode>
);