import { getWeatherImagePath, getClothingImagePath } from "./imagePaths.js";

export async function getWeather(lat, lon) {
	const apiKey = "3e41a37c2375af53026e83f5b328bb29";
	let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

	try {
		let response = await fetch(url);
		let data = await response.json();

		let weatherImagePath = getWeatherImagePath(data.weather[0].id);
		let clothingImagePath = getClothingImagePath(data.main.temp);
		let temperature = `${Math.floor(data.main.temp)}C`;

		// Update the weather image
		document.getElementById("weather-image").src = weatherImagePath;

		// Update the clothing image
		document.getElementById("clothing-image").src = clothingImagePath;

		// Update the temperature
		document.getElementById("temperature").textContent = temperature;
	} catch (error) {
		console.error("An error occurred:", error);
	}
}
