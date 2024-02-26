const viewBlog = document.querySelector('.viewBlog');
const blogButton = document.querySelector('.js-blog-but');
const cancleBut = document.querySelector('.canelBut');

blogButton.addEventListener('click', function() {
    viewBlog.style.display = 'flex';
  });

  cancleBut.addEventListener('click', function() {
    viewBlog.style.display = 'none';
  });


// Smooth scrolling for anchor links with class
document.querySelectorAll('.menu-link').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

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


