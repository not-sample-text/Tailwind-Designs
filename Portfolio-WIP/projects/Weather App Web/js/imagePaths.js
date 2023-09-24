export function getWeatherImagePath(id) {
	if (id >= 200 && id <= 232) return "./assets/weather-types/200.png";
	if (id >= 300 && id <= 321) return "./assets/weather-types/300.png";
	if (id >= 500 && id <= 504) return "./assets/weather-types/500.png";
	if (id >= 504 && id <= 531) return "./assets/weather-types/504.png";
	if (id === 600) return "./assets/weather-types/600.png";
	if (id === 611) return "./assets/weather-types/611.png";
	if (id >= 601 && id <= 622) return "./assets/weather-types/601.png";
	if (id >= 700 && id <= 781) return "./assets/weather-types/700.png";
	if (id === 800) return "./assets/weather-types/800.png";
	if (id >= 801 && id <= 802) return "./assets/weather-types/802.png";
	if (id >= 803 && id <= 804) return "./assets/weather-types/803.png";
}

export function getClothingImagePath(temp) {
	if (temp >= 25) return "./assets/clothes/underwear.png";
	if (temp >= 20 && temp < 25) return "./assets/clothes/t-shirt.png";
	if (temp >= 5 && temp < 20) return "./assets/clothes/coat-light.png";
	if (temp >= -5 && temp < 5) return "./assets/clothes/coat-med.png";
	if (temp < -5) return "./assets/clothes/coat-heavy.png";
}
