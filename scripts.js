const settingsIcon = document.getElementById("settings-icon");
const closeIcon = document.getElementById("close-icon");
const settingsOverlay = document.querySelector(".settings");

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
