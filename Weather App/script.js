// const apiKey = "ad5da5686891400701733b8bab13d569 ";

// // load on start
// window.onload = getCurrentLocationWeather;

// // ================= GPS =================

// function getCurrentLocationWeather(){
//   navigator.geolocation.getCurrentPosition(pos=>{
//     loadWeather(`lat=${pos.coords.latitude}&lon=${pos.coords.longitude}`);
//   });
// }

// // ================= CITY =================

// function getWeather(){
//   const city = document.getElementById("citySelect").value;
//   loadWeather(`q=${city}`);
// }

// // ================= FETCH =================

// function loadWeather(query){

//   fetch(`https://api.openweathermap.org/data/2.5/weather?${query}&units=metric&appid=${apiKey}`)
//   .then(res=>res.json())
//   .then(data=>{
//     showWeather(data);
//     controlEffects(data.weather[0].main.toLowerCase());
//     controlDayNight(data.weather[0].icon);
//   });

//   fetch(`https://api.openweathermap.org/data/2.5/forecast?${query}&units=metric&appid=${apiKey}`)
//   .then(res=>res.json())
//   .then(showForecast);
// }

// // ================= CURRENT =================

// function showWeather(data){
//   city.innerText = data.name;
//   temp.innerText = Math.round(data.main.temp) + "°C";
//   desc.innerText = data.weather[0].description;
//   icon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
// }

// // ================= DAY NIGHT =================

// function controlDayNight(icon){

//   sun.style.display="none";
//   moon.style.display="none";

//   if(icon.includes("d")) sun.style.display="block";
//   if(icon.includes("n")) moon.style.display="block";
// }

// // ================= FORECAST =================


// function showForecast(data){

//   let html="";

//   for(let i=0;i<data.list.length;i+=8){

//     const d = data.list[i];
//     const day = new Date(d.dt_txt).toLocaleDateString("en-US",{weekday:"short"});
//     const icon = d.weather[0].icon;
//     const temp = Math.round(d.main.temp);

//     html += `
//       <div class="day-card">
//         <h4>${day}</h4>
//         <img src="https://openweathermap.org/img/wn/${icon}@2x.png">
//         <p>${temp}°C</p>
//       </div>
//     `;
//   }

//   forecast.innerHTML = html;
// }

// // ================= EFFECTS =================

// function controlEffects(type){

//   rain.innerHTML="";
//   clouds.style.display="none";

//   if(type.includes("rain")){
//     for(let i=0;i<150;i++){
//       let drop=document.createElement("div");
//       drop.className="drop";
//       drop.style.left=Math.random()*innerWidth+"px";
//       drop.style.animationDuration=(0.5+Math.random())+"s";
//       rain.appendChild(drop);
//     }
//   }

//   if(type.includes("cloud") || type.includes("mist")){
//     clouds.style.display="block";
//   }
// }
const apiKey = "ad5da5686891400701733b8bab13d569";

// Auto-load current location
window.onload = () => { getCurrentLocationWeather(); };

// ================= GPS Current Location
function getCurrentLocationWeather(){
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(pos=>{
      loadWeather(`lat=${pos.coords.latitude}&lon=${pos.coords.longitude}`);
    },()=>{ alert("Location denied. Select city."); });
  }
}

// ================= City Selector
function getWeather(){
  const city = document.getElementById("citySelect").value;
  if(city) loadWeather(`q=${city}`);
}

// ================= Fetch Weather + Forecast
function loadWeather(query){

  // Current Weather
  fetch(`https://api.openweathermap.org/data/2.5/weather?${query}&units=metric&appid=${apiKey}`)
  .then(res=>res.json())
  .then(data=>{
    showWeather(data);
    controlEffects(data.weather[0].main.toLowerCase());
    controlSunMoon(data.weather[0].icon);
    controlSkyGradient(data.weather[0].icon);
  });

  // Forecast
  fetch(`https://api.openweathermap.org/data/2.5/forecast?${query}&units=metric&appid=${apiKey}`)
  .then(res=>res.json())
  .then(showForecast);
}

// ================= Show Current Weather
function showWeather(data){
  document.getElementById("city").innerText = data.name;
  document.getElementById("temp").innerText = Math.round(data.main.temp)+"°C";
  document.getElementById("desc").innerText = data.weather[0].description;
  document.getElementById("humidity").innerText = "Humidity: "+data.main.humidity+"%";
  document.getElementById("wind").innerText = "Wind: "+Math.round(data.wind.speed)+" km/h";
  document.getElementById("icon").src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
}

// ================= Sun & Moon Control
function controlSunMoon(icon){
  const sun = document.getElementById("sun");
  const moon = document.getElementById("moon");
  sun.style.display="none"; moon.style.display="none";
  if(icon.includes("d")) sun.style.display="block";
  if(icon.includes("n")) moon.style.display="block";
}

// ================= Sky Gradient
function controlSkyGradient(icon){
  const sky = document.getElementById("sky");
  if(icon.includes("d")) sky.style.background="linear-gradient(to top,#87ceeb,#0f172a)";
  if(icon.includes("n")) sky.style.background="linear-gradient(to top,#0b0c2a,#1e293b)";
  if(icon.includes("rain") || icon.includes("drizzle")) sky.style.background="linear-gradient(to top,#4b79a1,#283e51)";
}

// ================= Rain + Clouds + Snow
function controlEffects(type){
  const rain=document.getElementById("rain");
  const clouds=document.getElementById("clouds");
  const snow=document.getElementById("snow");

  rain.innerHTML=""; clouds.style.display="none"; snow.innerHTML="";

  if(type.includes("rain")){
    for(let i=0;i<150;i++){
      let drop = document.createElement("div");
      drop.className="drop";
      drop.style.left = Math.random()*window.innerWidth+"px";
      drop.style.animationDuration = (0.5+Math.random())+"s";
      rain.appendChild(drop);
    }
  }

  if(type.includes("cloud") || type.includes("mist")){
    clouds.style.display="block";
  }

  if(type.includes("snow")){
    for(let i=0;i<100;i++){
      let flake = document.createElement("div");
      flake.className="snowflake";
      flake.style.left = Math.random()*window.innerWidth+"px";
      flake.style.animationDuration = (3+Math.random()*2)+"s";
      snow.appendChild(flake);
    }
  }
}

// ================= 5-Day Forecast
function showForecast(data){
  let html="";
  for(let i=0;i<data.list.length;i+=8){
    const d = data.list[i];
    const day = new Date(d.dt_txt).toLocaleDateString("en-US",{weekday:"short"});
    const icon = d.weather[0].icon;
    const temp = Math.round(d.main.temp);
    html+=`
      <div class="day-card">
        <h4>${day}</h4>
        <img src="https://openweathermap.org/img/wn/${icon}@2x.png">
        <p>${temp}°C</p>
      </div>
    `;
  }
  document.getElementById("forecast").innerHTML=html;
}