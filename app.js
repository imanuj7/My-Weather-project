const express=require("express");
const bodyParser=require("body-parser");
const https=require("https");
const app=express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));

app.get("/",function(req,res){

  res.sendFile(__dirname+"/index.html");

});


app.post("/",function(req,res){
  const query=req.body.cityName;
  // const apiKey= "take your api key from openweathermap.com";
  const unit="metric";
  const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+unit;
  https.get(url,function(response){
    console.log(response.statusCode);
    response.on("data",function(data){
      const weatherData=JSON.parse(data);
      const temp=weatherData.main.temp;
      const weatherDescription=weatherData.weather[0].description;
      const icon=weatherData.weather[0].icon;
      const imageURL="http://openweather.org/img/wn"+icon+"@2x.png";
      res.render("result",{discrip:weatherDescription,query:query,temp:temp,img:imageURL});

    });
  });

});
app.listen(3000,function(){
  console.log("server at port 3000");
});
