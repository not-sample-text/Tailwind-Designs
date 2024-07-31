// Constants
const FLASH_DURATION = 75;

// Game state
const gameState = {
	clickCount: 0,
	allClicks: 0,
	highScore: 0,
	lastClickTime: null,
	clickTimes: [],
	bestClickTime: null,
	gameTimeout: null,
	missedClicks: 0,
	gameInProgress: false
};

// DOM Elements
const elements = {
	start: document.getElementById("start"),
	lastTime: document.getElementById("time"),
	avgTime: document.getElementById("avg"),
	bestTime: document.getElementById("best"),
	accuracy: document.getElementById("acc"),
	gameDiv: document.getElementById("game"),
	buttons: document.querySelectorAll("#game button"),
	squareContainers: document.querySelectorAll(".square-container"),
	score: document.getElementById("score"),
	highScore: document.getElementById("high"),
	gameDuration: document.getElementById("gameDuration"),
	modal: document.getElementById("endGameModal"),
	closeModal: document.getElementById("closeModal"),
	modalScore: document.getElementById("modalScore"),
	modalHighScore: document.getElementById("modalHighScore"),
	modalLastTime: document.getElementById("modalLastTime"),
	modalAvgTime: document.getElementById("modalAvgTime"),
	modalBestTime: document.getElementById("modalBestTime"),
	modalAccuracy: document.getElementById("modalAccuracy")
};

// Utility functions
function updateDisplay(element, value) {
	element.textContent = value;
}

function saveToLocalStorage(key, value) {
	try {
		localStorage.setItem(key, value);
	} catch (error) {
		console.error(`Error saving ${key} to localStorage:`, error);
	}
}

function loadFromLocalStorage(key, defaultValue) {
	try {
		const value = localStorage.getItem(key);
		return value !== null ? parseInt(value, 10) : defaultValue;
	} catch (error) {
		console.error(`Error loading ${key} from localStorage:`, error);
		return defaultValue;
	}
}

// Button functions
function disableAllButtons() {
	elements.buttons.forEach((button) => {
		button.disabled = true;
		button.previousElementSibling.classList.remove("hidden");
	});
}

function enableRandomButton() {
	const randomButton =
		elements.buttons[Math.floor(Math.random() * elements.buttons.length)];
	randomButton.disabled = false;
	randomButton.previousElementSibling.classList.add("hidden");
	return randomButton;
}

function flashButton(button) {
	button.classList.add("bg-red-500");
	setTimeout(() => button.classList.remove("bg-red-500"), FLASH_DURATION);
}

// Score functions
function updateScore() {
	updateDisplay(elements.score, gameState.clickCount);
}

function updateHighScore() {
	if (gameState.clickCount > gameState.highScore) {
		gameState.highScore = gameState.clickCount;
		saveToLocalStorage("highScore", gameState.highScore);
		updateDisplay(elements.highScore, gameState.highScore);
	}
}

// Time functions
function calculateTimeDifference() {
	const currentTime = Date.now();
	let timeDifference = 0;
	if (gameState.lastClickTime !== null) {
		timeDifference = currentTime - gameState.lastClickTime;
		gameState.clickTimes.push(timeDifference);
		updateLastClickTime(timeDifference);
		updateAverageTime();
		updateBestTime(timeDifference);
	}
	gameState.lastClickTime = currentTime;
	return timeDifference;
}

function updateLastClickTime(time) {
	updateDisplay(elements.lastTime, time);
}

function updateAverageTime() {
	const avg =
		gameState.clickTimes.reduce((a, b) => a + b, 0) /
		gameState.clickTimes.length;
	updateDisplay(elements.avgTime, avg.toFixed(0));
}

