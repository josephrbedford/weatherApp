// Constants

const WEATHER_API_BASE_URL = 'https://api.openweathermap.org';
const WEATHER_API_KEY = '4b1a5523b5977bf435f0ee1ea815249c';
const MAX_DAILY_FORECAST = 5;
const inputBox = document.getElementById('inputBox');
const searchButton = document.getElementById('searchButton')
const itemList = document.getElementById('itemList');

// Global Variables

var dayObject = {};
var currentObject = {};

// Handle Click on Search Button, save textbox input to inputBox var
function handleSearchButtonClick() {
    const itemText = inputBox.value.trim();
    if (itemText) {
      addItem(itemText);
      saveItemToLocalStorage(itemText);
      inputBox.value = '';
    }
  }

// Handle Enter in search box. Save textbox input to inputBox var
function handleKeyDown(event) {
    if (event.key === 'Enter') {
      const itemText = inputBox.value.trim();
      if (itemText) {
        addItem(itemText);
        saveItemToLocalStorage(itemText);
        inputBox.value = '';
      }
    }
  }

// Add itemText contents to li in sidebar
function addItem(itemText) {
    const listItem = document.createElement('li');
    listItem.textContent = itemText;

    listItem.addEventListener('click', () => {
      handleClick(itemText);
    });

    itemList.appendChild(listItem);
  }

  function saveItemToLocalStorage(placeName) {
    // Check if local storage is supported by the browser
    if (typeof(Storage) !== "undefined") {
      // Retrieve the existing places from local storage
      const existingPlaces = localStorage.getItem('places');
  
      // Parse the existing places as an array or create an empty array if no places exist
      const placesArray = existingPlaces ? JSON.parse(existingPlaces) : [];
  
      // Add the new place to the array
      placesArray.push(placeName);
  
      // Convert the array back to a string and store it in local storage
      localStorage.setItem('places', JSON.stringify(placesArray));
    }
  }

  // Function to load places from local storage and populate the list
function loadPlacesFromLocalStorage() {
  const places = localStorage.getItem('places');
  if (places) {
    const parsedPlaces = JSON.parse(places);
    parsedPlaces.forEach((place) => {
      addItem(place);
    });
  }
}

// Handle click on sidebar item
  function handleClick(itemText) {
    console.log('Clicked:', itemText);
    
    lookupLocation(itemText);
  }

// Look up location
function lookupLocation(search) {
    // Clear divs for new weather info
    current.innerHTML = '';
    container.innerHTML = '';
  // Lookup the location to get the Lat/Lon
    var apiUrl = `${WEATHER_API_BASE_URL}/geo/1.0/direct?q=${search}&limit=5&appid=${WEATHER_API_KEY}`;
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {

            // console.log(data);

            // Pick the First location from the results
            // const location = data[0];
            var lat = data[0].lat;
            var lon = data[0].lon;

            // console.log("Latitude: " + lat + ", Longitude: "+ lon);
        

            // Get the current Weather for the cached location

            var apiCurrent = `${WEATHER_API_BASE_URL}/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&cnt=5&units=metric`;
            fetch(apiCurrent)
                .then(response => response.json())
                .then(data => {
                    // console.log(data);

                    currentObject = data;                                      // JSON data > currentObject object
                    
                    weatherIconCode = currentObject.weather[0].icon;            // Get weather icon code > weatherIconCode var

                    // console.log("weatherIcon: " + weatherIconCode);

                    var current = document.querySelector('#current');           // select current ID in html for current var to display info
                    // var newElement = document.createElement('div');


                    // create html string to display current weather
                    var html2Content = `<div class = "card"><p><b>Current conditions in ${search}</b></p>`;
                        html2Content += `<img src = "http://openweathermap.org/img/wn/${weatherIconCode}.png" width="100" height="100"></p>`;
                        html2Content += `<p>Temperature: ${currentObject.main.temp}°c</p>`;
                        html2Content += `<p>Humidity: ${currentObject.main.humidity}%</p>`;
                        html2Content += `<p>Windspeed: ${currentObject.wind.speed} kph</p></div>`;

                        current.innerHTML += html2Content;
                    
                });

            // Get forecast weather
            var apiUrl = `${WEATHER_API_BASE_URL}/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&cnt=5&units=metric`;
            console.log("From API: " + apiUrl);
            fetch(apiUrl)
                .then(response => response.json())
                .then(data => {

                     //console.log(data);

                    // iterate over the 5 items to fill html                    
                        for (i = 0; i < 5; i++) {
                            // var variableName = "day" + i;
                            dayObject[i] = data.list[i];                        // load iterations (days) weather into dayObject (day)
                       
                            weatherIconCode = dayObject[i].weather[0].icon;     // get weather icon code for (day)
                    

                    
                        var container = document.querySelector('#container');   // container id on webpage for display of container variable
                        
                        // create html for 5 cards for forecast
                        var htmlContent = `<div class = "card"><p><b>${dayObject[i].dt_txt}</b></p>`;
                        htmlContent += `<img src = "http://openweathermap.org/img/wn/${weatherIconCode}.png" width="50" height="50">`;
                        htmlContent += `<p>Temperature: ${dayObject[i].main.temp}°c</p>`;
                        htmlContent += `<p>Humidity: ${dayObject[i].main.humidity}%</p>`;
                        htmlContent += `<p>Windspeed: ${dayObject[i].wind.speed} kph</p></div>`;

                        container.innerHTML += htmlContent;
                    };

                                          
                    });

                });
            
        }
          

        // event handlers for button and searchbox
        
        searchButton.addEventListener('click', handleSearchButtonClick);
        inputBox.addEventListener('keydown', handleKeyDown);

        // Call loadPlacesFromLocalStorage when the page loads
        window.addEventListener('DOMContentLoaded', loadPlacesFromLocalStorage);
        