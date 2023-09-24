function updateTime() {
	const now = new Date();

	const timeElement = document.getElementById("time");
	const option = {
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit",
		hour12: false
	};
	timeElement.textContent = now.toLocaleTimeString(undefined, option);

	const dateElement = document.getElementById("date");
	const options = {
		weekday: "short",
		day: "2-digit",
		month: "2-digit",
		year: "numeric"
	};
	const dateString = now
		.toLocaleDateString(undefined, options)
		.replace(/\./, "")
		.replace(/\//g, ".");
	dateElement.textContent = dateString;
}

setInterval(updateTime, 1000);
