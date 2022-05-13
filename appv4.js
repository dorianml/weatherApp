// ########## FONCTIONS ##########
// THEME MODE FUNCTION
function getTheme(uv) {
    if (uv == 0) {
        uviCheck = true
        document.getElementById("body").style.transition = "all 1s";
        document.querySelector("body").style.background = "#06145F";  
        document.querySelector("body").style.color = "#FFFFFF";  
    } else {
        uviCheck = false
        document.getElementById("body").style.transition = "all 1s";
        document.querySelector("body").style.background = "#3399FF"
        document.querySelector("body").style.color = "#000000";  
    }
    return uviCheck
}

// WEEK ARRAY AND CURRENT DAY FOR FUTUR CALCUL
function getDayNumber(){
    const currentDate = new Date();
    const currentDay = currentDate.getDay()
    const week = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi",
                "Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"]
    return { week, currentDay }
    }   


// ########## DEROULE LOGIQUE ###############

document.addEventListener("DOMContentLoaded", function() {
    //--------------------------------------------
    
    const submitButton = document.getElementById("submit")
    
    const API_KEY_loc = "9d4b2106584d4236b68d77703e0ec133"
    const API_KEY_weather = "6c601f4c97c69803c3d0ea71c97c199e"
    
    submitButton.addEventListener("click", (event) => {
        event.preventDefault();
        
        const location = document.getElementById("userLocation")
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
            const lat = data.results[0].geometry.lat
            const lon = data.results[0].geometry.lng
            return { lat, lon }
        })
        
        .then(coords => {
            let URL_weather = `https://api.openweathermap.org/data/2.5/onecall?lat=${coords.lat}&lon=${coords.lon}&exclude={part}&appid=${API_KEY_weather}`
            console.log(URL_weather)
            
            return fetch(URL_weather)
            .then(response => { 
                if (response.status == 200) { 
                    return response.json()
                }
                else console.log(`Erreur lorsqu'on a tenté de récupérer les data Weather`);
            })
            .then(cityWeather => { 
                
                // reset le tableau au debut
                formDisplayResult.innerHTML = []
                
                // ask for user input number of days to display
                const daysToDisplay = document.getElementById("day-select").value
                
                const formDisplayResult = document.getElementById('formResult')                
                
                getDayNumber()
                
                // night mode
                let uviCheck = false

                // ...
                for (let i= 0; i < daysToDisplay ; i++) {
                    console.log(cityWeather.current.uvi);

                   // Appel function getTheme et return uviCheck en True ou False
                    uviCheck = getTheme(cityWeather.current.uvi)
                    console.log('uvicheck :'+ uviCheck);
                    //
                    
                    const dayValue = getDayNumber.week[getDayNumber.currentDay + i]
                    console.log(dayValue)
                    const dayDiv = document.createElement('div')
                    dayDiv.innerHTML = dayValue
                    
                    const iconeWeather = document.createElement('img')

                    // 

                    //

                    <
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