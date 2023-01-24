# Examples of hiding API keys

## 1. Using Netlify functions

https://eloquent-brioche-53e056.netlify.app

The API keys are stored as environment variables in Netlify.

The keys are then used in the backend to call the APIs using Netlify functions.

The frontend then fetches the data from the backend.

The Google API key is still exposed as the library @react-google-maps/api uses hooks for authentication.

## 2. Using express framework

The example.js uses the express framework for creating a mini backend in your machine. It's another way of keeping the API keys from the frontend.

The command below starts the mini backend. It must be started before `Get Express Coordinates` can be used.
```
npm run start:backend
```