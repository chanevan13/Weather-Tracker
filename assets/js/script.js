var searchBtn = document.querySelector('.btn');
var APIKey = '161a8abb6509bcf4ede4fd164308520b';
var citySearch = document.getElementById('cityInput');
var temp = document.getElementById('temp')
var wind = document.getElementById('wind')
var cityName = document.getElementById('cityName')
var humidity = document.getElementById('humidity')
var cityWeather = document.getElementById('cityWeather')
var historyList = document.getElementById("historyList");
var currentDate = (new Date()).toLocaleDateString('en-US');

// Load search history from localStorage
var searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];

// Display search history in card
function displaySearchHistory() {
  historyList.innerHTML = '';
  for (var i = 0; i < searchHistory.length; i++) {
    var li = document.createElement('li');
    li.textContent = searchHistory[i];
    historyList.appendChild(li);
  }
}

// Update search history 
function updateSearchHistory(city) {
  searchHistory.push(city);
  localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
  displaySearchHistory();
}

// Set current weather
function setCurrentWeather(Data) {
  var city = citySearch.value;
  var weatherUrl =
    'https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=' + APIKey + '&units=imperial';

  fetch(weatherUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);

      cityName.textContent = data.city.name + ' ' + currentDate;
      temp.textContent = 'Temp: ' + data.list[0].main.temp + ' F°';
      wind.textContent = 'Wind: ' + data.list[0].wind.speed + ' Mph';
      humidity.textContent = 'Humidity: ' + data.list[0].main.humidity + '%';

      // Clear previous weather cards
      document.getElementById('weatherCards').innerHTML = '';

      var element = data.list[0];
      console.log(element);
      if (element.dt_txt.includes('12:00:00')) {
        var date = document.createElement('h2');
        date.textContent = element.dt_txt;

        var temp2 = document.createElement('p');
        temp2.textContent = 'Temp: ' + element.main.temp + ' F°';

        var wind2 = document.createElement('p');
        wind2.textContent = 'Wind: ' + element.wind.speed + ' Mph';

        var hum = document.createElement('p');
        hum.textContent = 'Humidity: ' + element.main.humidity + '%';

        document.getElementById('weatherCards').append(date, temp2, wind2, hum);
      }

      // Update search history
      updateSearchHistory(city);
    });
}

searchBtn.addEventListener('click', setCurrentWeather);
displaySearchHistory();