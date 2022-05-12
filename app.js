document.addEventListener("DOMContentLoaded", function() {
    //--------------------------------------------

const location = document.getElementById("userLocation")
const submitButton = document.getElementById("submit")

const API_KEY_loc = "9d4b2106584d4236b68d77703e0ec133"
const API_KEY_weather = "6c601f4c97c69803c3d0ea71c97c199e"
const formDisplayResult = document.getElementById('formResult')

submitButton.addEventListener("click", (event) => {
    event.preventDefault();
    console.log(location.value)
    const userLocation = location.value
    let URL = `https://api.opencagedata.com/geocode/v1/json?q=${userLocation}&key=${API_KEY_loc}&language=fr&pretty=1`
    fetch(URL) 
    .then(response => { 
        if (response.status == 200) { 
            return response.json()
        }
        else console.log(`Erreur lorsqu'on a tenté de récupérer les data`);
    })
    .then(data => {
        const cityWeatherLat = data.results[0].geometry.lat
        const cityWeatherLng = data.results[0].geometry.lng
            let URL_weather = `https://api.openweathermap.org/data/2.5/onecall?lat=${cityWeatherLat}&lon=${cityWeatherLng}&exclude={part}&appid=${API_KEY_weather}`
            console.log(URL_weather)

            
            fetch(URL_weather)
            .then(response => { 
                if (response.status == 200) { 
                    return response.json()
                }
                else console.log(`Erreur lorsqu'on a tenté de récupérer les data Weather`);
            })
            .then(cityWeather => { 

                formDisplayResult.innerHTML = []
                const currentDate = new Date();
                const currentDay = currentDate.getDay()
                const weekDisplay = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi",
                            "Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"]
                const dayOption = document.getElementById("day-select")
                nbOfDays = dayOption.value 

                for (let i= 0; i < nbOfDays ; i++) {
                    const dayValue = weekDisplay[currentDay + i]
                    console.log(dayValue)
                    const dayDiv = document.createElement('div')
                    dayDiv.innerHTML = dayValue
                    const iconeWeather = document.createElement('img')
                    let uviCheck = false

                    if (cityWeather.current.uvi == 0) {
                        uviCheck = true
                        document.getElementById("body").style.transition = "all 1s";
                        document.querySelector("body").style.background = "#06145F";  
                        document.querySelector("body").style.color = "#FFFFFF";  
                    } else {
                        document.getElementById("body").style.transition = "all 1s";
                        document.querySelector("body").style.background = "#3399FF"
                        document.querySelector("body").style.color = "#000000";  
                    }

                    let iconeDisplayId = cityWeather.daily[i].weather[0].id

                    if (iconeDisplayId == 803 || iconeDisplayId == 804) {
                        console.log(iconeDisplayId)
                        if (uviCheck) {
                            iconeWeather.src = "./img/clouds-white.png"
                        } else iconeWeather.src = "./img/clouds.svg"

                    }
                    else if (iconeDisplayId == 801 || iconeDisplayId == 802) {
                        console.log(iconeDisplayId)
                        if (uviCheck) {
                            iconeWeather.src = "./img/cloudy_white.png"
                        } else iconeWeather.src = "./img/cloudy.svg"
                    }
                    else if (iconeDisplayId <= 622 && iconeDisplayId >= 600) {
                        console.log(iconeDisplayId)
                        if (uviCheck) {
                            iconeWeather.src = "./img/snow-white.png"
                        } else iconeWeather.src = "./img/snow.svg"
                    }
                    else if (iconeDisplayId == 800) {
                        console.log(iconeDisplayId)
                        if (uviCheck) {
                            iconeWeather.src = "./img/sun-white.png"
                        } else iconeWeather.src = "./img/sun.svg"
                    }   
                    else {
                        console.log(iconeDisplayId)
                        if (uviCheck) {
                            iconeWeather.src = "./img/rain-white.png"
                        } else iconeWeather.src = "./img/rain.svg"
                    }
                    formDisplayResult.appendChild(dayDiv)
                    dayDiv.appendChild(iconeWeather)
                }
            })
            .catch(err=> console.log(err))
        })
        .catch(err=> console.log(err))

    });
    //--------------------------------------------
});