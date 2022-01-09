const request = require("postman-request");
const geocode = (location, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=pk.eyJ1IjoiYXVuZy1jaGFuLW9vIiwiYSI6ImNreTM1M3hrZjBzNHkycHJtenJ0bWR1N3UifQ.WrOHslCbafA5gS4GGRm7yg`;
  request({ url: url, json: true }, (err, res) => {
    if (err) {
      calllback(undefined, "Unable to connect location service");
    } else if (res.body.features.length == 0) {
      callback(undefined, "Unable to find location");
    } else {
      const data = res.body;
      const lat = data.features[0].geometry.coordinates[0];
      const long = data.features[0].geometry.coordinates[1];
      const loc = data.features[0].place_name;

      callback({ lat: lat, long: long, loc: loc }, undefined);
    }
  });
};
module.exports = { geocode };
