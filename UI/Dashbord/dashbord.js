const navbarLinks = document.getElementById('navbarLinks');
const hamburgerBtn = document.getElementById('hamburgerBtn');
const mobileNavbar = document.getElementById('mobileNavbar');
const closeBtn = document.getElementById('closeBtn');

hamburgerBtn.addEventListener('click', function() {
  mobileNavbar.style.display = 'block';
});

closeBtn.addEventListener('click', function() {
  mobileNavbar.style.display = 'none';
});