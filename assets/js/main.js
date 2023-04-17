'use strict';

// Select all navigation links and page elements
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// Add click event listener to each navigation link
navigationLinks.forEach((link) => {
	link.addEventListener("click", () => {
		// Loop through all pages and find the one that matches the link's data-page attribute
		pages.forEach((page) => {
			if (link.innerHTML.toLowerCase() === page.dataset.page) {
				// Scroll to the page using smooth scroll behavior
				window.scrollTo({
					top: page.offsetTop,
					behavior: 'smooth',
				});
			}
		});
	});
});