let todayName = document.getElementById("today-day")
let todayDate = document.getElementById("today-date")

let locationName = document.getElementById("location")
let degreeNum = document.getElementById("degree-num")
let todayImage = document.getElementById("today-img")
let todayConditionText = document.getElementById("today-condition-text")
let humidity = document.getElementById("humidity")
let wind = document.getElementById("wind")
let windDirection = document.getElementById("wind-direction")


let nextDayName = document.getElementsByClassName("nextday")
let nextImage = document.getElementsByClassName("next-condition-img")
let nextMaxTemp = document.getElementsByClassName("next-max-temp")
let nextMinTemp = document.getElementsByClassName("next-min-temp")
let nextText = document.getElementsByClassName("nextText")

// search input
let searchInput = document.getElementById("search")



let form = document.querySelector("form")
form.addEventListener("submit", function (e) {

    e.preventDefault()
})
let form2 = document.getElementById("form2")
form2.addEventListener("submit", function (e) {

    e.preventDefault()
})
// date.getdate()
// let date =  new Date("2024-06-30")
// console.log(date.getDate());
// console.log(date.toLocaleDateString("en-us" , {weekday: "long"}));
// console.log(date.toLocaleDateString("en-us" , {month: "long"}));


// fatch API data
async function getWeatherData(cityName) {

    var weatherResponse = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=71dbd040c45b418aa92175158231802&q=${cityName}&days=3`)

    let weatherData = await weatherResponse.json()
    // console.log(weatherData)
    return weatherData;

}

// display data
function displayTodayData(data) {

    let todayDate2 = new Date()
    todayName.innerHTML = todayDate2.toLocaleDateString("en-us", { weekday: "long" })
    todayDate.innerHTML = todayDate2.getDate() + " " + todayDate2.toLocaleDateString("en-us", { month: "long" })
    locationName.innerHTML = data.location.name
    degreeNum.innerHTML = data.current.temp_c + " C"
    todayImage.setAttribute("src", data.current.condition.icon)
    todayConditionText.innerHTML = data.current.condition.text
    humidity.innerHTML = data.current.humidity
    wind.innerHTML = data.current.wind_kph
    windDirection.innerHTML = data.current.wind_dir



}

function displayTomorowData(data) {
    let forecastdata = data.forecast.forecastday
    // console.log(nextMaxTemp);


    for (let index = 0; index < 2; index++) {

        let nextDate = new Date(forecastdata[index + 1].date)

        // console.log(nextDate);
        nextDayName[index].innerHTML = nextDate.toLocaleDateString("en-us", { weekday: "long" })


        nextMaxTemp[index].innerHTML = forecastdata[index + 1].day.maxtemp_c + "  C "

        nextMinTemp[index].innerHTML = forecastdata[index + 1].day.mintemp_c + " C"

        nextImage[index].setAttribute("src", forecastdata[index + 1].day.condition.icon)

        nextText[index].innerHTML = forecastdata[index + 1].day.condition.text

    }

}

// call all functions 
async function startApp(city = "cairo") {

    let weatherData = await getWeatherData(city)
    // console.log(weatherData);

    if (!weatherData.error) {

        displayTodayData(weatherData)
        displayTomorowData(weatherData)
    }
}


startApp()


searchInput.addEventListener("input", function () {

    // console.log(searchInput.value);
    startApp(searchInput.value)
})