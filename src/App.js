import "./App.css";
import React, { useState } from "react";

// http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid={api_key}
// https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}&units=metric

function App() {
  const [cityName, setCityName] = useState("");
  const [coords, setCoords] = useState("");
  const [weather, setWeather] = useState(null);
  const limit = 5;
  const units = "metric"

  const getCoords = async () => {
    const url = `/.netlify/functions/owmCityName?cityName=${cityName}&limit=${limit}`;
    try {
      const response = await fetch(url).then((res) => res.json())
      // console.log("App: response");
      console.log(response);
      setCoords(response[0])
    } catch (err) {
      console.log("App: err");
      console.log(err);
    }
  };

  const getWeather = async () => {
    const {lat, lon} = coords
    const url = `/.netlify/functions/owmWeather?lat=${lat}&lon=${lon}&units=${units}`;
    try {
      const response = await fetch(url).then((res) => res.json())
      // console.log("App: response");
      console.log(response);
      setWeather(response)
    } catch (err) {
      console.log("App: err");
      console.log(err);
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
      <p/>
      <button onClick={handleGetWeather}>Get weather</button>
      {weather && (
        <>
          <h1>
            {weather.weather[0].description}
          </h1>
          <h2>
            Temp: {weather.main.temp} deg C, Wind speed: {weather.wind.speed} m/s
          </h2>
        </>
      )}

    </div>
  );
}

export default App;
