var site = 'https://api.openweathermap.org/data/2.5/onecall?lat=37.77&lon=-122.41&units=imperial&appid=20218664feca793b07da2ba8243b7197';
var coords = 'http://api.openweathermap.org/geo/1.0/direct?q=Mumbai&limit=1&appid=20218664feca793b07da2ba8243b7197';
let cityLat;
let cityLon;

let currentCity = document.getElementById("cityAndDate");
// let currentDate;
let currentTemp = document.getElementById("currentTemp");
let currentWind = document.getElementById("currentWind");
let currentHumidity = document.getElementById("currentHumidity");
let currentUVIndex = document.getElementById("UVIndex");
let currentIcon = document.getElementById("currentIcon");

// Convert city to coordinates, pass coordinates to function to get weather
fetch(coords)
    .then(function (response) {
        // console.log(response);
        response.json().then(function (data) {
            // console.log(data);
            // console.log(data[0].lat);
            cityLat = data[0].lat;
            cityLon = data[0].lon;
            console.log("lat: " + cityLat + "\nlon: " + cityLon);


            oneCallWeather(cityLat, cityLon);
        })
    })

// Get weather given coordinates
function oneCallWeather(cityLat, cityLon) {
    var site = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + cityLat + '&lon=' + cityLon + '&units=imperial&appid=20218664feca793b07da2ba8243b7197';
    fetch(site)
        .then(function (response) {
            response.json().then(function (data) {
                // Current weather
                currentTemp.textContent = data.current.temp + "F";
                currentWind.textContent = data.current.wind_speed + "mph";
                currentHumidity.textContent = data.current.humidity + "%";
                currentUVIndex.textContent = data.current.uvi;
                var s = new Date(data.current.dt * 1000).toLocaleDateString("en-US");
                currentCity.textContent = "Mumbai " + s;
                var iconURL = 'https://openweathermap.org/img/wn/' + data.current.weather[0].icon + '.png';
                currentIcon.setAttribute("src", iconURL);
                console.log(iconURL);
                console.log(data.current.uvi);
                console.log(new Date(data.daily[1].dt * 1000).toLocaleDateString("en-US"));

                // Update 5-day forecast:
                for (let i = 0; i < 5; i++) {
                    let day = document.getElementById("day" + i);
                    let temperature = document.getElementById("day" + i + "Temp");
                    let wind = document.getElementById("day" + i + "Wind");
                    let humidity = document.getElementById("day" + i + "Humidity");
                    let forecastWeather = 'https://openweathermap.org/img/wn/' + data.daily[i+1].weather[0].icon + '.png';
                    document.getElementById(i+"Icon").setAttribute("src", forecastWeather);
                    day.textContent = new Date(data.daily[i+1].dt * 1000).toLocaleDateString("en-US");
                    temperature.textContent = "Temp: " + data.daily[i+1].temp.max + " F";
                    wind.textContent = "Wind: " + data.daily[i+1].wind_speed + "mph";
                    humidity.textContent = "Humidity: " + data.daily[i+1].humidity + "%";
                }
            })
        });
}