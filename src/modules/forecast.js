const request = require("postman-request");

const forecast = ({ lat, long }, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=91eb3e0a5aadb8b9ca89f9d18ce19538&query=${encodeURIComponent(
    lat
  )},${long}?metric=f`;
  request({ url: url, json: true }, (err, res) => {
    if (err) {
      callback(undefined, "Unable to connect to API");
    } else if (!res.body.current) {
      callback(undefined, "Unable to fetch data");
    } else {
      const temp = res.body.current.temperature;
      const feelslike = res.body.current.feelslike;
      callback({ temp: temp, feelslike: feelslike }, undefined);
    }
  });
};

module.exports = { forecast };
