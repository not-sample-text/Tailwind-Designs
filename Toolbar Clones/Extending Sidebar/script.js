const sidebar = document.querySelector("#sidebar"),
	menuIcon = document.querySelector("#menu > i.ti");

menuIcon.onclick = function a() {
	sidebar.classList.toggle("closed");
	menuIcon.classList.toggle("ti-layout-sidebar-left-expand");
};
