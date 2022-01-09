const express = require("express");
const port = process.env.PORT || 3000;
const app = express();
const path = require("path");
const hbs = require("hbs");
const pub_path = path.join(__dirname, "../public");
const views_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");
const { geocode } = require("./modules/geolocation.js");
const { forecast } = require("./modules/forecast.js");
app.set("view engine", "hbs");
app.set("views", views_path);
hbs.registerPartials(partials_path);
app.use(express.static(pub_path));
app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "ACO",
  });
});
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "ACO",
  });
});
app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "ACO",
  });
});
app.get("/weather", (req, res) => {
  const address = req.query.address;
  if (!address) {
    return res.send({
      error: "Address must be provided",
    });
  }

  geocode(address, ({ lat, long, loc } = {}, err) => {
    if (err) {
      return res.send({ err });
    }
    forecast({ lat: lat, long: long }, (data, err) => {
      if (err) {
        return res.send({ err });
      }
      res.send({
        address: address,
        forecast: data,
        location: loc,
      });
    });
  });
});
app.get("/help/*", (req, res) => {
  res.render("Help404");
});
app.get("*", (req, res) => {
  res.render("404");
});
app.listen(port, () => {
  console.log("Server is up on port " + port);
});
