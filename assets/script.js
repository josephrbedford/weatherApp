const WEATHER_API_BASE_URL = 'https://api.openweathermap.org';
const WEATHER_API_KEY = '4b1a5523b5977bf435f0ee1ea815249c';
const MAX_DAILY_FORECAST = 5;

const dayObject = {};

// create an array of searched locations

const lookupLocation = (search) => {

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

                    var current = document.querySelector('#current');
                    var htmlContent
                    
                });


            var apiUrl = `${WEATHER_API_BASE_URL}/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&cnt=5&units=metric`;
            console.log("From API: " + apiUrl);
            fetch(apiUrl)
                .then(response => response.json())
                .then(data => {

                    // console.log(data);

                    // Display the Current Weather

                    // Display the 5 Day Forecast
                    
                        for (i = 0; i < 5; i++) {
                            var variableName = "day" + i;
                            dayObject[variableName] = data.list[i];
                       

                    // console.log(dayObject);

                    
                        var container = document.querySelector('#container');
                        var newElement = document.createElement('div');
                        
                        var htmlContent = `<div class = "card"><p>${dayObject['day' + i].dt_txt}</p>`;
                        htmlContent += `<p>Temperature: ${dayObject['day' + i].main.temp}°c</p>`;
                        htmlContent += `<p>Humidity: ${dayObject['day' + i].main.humidity}%</p>`;
                        htmlContent += `<p>Windspeed: ${dayObject['day' + i].wind.speed} kph</p></div>`;

                        container.innerHTML += htmlContent;
                    };

                                          
                    });

                });
            
        }
                    /*    var day[i] = data.list[i];
                        console.log(JSON.stringify(day[i]));
                    }
                     var fiveDays = JSON.parse(data);
                        console.log(fiveDays);
                    //for day in data['list'];
                     for (i = 0; i <= 5; day++) {
                        var day = "day" + i;
                    data.list[i].main.temp;
                        console.log("Day: " + dayTemp(i));
                    }
*/



                    //    console.log("Date: "+ date);





// Add an event handler for the search button


document.getElementById("weatherSearch").onclick = function() {
    console.log("button pushed");
        var search = document.getElementById("search-input").value;
        console.log("search term: " + search);

        lookupLocation(search);
        // console.log("Object test: " + dayObject);
    }
