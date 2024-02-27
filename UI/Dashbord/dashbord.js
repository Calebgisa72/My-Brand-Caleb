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

window.addEventListener('resize', function() {
  if (window.innerWidth > 450) {
    navbarLinks.style.display = 'flex';
    hamburgerBtn.style.display = 'none';
  } else {
    navbarLinks.style.display = 'none';
    hamburgerBtn.style.display = 'block';
  }
});

window.dispatchEvent(new Event('resize'));