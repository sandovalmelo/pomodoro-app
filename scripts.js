const pomodoroOptions = document.getElementById("pomodoro-options");

// Pomodoro opptions
const pomodoroOptionsInputs = document.querySelectorAll(
	'input[name="pomodoro-option"]'
);

// Settings form options
const pomodoroMinutes = document.getElementById("pomodoro-minutes");
const shortBreak = document.getElementById("short-break");
const longBreak = document.getElementById("long-break");

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

let totalTime;
let timeLeft = totalTime;
let percentValue = 100;

const radius = progressBar.r.baseVal.value;
const circunference = radius * 2 * Math.PI;

progressBar.style.strokeDasharray = `${circunference} ${circunference}`;
progressBar.style.strokeDashoffset = `${circunference}`;

function setProgress(percent) {
	const offset = circunference - (percent / 100) * circunference;
	progressBar.style.strokeDashoffset = offset;
}

setProgress(100);

function renderTime() {
	console.log(totalTime);
	console.log(timeLeft);
	const minutes = Math.floor(timeLeft / 60)
		.toString()
		.padStart(2, "0");

	const seconds = (timeLeft - minutes * 60).toString().padStart(2, "0");

	minutesTime.innerText = minutes;
	secondsTime.innerText = seconds;
}

const interval = setInterval(() => {
	let percentSeconds = 100 / totalTime;
	percentValue = percentValue - percentSeconds;
	setProgress(percentValue);
	timeLeft--;

	renderTime();

	if (timeLeft <= 0) {
		setProgress(0);
		clearInterval(interval);
	}
}, 1000);

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
	renderTime();
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

settingsForm.addEventListener("submit", (event) => {
	event.preventDefault();
	totalTime = pomodoroMinutes.value;
	renderTime();
	toggleSettings("remove");
});

pomodoroOptions.addEventListener("change", (event) => {
	setOptionMinutes(event.target.value);
});

function getSettingsOptions() {
	totalTime = Number(pomodoroMinutes.value) * 60;
	timeLeft = totalTime;
	renderTime();
}

getSettingsOptions();
