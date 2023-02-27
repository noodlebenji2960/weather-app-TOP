import "./style.css"

import { fetchCurrentWeatherLogic } from "./fetch.js"
import { fetchForecastWeatherLogic } from "./fetch.js"
import { fetchCoordinatesGeocodingAPI } from "./fetch.js"
import  { fetchWeatherMapLogic } from "./fetch.js"
 
import cloudy from "./assets/icons/weather-cloudy.svg"
import partlyCloudy from "./assets/icons/weather-partly-cloudy.svg"
import foggy from "./assets/icons/weather-fog.svg"
import thunderstorm from "./assets/icons/weather-lightning-rainy.svg"
import rainy from "./assets/icons/weather-drizzle.svg"
import partlyRainy from "./assets/icons/weather-partly-rainy.svg"
import snowy from "./assets/icons/weather-snowy-heavy.svg"
import sunny from "./assets/icons/weather-sunny.svg"

const weatherConditionIconsArr = [
    {id:200, main:"Thunderstorm",    desc:"thunderstorm with light rain",        icon:"11d",    iconURL:thunderstorm},
    {id:201, main:"Thunderstorm",    desc:"thunderstorm with rain",              icon:"11d",    iconURL:thunderstorm},
    {id:202, main:"Thunderstorm",    desc:"thunderstorm with heavy rain",        icon:"11d",    iconURL:thunderstorm},
    {id:210, main:"Thunderstorm",    desc:"light thunderstorm",                  icon:"11d",    iconURL:thunderstorm},
    {id:211, main:"Thunderstorm",    desc:"thunderstorm",                        icon:"11d",    iconURL:thunderstorm},
    {id:212, main:"Thunderstorm",    desc:"heavy thunderstorm",                  icon:"11d",    iconURL:thunderstorm},
    {id:221, main:"Thunderstorm",    desc:"ragged thunderstorm",                 icon:"11d",    iconURL:thunderstorm},
    {id:230, main:"Thunderstorm",    desc:"thunderstorm with light drizzle",     icon:"11d",    iconURL:thunderstorm},
    {id:231, main:"Thunderstorm",    desc:"thunderstorm with drizzle",           icon:"11d",    iconURL:thunderstorm},
    {id:232, main:"Thunderstorm",    desc:"thunderstorm with heavy drizzle",     icon:"11d",    iconURL:thunderstorm},
    {id:300, main:"Drizzle",         desc:"light intensity drizzle",             icon:"09d",    iconURL:rainy},
    {id:301, main:"Drizzle",         desc:"drizzle",                             icon:"09d",    iconURL:rainy},
    {id:302, main:"Drizzle",         desc:"heavy intensity drizzle",             icon:"09d",    iconURL:rainy},
    {id:310, main:"Drizzle",         desc:"light intensity drizzle rain",        icon:"09d",    iconURL:rainy},
    {id:311, main:"Drizzle",         desc:"drizzle rain",                        icon:"09d",    iconURL:rainy},
    {id:312, main:"Drizzle",         desc:"heavy intensity drizzle rain",        icon:"09d",    iconURL:rainy},
    {id:313, main:"Drizzle",         desc:"shower rain and drizzle",             icon:"09d",    iconURL:rainy},
    {id:314, main:"Drizzle",         desc:"heavy shower rain and drizzle",       icon:"09d",    iconURL:rainy},
    {id:321, main:"Drizzle",         desc:"shower drizzle",                      icon:"09d",    iconURL:rainy},
    {id:500, main:"Rain",            desc:"light rain",                          icon:"10d",    iconURL:partlyRainy},
    {id:501, main:"Rain",            desc:"moderate rain",                       icon:"10d",    iconURL:partlyRainy},
    {id:502, main:"Rain",            desc:"heavy intensity rain",                icon:"10d",    iconURL:partlyRainy},
    {id:503, main:"Rain",            desc:"very heavy rain",                     icon:"10d",    iconURL:partlyRainy},
    {id:504, main:"Rain",            desc:"extreme rain",                        icon:"10d",    iconURL:partlyRainy},
    {id:511, main:"Rain",            desc:"freezing rain",                       icon:"13d",    iconURL:partlyRainy},
    {id:520, main:"Rain",            desc:"light intensity shower rain",         icon:"09d",    iconURL:partlyRainy},
    {id:521, main:"Rain",            desc:"shower rain",                         icon:"09d",    iconURL:partlyRainy},
    {id:522, main:"Rain",            desc:"heavy intensity shower rain",         icon:"09d",    iconURL:partlyRainy},
    {id:531, main:"Rain",            desc:"ragged shower rain",                  icon:"09d",    iconURL:partlyRainy},
    {id:600, main:"snow",            desc:"light snow",                          icon:"13d",    iconURL:snowy},
    {id:601, main:"Snow",            desc:"snow",                                icon:"13d",    iconURL:snowy},
    {id:602, main:"Snow",            desc:"heavy snow",                          icon:"13d",    iconURL:snowy},
    {id:611, main:"Snow",            desc:"sleet",                               icon:"13d",    iconURL:snowy},
    {id:612, main:"Snow",            desc:"light shower sleet",                  icon:"13d",    iconURL:snowy},
    {id:613, main:"Snow",            desc:"shower sleet",                        icon:"13d",    iconURL:snowy},
    {id:615, main:"Snow",            desc:"light rain and snow",                 icon:"13d",    iconURL:snowy},
    {id:616, main:"Snow",            desc:"rain and snow",                       icon:"13d",    iconURL:snowy},
    {id:620, main:"Snow",            desc:"light shower snow",                   icon:"13d",    iconURL:snowy},
    {id:621, main:"Snow",            desc:"shower snow",                         icon:"13d",    iconURL:snowy},
    {id:622, main:"Snow",            desc:"heavy shower snow",                   icon:"13d",    iconURL:snowy},
    {id:701, main:"Mist",            desc:"mist",                                icon:"50d",    iconURL:foggy},
    {id:711, main:"Smoke",           desc:"smoke",                               icon:"50d",    iconURL:foggy},
    {id:721, main:"Haze",            desc:"haze",                                icon:"50d",    iconURL:foggy},
    {id:731, main:"Dust",            desc:"sand/dust whirls",                    icon:"50d",    iconURL:foggy},
    {id:741, main:"Fog",             desc:"fog",                                 icon:"50d",    iconURL:foggy},
    {id:751, main:"Sand",            desc:"sand",                                icon:"50d",    iconURL:foggy},
    {id:761, main:"Dust",            desc:"dust",                                icon:"50d",    iconURL:foggy},
    {id:762, main:"Ash",             desc:"volcanic ash",                        icon:"50d",    iconURL:foggy},
    {id:771, main:"Squall",          desc:"squalls",                             icon:"50d",    iconURL:foggy},
    {id:781, main:"Tornado",         desc:"tornado",                             icon:"50d",    iconURL:foggy},
    {id:800, main:"Clear",           desc:"clear sky",                           icon:"01d",    iconURL:sunny},
    {id:801, main:"Clouds",          desc:"few clouds: 11-25%",                  icon:"02d",    iconURL:cloudy},
    {id:802, main:"Clouds",          desc:"scattered clouds: 25-50%",            icon:"03d",    iconURL:cloudy},
    {id:803, main:"Clouds",          desc:"broken clouds: 51-84%",               icon:"04d",    iconURL:cloudy},
    {id:804, main:"Clouds",          desc:"overcast clouds: 85-100%",            icon:"04d",    iconURL:cloudy}
]

