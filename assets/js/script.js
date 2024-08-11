'use strict';

const webDev = "Web Developer";
const mlDev = "Software Engineer";

function changeTitle() {
  const title = document.querySelector("p.title");

  if (title.innerText === webDev) {
    title.style.opacity = 0; // Mengubah opacity menjadi 0 (teks akan memudar)
    setTimeout(() => {
      title.innerText = mlDev;
      title.style.opacity = 1; // Mengubah opacity menjadi 1 (teks akan muncul kembali)
    }, 1000); // Setelah 1 detik, teks berubah dan memudar
  } else {
    title.style.opacity = 0; // Mengubah opacity menjadi 0 (teks akan memudar)
    setTimeout(() => {
      title.innerText = webDev;
      title.style.opacity = 1; // Mengubah opacity menjadi 1 (teks akan muncul kembali)
    }, 1000); // Setelah 1 detik, teks berubah dan memudar
  }
}

setInterval(changeTitle, 4500);


// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");
const modalDate = document.querySelector("[data-modal-date]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;
    modalDate.innerHTML = this.querySelector("[data-testimonials-date]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");
const navbarPortfolio = document.querySelector('button[data-nav-link="portfolio"]');

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    const portfolio = ['halonotes', 'tecation', 'infografis', 'scraping-bayi', 'gaptech', 'notemail'];
    for (let i = 0; i < pages.length; i++) {
      if (this.getAttribute('data-nav-link') === pages[i].dataset.page) {
        if (portfolio.includes(this.getAttribute('data-nav-link'))) {
          navbarPortfolio.classList.add("active");
          pages[i].classList.add("active");
        } else {
          pages[i].classList.add("active");
          navigationLinks[i].classList.add("active");
          window.scrollTo(0, 0);
        }
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}

// My Script Javascript
// Script for send message for me
const formButton = document.querySelector(".form-btn");

formButton.addEventListener("click", function () {
  // GET DATA
  const fullname = document.querySelector("input[name='fullname']").value;
  const email = document.querySelector("input[name='email']").value;
  const message = document.querySelector("textarea[name='message']").value;

  // REST SERVER FOR SEND EMAIL
  // Prepare for request HTTP
  const Http = new XMLHttpRequest();
  let data = new FormData();
  const url = "https://halokak.pythonanywhere.com/sendemail";

  // OPEN REQUEST POST HTTP TO REST SERVER
  Http.open("POST", url);

  // ADD DATA TO REST SERVER FOR SEND EMAIL
  data.append("fullname", fullname);
  data.append("email", email);
  data.append("message", message);

  // SEND DATA TO REST SERVER
  Http.send(data);

  Http.onreadystatechange = (e) => {
    console.log(Http.responseText)
  }

  // FEEDBACK MESSAGE SENT
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })

  Toast.fire({
    icon: 'success',
    title: 'Pesan terkirim!'
  });

  // CLEAR FORM INPUT
  document.querySelector("input[name='fullname']").value = "";
  document.querySelector("input[name='email']").value = "";
  document.querySelector("textarea[name='message']").value = "";

  // DISABLED FORM SUBMIT BUTTON
  formButton.setAttribute("disabled", "");
})