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

// Time
const minutesTime = document.querySelector(".time .minutes");
const secondsTime = document.querySelector(".time .seconds");

let totalTime;

function renderTime() {
	const totalValue = totalTime * 60;

	const minutes = Math.floor(totalValue / 60)
		.toString()
		.padStart(2, "0");

	const seconds = (totalValue - minutes * 60).toString().padStart(2, "0");

	minutesTime.innerText = minutes;
	secondsTime.innerText = seconds;
}

function setOptionMinutes(option) {
	console.log(option);

	if (option === "option-pomodoro") {
		totalTime = pomodoroMinutes.value;
	} else if (option === "option-short-break") {
		totalTime = shortBreak.value;
	} else {
		totalTime = longBreak.value;
	}

	console.log(totalTime);
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
	totalTime = pomodoroMinutes.value;
	renderTime();
}

getSettingsOptions();
