import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { getPatients } from './patient';

// Material UI font imports
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


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
