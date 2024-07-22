// Get start button
const start = document.querySelector("#start");

// Get all buttons within the grid
const buttons = document.querySelectorAll("#game button");

// Get the score container and its text elements
const score_container = document.querySelector("#score");
const score_text = document.querySelectorAll("#score p");

// Get the high score container and its text elements
const high_container = document.querySelector("#high");
const high_text = document.querySelectorAll("#high p");

let clickCount = 0;
let highScore = 0;

const disableAllButtons = () => {
	// Disable all buttons within the grid
	buttons.forEach((button) => {
		button.setAttribute("disabled", true);
	});
};

const updateHighScoreDisplay = () => {
	high_text.forEach((high) => {
		high.textContent = highScore;
	});
};

const enableRandomButton = () => {
	// Generate a random index based on the number of buttons
	const randomIndex = Math.floor(Math.random() * buttons.length);

	// Enable the randomly selected button
	buttons[randomIndex].removeAttribute("disabled");

	// Return the enabled button
	return buttons[randomIndex];
};

const buttonClickHandler = (event) => {
	// Increment the click count
	clickCount++;

	// Update the score text content
	score_text.forEach((score) => {
		score.textContent = clickCount;
	});

	// Update high score if needed
	updateHighScore();

	// Disable all buttons
	disableAllButtons();

	// Enable another random button
	let enabledButton = enableRandomButton();

	// Add click event listener to the new enabled button
	enabledButton.addEventListener("click", buttonClickHandler);
};

const startGame = () => {
	// Reset the click count
	clickCount = 0;

	// Update the score text content
	score_text.forEach((score) => {
		score.textContent = clickCount;
	});

	// Disable all buttons initially
	disableAllButtons();

	// Enable a random button
	let enabledButton = enableRandomButton();

	// Add click event listener to the enabled button
	enabledButton.addEventListener("click", buttonClickHandler);
};

// Update high score in local storage if current score is higher
const updateHighScore = () => {
	if (clickCount > highScore) {
		highScore = clickCount;
		localStorage.setItem("highScore", highScore);
		updateHighScoreDisplay();
	}
};

// Add click event listener to the start button
start.addEventListener("click", () => {
	startGame();
});

window.addEventListener("load", () => {
	// Disable all buttons initially
	disableAllButtons();

	// Retrieve high score from local storage
	highScore = localStorage.getItem("highScore") || 0;
	updateHighScoreDisplay();
});
