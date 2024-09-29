const apiKey = "b190a0605344cc4f3af08d0dd473dd25";

const celsiusToFahrenheit = (celsius) => {
    fahrenheit = (celsius * (9 / 5)) + 32
    return fahrenheit.toFixed(2);
}

const showWeatherData = (data)=> {
    console.log(data);
    let temp_unit = $('input[name="temperatureUnit"]:checked').val();
    let temp = data['main']['temp'];
    let feels_like = data['main']['feels_like'];
    let temp_max = data['main']['temp_max'];
    let temp_min = data['main']['temp_min'];
    let locality_name = data['name'];

    if(data){
        $('.showData').show(300);
        $('#locality-name').text(locality_name);

        if(temp_unit == 'celsius'){
            $('#temp').text(temp+' °C');
            $('#feels_like').text(feels_like+' °C');
            $('#temp_max').text(temp_max+" °C");
            $('#temp_min').text(temp_min+" °C");
        }else {
            $('#temp').text(celsiusToFahrenheit(temp)+' °F');
            $('#feels_like').text(celsiusToFahrenheit(feels_like)+' °F');
            $('#temp_max').text(celsiusToFahrenheit(temp_max)+" °F");
            $('#temp_min').text(celsiusToFahrenheit(temp_min)+" °F");
        }

    } 
};

$('input[name="temperatureUnit"]').on('')

// Function to fetch weather data using the OpenWeatherMap API
const fetchWeatherData = (locality) => {
    $.get(`https://api.openweathermap.org/data/2.5/weather?q=${locality}&units=metric&appid=${apiKey}`, (data) => {
        showWeatherData(data);
        showNotification("Weather data fetched successfully!", 'success');
    })
    .fail((jqXHR, textStatus, errorThrown) => {
        console.error(`Request failed: ${textStatus}, ${errorThrown}`);
        showNotification("Unable to fetch weather data. Please try again in input field.", 'error');
    });
};

// Function to get weather data based on user input
$('#fetch-data').on('click',function(){
    const locality = $('#locality').val();
    if (locality) {
        fetchWeatherData(locality);
    } else {
        showNotification("Please enter a valid locality.", 'error');
    }
});

$('#locality').on('click',function(){
    $('.showData').hide(300);
})

// Function to fetch user's geolocation and get weather data based on location
const findUserLocation = () => {
    const success = (position) => {
        const { latitude, longitude } = position.coords;
        const geoApiUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`;

        $.get(geoApiUrl, (data) => {
            if (data.locality) {
                fetchWeatherData(data.locality);
            } else {
                showNotification("Unable to fetch locality data from geolocation.", 'error');
            }
        })
        .fail(() => {
            showNotification("Error in reverse geocoding API.", 'error');
        });
    };

    const error = () => {
        console.error("Unable to get user location.");
        showNotification("Unable to get your location. Please enable location services.", 'error');
    };

    // Request user geolocation
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error);
    } else {
        showNotification("Geolocation is not supported by your browser.", 'error');
    }
};

// Function to display notifications
const showNotification = (message, type) => {
    $.notify(message, {
        className: type,
        position: "top right"
    });
};

// Call function to find user's location when the page loads
findUserLocation();
