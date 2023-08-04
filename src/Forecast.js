import React, { useState } from 'react';
import axios from 'axios';
import './Forecast.css'

function Forecast() {
    const [forecast, setForecast] = useState({})
    const [zipCode, setZipCode] = useState('');
    const baseURL = `https://api.openweathermap.org/data/2.5/weather`

    const handleRequest = async (ev) => {
        ev.preventDefault();
        if (ev.key === "Enter") {
            const siteQuery = `?zip=${zipCode}&apikey=${process.env.REACT_APP_API_KEY}`;
            await axios.get(baseURL + siteQuery)
                .then(res => {
                    setForecast(res.data)
                    console.log(res.data)
                })
                .catch(error => console.log('There was a bug Dave', error));
            setZipCode("");
        }
    };

    const date = new Date();
    let daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var dayOfWeek = daysOfWeek[date.getDay()];
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var month = months[date.getMonth()];
    let todayDate = date.getDate();

    const handleInput = ev => {
        setZipCode(ev.target.value)
    }

    return (

        <div className="forecast-app">
            <div className="top-part">
                <input
                    type="text"
                    onKeyUp={handleRequest}
                    value={zipCode}
                    onChange={handleInput}
                    className="user-input"
                    placeholder="Enter Zipcode"
                />
            </div>
            {forecast && forecast.weather && forecast.sys && forecast.wind && (
                <div className="forecast-app">
                    <div className="weather-info">
                        <h2 className="location">{forecast.name.toUpperCase()},{forecast.sys.country}</h2>
                        <p className="date">{dayOfWeek}  {month} {todayDate}</p>
                        <img className="weather-icon" src={require(`./icons/${forecast.weather[0].icon}.svg`)} alt="" />
                        <p className="forecast-desc">{forecast.weather[0].description.toUpperCase()}</p>
                        <p className="temperature">{(1.8 * (forecast.main.temp - 273.15) + 32).toFixed(0)} °F </p>
                        <p className="temp-feelsLike">Feels like: {(1.8 * (forecast.main.feels_like - 273.15) + 32).toFixed(2)} °F </p>
                        <div className='air'>
                            <h3 className="humidity-header">HUMIDITY</h3>
                            <p className="humidity-info">{forecast.main.humidity}%</p>
                            <h3 className="wind-header">WIND SPEED</h3>
                            <p className="wind-info" id="wind-stuff">{(forecast.wind.speed * 2.236936).toFixed(2)} MPH</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Forecast;
