import React, { useState } from "react";

function Express () { 
  const [cityName, setCityName] = useState("");
  const [coords, setCoords] = useState("");
  const limit = 5;

  const getCoordsExpress = async () => {
    const url = `http://localhost:8000/coords?cityName=${cityName}&limit=${limit}`;
    try {
      const response = await fetch(url).then((res) => res.json());
      // console.log(response);
      setCoords(response[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (e) => {
    setCityName(e.target.value);
  };

  const handleGetCoords = (e) => {
    getCoordsExpress();
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

      <button onClick={handleGetCoords}>Get Express coordinates</button>
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
    
    </div>
  )
}

export default Express;