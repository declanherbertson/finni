import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { getPatients } from './patient';


// Test firebase connection
getPatients().then(qs => {
  qs.forEach((doc) => {
    console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
  });
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
