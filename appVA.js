// ########## FONCTIONS ##########

function getCoord(data) {
    const lat = data.results[0].geometry.lat
    const lon = data.results[0].geometry.lng
    return { lat, lon }
}

function getWeather(coords){
    const API_KEY_weather = "6c601f4c97c69803c3d0ea71c97c199e"
    let URL_weather = `https://api.openweathermap.org/data/2.5/onecall?lat=${coords.lat}&lon=${coords.lon}&exclude={part}&appid=${API_KEY_weather}`
    console.log(URL_weather)
    
    return fetch(URL_weather)
    .then(response => { 
        if (response.status == 200) { 
            return response.json()
        }
        else console.log(`Erreur lorsqu'on a tenté de récupérer les data Weather`);
    })
}     

function displayWeather(cityWeather) {
    // ask for user input number of days to display
    const formDisplayResult = document.getElementById('formResult')                
    // reset le tableau en tableu vide
    formDisplayResult.innerHTML = []
    //Trouve le nombre de jours a afficher voulu par l'utilisateur
    const daysToDisplay = document.getElementById("day-select").value

    // Boucle sur le nombre de jours a afficher
    for (let i= 0; i < daysToDisplay ; i++) {
        // APPEL DE LA FONCTION getDayNumber et cherche dans l'objet retourné les valeurs de Week et de Current Day
        const dayValue = getDayNumber().week[getDayNumber().currentDay + i]
        // affichage de valeur de Day dans une nouvelle Div
        const dayDiv = document.createElement('div')
        dayDiv.innerHTML = dayValue
        // création de la section img a remplir
        const iconeWeather = document.createElement('img')

        // APPEL DE LA FONCTION THEME ET RETURN UVICHECK TRUE OR FALSE
        let uviCheck = false
        uviCheck = getTheme(cityWeather.current.uvi)
        
        // Récupère l'ID de l'API dans la variable iconeDisplayId
        let iconeDisplayId = cityWeather.daily[i].weather[0].id
        // Test l'ID et selon les conditions affiche l'icone équivalente =>
        // en mode nuit ou jours de l'UviCheck précédents 
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
    // CES DEUX ETAPE SE REPETE A CHAQUE TOUR DE BOUCLE
    // Ajout dans la div HTML formDisplayResult dayDiv contenant Day Value
    formDisplayResult.appendChild(dayDiv)
    // ajout dans dayDiv l'iconeWeather//
    dayDiv.appendChild(iconeWeather)
    }
}
// "THEME MODE Night ou Day" FUNCTION RETURN TRUE OR FALSE POUR LES ICONES DANS DISPLAY WEATHER ET =>
// APPLIQUE DES CHANGEMENTS VISUELS AU SITE
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

// OBJECT { WEEK AND CURRENT DAY } FOR FUTUR CALCUL
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
    
    // CREATION BOUTON SUBMIT 
    const submitButton = document.getElementById("submit")
    submitButton.addEventListener("click", (event) => {
        event.preventDefault();
        
        // INITIALISATION DE L'API LOCATION
        const location = document.getElementById("userLocation")
        const userLocation = location.value

        const API_KEY_loc = "9d4b2106584d4236b68d77703e0ec133"
        let URL = `https://api.opencagedata.com/geocode/v1/json?q=${userLocation}&key=${API_KEY_loc}&language=fr&pretty=1`
        
        fetch(URL) 
        .then(response => { 
            if (response.status == 200) { 
                return response.json()
            }
            else console.log(`Erreur lorsqu'on a tenté de récupérer les data`);
        })
        .then(data => {
            return getCoord(data)
        }) 
        .then(coords => {
            return getWeather(coords)
        })    
        .then(cityWeather => { 
            displayWeather(cityWeather)
        })
        .catch(err=> console.log(err))
    });
    //--------------------------------------------
}); 