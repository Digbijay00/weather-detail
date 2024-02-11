//http://api.weatherapi.com/v1/current.json?key=6926ff5d8d1b4db586245656240702&q=bhubaneswar&aqi=no

document.addEventListener('DOMContentLoaded', () => {
const timeEl = document.getElementById('time');
const dateEl = document.getElementById('date');
const currentTempEl = document.getElementById('current-temp');


const days = ['Sunday', 'Monday', 'Tuesday', 'Thursday', 'Friday', 'Saturday'];
const months =['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

setInterval(() => {
    const time=new Date();
    const year = time.getFullYear();
    const month = time.getMonth();
    const date = time.getDate();
    const day = time.getDay();
    const hour = time.getHours();
    const hoursIn12HrFormat = hour >= 13 ? hour % 12 : hour 
    const minutes=time.getMinutes();
    const minutesBefore10 = minutes < 10 ? '0'+minutes : minutes;
    const ampm = hour >= 12 ? 'Pm' : 'Am'

    timeEl.innerHTML = hoursIn12HrFormat + ':' + minutesBefore10 + ' ' + ampm;
    dateEl.innerHTML = days[day] +', '+ date + ' '+ months[month]
}, 1000);

});


const API_KEY = '6926ff5d8d1b4db586245656240702'

document.addEventListener('DOMContentLoaded', () => {
    
const fetchWeather = async (city) => {
    try {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Thursday', 'Friday', 'Saturday'];
        const currentWeatherItemsEl = document.getElementById('current-weather-item');
        const timezone = document.getElementById('time-zone');
        const countryEl = document.getElementById('country');
        
        const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=no`);
        
        if (!response.ok) {
            throw new Error('Failed to fetch weather data');
        }
        const data = await response.json();
        console.log(data);
        
        // Handle data...
        currentWeatherItemsEl.innerHTML = `
        <div class="weather-item">
            <p>Humidity</p>
            <p>${data.current.humidity}%</p>
        </div>
        <div class="weather-item">
            <div>Pressure</div>
            <div>${data.current.pressure_mb}</div>
        </div>
        <div class="weather-item">
            <div>Wind speed</div>
            <div>${data.current.wind_kph} km/h</div>
        </div>
        <div class="weather-item">
            <div>Temperature</div>
            <div>${data.current.temp_c}&#176;C</div>
        </div>
        <div class="weather-item">
        <div>Feels like</div>
        <div>${data.current.feelslike_c}&#176;C</div>
    </div>
        <div class="weather-item">
            <div>Condition</div>
            <div>${data.current.condition.text}</div>
            <img src="${data.current.condition.icon}" alt="Weather Icon">
        </div>
        <div class="weather-item">
            <div>Cloud</div>
            <div>${data.current.cloud}&#176;C</div>
        </div>

    `;

    timezone.textContent = data.location.tz_id;
    countryEl.textContent = data.location.country;

     } catch (error) {
           //console.error('Error fetching weather data:', error);
     }
};


    const searchBtn = document.getElementById('search-btn');
    
    searchBtn.addEventListener('click', async () => {
        try {
            
            const cityInput = document.getElementById('city-input');
            const city = cityInput.value.trim();
            
            if (city) {
                await fetchWeather(city);
            } else {
                alert('Please enter a city name.');
            }
        } catch (error) {
            //console.error('Error fetching weather data:', error);
        }
    });

 fetchWeather(); 
});

