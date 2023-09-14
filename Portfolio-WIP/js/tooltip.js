const navItems = document.querySelectorAll("nav ul li");

navItems.forEach((item) => {
	item.addEventListener("mouseover", () => {
		item.classList.add("hovered");
	});

	item.addEventListener("mouseout", () => {
		item.classList.remove("hovered");
	});
});
