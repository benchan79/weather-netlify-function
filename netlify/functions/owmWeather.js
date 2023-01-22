const axios = require("axios");

const BASE_URL = `https://api.openweathermap.org/data/2.5/`;
const owmAPI = axios.create({ baseURL: BASE_URL });
// https://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid={api_key}
// https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}

exports.handler = async function (event, context) {
  // console.log(event);
  // console.log(context);
  try {
    const { lat, lon, units } = event.queryStringParameters;
    // console.log(lat, lon)
    const response = await owmAPI.get(
      `weather?lat=${lat}&lon=${lon}&appid=${process.env.OWM_API_KEY}&units=${units}`
    );
    // console.log(response.data[0])'

    return {
      statusCode: 200,
      // body: JSON.stringify({ 
      //   name: response.data[0].name,
      //   lat: response.data[0].lat,
      //   lon: response.data[0].lon, 
      // }),
      body: JSON.stringify(response.data),
    };
  } catch (err) {
    console.log(`owm: err`)
    if (err.response) { // status code out of the range of 2xx
      console.log("Data :" , err.response.data);
      console.log("Status :" + err.response.status);
    } else if (err.request) { // The request was made but no response was received
      console.log(err.request);
    } else {// Error on setting up the request
      console.log('Error', err.message);
    }
    return {
      statusCode: err.response.status,
      body: JSON.stringify(err.message),
    };
  }
};