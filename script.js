document.addEventListener('DOMContentLoaded', () => {
    const cityInput = document.getElementById("city-input");
    const getWeatherBtn = document.getElementById("get-weather-btn");
    const weatherInfo = document.getElementById("weather-info");
    const cityNameDisplay = document.getElementById("city-name");
    const temperatureDisplay = document.getElementById("temperature");
    const descriptionDisplay = document.getElementById("description");
    const countryDisplay = document.getElementById("country");
    const errorMessage = document.getElementById("error-message");

    getWeatherBtn.addEventListener('click', async() => {
        const city = cityInput.value.trim()
        if(!city) return

        try {
            const weatherData = await fetchWeatherData(city)
            displayWeatherData(weatherData)
        } catch (error) {
            showError()
            cityInput.value = ""
            cityInput.focus()
        }
    });

    cityInput.addEventListener('keypress', (e) => {
        if(e.key === "Enter")   {
            getWeatherBtn.click()
        }
    });

    async function fetchWeatherData (city)    {

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

        const response = await fetch(url)
        console.log("Response", response)

        if(!response.ok){
            throw new Error("City not found");
        }
        const data = await response.json()
        return data
    }

    function displayWeatherData(data)   {
        console.log(data)

        const {name, main, weather, sys} = data
        cityNameDisplay.textContent = name
        temperatureDisplay.textContent = `Temprature: ${main.temp}`
        descriptionDisplay.textContent = `${weather[0].description}`
        countryDisplay.textContent = `Country: ${sys.country}`

        weatherInfo.classList.remove("hidden");
        errorMessage.classList.add("hidden");
    }

    function showError()    {
        weatherInfo.classList.add('hidden')
        errorMessage.classList.remove('hidden')
    }
});