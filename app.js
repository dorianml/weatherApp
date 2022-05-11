document.addEventListener("DOMContentLoaded", function() {
    //--------------------------------------------

//TODO: 1:Gerer les fonctions
//TODO: 2 gerer le cache
const location = document.getElementById("userLocation")
const submitButton = document.getElementById("submit")

const API_KEY_loc = "9d4b2106584d4236b68d77703e0ec133"
const API_KEY_weather = "6c601f4c97c69803c3d0ea71c97c199e"
const dateDisplay = document.getElementById('date')
// IMG Weather Icone Const


const formDisplayResult = document.getElementById('formResult')
//

// creation de l'event du bouton et lancer les deux api
submitButton.addEventListener("click", (event) => {
    event.preventDefault();
    console.log(location.value)
    // affichage de la ville selectioné (optionnel)
    // resultDisplay.innerHTML = `You are from ${location.value}!`
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
        
        // Récup des lat et long de l'API OpenCageData
        const cityWeatherLat = data.results[0].geometry.lat
        const cityWeatherLng = data.results[0].geometry.lng
        // Affichage de la longitude et de la latitude (optionnel)
        // resultLatLng.innerHTML = `Latitude: ${cityWeatherLat} , Longitude: ${cityWeatherLng}`
        // Lancement de l'API OpenWeather pour inclure les lat et lng et trouvé la météo
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
                // Récuperation de la Date du jour
                const currentDate = new Date();
                const currentDay = currentDate.getDay()
                const weekDisplay = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi",
                            "Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"]
                // Fonction "choisir le nombre de jours prochains à afficher"
                const dayOption = document.getElementById("day-select")
                nbOfDays = dayOption.value 
                // boucle d'affichage de la météo des jours séléxctionnés
                for (let i= 0; i < nbOfDays ; i++) {

                    const dayValue = weekDisplay[currentDay + i]
                    console.log(dayValue)
                    // const dayTextDisplay = document.createElement('p')
                    // dayTextDisplay.innerHTML = dayValue
                    const dayDiv = document.createElement('div')
                    // dayDiv.classList.add('createdDays')
                    dayDiv.innerHTML = dayValue
                    const iconeWeather = document.createElement('img')

                    if (cityWeather.current.uvi == 0) {
                        var uviCheck = true
                        //Nigth mode
                        document.getElementById("body").style.transition = "all 1s";
                        document.querySelector("body").style.background = "#06145F";  
                        // document.getElementsByTagName(p).style.color = "#FFFFFF";  
                    } else {
                        document.getElementById("body").style.transition = "all 1s";
                        document.querySelector("body").style.background = "#3399FF"
                    }
                    
                    if (cityWeather.daily[i].weather[0].id == 803 || cityWeather.daily[i].weather[0].id == 804) {
                        console.log(cityWeather.daily[i].weather[0].id)
                        if (uviCheck) {
                            iconeWeather.src = "./img/clouds-white.png"
                        } else iconeWeather.src = "./img/clouds.svg"

                    }
                    else if (cityWeather.daily[i].weather[0].id == 801 || cityWeather.daily[i].weather[0].id == 802) {
                        console.log(cityWeather.daily[i].weather[0].id)
                        if (uviCheck) {
                            iconeWeather.src = "./img/cloudy_white.png"
                        } else iconeWeather.src = "./img/cloudy.svg"
                    }
                    else if (cityWeather.daily[i].weather[0].id <= 622 && cityWeather.daily[i].weather[0].id >= 600) {
                        console.log(cityWeather.daily[i].weather[0].id)
                        if (uviCheck) {
                            iconeWeather.src = "./img/snow-white.png"
                        } else iconeWeather.src = "./img/snow.svg"
                    }
                    else if (cityWeather.daily[i].weather[0].id == 800) {
                        console.log(cityWeather.daily[i].weather[0].id)
                        if (uviCheck) {
                            iconeWeather.src = "./img/sun-white.png"
                        } else iconeWeather.src = "./img/sun.svg"
                    }   
                    else {
                        console.log(cityWeather.daily[i].weather[0].id)
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