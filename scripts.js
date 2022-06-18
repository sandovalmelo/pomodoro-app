const pomodoroOptions = document.getElementById("pomodoro-options");

// Pomodoro opptions
const pomodoroOptionsInputs = document.querySelectorAll(
	'input[name="pomodoro-option"]'
);

// Settings form options
const pomodoroMinutes = document.getElementById("pomodoro-minutes");
const shortBreak = document.getElementById("short-break");
const longBreak = document.getElementById("long-break");
const fontOptions = document.querySelectorAll('input[name="font"]');
const colorOptions = document.querySelectorAll('input[name="color"]');

// Close and Open settings icons
const settingsIcon = document.getElementById("settings-icon");
const closeIcon = document.getElementById("close-icon");

// Settings section
const settingsOverlay = document.querySelector(".settings");
const settingsForm = document.getElementById("settings-form");

// Progress bar
const progressBar = document.querySelector(".progress-bar");

// Time
const minutesTime = document.querySelector(".time .minutes");
const secondsTime = document.querySelector(".time .seconds");
const pauseButton = document.getElementById("pause-button");
const resumeButton = document.getElementById("resume-button");
const startButton = document.getElementById("start-button");

// Time Config
let totalTime;
let timeLeft = totalTime;
let percentValue = 100;

// Progress Bar Config
const radius = progressBar.r.baseVal.value;
const circunference = radius * 2 * Math.PI;

progressBar.style.strokeDasharray = `${circunference} ${circunference}`;
progressBar.style.strokeDashoffset = `${circunference}`;

function setProgress(percent) {
	const offset = circunference - (percent / 100) * circunference;
	progressBar.style.strokeDashoffset = offset;
}

setProgress(100);

// Render Time on Screen
function renderTime() {
	const minutes = Math.floor(timeLeft / 60)
		.toString()
		.padStart(2, "0");

	const seconds = (timeLeft - minutes * 60).toString().padStart(2, "0");

	minutesTime.innerText = minutes;
	secondsTime.innerText = seconds;
}

function resetTimer() {
	startButton.hidden = false;
	pauseButton.hidden = true;
	resumeButton.hidden = true;
}

// Interval Config
let interval = setInterval(setTimer, 1000);

function setTimer() {
	startButton.hidden = true;
	let percentSeconds = 100 / totalTime;
	percentValue = percentValue - percentSeconds;
	setProgress(percentValue);
	timeLeft--;

	renderTime();

	if (timeLeft <= 0) {
		setProgress(0);
		clearInterval(interval);
		resetTimer();
	}
}

// Toggle Settings
function toggleSettings(method) {
	if (method === "add") {
		document.body.classList.add("settings-open");
	} else if (method === "remove") {
		document.body.classList.remove("settings-open");
	}
}

settingsIcon.addEventListener("click", () => {
	toggleSettings("add");
});

closeIcon.addEventListener("click", () => {
	toggleSettings("remove");
});

settingsOverlay.addEventListener("click", (event) => {
	if (event.target === settingsOverlay) toggleSettings("remove");
});

// Settings Form
settingsForm.addEventListener("submit", (event) => {
	event.preventDefault();
	totalTime = Number(pomodoroMinutes.value) * 60;
	pomodoroOptionsInputs[0].checked = true;

	for (inputFont of fontOptions) {
		if (inputFont.checked) {
			document.body.setAttribute("data-font", `${inputFont.value}`);
		}
	}

	for (inputColor of colorOptions) {
		if (inputColor.checked) {
			document.body.setAttribute("data-color", `${inputColor.value}`);
		}
	}

	timeLeft = totalTime;
	percentValue = 100;
	renderTime();
	toggleSettings("remove");
});

// Set Options
function setOptionMinutes(option) {
	setProgress(100);

	if (option === "option-pomodoro") {
		totalTime = Number(pomodoroMinutes.value) * 60;
	} else if (option === "option-short-break") {
		totalTime = Number(shortBreak.value) * 60;
	} else {
		totalTime = Number(longBreak.value) * 60;
	}

	timeLeft = totalTime;
	percentValue = 100;
	renderTime();
}

pomodoroOptions.addEventListener("change", (event) => {
	setOptionMinutes(event.target.value);
});

// Pause, Resume and Start
pauseButton.addEventListener("click", () => {
	clearInterval(interval);
	pauseButton.hidden = true;
	resumeButton.hidden = false;
});

resumeButton.addEventListener("click", () => {
	pauseButton.hidden = false;
	resumeButton.hidden = true;
	interval = setInterval(setTimer, 1000);
});

startButton.addEventListener("click", () => {
	console.log(totalTime);
	console.log(timeLeft);
	percentValue = 100;
	timeLeft = totalTime;
	setInterval(setTimer, 1000);
});

// Get Settings
function getSettingsOptions() {
	totalTime = Number(pomodoroMinutes.value) * 60;
	timeLeft = totalTime;
	percentValue = 100;
	renderTime();
}

getSettingsOptions();
