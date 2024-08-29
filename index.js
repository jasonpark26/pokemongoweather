
//import Pokemon from "./pokemon.js";
//const pokemon = require('./pokemon')

const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

const pokemonContainer = document.querySelector('.pokemonContainer');
const pokemonDetails = document.querySelector('.pokemon-details');
const pokemonError404 = document.querySelector('.pokemon-not-found');

 class Pokemon {
    constructor(name, candy, time, weather) {
      this.name = name;
      this.candy = candy;
      this.time = time;
      this.weather = weather;
    }
  }


const tyrunt = new Pokemon('Tyrunt', 50, 'day', 'any');
const yungoos = new Pokemon('Yungoos', 50, 'day', 'any');

const pokemon = [tyrunt, yungoos];

function getUTCTime (shiftInSeconds) {
    var currentTimeUTC = Date.now();
    var shiftedTime = currentTimeUTC + (shiftInSeconds * 1000); // Convert seconds to milliseconds
    var shiftedDate = new Date(shiftedTime);
    var localTime = shiftedDate.toLocaleString();

    return localTime;
}

search.addEventListener('click', () =>{

    const APIKey = '6e4c759ff03866c4287a507c050dd7f6';
    const city = document.querySelector('.search-box input').value;

    if (city === '')
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
    .then(response => response.json())
    .then(json => {

            if(json.cod === '404'){
                container.style.height = '400px';
                weatherBox.style.display = 'none';
                weatherDetails.style.display = 'none';
                error404.style.display = 'block';
                error404.classList.add('fadeIn');

                pokemonContainer.style.height = '400px';
                pokemonDetails.style.display = 'none';
                pokemonError404.style.display = 'block';
                pokemonError404.classList.add('fadeIn');

                return;
            }

            error404.style.display = 'none';
            error404.classList.remove('fadeIn');

            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');

            const pname = document.querySelector('.pokemon-details .pname span ');
            const candy = document.querySelector('.pokemon-details .candy span ');


            switch(json.weather[0].main){
                case 'Clear':
                    image.src = 'images/clear.png'
                    break;

                case 'Rain':
                    image.src = 'images/rain.png'
                    break;

                case 'Snow':
                    image.src = 'images/snow.png'
                    break;

                case 'Clouds':
                    image.src = 'images/cloud.png'
                    break;

                case 'Haze':
                    image.src = 'images/haze.png'
                    break;

                default:
                    image.src = '';
            }

            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            description.innerHTML = `${(json.weather[0].description)}`;
            humidity.innerHTML = `${(json.main.humidity)}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

            var time = '';
            time = getUTCTime(json.timezone);
            console.log(time);
/* 
            pname.innerHTML = `${tyrunt.name}`;
            pname.innerHTML += `\n${tyrunt.name}`;
            candy.innerHTML = `${tyrunt.candy}`;
 */
            for (let i = 0; i < pokemon.length; i++) {
                pname.innerHTML += pokemon[i].name + "<br>";
                candy.innerHTML += (pokemon[i].candy).toString() + "<br>";
              }
            pokemonDetails.classList.add('fadeIn');
            pokemonContainer.style.height = '590px';

            pokemonDetails.style.display = '';
            weatherBox.style.display = '';
            weatherDetails.style.display = '';
            weatherBox.classList.add('fadeIn');
            weatherDetails.classList.add('fadeIn');
            container.style.height = '590px';



        });


});


/* ```
API Response for Germany

{
    "coord": {
        "lon": 10.5,
        "lat": 51.5
    },
    "weather": [
        {
            "id": 801,
            "main": "Clouds",
            "description": "few clouds",
            "icon": "02d"
        }
    ],
    "base": "stations",
    "main": {
        "temp": 14.74,
        "feels_like": 14.44,
        "temp_min": 14.74,
        "temp_max": 14.74,
        "pressure": 1014,
        "humidity": 83,
        "sea_level": 1014,
        "grnd_level": 979
    },
    "visibility": 10000,
    "wind": {
        "speed": 7.16,
        "deg": 286,
        "gust": 11.63
    },
    "clouds": {
        "all": 12
    },
    "dt": 1724223549,
    "sys": {
        "type": 2,
        "id": 197911,
        "country": "DE",
        "sunrise": 1724213622,
        "sunset": 1724264930
    },
    "timezone": 7200,
    "id": 2921044,
    "name": "Germany",
    "cod": 200
}
``` */