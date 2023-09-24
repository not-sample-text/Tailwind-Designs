import { getWeather } from "./weather.js";

function showPosition(position) {
	var lat = position.coords.latitude;
	var lon = position.coords.longitude;

	getWeather(lat, lon);
}

export function getLocation() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(showPosition);
	} else {
		console.log("Geolocation is not supported by this browser.");
	}
}

getLocation();
