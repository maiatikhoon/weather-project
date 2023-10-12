

const express = require("express");

const https = require("https");
const bodyParser = require("body-parser");

const port = process.env.PORT || 3000 ; 
const app= express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req ,res){

  res.sendFile(__dirname+ "/index.html");
});

app.post("/", function(req ,res){
  const query = req.body.cityName;
  const apiKey = "9df68403c8c6054138d84502243eb653";
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" +apiKey+ "&units=" +unit+ "";


  https.get(url , function(response) {
        // console.log(response.statusCode);

      response.on("data", function(data){
        const weatherData = JSON.parse(data);
        // console.log(weatherData);
        const temp = weatherData.main.temp;
        let weatherDescr = weatherData.weather[0].description;
        // console.log(weatherDescr);
        // console.log(temp);
        const icon = weatherData.weather[0].icon;
        console.log(icon);
        const  imageURL= "http://openweathermap.org/img/wn/"+ icon +"@2x.png";


        res.write("<p>The weather is currently " + weatherDescr + "</p>");

        res.write("<h1>The temperture in "+ query +" is " + temp + " degree celcius </h1>");
        res.write("<img src = " + imageURL + ">");
        res.send();
      })
  })

})



app.listen( port , function(){
  console.log(`Server is running on port ${port} `);
});
