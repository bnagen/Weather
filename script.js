const key = 'b50e97cacdb2a8f8fdae53a29838af08';
const units = "imperial";
let searchMethod = 'zip';

function searchWeather(input) {
    fetch(`http://api.openweathermap.org/data/2.5/weather?${searchMethod}=${input}&APPID=${key}&units=${units}`).then(result => {
        return result.json();
    }).then(result => {
        init(result);
    })
}

function init(result) {
    console.log(result);
}


document.getElementById('search-button').addEventListener('click', () => {
    let searchTerm = document.getElementById('search-input').value;
    if(searchTerm) {
        searchWeather(searchTerm);
    }
})