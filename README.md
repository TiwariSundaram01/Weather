# Weather Forecast App 🌤️

A weather forecast web application that fetches real-time weather data from the OpenWeatherMap API and displays key metrics such as temperature, wind speed, visibility, pressure, and more. The app includes a stylish user interface, powered by Bootstrap, and dynamically updates based on the user's location or entered locality.

![Weather App Preview]

![Weather-Preview](https://github.com/user-attachments/assets/46524533-ff8a-4bde-99c4-42abb25e09fb)



## Features

- *Real-time Weather Data*: Fetches live weather information using the [OpenWeatherMap API](https://openweathermap.org/api).
- *Locality-based Search*: Users can enter a location to get weather data for a specific area.
- *Geolocation Support*: Automatically fetches weather data based on the user's location.
- *Temperature Unit Switch*: Supports both Celsius and Fahrenheit units.
- *Compass with Wind Direction*: Displays wind direction via a rotating compass.
- *Detailed Weather Info*: Shows current temperature, real feel, max/min temperatures, pressure, visibility, wind speed, and weather conditions.

## Tech Stack

- *HTML5, CSS3*: For structure and design.
- *Bootstrap 5*: Responsive, mobile-first layout.
- *jQuery*: DOM manipulation and API calls.
- *OpenWeatherMap API*: Fetches live weather data.
- *Notify.js*: For user-friendly notifications.
- *FontAwesome*: For icons and visual enhancement.

## How It Works

1. The user can enter a locality or use geolocation to find the current weather data.
2. Weather data such as temperature, wind speed, visibility, and more is fetched from the OpenWeatherMap API.
3. The app dynamically updates the UI to display the fetched data.
4. A rotating compass displays the wind direction in real-time.

## Installation and Setup

### Step 1: Clone the Repository

git clone https://github.com/your-username/weather-forecast-app.git <br>
cd weather-forecast-app


### Step 2: API Key Configuration

1. Sign up for an API key from [OpenWeatherMap](https://home.openweathermap.org/users/sign_up).
2. Open the weather.js file and replace the placeholder API key with your own.

const apiKey = "your_api_key_here";


### Step 3: Run Locally

You can open project.html directly in your browser to view the app. Alternatively, you can host it on any web server.

open project.html


### Step 4: Customize (Optional)

You can customize the app by modifying the style.css for design or enhancing the JS code in weather.js to add more features.

## Usage

1. Enter a locality in the input field or allow the app to access your location.
2. Choose between Celsius or Fahrenheit for temperature units.
3. Click the *Check!* button to get the weather data.

## Project Structure


/weather-forecast-app <br>
│  <br>
├── /icons          # SVG weather icons <br>
├── project.html    # Main HTML file <br>
├── style.css       # Custom CSS file for styling <br>
├── weather.js      # JavaScript for fetching and displaying weather data <br>
└── README.md       # Project documentation <br>


## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Feel free to copy the content and adjust it for your GitHub repository:

git clone https://github.com/your-username/weather-forecast-app.git <br>
cd weather-forecast-app
