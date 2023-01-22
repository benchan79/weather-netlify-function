import "./App.css";
import React, { useState } from "react";

function App() {
  const [cityName, setCityName] = useState("");
  const [weather, setWeather] = useState(null);

  const getURL = async () => {
    const url = `/.netlify/functions/owm?cityName=${cityName}`;
    try {
      const response = await fetch(url).then((res) => res.json())
      // console.log("App: response");
      console.log(response);
      setWeather(response[0])
    } catch (err) {
      console.log("App: err");
      console.log(err);
    }
  };

  const handleInputChange = (e) => {
    setCityName(e.target.value);
  };

  const handleOnClick = (e) => {
    getURL();
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

      <button onClick={handleOnClick}>Click</button>

      <h1>{cityName}</h1>
      {weather && (
        <>
          <h1>
            {weather.name}, {weather.country}
          </h1>
          <h2>
            {weather.lat}, {weather.lon}
          </h2>
        </>
      )}
    </div>
  );
}

export default App;
