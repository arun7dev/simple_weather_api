const express = require("express");
const https = require("https");
const  bodyParser = require("body-parser");
const app = express();


app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
res.sendFile(__dirname + "/index.html");

})

app.post("/",function(req,res){
console.log(req.body.cityName);
const endpoint="https://api.weatherapi.com/v1/current.json";
const auth = "key=86ae0b33fdcd46f28d5155815213010";
const city = req.body.cityName;

  const url=endpoint+"?"+auth+"&q="+city+"&aqi=no";
  https.get(url,function(response)
  {
    console.log(response.statusCode );

    response.on("data",function(data){
      var weatherData=JSON.parse(data);
      var temp=weatherData.current.temp_c;
      var type=weatherData.current.condition.text;

      res.write("<h1>The temperature is "+ temp +"</h1>")
      res.write("<p>The weather  is "+ type +"</p>")
      res.send();

    })


  })
})



app.listen(3000,function(){
  console.log("connected to local host 3000")
})
