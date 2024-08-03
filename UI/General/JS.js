let loader = document.querySelector(".loaderContainer");
function showLoader() {
  loader.style.display = "flex";
}

function hideLoader() {
  loader.style.display = "none";
}

console.log(localStorage.getItem("isLoggedIn"));

let messageSent = document.querySelector(".messageSent");

function showToast(message, type) {
  let toastDiv;
  if (type === "success") {
    toastDiv = `<img src="../UI/Images/Checked.svg" class="check-img js-toast" alt=""> <div>${message}</div>`;
    messageSent.innerHTML = toastDiv;
    messageSent.style.display = "flex";
    setTimeout(() => {
      messageSent.style.display = "none";
    }, 2000);
  } else {
    toastDiv = `<div>${message}</div>`;
    messageSent.style.backgroundColor = "rgb(253, 114, 114)";
    messageSent.innerHTML = toastDiv;
    messageSent.style.display = "flex";
    setTimeout(() => {
      messageSent.style.display = "none";
    }, 2000);
  }
}

document.querySelectorAll(".logout-btn").forEach((button) => {
  button.addEventListener("click", function () {
    localStorage.removeItem("token");
    window.location.href = "../index.html";
  });
});

const themeIcon = document.querySelector(".js-theme-icon");
const body = document.body;
const logoDiv = document.querySelector(".js-logo");

let theme = localStorage.getItem("theme") || "light";

function applyTheme(theme) {
  if (theme === "dark") {
    themeIcon.innerHTML = "<i title='Light Mode' class='fa-solid fa-star'></i>";
    body.classList.add("dark");
    logoDiv.innerHTML='<img class="logo-name" src="Images/Caleb’s Brand (1).svg" alt="" />'
  } else {
    themeIcon.innerHTML = "<i title='Night Mode' class='fa-solid fa-moon'></i>";
    body.classList.remove("dark");
    logoDiv.innerHTML='<img class="logo-name" src="Images/Caleb’s Brand (2).svg" alt="" />'
  }
}

applyTheme(theme);

themeIcon.addEventListener("click", () => {
  theme = theme === "light" ? "dark" : "light";
  localStorage.setItem("theme", theme);
  applyTheme(theme);
});
