
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
const fomantis = new Pokemon('Fomantis', 50, 'day', 'any');
const cosmoemD = new Pokemon('Cosmoem (Sol)', 100, 'day', 'any');
const rockruffD = new Pokemon('Rockruff (Day)', 50, 'day', 'any');
const eeveeD = new Pokemon('Eevee (Esp)', 25, 'day', 'any');
const sneasal = new Pokemon('Sneasal (Hisu)', 50, 'day', 'any');

const amaura = new Pokemon('Amaura', 50, 'night', 'any');
const cosmoemN = new Pokemon('Cosmoem (Lun)', 100, 'night', 'any');
const rockruffN = new Pokemon('Rockruff (Night)', 50, 'night', 'any');
const eeveeN = new Pokemon('Eevee (Umb)', 25, 'night', 'any');

const sliggoo = new Pokemon('Sliggoo', 100, 'any', 'rain');


const pokemon = [tyrunt, yungoos, fomantis, cosmoemD, rockruffD, eeveeD, sneasal,
                 amaura, cosmoemN, rockruffN, eeveeN, sliggoo];

function getUTCTime (shiftInSeconds) {

    date = new Date()
    localTime = date.getTime()
    localOffset = date.getTimezoneOffset() * 60000
    utc = localTime + localOffset
    var searchedTime = utc + (1000 * shiftInSeconds)
    newDate = new Date(searchedTime)

    return newDate;
}

function isDay (time) {
    let hour = time.getHours();
    if (hour >= 8 && hour < 20) {
        return true;
    } return false;
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

            pokemonError404.style.display = 'none';
            pokemonError404.classList.remove('fadeIn');

            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const time = document.querySelector('.weather-box .time');

            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');

            const pname = document.querySelector('.pokemon-details .pname span ');
            const candy = document.querySelector('.pokemon-details .candy span ');

            pname.innerHTML ='';
            candy.innerHTML ='';

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


            var localTime = '';
            var day = false;
            localTime = getUTCTime(json.timezone);
            day = isDay(localTime);

            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            description.innerHTML = `${(json.weather[0].description)}`;
            time.innerHTML = `Local Time: <br> ${localTime.toLocaleTimeString()}`;
            humidity.innerHTML = `${(json.main.humidity)}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;



            for (let i = 0; i < pokemon.length; i++) {
                if (day) {
                    if (pokemon[i].time == 'day' && pokemon[i].weather == 'any') {
                        pname.innerHTML += pokemon[i].name + "<br><br>";
                        candy.innerHTML += (pokemon[i].candy).toString() + "<br><br>";
                    }
                } else if (!day) {
                    if (pokemon[i].time == 'night' && pokemon[i].weather == 'any') {
                        pname.innerHTML += pokemon[i].name + "<br><br>";
                        candy.innerHTML += (pokemon[i].candy).toString() + "<br><br>";
                    }
                }
                if (json.weather[0].main == 'Rain') {
                    if (pokemon[i].weather == 'rain') {
                        pname.innerHTML += pokemon[i].name + "<br><br>";
                        candy.innerHTML += (pokemon[i].candy).toString() + "<br><br>";
                    }
                }
            }


            pokemonDetails.classList.add('fadeIn');
            pokemonContainer.style.height = '620px';

            pokemonDetails.style.display = '';
            weatherBox.style.display = '';
            weatherDetails.style.display = '';
            weatherBox.classList.add('fadeIn');
            weatherDetails.classList.add('fadeIn');
            container.style.height = '620px';



        });


});