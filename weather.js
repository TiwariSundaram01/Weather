$(document).ready(function() {
    const canvas = document.getElementById('compass');
    const ctx = canvas.getContext('2d');

    const radius = canvas.width / 2;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // Draw the compass with labels
    function drawCompass(rotation = 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas

        // Draw outer circle
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius - 10, 0, Math.PI * 2, true);
        ctx.fillStyle = 'transparent';
        ctx.fill();
        ctx.strokeStyle = '#88a6ba';
        ctx.lineWidth = 3; // Adjusted line width for smaller canvas
        ctx.stroke();

        // Draw directions
        const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
        const angle = Math.PI / 4; // 45 degrees for each direction

        ctx.fillStyle = '#88a6ba';
        ctx.font = 'bold 10px Fredoka'; // Adjusted font size for smaller canvas

        directions.forEach((direction, index) => {
            const x = centerX + (radius - 20) * Math.cos(rotation + angle * index);
            const y = centerY + (radius - 20) * Math.sin(rotation + angle * index);
            ctx.fillText(direction, x - 10, y + 3); // Adjusted label position
        });

        // Draw the needle
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(rotation);
        ctx.beginPath();
        ctx.moveTo(0, -radius + 15); // Adjusted length for smaller canvas
        ctx.lineTo(-3, -radius + 5);
        ctx.lineTo(3, -radius + 5);
        ctx.closePath();
        ctx.fillStyle = 'aqua';
        ctx.fill();
        ctx.restore();
    }

    // Initial draw
    drawCompass();

    // Function to rotate the needle
    function rotateCompass(deg) {
        const radians = (deg * Math.PI) / 180;
        drawCompass(radians);
    }

    const celsiusToFahrenheit = (celsius) => {
        fahrenheit = (celsius * (9 / 5)) + 32
        return fahrenheit.toFixed(2);
    }

    //API Call Here
    const apiKey = "b190a0605344cc4f3af08d0dd473dd25";

    const showWeatherData = (data)=> {
        console.log(data);
        let temp_unit = $('input[name="temperatureUnit"]:checked').val();
        let temp = data['main']['temp'];
        let feels_like = data['main']['feels_like'];
        let temp_max = data['main']['temp_max'];
        let temp_min = data['main']['temp_min'];
        let locality_name = data['name'];
        let pressure = data['main']['pressure'];
        let visibility = data['visibility']/1000;
        let temp_name = data['weather'][0]['main'];
        let deg = data['wind']['deg'];
        let wind_speed = data['wind']['speed'];
    
        if(data){
            $('.showData').show(300);
            $('#locality-name').text(locality_name);
            $('#pressure').text(pressure+' Pa');
            $('#visibility').text(visibility+' Mi');
            $('#temp_img').attr('src', '/icons/'+temp_name+'.svg');
            $('#temp_name').text(temp_name);
            $('#wind_speed').text(wind_speed+' MPH');
            rotateCompass(deg);
    
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
    
    // Function to fetch weather data using the OpenWeatherMap API
    const fetchWeatherData = (locality) => {
        $.get(`https://api.openweathermap.org/data/2.5/weather?q=${locality}&units=metric&appid=${apiKey}`, (data) => {
            showWeatherData(data);
            showNotification("Weather data fetched successfully!", 'success');
        })
        .fail((jqXHR, textStatus, errorThrown) => {
            console.error(`Request failed: ${textStatus}, ${errorThrown}`);
            showNotification("Unable to fetch weather data. Please try again.", 'error');
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
    
});

