const geocode = require("./utils/geocode")
const weather = require("./utils/weather")
const chalk = require("chalk")

const address = process.argv[2]

if (address) {
  geocode(address, (error, {latitude, longitude, location }) => {
    if (error) {
      return console.log(error)
    }

    weather(latitude, longitude, (error, {temperature, precipProbability}) => {
      if (error) {
        return console.log(error)
      }

      console.log(chalk.bold.inverse(location))
      console.log(chalk.bold("Temperature - ") + temperature)
      console.log(chalk.bold("Chances of rain - ") + precipProbability)
    })
  })
}
else {
  console.log(chalk.red.inverse.bold("No location provided!"))
}

// DEPRECATED CODE FOR LEARNING

// Old code without callbacks. just basic functionality of the APIs
// const urlWeather = "https://api.darksky.net/forecast/dd2f1f18a45729116d6efae80c5f7989/37.8267,-122.4233"
// const urlGeo = "https://api.mapbox.com/geocoding/v5/mapbox.places/Delhi.json?access_token=pk.eyJ1IjoiYmlwaW5rYWxyYSIsImEiOiJjazgxb3Z1d2gwOGVmM2VwdHQzbWZmZnJkIn0.91vjZjXQ2yjhpbRueqasWg&limit=1"

// request({
//   url: urlGeo,
//   json: true
// }, (error, response) => {

//   if (error) {
//     console.log("Can't connect to weather service!")
//   }
//   else if (response.body.message || response.body.features.length === 0) {
//     console.log("Unable to find the location!")
//   }
//   else {
//     const geoData = response.body.features[0]

//     console.log("Latitude = " + geoData.center[1])
//     console.log("Longitude = " + geoData.center[0])
//   }
// })

// request({
//   url: urlWeather,
//   json: true
// }, (error, response) => {
//   // console.log(response)

//   // json = true flag automatically sets the response to be parsed as json
//   // explicit parsing is not required

//   // const data = JSON.parse(response.body)
//   // console.log(data.currently)

//   // console.log(response.body.currently)

//   if (error) {
//     console.log("Can't connect to weather service!")
//   }
//   else if (response.body.error) {
//     console.log("Unable to find the location!")
//   }
//   else {
//     const weatherData = response.body.currently

//     console.log("It is currently " + weatherData.temperature + " degrees out.")
//     console.log("There is " + weatherData.precipProbability + "% chance of rain.")
//   }
// })