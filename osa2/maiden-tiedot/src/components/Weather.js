import axios from 'axios';
import React, { useEffect,useState } from 'react';


const Weather = ({ country }) => {
  const [ weather, setWeather ] = useState(null);

  useEffect(() => {
    const api_key = process.env.REACT_APP_API_KEY;
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&units=metric&appid=${api_key}`)
      .then(res => setWeather(res.data))
      .catch(err => console.error(err))
  }, [country.capital])

  if (weather) {
    return (
      <div>
        <h3>Weather in {country.capital}</h3>
        <p><strong>Temperature: </strong>{weather.main.temp} celsius</p>
        <p><strong>Feels like: </strong>{weather.main.feels_like} celsius</p>
        <p><strong>Humidity: </strong>{weather.main.humidity} %</p>
        <p><strong>Wind speed: </strong>{weather.wind.speed} m/s</p>
      </div>
    )
  } else {
    return null;
  }
  
}

export default Weather;