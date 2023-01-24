// const PORT = 8000
// const express = require('express')
// const cors = require('cors')
// const axios = require('axios')
// require('dotenv').config()

// const app = express()

// app.use(cors())

// app.get('/', (req,res) => {
//   res.json('hi from the backend')
// })

// app.get('/coords', (req,res) => {
//   const cityName = req.query.cityName
//   const limit = req.query.limit
//   const BASE_URL = `https://api.openweathermap.org/geo/1.0/`;
//   const owmAPI = axios.create({ baseURL: BASE_URL });
//   const getCoords = async () => {
//     try {
//       const response = await owmAPI.get(
//         `direct?q=${cityName}&limit=${limit}&appid=${process.env.OWM_API_KEY}`
//       );
//       // console.log(response.data)
//       res.json(response.data)
//     } catch (error) {
//       console.log(error)
//     }
//   }
//   getCoords()
// })

// app.listen(8000, () => console.log(`Server is running on port ${PORT}`))