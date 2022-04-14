// const { on } = require("events");
const express = require("express");
const app = express();
const https = require("https");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});
app.post("/forecast", function (req, res) {
  var city = req.body.cityName;
  const link =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&units=metric&appid=342860a9d62dacdb97ffa028f4c8ce3c";
  https.get(link, function (response) {
    console.log(response.statusCode);
    response.on("data", function (data) {
      const weather = JSON.parse(data);
      console.log(weather);
      const desc = weather.weather[0].description;
      const a = weather.main.temp;
      const icon = weather.weather[0].icon;
      const img = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
      res.write(
        "<h1> the temp in " + city + " is " + a + " degree celcius </h1> "
      );
      res.write("<h2> " + desc + "</h2>");
      res.write("<img src=" + img + ">");
      res.send();
    });
  });
});

app.listen(3000, function () {
  console.log("server started");
});
