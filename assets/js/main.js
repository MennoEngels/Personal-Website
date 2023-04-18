'use strict';

// Select all navigation links and page elements
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// Select the contact form and its elements
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// Add input event listener to each form input field and validate the form
formInputs.forEach((input) => {
	input.addEventListener("input", () => {
		if (validateForm()) {
			formBtn.removeAttribute("disabled");
		} else {
			formBtn.setAttribute("disabled", "");
		}
	});
});

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

// Function for validating form
const validateForm = () => {
	const { fullname, email, message } = form.elements;

	const isEmailValid = email.value.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/);
	const isMessageValid = message.value.length < 1000;
	const isNameValid = fullname.value.length < 100;

	if (form.checkValidity() && isEmailValid && isMessageValid && isNameValid) {
		return true;
	} else {
		return false;
	}
};