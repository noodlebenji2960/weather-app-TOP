import {apiKeys} from "./apikey.js"


export async function fetchCoordinatesGeocodingAPI(locationName){
  if(locationName==""){
    locationName = "London"
  } else{

  }
  const responseLatLon = await fetch("http://api.openweathermap.org/geo/1.0/direct?q="+locationName+"&appid="+apiKeys.OPENWEATHER_API_KEY, {
    method: "GET",
    mode: "cors"
})

  .then(function(response) {
    return response.json();
  })
  .then(function(response){
    const lat = response[0].lat
    const lon = response[0].lon
    return {lat, lon}
  })
  return responseLatLon
}

export async function fetchCurrentWeatherLogic(coordinates){
    const lat = coordinates.lat
    const lon = coordinates.lon

    const responseLocation = await fetch("https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&appid="+apiKeys.OPENWEATHER_API_KEY+"&units=metric", {
        method: "GET",
        mode: "cors"
    })
          .then(function(response) {
            return response.json();
          })
          console.log(responseLocation)
    return responseLocation
}

export async function fetchForecastWeatherLogic(coordinates){
  const lat = coordinates.lat
  const lon = coordinates.lon

  const responseForecast = await fetch("https://api.openweathermap.org/data/2.5/forecast?lat="+lat+"&lon="+lon+"&appid="+apiKeys.OPENWEATHER_API_KEY+"&units=metric", {
      method: "GET",
      mode: "cors"
  })
        .then(function(response) {
          return response.json();
        })

  console.log(responseForecast)
  return responseForecast
}

export async function fetchWeatherMapLogic(){

  const z = "9" //zoom level
  const x = "2" //X tile coordinate
  const y =  "3" //Y tile coordinate
  const layer = "temp_new" //layer

  const responseMap = await fetch("https://tile.openweathermap.org/map/"+layer+"/"+z+"/"+x+"/"+y+".png?appid="+apiKeys.OPENWEATHER_API_KEY, {
      method: "GET",
      mode: "cors"
  })

  return responseMap
}