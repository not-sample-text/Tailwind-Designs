const menu = document.getElementById("hamburger-menu"),
	list = document.getElementById("link-list");

menu.onclick = function () {
	menu.classList.toggle("active");
	list.classList.toggle("active");
};