function header(){
    const header = document.createElement("header")
    return header
}

function main(){
    const main = document.createElement("main")
    
    const inputLocation = document.createElement("input")
    inputLocation.type = "text"
    inputLocation.id = "inputLocation"
    inputLocation.placeholder = "type location..."
    inputLocation.addEventListener("change", function(){
        const coordinates = fetchCoordinatesGeocodingAPI(inputLocation.value)
        render(coordinates)
    })

    const locationDisplay = document.createElement("div")
    locationDisplay.id = "locationDisplay"

    const currentWeatherDiv = document.createElement("div")
    currentWeatherDiv.classList.add("currentWeather")

    const forecastWeatherDiv = document.createElement("div")
    forecastWeatherDiv.classList.add("forecastWeather")

    const currentWeatherDetailsDiv = document.createElement("div")
    currentWeatherDetailsDiv.classList.add("currentWeatherDetails")

    const getLocation = (async function getLocation(){
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(showPosition);
        } else {
        }
      })();
      
      function showPosition(position) {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
      }
    
    function render(coordinates){
        //CURRENT WEATHER
        const currentWeatherObject = coordinates.then((value)=>fetchCurrentWeatherLogic(value))
        
        currentWeatherObject.then((value)=>renderCurrentWeather(value))
        
        function renderCurrentWeather(value){
            locationDisplay.innerText = value.name

            const weatherIcon = new Image(100,100)
            weatherIcon.src = weatherConditionIconsArr.find(function(object){
                if(object.id==value.weather[0].id){
                    return true
                }}).iconURL

            const condition  = document.createElement("div")
            condition.innerText = value.weather[0].description

            const temperature = document.createElement("div")
            temperature.innerText = "Temperature: " + value.main.temp

            const tempMax = document.createElement("div")
            tempMax.innerText = "Maximum Temperature " + value.main.temp_max

            const tempMin = document.createElement("div")
            tempMin.innerText = "Minimum Temperature: " + value.main.temp_min

            currentWeatherDiv.append(weatherIcon, condition, temperature, tempMax, tempMin)

            const windSpeed = document.createElement("div")
            windSpeed.innerText = "Wind speed: " + value.wind.speed + " kmph"

            currentWeatherDetailsDiv.append(windSpeed)
        }

        //FORECAST WEATHER
        const forecastWeatherObject = coordinates.then((value)=>fetchForecastWeatherLogic(value))

        forecastWeatherObject.then((value)=>renderForecastWeather(value))

        function renderForecastWeather(value){
            const table = document.createElement("table");
            const row1 = document.createElement("tr")
            const row2 = document.createElement("tr")
            const row3 = document.createElement("tr")
            const row4 = document.createElement("tr")

            const currentHour = new Date().getHours()

            const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

            for(let i = 0; i<value.list.length; i++){
                const unixTimestamp = value.list[i].dt
                const milliseconds = unixTimestamp * 1000

                const dateObject = new Date(milliseconds)
                const day = days[dateObject.getDay()]

                //row1 DAY
                if(i==0){
                    const date = document.createElement("th");
                    date.innerText = day
                    row1.append(date)
                    date.colSpan = (24/3)-(currentHour/3)
                } else if((i!==0)&&(i!==39)&&((i%8)==0)){
                    const date = document.createElement("th");
                    date.innerText = day
                    row1.append(date)
                    date.colSpan = 8
                } else if(i==39){
                    const date = document.createElement("th");
                    date.innerText = day
                    row1.append(date)
                    date.colSpan = Math.ceil(currentHour/3)
                }

                
                //row2 TIME
                const time = document.createElement("td");
                time.innerText = (("0"+dateObject.getHours()).slice(-2))+":00"
                row2.append(time)

                //row3 CONDITIONS
                const weather = document.createElement("td");
                const weatherIcon = new Image(40,40)
                weatherIcon.src = weatherConditionIconsArr.find(function(object){
                    if(object.id==value.list[i].weather[0].id){
                        return true
                    }}).iconURL
                const desc = document.createElement("div")
                desc.innerText = value.list[i].weather[0].main
                weather.append(weatherIcon, desc)
                row3.append(weather)

                //row4 Temp
                const temp = document.createElement("td")
                temp.innerText = value.list[i].main.temp + "°C"
                row4.append(temp)

                table.append(row1,row2, row3, row4)

            }
            forecastWeatherDiv.append(table)
        }
    }

    main.append(inputLocation, locationDisplay, currentWeatherDiv, currentWeatherDetailsDiv, forecastWeatherDiv)

    return main
}

function footer(){
    const footer = document.createElement("footer")
    return footer
}

function sidebar(){
    let toggle = false
    const collapsed = "10px"
    const expanded = "100px"
    const sidebar = document.createElement("nav")
    sidebar.id = "sidebar"
    sidebar.style.width = collapsed
    sidebar.addEventListener("click", toggleSidebar)

    function toggleSidebar(){
        if(toggle==false){
            sidebar.style.width = expanded 
            toggle = true
        } else {
            sidebar.style.width = collapsed
            toggle = false
        }
    }
    return sidebar
}

document.body.append(header(), main(), footer(), sidebar())