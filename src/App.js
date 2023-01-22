import "./App.css";
import React, { useState } from "react";

// https://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid={api_key}
// https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API_key}&units=metric

function App() {
  const [cityName, setCityName] = useState("");
  const [coords, setCoords] = useState("");
  const [currentWeather, setCurrentWeather] = useState(null);
  const [hourlyForecast, setHourlyForecast] = useState(null);
  const [dailyForecast, setDailyForecast] = useState(null);
  const [address, setAddress] = useState(null)
  const limit = 5;
  const units = "metric";

  const getCoords = async () => {
    const url = `/.netlify/functions/owmCityName?cityName=${cityName}&limit=${limit}`;
    try {
      const response = await fetch(url).then((res) => res.json());
      // console.log(response);
      setCoords(response[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const getWeather = async () => {
    const { lat, lon } = coords;
    const url = `/.netlify/functions/owmWeather?lat=${lat}&lon=${lon}&units=${units}`;
    try {
      const response = await fetch(url).then((res) => res.json());
      // console.log(response);
      setCurrentWeather(response.current);
      setHourlyForecast(response.hourly);
      setDailyForecast(response.daily);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetAddress = async () => {
    const { lat, lon } = coords;
    const url = `/.netlify/functions/reverseGeocoding?lat=${lat}&lon=${lon}`;
    try {
      const response = await fetch(url).then((res) => res.json());
      // console.log(response);
      setAddress(response.results[0].formatted_address)
    } catch (error) {
      console.log(error)
    }
  };

  const handleInputChange = (e) => {
    setCityName(e.target.value);
  };

  const handleGetCoords = (e) => {
    getCoords();
  };

  const handleGetWeather = (e) => {
    getWeather();
  };

  return (
    <div className="App">
      <input
        onChange={handleInputChange}
        name="city"
        type="text"
        placeholder="city"
        value={cityName}
      />

      <button onClick={handleGetCoords}>Get coordinates</button>

      <h1>{cityName}</h1>
      {coords && (
        <>
          <h1>
            {coords.name}, {coords.country}
          </h1>
          <h2>
            {coords.lat}, {coords.lon}
          </h2>
        </>
      )}
      <p />
      <button onClick={handleGetWeather}>Get weather</button>
      {currentWeather && (
        <>
          <h1>{currentWeather.weather[0].description}</h1>
          <h2>
            Temp: {currentWeather.main.temp} deg C, Wind speed:{" "}
            {currentWeather.wind.speed} m/s
          </h2>
          {hourlyForecast && (
            <h2>Hourly: {hourlyForecast.list[0].weather[0].description}</h2>
          )}
          {dailyForecast && (
            <h2>Daily: {dailyForecast.list[0].weather[0].description}</h2>
          )}
        </>
      )}
      <p />
      <button onClick={handleGetAddress}>Get Address</button>
      {address && (
        <>
          <h1>{address}</h1>
        </>
      )}

    </div>
  );
}

export default App;
