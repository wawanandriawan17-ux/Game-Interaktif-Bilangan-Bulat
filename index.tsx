import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// Mengambil elemen 'root' dari index.html
const rootElement = document.getElementById('root');

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
