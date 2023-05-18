const WEATHER_API_BASE_URL = 'https://api.openweathermap.org';
const WEATHER_API_KEY = '4b1a5523b5977bf435f0ee1ea815249c';
const MAX_DAILY_FORECAST = 5;


var dayObject = {};
var currentObject = {};
// var iconImg.src = iconUrl;

const inputBox = document.getElementById('inputBox');
const searchButton = document.getElementById('searchButton')
const itemList = document.getElementById('itemList');

searchButton.addEventListener('click', handleSearchButtonClick);
inputBox.addEventListener('keydown', handleKeyDown);



function handleSearchButtonClick() {
    const itemText = inputBox.value.trim();
    if (itemText) {
      addItem(itemText);
      inputBox.value = '';
    }
  }

function handleKeyDown(event) {
    if (event.key === 'Enter') {
      const itemText = inputBox.value.trim();
      if (itemText) {
        addItem(itemText);
        inputBox.value = '';
      }
    }
  }

function addItem(itemText) {
    const listItem = document.createElement('li');
    listItem.textContent = itemText;

    listItem.addEventListener('click', () => {
      handleClick(itemText);
    });

    itemList.appendChild(listItem);
  }

  function handleClick(itemText) {
    console.log('Clicked:', itemText);
    
    lookupLocation(itemText);
  }

function lookupLocation(search) {
    current.innerHTML = '';
    container.innerHTML = '';
  // Lookup the location to get the Lat/Lon
    var apiUrl = `${WEATHER_API_BASE_URL}/geo/1.0/direct?q=${search}&limit=5&appid=${WEATHER_API_KEY}`;
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {

            console.log(data);

            // Pick the First location from the results
            //const location = data[0];
            var lat = data[0].lat;
            var lon = data[0].lon;

            console.log("Latitude: " + lat + ", Longitude: "+ lon);
        

            // Get the Weather for the cached location

            var apiCurrent = `${WEATHER_API_BASE_URL}/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&cnt=5&units=metric`;
            fetch(apiCurrent)
                .then(response => response.json())
                .then(data => {
                    console.log(data);

                    currentObject = data;
                    
                    weatherIconCode = currentObject.weather[0].icon;

                    console.log("weatherIcon: " + weatherIconCode);

                    var current = document.querySelector('#current');
                    // var newElement = document.createElement('div');

                    var html2Content = `<div class = "card"><p>Current conditions in ${search}</p>`;
                        html2Content += `<img src = "http://openweathermap.org/img/wn/${weatherIconCode}.png" width="100" height="100"></p>`;
                        html2Content += `<p>Temperature: ${currentObject.main.temp}°c</p>`;
                        html2Content += `<p>Humidity: ${currentObject.main.humidity}%</p>`;
                        html2Content += `<p>Windspeed: ${currentObject.wind.speed} kph</p></div>?`;

                        current.innerHTML += html2Content;
                    
                });


            var apiUrl = `${WEATHER_API_BASE_URL}/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&cnt=5&units=metric`;
            console.log("From API: " + apiUrl);
            fetch(apiUrl)
                .then(response => response.json())
                .then(data => {

                     console.log(data);

                    // Display the Current Weather

                    // Display the 5 Day Forecast
                    
                        for (i = 0; i < 5; i++) {
                            var variableName = "day" + i;
                            dayObject[variableName] = data.list[i];
                       

                    // console.log(dayObject);

                    
                        var container = document.querySelector('#container');
                        // var newElement = document.createElement('div');
                        
                        var htmlContent = `<div class = "card"><p>${dayObject['day' + i].dt_txt}</p>`;
                        htmlContent += `<p>Temperature: ${dayObject['day' + i].main.temp}°c</p>`;
                        htmlContent += `<p>Humidity: ${dayObject['day' + i].main.humidity}%</p>`;
                        htmlContent += `<p>Windspeed: ${dayObject['day' + i].wind.speed} kph</p></div>`;

                        container.innerHTML += htmlContent;
                    };

                                          
                    });

                });
            
        }
          
