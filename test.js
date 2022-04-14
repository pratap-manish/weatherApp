const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const https = require("https");
const { json } = require("express/lib/response");

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
    response.on("data", function (data) {
      const weather = JSON.parse(data);
      console.log(weather);
      res.write("current weather is " + weather.main.temp_max);

      res.write("humidity is " + weather.main.humidity);
      res.send();
    });
  });
});

app.listen(3000, function () {
  console.log("server started on port 3000");
});
