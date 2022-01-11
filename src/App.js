import './App.css';
import React, { useEffect } from 'react';
import { useState } from 'react';
// import Menu from './components/Menu';
import { WeatherData } from './components/WeatherData';
import axios from 'axios';

const apiKey = process.env.REACT_APP_API_KEY;
const atHereApi = process.env.REACT_APP_HERE_API_KEY;

const App = () => {

  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);
  const [weather, setWeather] = useState ([]);
  const [myLocation, setMyLocation] = useState ([]);

  const getLocation = (position) => {
    setLat(position.coords.latitude);
    setLong(position.coords.longitude);
  };
    
  function showAddress(loc) {
    setMyLocation(loc.items[0].address.city  +', '+ loc.items[0].address.state);
  };

  useEffect( () => {
    
    const getData = async () => {
      try {
        await navigator.geolocation.getCurrentPosition(
          getLocation
          );
        console.log(lat, long);
        const H = window.H;
        var platform = new H.service.Platform({
          "apikey": atHereApi
          });
        var geocoder = platform.getSearchService();
                    geocoder.reverseGeocode(
                        {
                            limit: 1,
                            at: lat + "," + long
                        }, loc => {
                            console.log(loc);
                            showAddress(loc);
                        }, error => {
                            console.error(error);
                        }
                
                );

          await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&units=imperial&appid=${apiKey}`)
          .then(response => response.data)
          .then(result => {
            setWeather(result);
            console.log(result);
          });
      } catch (err) {
        console.log(err);
      }
    }
  getData();
  }, [lat, long]);
    
return (
  // <Menu label='Show Weather'>
  <div>
    {(typeof weather.current != 'undefined') ? (
      <div className= {
        (weather.current.weather[0].main === 'Clouds') ? 'bg cloudy' : 
        (weather.current.weather[0].main === 'Clear') ? 'bg clear' : 
        (weather.current.weather[0].main === 'Snow') ? 'bg snow' : 
        (weather.current.weather[0].main === 'Rain') ? 'bg rain' : 
        (weather.current.weather[0].main === 'Thunderstorm') ? 'bg thunderstorm' : 'bg clear'
      }>
        <WeatherData address={myLocation} data={weather}/>
      </div>
    )
    :  ('loading...') 
    
    }
  </div>
  /* </Menu> */
  )
}
export default App;