'use strict';

// Select all navigation links and page elements
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// variables for custom select
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

// Select all filter items
const filterItems = document.querySelectorAll("[data-filter-item]");

// Select the contact form and its elements
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// function for toggling element class
const toggleClass = function (elem) {
	elem.classList.toggle("active");
}

// event listener for select element
select.addEventListener("click", function () {
	toggleClass(this);
});

// Select the filter items and define the filterFunc to show or hide items based on selected category
const filterFunc = (selectedValue) => {
	filterItems.forEach((item) => {
		if (selectedValue === "all") {
			item.classList.add("active");
		} else if (selectedValue === item.dataset.category) {
			item.classList.add("active");
		} else {
			item.classList.remove("active");
		}
	});
};

// Add click event listener to each select item and update the selected value and filter the items
selectItems.forEach((item) => {
	item.addEventListener("click", () => {
		const selectedValue = item.innerText.toLowerCase();
		selectValue.innerText = item.innerText;
		elementToggleFunc(select);
		filterFunc(selectedValue);
	});
});

// Add click event listener to each filter button and update the selected value and filter the items
let lastClickedBtn = filterBtn[0];
filterBtn.forEach((btn) => {
	btn.addEventListener("click", () => {
		const selectedValue = btn.innerText.toLowerCase();
		selectValue.innerText = btn.innerText;
		filterFunc(selectedValue);
		lastClickedBtn.classList.remove("active");
		btn.classList.add("active");
		lastClickedBtn = btn;
	});
});

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