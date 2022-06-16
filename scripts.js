const settingsIcon = document.getElementById("settings-icon");
const closeIcon = document.getElementById("close-icon");
const settingsOverlay = document.querySelector(".settings");
const settingsForm = document.getElementById("settings-form");
const pomodoroMinutes = document.getElementById("pomodoro-minutes");
const shortBreak = document.getElementById("short-break");
const longBreak = document.getElementById("long-break");

settingsIcon.addEventListener("click", () => {
	document.body.classList.add("settings-open");
});

closeIcon.addEventListener("click", () => {
	document.body.classList.remove("settings-open");
});

settingsOverlay.addEventListener("click", (event) => {
	if (event.target === settingsOverlay)
		document.body.classList.remove("settings-open");
});

settingsForm.addEventListener("submit", (event) => {
	event.preventDefault();
	console.dir(settingsForm);

	console.log(pomodoroMinutes.value);
	console.log(shortBreak.value);
	console.log(longBreak.value);
});
