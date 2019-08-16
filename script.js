const key = 'b50e97cacdb2a8f8fdae53a29838af08';
const units = "imperial";
let searchMethod;

function getSearch(searchInput) {
    if(searchInput.length === 5 && Number.parseInt(searchInput) + '' === searchInput) {
        searchMethod = 'zip';
    } else {
        searchMethod = 'q';
    }
}



function searchWeather(input) {

    getSearch(input);

    fetch(`http://api.openweathermap.org/data/2.5/weather?${searchMethod}=${input}&APPID=${key}&units=${units}`).then(result => {
        return result.json();
    }).then(result => {
        init(result);
    })
}

function init(result) {
    switch(result.weather[0].main) {
        case 'Clouds':
            document.body.style.backgroundImage = 'url("./img/cloudy.jpg")';
            break;
        case 'Clear':
            document.body.style.backgroundImage = 'url("./img/clear.jpg")';
            break;
        case 'Rain':
            document.body.style.backgroundImage = 'url("./img/rain.jpg")';
            break;
        case 'Drizzle':
            document.body.style.backgroundImage = 'url("./img/rain.jpg")';
            break;
        case 'Thunderstorm':
            document.body.style.backgroundImage = 'url("./img/thunder.jpg")';
            break;
        case 'Snow':
            document.body.style.backgroundImage = 'url("./img/snow.jpg")';
            break;
        case 'Mist':
            document.body.style.backgroundImage = 'url("./img/rain.jpg")';
            break;
        default:
            break;
    }

    const weatherHeader = document.getElementById('weather-description-header');
    const temperature = document.getElementById('temperature');
    const windSpeed = document.getElementById('wind-speed');
    const humidity = document.getElementById('humidity');
    const city = document.getElementById('city-header');
    const weatherIcon = document.getElementById('document-icon-img');

    weatherIcon.src = 'http://openweathermap.org/img/wn/' + result.weather[0].icon + '.png';

    const description = result.weather[0].description;
    weatherHeader.innerText = description.charAt(0).toUpperCase() + description.slice(1);

    temperature.innerHTML = Math.floor(result.main.temp) + '&#176';
    windSpeed.innerHTML = 'Winds are at ' + Math.floor(result.wind.speed) + ' m/s';
    city.innerHTML = result.name;
    humidity.innerHTML = 'Humidity is at ' + result.main.humidity + '%';

    setWeatherInfo();
}

function setWeatherInfo() {
    const weather = document.getElementById('weather-container');
    const weatherHeight = weather.clientHeight;
    const weatherWidth =  weather.clientWidth;

    weather.style.top = `calc(50% - ${weatherHeight/1.2}px)`;
    weather.style.left = `calc(50% - ${weatherWidth/2}px)`;
    weather.style.visibility = 'visible';

}

document.getElementById('search-button').addEventListener('click', () => {
    let searchTerm = document.getElementById('search-input').value;
    if(searchTerm) {
        searchWeather(searchTerm);
    }
})