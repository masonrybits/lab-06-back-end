'use strict';

// bring in the express server
const express = require('express');

// dotenv connects my server to my .env and lets me use the variables in there
require('dotenv').config();

// initalize the express server
const app = express();

const PORT = process.env.PORT || 3003;

// routes
app.get('/location', (request, response) => {
  try {
    const city = request.query.data;

    const locationData = searchLatToLong(city);

    console.log(locationData);
    response.send(locationData);
  }
  catch (error) {
    console.error(error); // will turn the error message red if the environment supports it

    response.status(500).send('so sorry, something is not working on our end');
  }
});

app.get('*', (request, response) => {
  response.status(404).send('huh?');
});

function searchLatToLong(location) {
  const geoData = require('./data/geo.json');
  console.log(geoData);
  const locationObject = new Location(location, geoData);

  return locationObject;
}

function Location(city, geoData) {
  this.search_query = city;
  this.formatted_query = geoData.results[0].formatted_address;
  this.latitude = geoData.results[0].geometry.location.lat;
  this.longitude = geoData.results[0].geometry.location.lng;
}

// turn on the server
app.listen(PORT, () => console.log(`app is listening on ${PORT}`));