function updateBestTime(timeDifference) {
	if (
		gameState.bestClickTime === null ||
		timeDifference < gameState.bestClickTime
	) {
		gameState.bestClickTime = timeDifference;
		saveToLocalStorage("bestClickTime", gameState.bestClickTime);
		updateDisplay(elements.bestTime, gameState.bestClickTime);
	}
}
// Accuracy functions
function calculateAccuracy() {
	const totalClicks = gameState.clickCount + gameState.missedClicks;
	return totalClicks === 0
		? 0
		: ((gameState.clickCount / totalClicks) * 100).toFixed(2);
}

function updateAccuracyDisplay() {
	const accuracy = calculateAccuracy();
	elements.accuracy.innerHTML = `
    <span class="text-emerald-500">${gameState.clickCount}</span> / 
    <span class="text-red-500">${gameState.missedClicks}</span> 
    (${accuracy}%)
  `;
}

// Game flow functions
function handleButtonClick(event) {
	event.stopPropagation(); // Prevent the click from bubbling to the container
	calculateTimeDifference();
	gameState.clickCount++;
	updateScore();
	updateHighScore();
	disableAllButtons();
	setupNextButton();
	updateAccuracyDisplay();
}

function handleMissedClick() {
	if (gameState.gameInProgress) {
		gameState.missedClicks++;
		updateAccuracyDisplay();
	}
}

function setupNextButton() {
	const enabledButton = enableRandomButton();
	flashButton(enabledButton);
	enabledButton.addEventListener("click", handleButtonClick, { once: true });
}

function startGame() {
	resetGameState();
	updateButtonLabel();
	updateScore();
	disableAllButtons();
	setupNextButton();
	gameState.gameInProgress = true;

	const duration = parseInt(elements.gameDuration.value) * 1000;
	if (duration > 0) {
		gameState.gameTimeout = setTimeout(endGame, duration);
	}
}

function endGame() {
	gameState.gameInProgress = false;
	disableAllButtons();
	clearTimeout(gameState.gameTimeout);
	showEndGameModal();
}

function resetGameState() {
	clearTimeout(gameState.gameTimeout);
	Object.assign(gameState, {
		clickCount: 0,
		lastClickTime: null,
		clickTimes: [],
		allClicks: 0,
		missedClicks: 0,
		gameInProgress: false
	});
	updateScore();
	updateAccuracyDisplay();
	updateLastClickTime(0);
	updateDisplay(elements.avgTime, 0);
}

function updateButtonLabel() {
	elements.start.textContent = "Restart!";
}

// Modal functions
function showEndGameModal() {
	updateModalContent();
	elements.modal.classList.remove("hidden");
	elements.modal.classList.add("flex");
}

function hideEndGameModal() {
	elements.modal.classList.add("hidden");
	elements.modal.classList.remove("flex");
}

function updateModalContent() {
	elements.modalScore.textContent = gameState.clickCount;
	elements.modalHighScore.textContent = gameState.highScore;
	elements.modalLastTime.textContent = elements.lastTime.textContent;
	elements.modalAvgTime.textContent = elements.avgTime.textContent;
	elements.modalBestTime.textContent = elements.bestTime.textContent;
	elements.modalAccuracy.innerHTML = elements.accuracy.innerHTML;
}

// Initialization
function initializeGame() {
	disableAllButtons();
	setupEventListeners();
	loadGameState();
	updateInitialDisplay();
}

function setupEventListeners() {
	elements.closeModal.addEventListener("click", handleModalClose);
	elements.start.addEventListener("click", startGame);
	elements.gameDiv.addEventListener("click", handleMissedClick);
}

function handleModalClose() {
	hideEndGameModal();
	location.reload();
}

function loadGameState() {
	gameState.highScore = loadFromLocalStorage("highScore", 0);
	gameState.bestClickTime = loadFromLocalStorage("bestClickTime", null);
}

function updateInitialDisplay() {
	updateDisplay(elements.highScore, gameState.highScore);
	if (gameState.bestClickTime !== null) {
		updateDisplay(elements.bestTime, gameState.bestClickTime);
	}
}

// Initialize the game when the window loads
window.addEventListener("load", initializeGame);
