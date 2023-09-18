const inputs = document.querySelectorAll(".form-input");
const labels = document.querySelectorAll("label");

inputs.forEach((input, index) => {
	input.addEventListener("focus", () => {
		labels[index].classList.add("raised", "focused");
	});

	input.addEventListener("blur", () => {
		labels[index].classList.remove("focused");
		if (input.value === "") {
			labels[index].classList.remove("raised");
		}
	});

	// Check if the input already has text on page load
	if (input.value !== "") {
		labels[index].classList.add("raised");
	}
});
