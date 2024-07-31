const sidebarIcons = document.querySelectorAll(".sidebar-icon");

sidebarIcons.forEach((sidebarIcon) => {
	sidebarIcon.addEventListener("mouseenter", () => {
		sidebarIcon.classList.add("active");
	});

	sidebarIcon.addEventListener("mouseleave", () => {
		sidebarIcon.classList.remove("active");
	});
});
