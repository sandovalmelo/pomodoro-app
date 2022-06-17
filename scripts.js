const settingsIcon = document.getElementById("settings-icon");
const closeIcon = document.getElementById("close-icon");

const pomodoroOptions = document.getElementById("pomodoro-options");

const pomodoroMinutes = document.getElementById("pomodoro-minutes");
const shortBreak = document.getElementById("short-break");
const longBreak = document.getElementById("long-break");

const settingsOverlay = document.querySelector(".settings");
const settingsForm = document.getElementById("settings-form");

function setOptionMinutes(option) {
	console.log(option);
}

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
	console.dir(settingsForm);

	console.log(pomodoroMinutes.value);
	console.log(shortBreak.value);
	console.log(longBreak.value);

	toggleSettings("remove");
});

pomodoroOptions.addEventListener("change", (event) => {
	setOptionMinutes(event.target.value);
});
