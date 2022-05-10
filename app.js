document.addEventListener("DOMContentLoaded", function() {
    //--------------------------------------------


const location = document.getElementById("userLocation")
const submitButton = document.getElementById("submit")
const resultDisplay = document.getElementsByTagName('h2')[0]
const resultLatLng = document.getElementsByTagName('h2')[1]
const weatherDisplay = document.getElementsByTagName('h3')[0]
const API_KEY_loc = "9d4b2106584d4236b68d77703e0ec133"
const API_KEY_weather = "6c601f4c97c69803c3d0ea71c97c199e"
const dateDisplay = document.getElementById('date')
const imgWeather = document.getElementById('Weather_icone')
    // creation de l'event du bouton et lancer les deux api
submitButton.addEventListener("click", (event) => {
    event.preventDefault();
    console.log(location.value)
    resultDisplay.innerHTML = `You are from ${location.value}!`
    const userLocation = location.value
    // Lancement de l'API pour détérminer la lat et lng de la ville entrée dans l'Input du form
    let URL = `https://api.opencagedata.com/geocode/v1/json?q=${userLocation}&key=${API_KEY_loc}&language=fr&pretty=1`
    fetch(URL) 
    .then(response => { 
        if (response.status == 200) { 
            return response.json()
        }
        else console.log(`Erreur lorsqu'on a tenté de récupérer les data`);
    })
    .then(data => {
        // Récuperation de la Date du jour
        const newDate = new Date();
        const day = newDate.getDay()
        const week = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"]
        const dayValue = week[day]
        dateDisplay.innerHTML = dayValue
        // Récup des lat et long de l'API OpenCageData
    const cityWeatherLat = data.results[0].geometry.lat
    const cityWeatherLng = data.results[0].geometry.lng
    resultLatLng.innerHTML = `Latitude: ${cityWeatherLat} , Longitude: ${cityWeatherLng}`
    // Lancement de l'API OpenWeather pour inclure les lat et lng et trouvé la météo
    let URL_weather = `https://api.openweathermap.org/data/2.5/onecall?lat=${cityWeatherLat}&lon=${cityWeatherLng}&exclude={part}&appid=${API_KEY_weather}`
    fetch(URL_weather)
    .then(response => { 
        if (response.status == 200) { 
            return response.json()
        }
        else console.log(`Erreur lorsqu'on a tenté de récupérer les data Weather`);
    })
    .then(cityWeather => {
        // Récupération et détermination du temps via l'API OpenWeather
        if (cityWeather.current.clouds > 50) {
            console.log('CLOUDS')
            weatherDisplay.innerHTML = `A lot of clouds today`
        }
        else if (cityWeather.current.clouds < 50 && cityWeather.current.clouds >= 50 ) {
            weatherDisplay.innerHTML = `It's cloudy!`
            console.log('CLOUDY')
        }
        else if (cityWeather.current.weather[0].main == 'Rain') {
            weatherDisplay.innerHTML = `Shit, it's raining, don't forget your umbrella!`
            console.log(cityWeather.current.weather[0].main)
        }
        else if (cityWeather.current.weather[0].id <= 622 && cityWeather.current.weather[0].id >= 600) {
            weatherDisplay.innerHTML = `Snow* is falling*`
        }
        else if (cityWeather.current.weather[0].main == 'Clear') {
            weatherDisplay.innerHTML = `The sky is Clear!`
            // TODO: create picto innerHTML
            // document.create
            console.log(cityWeather.current.weather[0].main)
            console.log(cityWeather)

        }
    })
    })
    .catch(err2=> console.log(err2))

});
    //--------------------------------------------
});