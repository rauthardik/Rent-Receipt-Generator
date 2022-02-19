import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Receipts from './Receipts';
import 'bootstrap/dist/css/bootstrap.min.css';
//import reportWebVitals from './reportWebVitals';
import Cookies from 'universal-cookie';


const getDataFromCookies = (cookieName, url) => {
  const cookies = new Cookies();
  return cookies.get(cookieName); // Pacman
}

//Gets the data from cookies if present , useful after accedential closure of the window.
var cachedRecords = {};
cachedRecords = getDataFromCookies('rent_receipts_app_cache', window.location.href);

ReactDOM.render(
  <React.StrictMode>
    <Receipts cached_records={cachedRecords}/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
